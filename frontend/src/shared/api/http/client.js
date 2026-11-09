import axios from 'axios';
import { installApiEncryption } from './encryption';
import { winiMsg } from '@/shared/model';
import debounce from 'debounce';
import { isEncryption } from '@/shared/config/env';
import { WiniRestApiHelper } from './apiHelper';
import {
  getAuthHeaders,
  applyDefaultAuthHeaders,
  applyRequestAuthHeaders,
  applyCommonReturn,
  resolveHttpErrorHandling,
} from '@/shared/adapters/httpAdapter';

axios.defaults.baseURL = import.meta.env.VITE_INTERNAL_URL;
axios.defaults.withCredentials = true; // cookie 허용
const AUTH_EXPIRED_MESSAGE = '세션 만료 되었습니다. 다시 로그인 해주세요.';
const AUTH_STORAGE_KEYS = [
  'jwtsessiontoken',
  'tockenserial',
  'OrgId',
  'OrgCode',
  'UserId',
  'UserName',
  'GroupCode',
  'GroupId',
  'Department',
  'Duty',
];

const clearAuthSession = () => {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  delete axios.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['X-Org-Id'];  
};

const forceLogout = debounce(async () => {
  clearAuthSession();
  clearStorage();
  await winiMsg.showAlert(AUTH_EXPIRED_MESSAGE);
  window.location.href = '/login';
}, 200);
const clearStorage = () => {
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
}
class Connect {
  constructor() {
    applyDefaultAuthHeaders(axios); //기본헤더 적용

    this.client = axios.create();
    this.client.defaults.headers['Content-Type'] ='application/json;charset=UTF-8';
    this.client.defaults.withCredentials = true; // cookie 허용
    applyDefaultAuthHeaders(this.client); //기본헤더 적용
    
    

    // 통신요청시 1시간 세션확인
    this.client.interceptors.request.use(function (config) {
      applyRequestAuthHeaders(config);//요청헤더
      if (window.location.hostname === 'localhost') return config; //로컬호스트에 삭제
      if (window.location.pathname === '/login') {
        localStorage.removeItem('tockenserial');
        return config; //로그인 페이지에는 체크 안하기.
      }
      let lasttime = localStorage.getItem('tockenserial');
      if (!!lasttime && isNaN(lasttime) == false) {
        let now = new Date().getTime();

        const diffInHours = Math.abs(now - lasttime) / 1000 / 60 / 60;
        if (diffInHours > 1) {
          //1시간마다 세션만료
          clearStorage();
          winiMsg.showAlert('세션이 만료되었습니다. 다시 로그인 해주세요.').then(() => {
            window.location.href = '/login';
          });
          return false;
        }
      }
      localStorage.setItem('tockenserial', new Date().getTime());
      return config;
    });
    this.client.interceptors.response.use(
      (response) => {
        
        const result = applyCommonReturn(response);

        return result;
      },
      (error) => {

        //return 값 정비 및 에러 코드 가져오기
        const { shouldLogout, handledError } = resolveHttpErrorHandling(error); 

        if (shouldLogout) {
          forceLogout();
          return Promise.reject(handledError);
        }else{
          if(handledError.message!==null){
            winiMsg.showAlert(handledError.message);
          }
        }

        return Promise.reject(handledError);
      });

    //* TODO:jwt 토큰여부로 구분 필요
    if (isEncryption()) {
      installApiEncryption(this.client);
    }
    //* TODO:jwt 토큰여부로 구분 필요
    const { authorization } = getAuthHeaders();
    const hasJwtSessionToken = Boolean(authorization);
    if (hasJwtSessionToken) {
      const winiRestApiHelper = new WiniRestApiHelper();
      winiRestApiHelper.install(this.client);
    }
  }
}

// 전역 axios 인스턴스에도 암호화 interceptor 설치
if (isEncryption()) {
  installApiEncryption(axios);
}

export default Connect;

// 전역 axios 인스턴스도 export
export { axios as apiClient };
