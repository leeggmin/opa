/**
 * 사용량 모니터링(통화 조회) API
 */

/**
 * API 응답의 membership 필드명을 subscription으로 매핑
 */
const mapSubscriptionFields = (item) => ({
    ...item,
    subscriptionPlanName: item.membershipPlanName,
    subscriptionStartDate: item.membershipStartDate,
    subscriptionEndDate: item.membershipEndDate,
    subscriptionPlanCallTime: item.membershipPlanCallTime,
    subscriptionPlanFee: item.membershipPlanFee,
});

export const getCallHistory = async (connector, baseDateTime, orgName) => {
    const response = await connector.client.get(`/api/v1/system/organization/dashboard-history?baseDateTime=${baseDateTime}&organizationName=${orgName}`);
    const data = response.data;
    if (data.data && Array.isArray(data.data)) {
        data.data = data.data.map(mapSubscriptionFields);
    }
    return data;
};
