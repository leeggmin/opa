import debounce from 'debounce';
import { winiMsg } from '@/shared/model';
import { CryptoHelper } from './crypto';

const sessionExpired = debounce(async () => {
  await winiMsg.showAlert('세션이 만료되었습니다.');
  window.location.href = '/login';
}, 200);

export class WiniRestApiSecurityHelper {
  cryptoHelper = new CryptoHelper();

  static restApiEncInfo = {
    encryptKey: null,
    publicKeyId: null,
  };

  constructor() {
    this.initialize();
  }

  async initialize() {
    if (localStorage.getItem('restApiEnc')) {
      try {
        WiniRestApiSecurityHelper.restApiEncInfo.encryptKey =
          await this.cryptoHelper.importAesKey(
            localStorage.getItem('restApiEnc'),
          );
      } catch (e) {
        localStorage.removeItem('restApiEnc');
      }
    }
  }

  async requestHook(config) {
    if (
      WiniRestApiSecurityHelper.restApiEncInfo.encryptKey &&
      config &&
      config.url.match(/^(\/)?api\/v/)
    ) {
      if (config.url.endsWith('/system/user/login')) {
        // 로그인인 경우 publicKeyId를 넘겨주기
        config.headers.set(
          'X-RestApi-Enc',
          WiniRestApiSecurityHelper.restApiEncInfo.publicKeyId,
        );
      } else {
        config.headers.set('X-RestApi-Enc', 'on');
      }

      if (typeof config.data === 'string') {
        // string 타입은 암호화하지 않음
      } else {
        config.headers.set('content-type', 'application/x-wini-enc-json');

        const jsonStr = JSON.stringify(config.data);
        const jsonBase64 = CryptoHelper.arrayBufferToBase64(
          new TextEncoder().encode(jsonStr).buffer,
        );

        const cipherStr = await this.cryptoHelper.encrypt(
          CryptoHelper.base64ToArrayBuffer(jsonBase64),
          WiniRestApiSecurityHelper.restApiEncInfo.encryptKey,
        );

        config.data = cipherStr;
      }
    }
  }

  async _processSuccess(response) {
    response.headers['content-type'] = 'application/json';

    try {
      const json = await this.cryptoHelper.decrypt(
        response.data,
        WiniRestApiSecurityHelper.restApiEncInfo.encryptKey,
      );

      response.data = JSON.parse(json);
    } catch (ex) {
      // 복호화 실패시 다시 로그인
      sessionExpired();
    }
  }

  async _processRestapiEncRequiredError(response) {
    // 통신 암호화가 필요함을 알리는 에러코드인 경우
    WiniRestApiSecurityHelper.restApiEncInfo.encryptKey = null;

    if (!response.config.url.endsWith('/system/user/login')) {
      // 로그인이 아닌 경우 로그인 페이지로 이동
      sessionExpired();
      return;
    }

    await this.startRestApiEnc();

    response.data.shouldRetry = true;
  }

  async startRestApiEnc() {
    WiniRestApiSecurityHelper.restApiEncInfo.encryptKey = null;

    const restApiEncKeyPair = await this.cryptoHelper.generateKeyPair();

    const publicKeyResult = await this.axios.post(
      '/api/v1/system/commonSecurity/startRestApiEnc',
      {
        clientPublicKey: restApiEncKeyPair.publicKeyStr,
      },
    );

    if (
      publicKeyResult.data.result === 'FAILURE' &&
      publicKeyResult.data.errorCodeName === 'COMMON_RESTAPI_ENC_DISABLED'
    ) {
      // 암호화가 해제되어 있는 경우 평문으로 통신하도록 함
      return;
    }

    WiniRestApiSecurityHelper.restApiEncInfo = {
      ...WiniRestApiSecurityHelper.restApiEncInfo,
      ...publicKeyResult.data.data,
    };

    if (WiniRestApiSecurityHelper.restApiEncInfo) {
      const payloadStr = await this.cryptoHelper.decryptBySharedKey(
        WiniRestApiSecurityHelper.restApiEncInfo.payload,
        WiniRestApiSecurityHelper.restApiEncInfo.serverPublicKey,
        restApiEncKeyPair.privateKey,
      );

      const { encryptKey } = JSON.parse(payloadStr);

      if (encryptKey) {
        WiniRestApiSecurityHelper.restApiEncInfo.encryptKey =
          await this.cryptoHelper.importAesKey(encryptKey);

        // 로그인이 성공하면 encryptKey를 localStorage에 저장
        localStorage.setItem(
          'restApiEnc',
          await this.cryptoHelper.exportRawKey(
            WiniRestApiSecurityHelper.restApiEncInfo.encryptKey,
          ),
        );
      }
    }
  }

  static lastJwtTokenRefreshTime = -1;
  static isTryingJwtTokenRefresh = false;

  async _processJwtTokenExpiredError(response) {
    const now = new Date().getTime();
    const globalAxios = (await import('axios')).default;

    if (WiniRestApiSecurityHelper.isTryingJwtTokenRefresh) {
      while (WiniRestApiSecurityHelper.isTryingJwtTokenRefresh) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      response.config.headers['Authorization'] =
        globalAxios.defaults.headers.common['Authorization'];
      return this.axios(response.config);
    }

    try {
      WiniRestApiSecurityHelper.isTryingJwtTokenRefresh = true;
      WiniRestApiSecurityHelper.lastJwtTokenRefreshTime = now;

      const res = await this.axios.get('/api/v1/system/user/refreshToken');

      if (res.data.result === 'FAILURE') {
        switch (res.data.message) {
          case 'COMMON_UNAUTHENTICATED': {
            await winiMsg
              .showAlert(`세션 만료 되었습니다. 다시 로그인 해주세요.`)
              .then(() => {
                localStorage.removeItem('jwtsessiontoken');
                localStorage.removeItem('tockenserial');
                localStorage.removeItem('OrgId');
                localStorage.removeItem('OrgCode');
                localStorage.removeItem('UserId');
                localStorage.removeItem('UserName');
                localStorage.removeItem('GroupCode');
                localStorage.removeItem('GroupId');
                localStorage.removeItem('Department');
                localStorage.removeItem('Duty');

                window.location.href = '/login';
              });

            return;
          }
          default: {
            await winiMsg
              .showAlert(
                `로그인 갱신에 실패하였습니다. 잠시 후 다시 시도하십시오.`,
              )
              .then(() => {});

            return;
          }
        }
      }

      if (res.data && res.data.data && res.data.data.accessToken) {
        if (res.data.result !== 'FAILURE') {
          localStorage.setItem('jwtsessiontoken', res.data.data.accessToken);

          // 현재 사용중인 axios의 Authorization 헤더를 업데이트
          this.axios.defaults.headers.common['Authorization'] =
            'Bearer ' + res.data.data.accessToken;

          // 전역 axios의 Authorization 헤더를 업데이트
          globalAxios.defaults.headers.common['Authorization'] =
            this.axios.defaults.headers.common['Authorization'];

          WiniRestApiSecurityHelper.lastJwtTokenRefreshTime =
            new Date().getTime();

          // 새로운 JWT 토큰으로 재시도
          response.config.headers['Authorization'] =
            this.axios.defaults.headers.common['Authorization'];
          return this.axios(response.config);
        } else {
          winiMsg.showAlert(res.data.message);
          return;
        }
      }
    } finally {
      WiniRestApiSecurityHelper.isTryingJwtTokenRefresh = false;
    }
  }

  async _processRestapiEncDisabledError(response) {
    // 통신 암호화가 비활성화되어 있음을 알리는 에러코드인 경우

    WiniRestApiSecurityHelper.restApiEncInfo = {
      ...WiniRestApiSecurityHelper.restApiEncInfo,
      encryptKey: null,
      publicKeyId: null,
    };

    localStorage.removeItem('restApiEnc');

    return response;
  }

  async responseHook(response) {
    if (response.data && response.data.result === 'FAILURE') {
      if (response.data.errorCodeName === 'COMMON_RESTAPI_ENC_REQUIRED') {
        return await this._processRestapiEncRequiredError(response);
      } else if (response.data.errorCodeName === 'COMMON_JWT_TOKEN_EXPIRED') {
        return this._processJwtTokenExpiredError(response);
      } else if (
        response.data.errorCodeName === 'COMMON_RESTAPI_ENC_DISABLED'
      ) {
        return this._processRestapiEncDisabledError(response);
      }
    }

    if (
      WiniRestApiSecurityHelper.restApiEncInfo &&
      response.headers['content-type'] === 'application/x-wini-enc-json'
    ) {
      return await this._processSuccess(response);
    }
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  install(axios) {
    this.axios = axios;
    this.axios.interceptors.request.handlers = [];
    this.axios.interceptors.response.handlers = [];

    axios.winiRestApiSecurityHelper = this;

    this.axios.interceptors.request.use(async (config) => {
      await this.requestHook(config);

      return config;
    });

    this.axios.interceptors.response.use(
      async (response) => {
        await this.responseHook(response);

        return response;
      },
      async (error) => {
        if (error.response) {
          const result = await this.responseHook(error.response);

          if (result) {
            return result;
          }
        }

        return Promise.reject(error);
      },
    );
  }
}
