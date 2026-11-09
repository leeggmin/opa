import forge from 'node-forge';

const ENCRYPTION_BYPASS_FLAG = '__skipApiEncryption';
const DEFAULT_KEY_PATH = '/api/v1/system/commonSecurity/generateKeyPair';

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
};

const importServerPublicKey = async (base64PublicKey) => {
  const binary = atob(base64PublicKey);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return window.crypto.subtle.importKey(
    'spki',
    bytes.buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt'],
  );
};

const getApiBaseUrl = () => import.meta.env.VITE_INTERNAL_URL || '';

const createEncryptedPayloadWithWebCrypto = async (
  plainPayload,
  serverPublicKeyBase64,
) => {
  const plainText = JSON.stringify(plainPayload);
  const encodedPlainText = new TextEncoder().encode(plainText);

  const aesKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ivBase64 = arrayBufferToBase64(iv.buffer);

  const encryptedText = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encodedPlainText,
  );
  const encBodyBase64 = arrayBufferToBase64(encryptedText);

  const aesKeyRaw = await window.crypto.subtle.exportKey('raw', aesKey);
  const serverPublicKey = await importServerPublicKey(serverPublicKeyBase64);
  const encryptedAesKey = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    serverPublicKey,
    aesKeyRaw,
  );
  const encKeyBase64 = arrayBufferToBase64(encryptedAesKey);

  return {
    ivBase64,
    encKeyBase64,
    encBodyBase64,
  };
};

const createEncryptedPayloadWithForge = (
  plainPayload,
  serverPublicKeyBase64,
) => {
  const aesKeyBytes = forge.random.getBytesSync(32);
  const ivBytes = forge.random.getBytesSync(12);

  const cipher = forge.cipher.createCipher('AES-GCM', aesKeyBytes);
  cipher.start({
    iv: ivBytes,
    tagLength: 128,
  });
  cipher.update(
    forge.util.createBuffer(JSON.stringify(plainPayload), 'utf8'),
  );

  if (!cipher.finish()) {
    throw new Error('AES-GCM 암호화에 실패했습니다.');
  }

  const encryptedBody =
    cipher.output.getBytes() + cipher.mode.tag.getBytes();
  const publicKeyAsn1 = forge.asn1.fromDer(
    forge.util.decode64(serverPublicKeyBase64),
  );
  const publicKey = forge.pki.publicKeyFromAsn1(publicKeyAsn1);
  const encryptedAesKey = publicKey.encrypt(aesKeyBytes, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  return {
    ivBase64: forge.util.encode64(ivBytes),
    encKeyBase64: forge.util.encode64(encryptedAesKey),
    encBodyBase64: forge.util.encode64(encryptedBody),
  };
};

const createEncryptedPayload = async (plainPayload, serverPublicKeyBase64) => {
  if (window.crypto?.subtle) {
    return createEncryptedPayloadWithWebCrypto(
      plainPayload,
      serverPublicKeyBase64,
    );
  }

  return createEncryptedPayloadWithForge(
    plainPayload,
    serverPublicKeyBase64,
  );
};

const createEncryptedRequestConfig = async (
  plainPayload,
  serverPublicKeyBase64,
) => {
  const encryptedPayload = await createEncryptedPayload(
    plainPayload,
    serverPublicKeyBase64,
  );

  return {
    data: { Enc: encryptedPayload.encBodyBase64 },
    headers: {
      'X-Enc-Key': encryptedPayload.encKeyBase64,
      'X-Enc-Iv': encryptedPayload.ivBase64,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
};

const resolveClient = (connectorOrClient) => {
  if (!connectorOrClient) return null;
  if (connectorOrClient.client) return connectorOrClient.client;
  return connectorOrClient;
};

const normalizeUrl = (url = '') => {
  if (!url) return '';
  try {
    return new URL(url, window.location.origin).pathname;
  } catch (_e) {
    return String(url);
  }
};

const isPlainObject = (value) =>
  value !== null &&
  typeof value === 'object' &&
  Object.prototype.toString.call(value) === '[object Object]';

const shouldEncryptByDefault = (config) => {
  // const method = String(config?.method || 'get').toLowerCase();
  const path = normalizeUrl(config?.url);
  // if (!['post', 'put', 'patch', 'delete'].includes(method)) return false;
  if (!path.startsWith('/api/v1/')) return false;
  if (path === '/api/v1/system/commonSecurity/generateKeyPair') return false;
  return true;
};

// 공개키 조회
const getServerPublicKey = async (connectorOrClient) => {
  const client = resolveClient(connectorOrClient);
  if (!client) return null;

  const resolvedBaseUrl = getApiBaseUrl();
  const keyPairResponse = await client.get(`${resolvedBaseUrl}${DEFAULT_KEY_PATH}`, {
    [ENCRYPTION_BYPASS_FLAG]: true,
  });
  return keyPairResponse?.data?.data?.publicKey || null;
};

export const requestWithEncryption = async (
  connectorOrClient,
  requestConfig,
) => {
  const client = resolveClient(connectorOrClient);
  if (!client) {
    throw new Error('HTTP client is required.');
  }

  const normalizedConfig = {
    method: requestConfig?.method || 'post',
    ...requestConfig,
    headers: {
      ...(requestConfig?.headers || {}),
    },
    [ENCRYPTION_BYPASS_FLAG]: true,
  };
  const shouldUseEncryption =
    window.location.hostname !== 'localhost';

  if (!shouldUseEncryption || !isPlainObject(normalizedConfig.data)) {
    return client.request(normalizedConfig);
  }

  const serverPublicKey = await getServerPublicKey(client);
  if (!serverPublicKey) {
    throw new Error('공개키 조회에 실패했습니다.');
  }

  const encryptedRequestConfig = await createEncryptedRequestConfig(
    normalizedConfig.data,
    serverPublicKey,
  );

  return client.request({
    ...normalizedConfig,
    data: encryptedRequestConfig.data,
    headers: {
      ...normalizedConfig.headers,
      ...encryptedRequestConfig.headers,
    },
  });
};

export const installApiEncryption = (client) => {
  if (!client || typeof client.interceptors?.request?.use !== 'function') {
    return null;
  }

  let cachedPublicKey = null;
  let inflightKeyPromise = null;

  const fetchPublicKey = async () => {
    if (cachedPublicKey) return cachedPublicKey;
    if (inflightKeyPromise) return inflightKeyPromise;

    inflightKeyPromise = getServerPublicKey(client)
      .then((key) => {
        cachedPublicKey = key;
        inflightKeyPromise = null;
        return key;
      })
      .catch((error) => {
        inflightKeyPromise = null;
        throw error;
      });

    return inflightKeyPromise;
  };

  client.interceptors.request.use(async (config) => {
    if (config?.[ENCRYPTION_BYPASS_FLAG]) return config;
    if (!shouldEncryptByDefault(config)) return config;
    if (!isPlainObject(config.data)) return config;

    const serverPublicKey = await fetchPublicKey();
    if (!serverPublicKey) {
      throw new Error('공개키 조회에 실패했습니다.');
    }

    const encryptedRequestConfig = await createEncryptedRequestConfig(
      config.data,
      serverPublicKey,
    );

    config.data = encryptedRequestConfig.data;
    config.headers = {
      ...(config.headers || {}),
      ...encryptedRequestConfig.headers,
    };

    return config;
  });
};