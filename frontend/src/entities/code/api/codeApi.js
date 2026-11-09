/**
 * 코드 목록 조회
 */
export const fetchCodes = async (connector, params = {}) => {
  const response = await connector.client.get('/api/v1/system/code', {
    params,
  });
  if (response?.data?.result === 'SUCCESS') {
    return response.data.data;
  }
  return null;
};

/**
 * 코드 등록
 */
export const createCode = async (connector, data) => {
  const response = await connector.client.post('/api/v1/system/code/', data);
  if (response?.data?.result === 'SUCCESS') {
    return response.data.data;
  }
  return null;
};

/**
 * 코드 수정
 */
export const updateCode = async (connector, codeId, data) => {
  const response = await connector.client.patch(
    `/api/v1/system/code/${codeId}`,
    data,
  );
  if (response?.data?.result === 'SUCCESS') {
    return response.data.data;
  }
  return null;
};

/**
 * 코드 삭제
 */
export const deleteCode = async (connector, codeId) => {
  const response = await connector.client.delete(
    `/api/v1/system/code/${codeId}`,
  );
  if (response?.data?.result === 'SUCCESS') {
    return response.data.data;
  }
  return null;
};
