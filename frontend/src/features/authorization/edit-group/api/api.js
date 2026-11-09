/**
 * 권한 그룹 편집 API
 */

/**
 * 권한 그룹 등록
 */
export const createAuthorizationGroup = async (connector, authInfo) => {
  const response = await connector.client.post(
    '/api/v1/system/authorization-group/',
    authInfo
  );
  return response.data;
};

/**
 * 권한 그룹 수정
 */
export const updateAuthorizationGroup = async (connector, id, authInfo) => {
  const response = await connector.client.patch(
    `/api/v1/system/authorization-group/${id}`,
    authInfo
  );
  return response.data;
};

/**
 * 권한 그룹 삭제
 */
export const deleteAuthorizationGroup = async (connector, id) => {
  const response = await connector.client.delete(
    `/api/v1/system/authorization-group/${id}`
  );
  return response.data;
};
