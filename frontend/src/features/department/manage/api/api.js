/**
 * 부서 관리 API
 */

/**
 * 부서 트리 목록 조회
 */
export const getDepartmentTree = async (connector) => {
  const response = await connector.client.get('/api/v1/system/department/tree');
  return response.data;
};

/**
 * 부서 목록 조회
 */
export const getDepartmentList = async (connector) => {
  const response = await connector.client.get('/api/v1/system/department');
  return response.data;
};

/**
 * 부서 단건 조회
 */
export const getDepartment = async (connector, id) => {
  const response = await connector.client.get(
    `/api/v1/system/department/${id}`
  );
  return response.data;
};

/**
 * 부서 생성
 */
export const createDepartment = async (connector, params) => {
  const response = await connector.client.post(
    '/api/v1/system/department',
    params
  );
  return response.data;
};

/**
 * 부서 수정
 */
export const updateDepartment = async (connector, id, params) => {
  const response = await connector.client.patch(
    `/api/v1/system/department/${id}`,
    params
  );
  return response.data;
};

/**
 * 부서 삭제
 */
export const deleteDepartment = async (connector, id) => {
  const response = await connector.client.delete(
    `/api/v1/system/department/${id}`
  );
  return response.data;
};

/**
 * 부서 순서 변경
 */
export const updateDepartmentOrder = async (connector, params) => {
  const response = await connector.client.patch(
    '/api/v1/system/department/order',
    params
  );
  return response.data;
};
