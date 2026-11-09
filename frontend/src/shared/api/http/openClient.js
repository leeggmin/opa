import axios from 'axios';

/**
 * 외부 API 통신을 위한 클래스
 * x-menu, x-org, jwt 없이 통신하는 API 모듈
 */
class OpenConnect {
  constructor(baseURL) {
    this.client = axios.create({
      // baseURL: baseURL || import.meta.env.VITE_INTERNAL_URL,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      withCredentials: false,
    });

    // axios 전역 defaults(Authorization, Org/Menu 등)가 create 인스턴스에 섞여 들어오는 케이스가 있어
    // 외부 API 용도(OpenConnect)에서는 명시적으로 제거한다.
    delete this.client.defaults.headers?.common?.Authorization;
    delete this.client.defaults.headers?.common?.['X-Org-Id'];
    delete this.client.defaults.headers?.common?.['X-Menu-Id'];
  }
}

export default OpenConnect;
