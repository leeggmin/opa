/**
 * 메뉴 엔티티 API
 * - 네비게이션: 사용자 메뉴/권한 조회
 */

const MENU_HEADER = 'Main';

/**
 * 메뉴 트리 조회 (사용자 권한 기준)
 */
export const fetchMenuTree = async (connector, userId) => {
  connector.client.defaults.headers.common['X-Menu-Id'] = MENU_HEADER;

  const response = await connector.client.get(
    `api/v1/system/user/${userId}/menu-permission/tree`
  );

  return response.data;
};

/**
 * 메뉴별 권한 조회
 */
export const fetchMenuPermission = async (connector, userId, menuId) => {
  connector.client.defaults.headers.common['X-Menu-Id'] = MENU_HEADER;

  const response = await connector.client.get(
    `api/v1/system/user/${userId}/menu/${menuId}/permission`
  );

  return response.data?.data;
};

/**
 * 메뉴 트리 조회 (관리용)
 */
export const getMenuTree = async (connector) => {
  const response = await connector.client.get('/api/v1/system/menu/tree');
  return response.data;
};

/**
 * 메뉴 생성
 */
export const createMenu = async (connector, params) => {
  const response = await connector.client.post('/api/v1/system/menu', params);
  return response.data;
};

/**
 * 메뉴 수정
 */
export const updateMenu = async (connector, id, params) => {
  const response = await connector.client.patch(
    `/api/v1/system/menu/${id}`,
    params,
  );
  return response.data;
};

/**
 * 메뉴 삭제
 */
export const deleteMenu = async (connector, id) => {
  const response = await connector.client.delete(
    `/api/v1/system/menu/${id}?confirmYn=Y`,
  );
  return response.data;
};

/**
 * 메뉴 순서 변경
 */
export const updateMenuOrder = async (connector, params) => {
  const response = await connector.client.patch(
    '/api/v1/system/menu/order',
    params,
  );
  return response.data;
};
