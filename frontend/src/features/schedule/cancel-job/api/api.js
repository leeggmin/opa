export const cancelJobApi = {
  cancel: (connector, serviceName, jobId) => {
    return connector.client.post(
      `/api/v1/${serviceName}/commonJob/${jobId}/cancel`,
      {},
    );
  },
};
