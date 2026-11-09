import { winiCom } from '@/shared/lib';

const AUTH_MODE = {
  JWT: 'jwt',
  SESSION: 'session',
  UNKNOWN: 'unknown',
};
const STORAGE_KEYS = {
  TOKEN: 'jwtsessiontoken',
  USER_ID: 'UserId',
  ORG_ID: 'OrgId',
};

/**
 * @typedef {Object} AuthOrganization
 * @property {string | null} organizationId
 * @property {string | null} organizationCode
 * @property {string | null} organizationName
 * @property {string | null} userGroupId
 * @property {string | null} userGroupCode
 */

/**
 * @typedef {Object} AuthLoginPayload
 * @property {'jwt' | 'session' | 'unknown'} authMode
 * @property {string | null} accessToken
 * @property {string | null} userId
 * @property {string | null} fullName
 * @property {string | null} department
 * @property {string | null} duty
 * @property {string | null} tockenserial
 * @property {AuthOrganization[]} userOrganizationList
 */

/**
 * @typedef {Object} AuthLoginResult
 * @property {AuthLoginPayload} data
 * @property {unknown} raw
 */

/**
 * @typedef {Object} AuthLogoutResult
 * @property {unknown} data
 * @property {unknown} raw
 */

/**
 * @typedef {Object} AuthStateResult
 * @property {'jwt' | 'session' | 'unknown'} authMode
 * @property {boolean} isAuthenticated
 * @property {string | null} accessToken
 */

/**
 * @type {{
 *   toLoginResult: (response: unknown) => AuthLoginResult,
 *   toLogoutResult: (response: unknown) => AuthLogoutResult,
 *   toAuthState: (loginResult: AuthLoginResult) => AuthStateResult,
 *   getAuthStateFromStorage: (storage?: Storage | undefined) => AuthStateResult,
 *   isSessionValid: () => boolean,
 * }}
 */
export const authAdapter = {
  toLoginResult(response) {
    const payload = response?.data ?? response ?? {};
    const userOrganizationList = Array.isArray(payload?.userOrganizationList)
      ? payload.userOrganizationList.map(normalizeOrganization)
      : [];

    return {
      data: {
        ...payload,
        authMode: resolveAuthMode(payload),
        accessToken: winiCom.toNull(payload?.accessToken),
        userId: winiCom.toNull(payload?.userId),
        fullName: winiCom.toNull(payload?.fullName ?? payload?.userName),
        department: winiCom.toNull(payload?.department),
        duty: winiCom.toNull(payload?.duty),
        tockenserial: winiCom.toNull(payload?.tockenserial ?? payload?.tokenSerial),
        userOrganizationList,
      },
      raw: response,
    };
  },

  toLogoutResult(response) {
    return {
      data: response?.data ?? response ?? null,
      raw: response,
    };
  },

  // 로그인 응답에서 이미 정규화한 authMode를 기준으로 현재 인증 상태를 만듦
  toAuthState(loginResult) {
    const authMode = loginResult?.data?.authMode ?? AUTH_MODE.UNKNOWN;
    const accessToken =
      authMode === AUTH_MODE.JWT
        ? winiCom.toNull(loginResult?.data?.accessToken)
        : null;

    return {
      authMode,
      isAuthenticated:
        authMode === AUTH_MODE.JWT
          ? !!accessToken
          : authMode === AUTH_MODE.SESSION,
      accessToken,
    };
  },

  // 새로 로그인하지 않은 진입 시점에는 저장된 값만 보고 JWT인지 세션인지 추론
  getAuthStateFromStorage(storage = localStorage) {
    const accessToken = winiCom.toNull(storage?.getItem(STORAGE_KEYS.TOKEN));
    const userId = winiCom.toNull(storage?.getItem(STORAGE_KEYS.USER_ID));
    const organizationId = winiCom.toNull(storage?.getItem(STORAGE_KEYS.ORG_ID));
    const authMode = resolveStoredAuthMode(accessToken, userId, organizationId);

    return {
      authMode,
      isAuthenticated:
        authMode === AUTH_MODE.JWT
          ? !!accessToken
          : authMode === AUTH_MODE.SESSION,
      accessToken: authMode === AUTH_MODE.JWT ? accessToken : null,
    };
  },
  //현재 세션 유효성 체크
  //return true or false
  isSessionValid() {
    //필요시 세션 유효성 체크 api 호출
    return true;
  },
};

// Private helpers
// 조직 목록 응답에서 화면이 쓰는 최소 필드만 변환
const normalizeOrganization = (organization) => ({
  organizationId: winiCom.toNull(organization?.organizationId),
  organizationCode: winiCom.toNull(organization?.organizationCode),
  organizationName: winiCom.toNull(organization?.organizationName ?? organization?.organizationNm),
  userGroupId: winiCom.toNull(organization?.userGroupId),
  userGroupCode: winiCom.toNull(organization?.userGroupCode),
});

// 로그인 응답 payload를 보고 JWT 방식인지 세션 방식인지 판별
const resolveAuthMode = (payload) => {
  if (payload?.authMode === AUTH_MODE.JWT || payload?.accessToken) {
    return AUTH_MODE.JWT;
  }

  if (payload?.authMode === AUTH_MODE.SESSION || payload?.sessionId) {
    return AUTH_MODE.SESSION;
  }

  return AUTH_MODE.UNKNOWN;
};

// 새 요청 없이 저장된 값만 볼 때는 토큰 존재 여부와 사용자 컨텍스트로 인증 방식을 추론
const resolveStoredAuthMode = (accessToken, userId, organizationId) => {
  if (accessToken) {
    return AUTH_MODE.JWT;
  }

  if (userId || organizationId) {
    return AUTH_MODE.SESSION;
  }

  return AUTH_MODE.UNKNOWN;
};
