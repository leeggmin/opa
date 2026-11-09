/**
 * 프로그램 조회
 */
export const fetchProgramList = async (connector, searchKeyword = '') => {
  const response = await connector.client.get(
    '/api/v1/system/program/?searchKeyword=' + searchKeyword,
  );
  return response.data.data;
};

/**
 * 프로그램 액션 조회
 */
export const fetchProgramActions = async (connector, programId) => {
  const response = await connector.client.get(
    `/api/v1/system/program/${programId}/action`,
  );
  return response.data.data;
};

/**
 * 프로그램 액션 등록
 */
export const createProgramAction = async (connector, programId, params) => {
  const response = await connector.client.post(
    `/api/v1/system/program/${programId}/action`,
    params,
  );
  return response.data.data;
};

/**
 * 프로그램 액션 수정
 */
export const updateProgramAction = async (
  connector,
  programId,
  actionId,
  params,
) => {
  const response = await connector.client.patch(
    `/api/v1/system/program/${programId}/action/${actionId}`,
    params,
  );
  return response.data.data;
};

/**
 * 프로그램 액션 삭제
 */
export const deleteProgramAction = async (connector, programId, actionId) => {
  const response = await connector.client.delete(
    `/api/v1/system/program/${programId}/action/${actionId}`,
  );
  return response.data.data;
};
