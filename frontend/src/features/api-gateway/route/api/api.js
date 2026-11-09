/**
 * Route API 함수들
 */

/**
 * Route 목록 조회
 */
export const fetchRouteList = async (connector, serviceName, searchParams) => {
  const { name, status } = searchParams;
  const response = await connector.client.get(
    `/api/v1/${serviceName}/route?searchKeyword=${name}&searchStatus=${status}`,
  );
  return response.data?.data || [];
};

/**
 * Route 등록
 */
export const createRoute = async (connector, serviceName, routeData) => {
  const response = await connector.client.post(
    `/api/v1/${serviceName}/route`,
    routeData,
  );
  return response.data?.data;
};

/**
 * Route 수정
 */
export const updateRoute = async (connector, serviceName, routeId, routeData) => {
  const response = await connector.client.patch(
    `/api/v1/${serviceName}/route/${routeId}`,
    routeData,
  );
  return response.data?.data;
};

/**
 * Route 삭제
 */
export const deleteRoute = async (connector, serviceName, routeId) => {
  const response = await connector.client.delete(
    `/api/v1/${serviceName}/route/${routeId}`,
  );
  return response.data?.data;
};
