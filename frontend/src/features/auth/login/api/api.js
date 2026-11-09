import { Communicator, requestWithEncryption } from '@/shared/api';

/**
 * 로그인 API
 */
export const login = async (username, password) => {
  const connector = new Communicator();
  connector.client.defaults.headers.common['Authorization'] = null;

  const payload = {
    ipSecurityStatus: 'DISABLE',
    username,
    password
  };

  const response = await requestWithEncryption(connector, {
    method: 'post',
    url: '/api/v1/system/user/login', // 일반 사용자 로그인용 엔드포인트
    data: payload,
  });

  return response.data;
};
