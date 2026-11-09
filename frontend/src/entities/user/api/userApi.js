import { requestWithEncryption } from '@/shared/api';

/**
 * 사용자 엔티티 API
 * 기본 CRUD 및 조회 기능
 */

/**
 * 사용자 목록 조회
 */
export const fetchUsers = async (connector) => {
  const response = await connector.client.get('/api/v1/system/user');
  return response.data;
};

/**
 * 사용자 단건 조회
 */
export const fetchUser = async (connector, userId) => {
  const response = await connector.client.get(`/api/v1/system/user/${userId}`);
  return response.data;
};

/**
 * 사용자 등록
 */
export const createUser = async (connector, params) => {
  const response = await connector.client.post('/api/v1/system/user', params);
  return response.data;
};

/**
 * 사용자 수정
 */
export const updateUser = async (connector, userId, params) => {
  const response = await connector.client.patch(`/api/v1/system/user/${userId}`, params);
  return response.data;
};

/**
 * 사용자 삭제
 */
export const deleteUser = async (connector, userId) => {
  const response = await connector.client.delete(`/api/v1/system/user/${userId}`);
  return response.data;
};

/**
 * 사용자 그룹 목록 조회
 */
export const fetchUserGroups = async (connector) => {
  const response = await connector.client.get('/api/v1/system/user-group');
  return response.data;
};

/**
 * 사용자 비밀번호 변경
 */
export const changeUserPassword = async (connector, userId, params) => {
  const response = await requestWithEncryption(connector, {
    method: 'patch',
    url: `/api/v1/system/user/${userId}/changeUserPassword`,
    data: {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword,
    },
  });

  return response.data;
};
