import { Navigate } from 'react-router-dom';
import { authAdapter } from '@/shared/adapters';

/**
 * GuestGuard
 * - 이미 로그인(JWT 있음)된 사용자가 로그인 페이지 등 게스트 전용 페이지에 접근하면 /로 리다이렉트
 * - 미로그인 시에만 children 렌더링
 */
export function GuestGuard({ children }) {
  const authState = authAdapter.getAuthStateFromStorage();

  if (authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
