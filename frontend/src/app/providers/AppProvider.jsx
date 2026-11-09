import { useEffect } from 'react';
import { initializeApp } from '@/shared/lib/globalSetup';

export function AppProvider({ children }) {
  // 앱 전역 초기화 (한 번만 실행)
  useEffect(() => {
    initializeApp();
  }, []);

  return <>{children}</>;
}
