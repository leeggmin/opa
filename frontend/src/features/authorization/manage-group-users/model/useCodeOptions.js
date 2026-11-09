import { useState } from 'react';

/**
 * 코드 옵션 관리 Hook
 */
export const useCodeOptions = () => {
  const [useStatusOptions] = useState([
    { codeId: 'ENABLE', codeName: '사용' },
    { codeId: 'DISABLE', codeName: '미사용' },
  ]);

  return {
    useStatusOptions,
  };
};
