/**
 * 프로그램 CRUD API (program/management usecase)
 */

export const getPrograms = async (connector, searchKeyword = '') => {
  const response = await connector.client.get(
    `/api/v1/system/program/?searchKeyword=${searchKeyword}`,
  );
  return response.data.data || response.data;
};

export const getUnusedPrograms = async (connector) => {
  const response = await connector.client.get(
    '/api/v1/system/program/?MenuStatus=DISABLE',
  );
  return response.data;
};

export const getProgram = async (connector, id) => {
  const response = await connector.client.get(`/api/v1/system/program/${id}`);
  return response.data;
};

export const createProgram = async (connector, params) => {
  const response = await connector.client.post(
    '/api/v1/system/program',
    params,
  );
  return response.data;
};

export const updateProgram = async (connector, id, params) => {
  const response = await connector.client.patch(
    `/api/v1/system/program/${id}`,
    params,
  );
  return response.data;
};

export const deleteProgram = async (connector, id) => {
  const response = await connector.client.delete(
    `/api/v1/system/program/${id}`,
  );
  return response.data;
};

/**
 * 프로그램 액션 API
 */

export const getActions = async (connector, programId) => {
  const response = await connector.client.get(
    `/api/v1/system/program/${programId}/action`,
  );
  return response.data;
};

export const createAction = async (connector, programId, params) => {
  const response = await connector.client.post(
    `/api/v1/system/program/${programId}/action`,
    params,
  );
  return response.data;
};

export const updateAction = async (connector, programId, actionId, params) => {
  const response = await connector.client.patch(
    `/api/v1/system/program/${programId}/action/${actionId}`,
    params,
  );
  return response.data;
};

export const deleteAction = async (connector, programId, actionId) => {
  const response = await connector.client.delete(
    `/api/v1/system/program/${programId}/action/${actionId}`,
  );
  return response.data;
};
