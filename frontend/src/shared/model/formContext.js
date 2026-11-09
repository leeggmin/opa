import { createContext, useContext } from 'react';

/**
 * 2025.02.18 차현진
 * 폼에서 사용하는 데이터들을 묶어 보내기위해 context로 만듦
 * 다른 파일에서 쓰기위해 따로 파일분리
 */
const winiFormContext = createContext(null);

export const useFormContext = () => {
  const context = useContext(winiFormContext);
  if (!context) {
    throw new Error('useWiniForm must be used within a WiniFormProvider');
  }
  return context;
};

// Backward compatibility
export const getFormContext = useFormContext;

export { winiFormContext };
