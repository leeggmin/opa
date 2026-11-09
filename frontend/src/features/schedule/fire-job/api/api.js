export const fireJobApi = {
  fire: (connector, serviceName, jobId) => {
    return connector.client.post(
      `/api/v1/${serviceName}/commonJob/${jobId}/fire`,
      {},
    );
  },
};
