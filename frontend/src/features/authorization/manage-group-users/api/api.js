/**
 * 사용자 권한 관리 API
 */

/**
 * 권한 그룹 목록 조회
 */
export const getAuthorizationGroups = async (connector) => {
  const response = await connector.client.get(
    '/api/v1/system/authorization-group',
  );
  return response.data;
};

/**
 * 사용자 목록 조회 (권한 그룹별)
 */
export const getUsersByAuthorizationGroup = async (
  connector,
  authorizationGroupId,
  params,
) => {
  const response = await connector.client.get(
    `/api/v1/system/authorization-group/${authorizationGroupId}/user/all`,
    { params },
  );
  return response.data;
};

/**
 * 사용자 권한 일괄 저장
 */
export const updateUsersAuthorizationBatch = async (
  connector,
  authorizationGroupId,
  authorizationGroupUserList,
) => {
  const response = await connector.client.post(
    `/api/v1/system/authorization-group/${authorizationGroupId}/user/batch`,
    { authorizationGroupUserList },
  );
  return response.data;
};
