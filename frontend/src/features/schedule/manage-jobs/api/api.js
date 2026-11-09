export const jobApi = {
  getList: (connector, serviceName, groupId, params) => {
    return connector.client.get(
      `/api/v1/${serviceName}/commonJobGroup/${groupId}/job`,
      { params },
    );
  },

  create: (connector, serviceName, data) => {
    return connector.client.post(`/api/v1/${serviceName}/commonJob`, data);
  },

  update: (connector, serviceName, id, data) => {
    return connector.client.patch(`/api/v1/${serviceName}/commonJob/${id}`, data);
  },

  delete: (connector, serviceName, id) => {
    return connector.client.delete(`/api/v1/${serviceName}/commonJob/${id}`);
  },

  sync: (connector, serviceName) => {
    return connector.client.get(`/api/v1/${serviceName}/commonJob/all/sync`);
  },

  getState: (connector, serviceName, jobId) => {
    return connector.client.get(`/api/v1/${serviceName}/commonJob/${jobId}/state`);
  },

  fire: (connector, serviceName, jobId) => {
    return connector.client.post(`/api/v1/${serviceName}/commonJob/${jobId}/fire`, {});
  },

  cancel: (connector, serviceName, jobId) => {
    return connector.client.post(`/api/v1/${serviceName}/commonJob/${jobId}/cancel`, {});
  },
};
