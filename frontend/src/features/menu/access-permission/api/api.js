/**
 * 메뉴 접근 권한 관리 API
 */

/**
 * 메뉴별 권한 조회
 */
export const fetchMenuAccessPermissions = async (connector, authorizationGroupId) => {
  const response = await connector.client.get(
    `/api/v1/system/authorization-group/${authorizationGroupId}/menu-permission/tree-list`
  );
  return response.data;
};

/**
 * 메뉴별 권한 일괄 등록
 */
export const batchCreateMenuAccessPermissions = async (
  connector,
  authorizationGroupId,
  permissionList
) => {
  const requestBody = {
    permissionList,
  };
  const response = await connector.client.post(
    `/api/v1/system/authorization-group/${authorizationGroupId}/menu-permission/batch`,
    requestBody
  );
  return response.data;
};
