/**
 * 공지사항 상세 API
 */

export const getNoticeDetail = async (connector, noticeId) => {
    const response = await connector.client.get(`/api/v1/system/notice/${noticeId}`);
    return response.data;
};

export const deleteNotice = async (connector, noticeId) => {
    const response = await connector.client.delete(`/api/v1/system/notice/${noticeId}`);
    return response.data;
};
