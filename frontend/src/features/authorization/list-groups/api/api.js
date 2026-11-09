/**
 * 권한 그룹 목록 조회 API
 */

/**
 * 권한 그룹 트리 조회
 */
export const fetchAuthorizationGroupTree = async (connector) => {
  const response = await connector.client.get(
    '/api/v1/system/authorization-group/tree'
  );
  return response.data;
};

/**
 * 권한 그룹 목록 조회
 */
export const fetchAuthorizationGroups = async (connector) => {
  const response = await connector.client.get(
    '/api/v1/system/authorization-group'
  );
  return response.data;
};
