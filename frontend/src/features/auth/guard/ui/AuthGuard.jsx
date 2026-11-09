import { Navigate, Outlet } from 'react-router-dom';
import { authAdapter } from '@/shared/adapters';

/**
 * AuthGuard
 * - 인증(JWT) 없으면 /login으로 리다이렉트
 * - 있으면 하위 라우트를 렌더링
 */
export function AuthGuard() {
  const authState = authAdapter.getAuthStateFromStorage();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
