/**
 * 공지사항 작성/수정 API
 */

export const createNotice = async (connector, body) => {
    const response = await connector.client.post('/api/v1/system/notice/', body);
    return response.data;
};

export const updateNotice = async (connector, noticeId, body) => {
    const response = await connector.client.patch(`/api/v1/system/notice/${noticeId}`, body);
    return response.data;
};
