export const jobApi = {
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

export const jobRunApi = {
  getList: (connector, serviceName, jobId, params) => {
    return connector.client.get(`/api/v1/${serviceName}/commonJob/${jobId}/run`, {
      params,
    });
  },
};
