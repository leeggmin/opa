/**
 * user 도메인 - 본인 프로필 수정 API
 */

export const updateProfile = async (connector, params) => {
    // const response = await connector.client.patch('/api/v1/system/user/profile', params);
    // return response.data;
    return Promise.reject(
        new Error("updateProfile API는 현재 백엔드 연결 전입니다. (API 정의만 존재)")
    );
};
