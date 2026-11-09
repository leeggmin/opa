/**
 * 공지사항 목록 API
 */

export const getNoticeList = async (connector, params) => {
    const response = await connector.client.get('/api/v1/system/notice', { params });
    return response.data;
};
