/**
 * 기관 엔티티 API
 * 기본 CRUD 기능
 */

/**
 * 기관 목록 조회
 */
export const fetchOrganizations = async (connector) => {
  const response = await connector.client.get('/api/v1/system/organization');
  return response.data;
};

/**
 * 기관 생성 (수동)
 */
export const createOrganization = async (connector, params) => {
  const response = await connector.client.post(
    '/api/v1/system/organization',
    params
  );
  return response.data;
};

/**
 * 기관 수정
 */
export const updateOrganization = async (connector, organizationId, params) => {
  const response = await connector.client.patch(
    `/api/v1/system/organization/${organizationId}`,
    params
  );
  return response.data;
};

/**
 * 기관 삭제
 */
export const deleteOrganization = async (connector, organizationId) => {
  const response = await connector.client.delete(
    `/api/v1/system/organization/${organizationId}`
  );
  return response.data;
};
