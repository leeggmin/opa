import menuStore from '@/shared/model/store/menuStore';
/**요청 정보 Adapter */
const AUTH_STORAGE_KEYS = {
  TOKEN: 'jwtsessiontoken',
  ORG_ID: 'OrgId',
};
// 공통에서 사용하는 에러 
const AUTH_ERROR_CODE_NAMES = new Set([
  'COMMON_UNAUTHENTICATED',
  'COMMON_JWT_TOKEN_EXPIRED',
]);
const ERROR_CODE={
  logout: new Set(['999','205']),
  notfound: new Set(['404']),
  noauth: new Set(['403']),
}

//**
// *Info: 해당 정보는 공통 backend에서 필요로 하는 정보/ 필요없는 backend 에선 제외처리리
// *jwt 토큰정보
// *조직 정보
// *메뉴 정보
//  */
const getToken = () => localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
const getOrgId = () => localStorage.getItem(AUTH_STORAGE_KEYS.ORG_ID);
const getMenuId = () => menuStore.getCurrentMenuId();

export const getAuthHeaders = () => {
  const token = getToken();
  const orgId = getOrgId();
  const menuId = getMenuId();

  return {
    authorization: token ? `Bearer ${token}` : null,
    orgId: orgId || null,
    menuId: menuId || null,
  };
};

// 요청 헤더
export const applyRequestAuthHeaders = (config = {}) => {
  const { authorization, orgId, menuId } = getAuthHeaders();
  config.headers = config.headers || {};

  if (authorization) {
    config.headers.Authorization = authorization;
  } else {
    delete config.headers.Authorization;
  }

  if (orgId) {
    config.headers['X-Org-Id'] = orgId;
  } else {
    delete config.headers['X-Org-Id'];
  }

  // 요청에 이미 지정된 menu id가 없을 때만 현재 메뉴를 주입한다.
  //TODO: jwt 토큰에 메뉴 id가 없을 때만 현재 메뉴를 주입한다.
  if (!config.headers['X-Menu-Id'] && menuId) {
    config.headers['X-Menu-Id'] = menuId;
  }

  return config;
};
// 기본 헤더
export const applyDefaultAuthHeaders = (httpClient) => {
  if (!httpClient?.defaults?.headers?.common) return;

  const { authorization, orgId, menuId } = getAuthHeaders();

  if (authorization) {
    httpClient.defaults.headers.common.Authorization = authorization;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }

  if (orgId) {
    httpClient.defaults.headers.common['X-Org-Id'] = orgId;
  } else {
    delete httpClient.defaults.headers.common['X-Org-Id'];
  }

  //TODO: jwt 토큰에 메뉴 id가 없을 때만 현재 메뉴를 주입한다.
  if (menuId) {
    httpClient.defaults.headers.common['X-Menu-Id'] = menuId;
  } else {
    delete httpClient.defaults.headers.common['X-Menu-Id'];
  }
};
/**요청 정보 Adapter 종료 */
/**리턴 정보 Adapter 시작 */
/**
 * 리턴 정보 Adapter
 * @param {Object} response
 * @returns {Object}
 */
export const applyCommonReturn = (response) => {
  const normalizedData = normalizeResponsePayload(response?.data);

  // axios response 원형(config/data/headers/request/status/statusText)은 유지한다.
  if (response && typeof response === 'object') {
    return {
      ...response,
      data: normalizedData,
    };
  }

  return {
    config: response?.config ?? undefined,
    data: normalizedData,
    headers: response?.headers ?? undefined,
    request: response?.request ?? undefined,
    status: response?.status ?? null,
    statusText: response?.statusText ?? null,
  };
};

const normalizeResponsePayload = (payload, defaults = {}) => {
  if (Object.hasOwn(payload ?? {}, 'errorCode')) {
    return {
      
      result: payload?.result ?? defaults.result ?? null,
      data: payload?.data ?? defaults.data ?? null,
      metadata: payload?.metadata ?? defaults.metadata ?? null,
      message: payload?.message ?? defaults.message ?? null,
      errorCode: payload?.errorCode ?? defaults.errorCode ?? null,
      errorCodeName: payload?.errorCodeName ?? defaults.errorCodeName ?? null,
    };
  }else{
    return{
      result: null,
      data:payload,
      metadata: null,
      message:payload?.resultMsg ?? null,
      errorCode: payload?.resultCode ?? null,
      errorCodeName: null,
    }
  }
};
//공통 에러처리
export const shouldForceLogoutOnError = (error) => {
  const errorCodeName = error?.response?.data?.errorCodeName;
  const statusCode = error?.response?.status;

  return (
    AUTH_ERROR_CODE_NAMES.has(errorCodeName) ||
    statusCode === 401 ||
    ERROR_CODE.logout.has(String(statusCode))
  );
};

// 각 backend return 값 맞추기
export const normalizeHttpError = (error) => {
  const response = error?.response;
  const payload = response?.data || {};
  const normalizedData = normalizeResponsePayload(payload, {
    result: 'FAILURE',
    message: error?.message ?? '요청 처리 중 오류가 발생했습니다.',
  });

  return {
    // 성공 응답과 동일하게 axios response 원형을 유지한다.
    config: response?.config ?? error?.config ?? undefined,
    data: normalizedData,
    headers: response?.headers ?? undefined,
    request: response?.request ?? error?.request ?? undefined,
    status: response?.status ?? null,
    statusText: response?.statusText ?? null,
    // 기존 호출부 호환을 위해 평탄화 필드도 함께 제공한다.
    ...normalizedData,
    statusCode: response?.status ?? null,
    originalError: error,
  };
};

export const resolveHttpErrorHandling = (error) => {
  const shouldLogout = shouldForceLogoutOnError(error);

  return {
    shouldLogout,
    handledError: normalizeHttpError(error),
  };
};
/**리턴 정보 Adapter 종료 */  

// {
//   "result" : "SUCCESS",
//   "data" : [],
//   "metadata" : {
//     "timestamp" : "2026-05-19T05:38:33Z"
//   },
//   "message" : null,
//   "errorCode" : null,
//   "errorCodeName" : null
// }