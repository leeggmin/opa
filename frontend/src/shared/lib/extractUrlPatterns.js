/**
 * 소스 코드에서 URL 패턴 추출
 * axios 호출 패턴을 분석하여 API 엔드포인트 정보를 추출합니다.
 *
 * @param {string} src - 분석할 소스 코드 문자열
 * @returns {Array<{actionType: string, authType: string, method: string, uri: string, orgUri: string}>}
 */
export function extractUrlPatterns(src) {
  const methodSortNo = {
    get: 1,
    post: 2,
    put: 3,
    patch: 4,
    delete: 5,
  };

  const keySet = {};
  const result = [];

  const pushResult = (method, orgUri, concatenation = '') => {
    if (!method || !orgUri) return;

    const actionType = 'RESTAPI';
    const hasQueryParam = orgUri.includes('?');

    let uri = orgUri
      .replace(/\?.*$/, '') // 쿼리 파라미터 먼저 제거
      .replace(/^\/?api\/v1\/+/, '') // api/v1/ 제거
      .replace(/['"`/]+$/g, '') // 끝의 따옴표/슬래시 제거
      .replace(/\${[^}]+}/g, '*'); // 템플릿 리터럴을 *로 변환

    // 문자열 결합이 있는 경우 /*를 추가
    // 단, 원본 URI에 쿼리 파라미터(?)가 있는 경우는 제외 (쿼리 파라미터 값이므로)
    if (concatenation && concatenation.trim() && !hasQueryParam) {
      // 이미 /로 끝나면 *만 추가, 아니면 /*를 추가
      uri = uri.endsWith('/') ? uri + '*' : uri + '/*';
    }

    let authType = '';

    switch (method) {
      case 'get':
        authType = 'SELECT';
        break;
      case 'post':
        authType = 'INSERT';
        break;
      case 'patch':
        authType = 'UPDATE';
        break;
      case 'delete':
        authType = 'DELETE';
        break;
    }

    const key = `${actionType}=${authType}=${uri}`;
    if (keySet[key] || !authType) {
      return;
    }

    keySet[key] = {
      actionType,
      authType,
      method,
      uri,
      orgUri,
    };

    result.push(keySet[key]);
  };

  const axiosCallRegExp =
    /\.\s*(get|post|patch|delete)\s*\(\s*(['"`])([\s\S]*?)\2(\s*\+\s*[^,)]+)?/g;
  let axiosCallMatch;

  while ((axiosCallMatch = axiosCallRegExp.exec(src)) !== null) {
    pushResult(
      axiosCallMatch[1],
      axiosCallMatch[3],
      axiosCallMatch[4],
    );
  }

  // requestWithEncryption(조건부 암호화) 포함
  const encryptedCallRegExp =
    /requestWithEncryption\s*\(\s*[^,]+,\s*\{[\s\S]*?method\s*:\s*(['"`])(get|post|patch|delete)\1[\s\S]*?url\s*:\s*(['"`])([\s\S]*?)\3[\s\S]*?\}\s*\)/g;
  let encryptedCallMatch;

  while ((encryptedCallMatch = encryptedCallRegExp.exec(src)) !== null) {
    pushResult(encryptedCallMatch[2], encryptedCallMatch[4]);
  }

  // url, method 순으로 정렬
  result.sort((a, b) => {
    const ret = a.uri.localeCompare(b.uri);

    if (ret === 0) {
      return methodSortNo[a.method] - methodSortNo[b.method];
    }

    return ret;
  });

  return result;
}
