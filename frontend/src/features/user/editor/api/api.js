/**
 * 사용자 편집(CRUD/승인/비번관리) 유즈케이스 API
 */
export {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from '@/entities/user';

/**
 * 가입 승인
 */
export const acceptUserJoin = async (connector, userId) => {
  const response = await connector.client.patch(
    `/api/v1/system/user/${userId}/acceptJoin`,
    {}
  );
  return response.data;
};

/**
 * 비밀번호 초기화
 */
export const resetUserPassword = async (connector, userId, passwordInfo) => {
  const response = await connector.client.patch(
    `/api/v1/system/user/${userId}/resetPassword`,
    passwordInfo
  );
  return response.data;
};

/**
 * 비밀번호 오류 횟수 초기화 (로그인 잠금 해제)
 */
export const unlockUserLogin = async (connector, params) => {
  const response = await connector.client.patch('/api/v1/system/user/unlockLogin', params);
  return response.data;
};
