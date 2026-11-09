export const jobGroupApi = {
  getList: (connector, serviceName, params) => {
    return connector.client.get(`/api/v1/${serviceName}/commonJobGroup`, { params });
  },

  create: (connector, serviceName, data) => {
    return connector.client.post(`/api/v1/${serviceName}/commonJobGroup`, data);
  },

  update: (connector, serviceName, id, data) => {
    return connector.client.patch(`/api/v1/${serviceName}/commonJobGroup/${id}`, data);
  },

  delete: (connector, serviceName, id) => {
    return connector.client.delete(`/api/v1/${serviceName}/commonJobGroup/${id}`);
  },
};
