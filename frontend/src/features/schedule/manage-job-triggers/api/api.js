export const jobTriggerApi = {
  getList: (connector, serviceName, jobId) => {
    return connector.client.get(`/api/v1/${serviceName}/commonJob/${jobId}/trigger`);
  },

  create: (connector, serviceName, jobId, data) => {
    return connector.client.post(
      `/api/v1/${serviceName}/commonJob/${jobId}/trigger`,
      data,
    );
  },

  update: (connector, serviceName, jobId, triggerId, data) => {
    return connector.client.patch(
      `/api/v1/${serviceName}/commonJob/${jobId}/trigger/${triggerId}`,
      data,
    );
  },

  delete: (connector, serviceName, jobId, triggerId) => {
    return connector.client.delete(
      `/api/v1/${serviceName}/commonJob/${jobId}/trigger/${triggerId}`,
    );
  },

  checkCronExpression: (connector, serviceName, jobId, params) => {
    return connector.client.get(
      `/api/v1/${serviceName}/commonJob/${jobId}/trigger/check-cron-Expression`,
      { params },
    );
  },
};
