import { createContext } from 'react';

/** Help 다이얼로그 내부 선택 컨텍스트. 의존성 없이 한 곳에서만 정의해 참조가 유일하도록 함. */
export const helpFormSelectedContext = createContext(null);
