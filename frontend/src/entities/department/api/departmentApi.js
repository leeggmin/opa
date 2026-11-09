/**
 * 부서 목록 조회
 */
export const fetchDepartments = async (connector) => {
    const response = await connector.client.get('/api/v1/system/department');
    return response.data;
};