/**
 * 라인 관리 API
 */

export async function getLineList(connector, { deviceId }) {
    return connector.client.get('/api/v1/basic/line', { params: { deviceId } });
}

export async function createLine(connector, params) {
    return connector.client.post('/api/v1/basic/line', params);
}

export async function updateLine(connector, lineId, params) {
    return connector.client.patch(`/api/v1/basic/line/${lineId}`, params);
}

export async function removeLine(connector, lineId) {
    return connector.client.delete(`/api/v1/basic/line/${lineId}`);
}
