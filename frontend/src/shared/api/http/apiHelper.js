// **
/**
 * Info: jwt token refresh 로직
 */
export class WiniRestApiHelper {
  constructor() {
  }

  static lastJwtTokenRefreshTime = -1;
  static isTryingJwtTokenRefresh = false;

  async _processJwtTokenExpiredError(response) {
    
    const now = new Date().getTime();
    const globalAxios = axios;

    if (WiniRestApiHelper.isTryingJwtTokenRefresh) {
      //return axios(response.config);

      while (WiniRestApiHelper.isTryingJwtTokenRefresh) {
        console.log('!! waiting for token refresh...');
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // console.log('!! retrying...');

      response.config.headers['Authorization'] = globalAxios.defaults.headers.common['Authorization'];
      console.log(response.config)
      return this.axios(response.config);
    }

    try {
      WiniRestApiHelper.isTryingJwtTokenRefresh = true;
      WiniRestApiHelper.lastJwtTokenRefreshTime = now;

      const res = await this.axios.get('/api/v1/system/user/refreshToken');

      if (res.data.result === "FAILURE") {
        switch (res.data.message) {
          case 'COMMON_UNAUTHENTICATED': {
            await winiMsg.showAlert(`세션 만료 되었습니다. 다시 로그인 해주세요.`).then(() => {
              localStorage.removeItem('jwtsessiontoken');
              localStorage.removeItem('tockenserial');
              localStorage.removeItem('OrgId');
              localStorage.removeItem('OrgCode')
              localStorage.removeItem('UserId');
              localStorage.removeItem('UserName');
              localStorage.removeItem('GroupCode');
              localStorage.removeItem('GroupId');
              localStorage.removeItem('Department')
              localStorage.removeItem('Duty')

              window.location.href = '/login';
            });

            return;
          }
          default: {
            await winiMsg.showAlert(`로그인 갱신에 실패하였습니다. 잠시 후 다시 시도하십시오.`).then(() => { })

            return;
          }
        }
      }

      if (res.data && res.data.data && res.data.data.accessToken) {
        if (res.data.result !== "FAILURE") {
          localStorage.setItem('jwtsessiontoken', res.data.data.accessToken);

          // 현재 사용중인 axios의 Authorization 헤더를 업데이트
          this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.accessToken;

          // 전역 axios의 Authorization 헤더를 업데이트
          globalAxios.defaults.headers.common['Authorization'] = this.axios.defaults.headers.common['Authorization'];

          WiniRestApiHelper.lastJwtTokenRefreshTime = new Date().getTime();

          // 새로운 JWT 토큰으로 재시도
          response.config.headers['Authorization'] = this.axios.defaults.headers.common['Authorization'];
          return this.axios(response.config);
        } else {
          alert(res.data.message)
          return;
        }
      }
    } finally {
      WiniRestApiHelper.isTryingJwtTokenRefresh = false;
    }
  }
  async responseHook(response) {
    //console.log('axios.interceptors.response:', response);

    if (response.data && response.data.result === 'FAILURE') {
      if (response.data.errorCodeName === 'COMMON_JWT_TOKEN_EXPIRED') {
        console.log('COMMON_JWT_TOKEN_EXPIRED')
        return this._processJwtTokenExpiredError(response);
      }
    }

    if (WiniRestApiHelper.restApiEncInfo && response.headers['content-type'] === 'application/x-wini-enc-json') {
      return await this._processSuccess(response);
    }
  }
  install(axios) {
    this.axios = axios;
    // this.axios.interceptors.request.handlers = [];
    // this.axios.interceptors.response.handlers = [];
    this.axios.interceptors.response.use(async (response) => {
      await this.responseHook(response);

      return response;
    }, async (error) => {
      if (error.response) {
        const result = await this.responseHook(error.response);

        if (result) {
          return result;
        }
      }

      return Promise.reject(error);
    });

  }
}