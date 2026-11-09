/**
 * 도움말용 공통 사용자 API (help/panels usecase)
 */

export const fetchCommonUsers = async (connector, service) => {
  const response = await connector.client.get(`/api/v1/${service}/commonUser`);
  return response.data.data;
};
