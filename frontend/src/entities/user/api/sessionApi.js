import { Communicator } from '@/shared/api';

/**
 * 로그아웃 API
 */
export const performLogout = async (userId) => {
  const connector = new Communicator();
  const param = { id: userId };

  const response = await connector.client.post(
    '/api/v1/system/user/logout',
    param
  );

  return response.data;
};
