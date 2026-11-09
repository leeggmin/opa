/**
 * 공지사항 비밀번호 확인 API
 */

export const checkNoticePassword = async (connector, noticeId, pw) => {
    const response = await connector.client.post(`/api/v1/system/notice/${noticeId}`, { pw });
    return response.data;
};
