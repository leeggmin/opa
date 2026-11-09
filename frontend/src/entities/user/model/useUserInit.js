import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAdapter } from '@/shared/adapters';
import { userStore } from '@/shared/model';

/**
 * 사용자 정보 초기화 훅
 * MainLayout에서 사용자 정보를 초기화하고 관리합니다.
 */
export const useUserInit = () => {
  const selectUserInfo = useLocation().state;
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // 사용자 정보 초기화
    const userInfo = userStore.getState();
    const authState = authAdapter.getAuthStateFromStorage();

    if (!authState.isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // JWT만 orgId/state + localStorage OrgId를 강제한다.
    if (authState.authMode === 'jwt') {
      if (!selectUserInfo || selectUserInfo.orgId == null) {
        if (!localStorage.getItem('OrgId')) {
          navigate('/login', { replace: true });
          return;
        }

        userInfo.setUser({
          userName: localStorage.getItem('UserName') ?? '',
          organizationId: localStorage.getItem('OrgId') ?? '',
          organizationCode: localStorage.getItem('OrgCode') ?? '',
          userId: localStorage.getItem('UserId') ?? '',
          userGroupCode: localStorage.getItem('GroupCode') ?? '',
          userGroupId: localStorage.getItem('GroupId') ?? '',
        });

        const userId = localStorage.getItem('UserId');
        if (userId) {
          setCurrentUserId(userId);
        }
        return;
      }

      userInfo.setUser({
        userName: selectUserInfo.username ?? '',
        organizationId: selectUserInfo.orgId ?? '',
        organizationCode: selectUserInfo.orgCode ?? '',
        userId: selectUserInfo.userId ?? '',
        userGroupCode: selectUserInfo.autCode ?? '',
        userGroupId: selectUserInfo.autId ?? '',
      });

      const latest = userStore.getState();
      localStorage.setItem('UserName', latest.userName);
      localStorage.setItem('OrgId', latest.organizationId);
      localStorage.setItem('OrgCode', latest.organizationCode);
      localStorage.setItem('UserId', latest.userId);
      localStorage.setItem('GroupCode', latest.userGroupCode);
      localStorage.setItem('GroupId', latest.userGroupId);

      setCurrentUserId(userStore.getUserId());
      return;
    }

    // SESSION(JSESSION 등): orgId 없어도 userId만 있으면 메인 진입 허용
    if (selectUserInfo?.userId) {
      userInfo.setUser({
        userName: selectUserInfo.name ?? selectUserInfo.username ?? localStorage.getItem('UserName') ?? '',
        organizationId: selectUserInfo.orgId ?? localStorage.getItem('OrgId') ?? '',
        organizationCode: selectUserInfo.orgCode ?? localStorage.getItem('OrgCode') ?? '',
        userId: selectUserInfo.userId,
        userGroupCode: selectUserInfo.autCode ?? localStorage.getItem('GroupCode') ?? '',
        userGroupId: selectUserInfo.autId ?? localStorage.getItem('GroupId') ?? '',
      });

      localStorage.setItem('UserId', selectUserInfo.userId);
      if (selectUserInfo.name) {
        localStorage.setItem('UserName', selectUserInfo.name);
      }

      setCurrentUserId(selectUserInfo.userId);
      return;
    }

    const userId = localStorage.getItem('UserId');
    if (userId) {
      userInfo.setUser({
        userName: localStorage.getItem('UserName') ?? '',
        organizationId: localStorage.getItem('OrgId') ?? '',
        organizationCode: localStorage.getItem('OrgCode') ?? '',
        userId,
        userGroupCode: localStorage.getItem('GroupCode') ?? '',
        userGroupId: localStorage.getItem('GroupId') ?? '',
      });
      setCurrentUserId(userId);
    }
  }, [selectUserInfo, navigate]);

  return { currentUserId };
};
