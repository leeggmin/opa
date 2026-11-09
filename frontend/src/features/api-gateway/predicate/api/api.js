/**
 * Predicate API 함수들
 */

/**
 * Predicate 목록 조회
 */
export const fetchPredicateList = async (
  connector,
  serviceName,
  routeId,
  searchParams,
) => {
  if (!routeId) {
    return [];
  }

  const { searchKeyword, predicateType, status } = searchParams;
  const response = await connector.client.get(
    `/api/v1/${serviceName}/route/${routeId}/predicate?searchKeyword=${searchKeyword}&searchPredicateType=${predicateType}&searchStatus=${status}`,
  );
  return response.data?.data || [];
};

/**
 * Predicate 등록
 */
export const createPredicate = async (
  connector,
  serviceName,
  routeId,
  predicateData,
) => {
  const response = await connector.client.post(
    `/api/v1/${serviceName}/route/${routeId}/predicate`,
    predicateData,
  );
  return response.data?.data;
};

/**
 * Predicate 수정
 */
export const updatePredicate = async (
  connector,
  serviceName,
  routeId,
  predicateId,
  predicateData,
) => {
  const response = await connector.client.patch(
    `/api/v1/${serviceName}/route/${routeId}/predicate/${predicateId}`,
    predicateData,
  );
  return response.data?.data;
};

/**
 * Predicate 삭제
 */
export const deletePredicate = async (
  connector,
  serviceName,
  routeId,
  predicateId,
) => {
  const response = await connector.client.delete(
    `/api/v1/${serviceName}/route/${routeId}/predicate/${predicateId}`,
  );
  return response.data?.data;
};
