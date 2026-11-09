import forge from 'node-forge';

export class CryptoHelper {
  static isNativeCryptoSupported = !!(window.crypto && window.crypto.subtle);
  static _cryptoHelper = undefined;

  constructor() {
    if (CryptoHelper._cryptoHelper === undefined) {
      if (CryptoHelper.isNativeCryptoSupported) {
        CryptoHelper._cryptoHelper = new NativeCryptoHelper();
      } else {
        CryptoHelper._cryptoHelper = new PureJsCryptoHelper();
      }
    }
  }

  async importAesKey(base64EncodedKey) {
    return await CryptoHelper._cryptoHelper.importAesKey(base64EncodedKey);
  }

  async exportRawKey(rawKey) {
    return await CryptoHelper._cryptoHelper.exportRawKey(rawKey);
  }

  async encrypt(data, key, iv) {
    return await CryptoHelper._cryptoHelper.encrypt(data, key, iv);
  }

  async decrypt(cipherStr, key) {
    return await CryptoHelper._cryptoHelper.decrypt(cipherStr, key);
  }

  async generateKeyPair() {
    return await CryptoHelper._cryptoHelper.generateKeyPair();
  }

  async decryptBySharedKey(cipherStr, serverPublicKeyStr, privateKey) {
    return await CryptoHelper._cryptoHelper.decryptBySharedKey(
      cipherStr,
      serverPublicKeyStr,
      privateKey,
    );
  }

  static arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  static base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

export class NativeCryptoHelper {
  async importAesKey(base64EncodedKey) {
    return await crypto.subtle.importKey(
      'raw',
      CryptoHelper.base64ToArrayBuffer(base64EncodedKey),
      {
        name: 'AES-GCM',
        length: 128,
      },
      true,
      ['encrypt', 'decrypt'],
    );
  }

  async exportRawKey(rawKey) {
    return CryptoHelper.arrayBufferToBase64(
      await window.crypto.subtle.exportKey('raw', rawKey),
    );
  }

  async encrypt(data, key, iv) {
    if (iv === undefined) {
      iv = window.crypto.getRandomValues(new Uint8Array(12));
    }

    const cipher = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv, tagLength: iv.length * 8 },
      key,
      data,
    );

    return `${CryptoHelper.arrayBufferToBase64(iv)}$$${CryptoHelper.arrayBufferToBase64(cipher)}`;
  }

  async decrypt(cipherStr, key) {
    const cipherParts = cipherStr.split('$$');
    const iv = CryptoHelper.base64ToArrayBuffer(cipherParts[0]);

    return new TextDecoder().decode(
      await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv, tagLength: iv.byteLength * 8 },
        key,
        CryptoHelper.base64ToArrayBuffer(cipherParts[1]),
      ),
    );
  }

  async generateKeyPair() {
    const restApiEncKeyPair = await window.crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      ['deriveKey', 'deriveBits'],
    );

    const restApiEncPublicKey = await window.crypto.subtle.exportKey(
      'spki',
      restApiEncKeyPair.publicKey,
    );

    return {
      publicKeyStr: CryptoHelper.arrayBufferToBase64(restApiEncPublicKey),

      publicKey: restApiEncKeyPair.publicKey,
      privateKey: restApiEncKeyPair.privateKey,
    };
  }

  async decryptBySharedKey(cipherStr, serverPublicKeyStr, privateKey) {
    const serverPublicKey = await window.crypto.subtle.importKey(
      'spki',
      CryptoHelper.base64ToArrayBuffer(serverPublicKeyStr),
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      [],
    );

    const sharedSecretKey = await window.crypto.subtle.deriveKey(
      {
        name: 'ECDH',
        public: serverPublicKey,
      },
      privateKey,
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt'],
    );

    const decrypted = await this.decrypt(cipherStr, sharedSecretKey);

    return decrypted;
  }
}

export class PureJsCryptoHelper {
  async importAesKey(base64EncodedKey) {
    return forge.util.decode64(base64EncodedKey);
  }

  async exportRawKey(rawKey) {
    return forge.util.encode64(rawKey);
  }

  async encrypt(data, key, iv) {
    if (iv === undefined) {
      iv = window.crypto.getRandomValues(new Uint8Array(12));
    }

    const cipher = forge.cipher.createCipher('AES-GCM', key);
    cipher.start({
      iv: iv,
      tagLength: iv.length * 8,
    });
    cipher.update(forge.util.createBuffer(data));
    cipher.finish();

    return (
      CryptoHelper.arrayBufferToBase64(iv) +
      '$$' +
      forge.util.encode64(cipher.output.data + cipher.mode.tag.data)
    );
  }

  async decrypt(cipherStr, key) {
    const cipherParts = cipherStr.split('$$');
    const iv = CryptoHelper.base64ToArrayBuffer(cipherParts[0]);
    const encryptedWithTag = forge.util.decode64(cipherParts[1]);
    const tag = encryptedWithTag.substring(
      encryptedWithTag.length - iv.byteLength,
    );
    const encrypted = encryptedWithTag.substring(
      0,
      encryptedWithTag.length - iv.byteLength,
    );

    const decipher = forge.cipher.createDecipher('AES-GCM', key);
    decipher.start({
      iv: iv,
      tagLength: iv.byteLength * 8,
      tag: tag,
    });
    decipher.update(forge.util.createBuffer(encrypted));
    const pass = decipher.finish();

    if (!pass) {
      throw new Error('Decryption failed.');
    }

    return decipher.output.toString();
  }

  async generateKeyPair() {
    const keypair = forge.rsa.generateKeyPair({ bit: 3072 });
    const publicKeyStr =
      'NAIVE:' +
      forge.pki.publicKeyToPem(keypair.publicKey, 10000).split('\r\n')[1];

    return {
      publicKeyStr: publicKeyStr,

      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
    };
  }

  async decryptBySharedKey(cipherStr, serverPublicKeyStr, privateKey) {
    return privateKey.decrypt(forge.util.decode64(cipherStr));
  }
}
