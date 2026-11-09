import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAuthenticatedLayout,
  usePageTabs,
} from '@/features/navigation/authenticated-layout';
import {
  getTabCount,
  isHeaderEnabled,
  isMainTabEnabled,
  isTabModeEnabled,
} from '@/shared/config';
import { findMenuByUrlPath } from '@/shared/lib';
import { useAuthenticatedShellDrawerState } from './useAuthenticatedShellDrawerState';

const TAB_MODE_ENABLED = isTabModeEnabled();
const HEADER_ENABLED = isHeaderEnabled();
const MAIN_TAB_ENABLED = isMainTabEnabled();
const MAX_TAB_COUNT = getTabCount();

const MENU_PERMISSION_KEYS = [
  'selectStatus',
  'insertStatus',
  'updateStatus',
  'deleteStatus',
  'printStatus',
  'downStatus',
  'manageStatus',
  'custom1Status',
  'custom2Status',
  'custom3Status',
];

export const isNoMenuPermission = (menuAuthInfo) => {
  if (!menuAuthInfo) {
    return false;
  }

  return MENU_PERMISSION_KEYS.every((key) => menuAuthInfo[key] === 'NONE');
};

const findFirstProgramMapping = (menus, excludedMenuIds = []) => {
  if (!menus || menus.length === 0) {
    return '';
  }

  const excludedIdSet = new Set(excludedMenuIds.filter(Boolean));

  for (const item of menus) {
    if (item.menuType === 'PROGRAM' && !excludedIdSet.has(item.id)) {
      return item.programMapping ?? '';
    }

    if (item.children?.length > 0) {
      const childProgramMapping = findFirstProgramMapping(
        item.children,
        excludedMenuIds,
      );

      if (childProgramMapping) {
        return childProgramMapping;
      }
    }
  }

  return '';
};

export function useAuthenticatedShellModel() {
  const [deniedMenuIds, setDeniedMenuIds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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
    logout,
    openMenu,
    closeAllMenu,
    reloadMenu,
    menuAuthInfo,
  } = useAuthenticatedLayout(TAB_MODE_ENABLED);

  const navigateToMain = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  const {
    tabs,
    activeMenuId,
    activeTab,
    canCloseAll,
    canCloseOthers,
    canMovePrevious,
    canMoveNext,
    handleSelectTab,
    handleSelectMainTab,
    handleCloseTab,
    handleCloseAllTabs,
    handleCloseOtherTabs,
    handleMovePrevious,
    handleMoveNext,
  } = usePageTabs({
    enabled: TAB_MODE_ENABLED,
    mainTabEnabled: MAIN_TAB_ENABLED,
    maxTabs: MAX_TAB_COUNT,
    selectedMenu,
    menuUrl,
    menuSelectionKey,
    title,
    breadcrumb,
    menuAuthInfo,
    navigateToProgram,
    navigateToMain,
  });

  const { isDrawerOpen, handleToggleDrawer, handleMenuClickWithDrawer } =
    useAuthenticatedShellDrawerState({
      openMenu,
      closeAllMenu,
      handleMenuClick,
    });

  useEffect(() => {
    if (!selectedMenu || !menuAuthInfo) {
      return;
    }

    if (isNoMenuPermission(menuAuthInfo)) {
      setDeniedMenuIds((prev) =>
        prev.includes(selectedMenu) ? prev : [...prev, selectedMenu],
      );
      return;
    }

    setDeniedMenuIds((prev) =>
      prev.filter((menuId) => menuId !== selectedMenu),
    );
  }, [selectedMenu, menuAuthInfo]);

  const isRootPath = location.pathname === '/';
  const isMainPath = location.pathname === '/main';
  const isUnmatchedPath =
    isMenuLoaded &&
    isPathResolved &&
    !isRootPath &&
    !isMainPath &&
    !findMenuByUrlPath(menulist, location.pathname);
  const isStandaloneMain =
    !TAB_MODE_ENABLED && MAIN_TAB_ENABLED && (isRootPath || isMainPath);
  const shouldOpenFallback = TAB_MODE_ENABLED
    ? !MAIN_TAB_ENABLED &&
      tabs.length === 0 &&
      !selectedMenu &&
      (isRootPath || isMainPath)
    : !MAIN_TAB_ENABLED && (isRootPath || isMainPath);

  useEffect(() => {
    if (isStandaloneMain && isRootPath) {
      navigate('/main', { replace: true });
    }
  }, [isRootPath, isStandaloneMain, navigate]);

  const fallbackProgramMapping =
    isPathResolved && shouldOpenFallback
      ? findFirstProgramMapping(menulist.origin, deniedMenuIds)
      : '';

  const shouldShowEmptyShell =
    isMenuLoaded &&
    isPathResolved &&
    shouldOpenFallback &&
    !fallbackProgramMapping;
  const shouldShowNotFound = isUnmatchedPath;

  useEffect(() => {
    if (!isMenuLoaded || !fallbackProgramMapping) {
      return;
    }

    if (fallbackProgramMapping !== menuUrl) {
      navigateToProgram(fallbackProgramMapping);
    }
  }, [isMenuLoaded, fallbackProgramMapping, menuUrl, navigateToProgram]);

  return {
    tabModeEnabled: TAB_MODE_ENABLED,
    headerEnabled: HEADER_ENABLED,
    mainTabEnabled: MAIN_TAB_ENABLED,
    menulist,
    selectedMenu,
    menuUrl,
    breadcrumb,
    title,
    isMenuLoaded,
    handleMenuSelect,
    navigateToProgram,
    logout,
    reloadMenu,
    menuAuthInfo,
    tabs,
    activeMenuId,
    activeTab,
    canCloseAll,
    canCloseOthers,
    canMovePrevious,
    canMoveNext,
    handleSelectTab,
    handleSelectMainTab,
    handleCloseTab,
    handleCloseAllTabs,
    handleCloseOtherTabs,
    handleMovePrevious,
    handleMoveNext,
    isDrawerOpen,
    handleToggleDrawer,
    handleMenuClickWithDrawer,
    deniedMenuIds,
    isStandaloneMain,
    shouldShowEmptyShell,
    shouldShowNotFound,
  };
}
