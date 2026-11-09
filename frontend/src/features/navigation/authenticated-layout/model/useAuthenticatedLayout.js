import { useEffect } from 'react';
import { useUserInit, useLogout } from '@/entities/user';
import { menuStore, userStore } from '@/shared/model';
import { useMenuTree } from './useMenuTree';
import { useMenuPermission } from './useMenuPermission';

/**
 * 인증된 레이아웃 비즈니스 로직 Hook
 */
export const useAuthenticatedLayout = (tabModeEnabled = false) => {
  const { currentUserId } = useUserInit();

  const {
    menulist,
    selectedMenu,
    menuUrl,
    menuSelectionKey,
    breadcrumb,
    title,
    isMenuLoaded,
    isPathResolved,
    handleMenuClick,
    handleMenuSelect,
    navigateToProgram,
    openMenu,
    closeAllMenu,
    reloadMenu,
  } = useMenuTree(currentUserId, true, tabModeEnabled);

  useEffect(() => {
    menuStore.getState().setCurrentMenuId(selectedMenu || '');
  }, [selectedMenu]);

  const { menuAuthInfo } = useMenuPermission(
    userStore.getUserId(),
    selectedMenu,
  );

  const { logout } = useLogout();

  return {
    menulist,
    selectedMenu,
    menuUrl,
    menuSelectionKey,
    breadcrumb,
    title,
    isMenuLoaded,
    isPathResolved,
    handleMenuClick,
    handleMenuSelect,
    navigateToProgram,
    openMenu,
    closeAllMenu,
    reloadMenu,
    menuAuthInfo,
    logout,
  };
};
