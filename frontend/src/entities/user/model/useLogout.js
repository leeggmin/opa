import { useNavigate } from 'react-router-dom';
import { performLogout } from '../api/sessionApi';
import { authAdapter } from '@/shared/adapters';
import logoutData from '@/shared/adapters/data/logout.json';
import { userStore } from '@/shared/model';

/**
 * 로그아웃 Hook
 */
export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const userId = userStore.getUserId();
      if (userId) {
        authAdapter.toLogoutResult(
          await performLogout(userId),
          // logoutData,
        );
      }
    } catch {
      // 로그아웃 실패 시에도 로컬 정리 진행
    } finally {
      // 사용자 정보 및 토큰 정리
      userStore.getState().reset();
      localStorage.removeItem('jwtsessiontoken');
      localStorage.removeItem('UserName');
      localStorage.removeItem('OrgId');
      localStorage.removeItem('OrgCode');
      localStorage.removeItem('UserId');
      localStorage.removeItem('GroupCode');
      localStorage.removeItem('GroupId');

      // 로그인 페이지로 이동
      navigate('/login');
    }
  };

  return { logout };
};
