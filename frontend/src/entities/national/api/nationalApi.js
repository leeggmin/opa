/**
 * 국가(national) 엔티티 API
 */

/**
 * 국가 목록 조회
 */
export const fetchNationals = async (connector) => {
  const response = await connector.client.get('/api/v1/system/national');
  return response.data;
};

/**
 * 국가 등록
 */
export const createNational = async (connector, body) => {
  const response = await connector.client.post('/api/v1/system/national', body);
  return response.data;
};

/**
 * 국가 수정
 */
export const updateNational = async (connector, nationalCode, body) => {
  const response = await connector.client.patch(
    `/api/v1/system/national/${nationalCode}`,
    body,
  );
  return response.data;
};

/**
 * 국가 삭제
 */
export const deleteNational = async (connector, nationalCode) => {
  const response = await connector.client.delete(
    `/api/v1/system/national/${nationalCode}`,
  );
  return response.data;
};
