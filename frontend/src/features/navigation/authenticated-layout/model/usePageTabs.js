import { useCallback, useEffect, useRef, useState } from 'react';
import { winiMsg } from '@/shared/model';

const MAIN_TAB_ID = '__main__';
const MAIN_TAB = {
  menuId: MAIN_TAB_ID,
  programMapping: '',
  title: '메인',
  isMain: true,
  isPinned: true,
};

export const usePageTabs = ({
  enabled,
  mainTabEnabled,
  maxTabs,
  selectedMenu,
  menuUrl,
  menuSelectionKey,
  title,
  breadcrumb,
  menuAuthInfo,
  navigateToProgram,
  navigateToMain,
}) => {
  const [tabs, setTabs] = useState(() => (
    enabled && mainTabEnabled ? [MAIN_TAB] : []
  ));
  const [activeMenuId, setActiveMenuId] = useState(() => (
    enabled && mainTabEnabled ? MAIN_TAB_ID : ''
  ));
  const notifiedMenuIdRef = useRef('');
  const handledSelectionKeyRef = useRef(menuSelectionKey);

  useEffect(() => {
    if (!enabled || !selectedMenu || !menuUrl) {
      return;
    }

    const isNewMenuSelection = handledSelectionKeyRef.current !== menuSelectionKey;
    if (isNewMenuSelection) {
      handledSelectionKeyRef.current = menuSelectionKey;
    }

    const currentTab = tabs.find((tab) => tab.menuId === selectedMenu);

    if (currentTab) {
      if (isNewMenuSelection) {
        setActiveMenuId(selectedMenu);
      }
      notifiedMenuIdRef.current = '';

      const currentMenuAuthInfo = menuAuthInfo?._menuId === selectedMenu
        ? menuAuthInfo
        : currentTab.menuAuthInfo;

      if (
        currentTab.title !== title
        || currentTab.breadcrumb !== breadcrumb
        || currentTab.programMapping !== menuUrl
        || currentTab.menuAuthInfo !== currentMenuAuthInfo
      ) {
        setTabs((prev) => prev.map((tab) => (
          tab.menuId === selectedMenu
            ? {
                ...tab,
                title: title || menuUrl,
                breadcrumb,
                programMapping: menuUrl,
                menuAuthInfo: currentMenuAuthInfo,
              }
            : tab
        )));
      }
      return;
    }

    if (!isNewMenuSelection) {
      return;
    }

    if (tabs.length >= maxTabs) {
      if (notifiedMenuIdRef.current !== selectedMenu) {
        notifiedMenuIdRef.current = selectedMenu;
        winiMsg.showSnackbar(`탭은 최대 ${maxTabs}개까지 열 수 있습니다. 사용하지 않는 탭을 닫아주세요.`);
      }

      const activeTab = tabs.find((tab) => tab.menuId === activeMenuId);
      if (activeTab?.isMain) {
        navigateToMain();
      } else if (activeTab) {
        navigateToProgram(activeTab.programMapping);
      }
      return;
    }

    notifiedMenuIdRef.current = '';
    setActiveMenuId(selectedMenu);
    setTabs((prev) => [
      ...prev,
      {
        menuId: selectedMenu,
        programMapping: menuUrl,
        title: title || menuUrl,
        breadcrumb,
        menuAuthInfo: menuAuthInfo?._menuId === selectedMenu ? menuAuthInfo : undefined,
      },
    ]);
  }, [activeMenuId, breadcrumb, enabled, maxTabs, menuAuthInfo, menuSelectionKey, menuUrl, navigateToMain, navigateToProgram, selectedMenu, tabs, title]);

  const handleSelectTab = useCallback((tab) => {
    setActiveMenuId(tab.menuId);

    if (tab.isMain) {
      navigateToMain();
      return;
    }

    if (tab.menuId !== selectedMenu) {
      navigateToProgram(tab.programMapping);
    }
  }, [navigateToMain, navigateToProgram, selectedMenu]);

  const handleSelectMainTab = useCallback(() => {
    if (!mainTabEnabled) {
      return;
    }

    setActiveMenuId(MAIN_TAB_ID);
    navigateToMain();
  }, [mainTabEnabled, navigateToMain]);

  const handleCloseTab = useCallback((menuId) => {
    if (tabs.length <= 1) {
      return;
    }

    const closingIndex = tabs.findIndex((tab) => tab.menuId === menuId);
    if (closingIndex === -1 || tabs[closingIndex].isPinned) {
      return;
    }

    const nextTabs = tabs.filter((tab) => tab.menuId !== menuId);
    setTabs(nextTabs);

    if (menuId === activeMenuId) {
      const nextActiveTab = nextTabs[Math.min(closingIndex, nextTabs.length - 1)];
      setActiveMenuId(nextActiveTab.menuId);

      if (nextActiveTab.isMain) {
        navigateToMain();
      } else {
        navigateToProgram(nextActiveTab.programMapping);
      }
    }
  }, [activeMenuId, navigateToMain, navigateToProgram, tabs]);

  const handleCloseAllTabs = useCallback(() => {
    const pinnedTabs = tabs.filter((tab) => tab.isPinned);
    setTabs(pinnedTabs);

    const nextActiveTab = pinnedTabs[0];
    if (!nextActiveTab) {
      setActiveMenuId('');
      return;
    }

    setActiveMenuId(nextActiveTab.menuId);
    if (nextActiveTab.isMain) {
      navigateToMain();
    } else {
      navigateToProgram(nextActiveTab.programMapping);
    }
  }, [navigateToMain, navigateToProgram, tabs]);

  const handleCloseOtherTabs = useCallback(() => {
    setTabs((prev) => prev.filter((tab) => (
      tab.isPinned || tab.menuId === activeMenuId
    )));
  }, [activeMenuId]);

  const activeTabIndex = tabs.findIndex((tab) => tab.menuId === activeMenuId);
  const activeTab = tabs[activeTabIndex];
  const canCloseAll = tabs.some((tab) => !tab.isPinned);
  const canCloseOthers = tabs.some((tab) => (
    !tab.isPinned && tab.menuId !== activeMenuId
  ));

  const handleMoveTab = useCallback((direction) => {
    const targetTab = tabs[activeTabIndex + direction];

    if (targetTab) {
      setActiveMenuId(targetTab.menuId);

      if (targetTab.isMain) {
        navigateToMain();
      } else {
        navigateToProgram(targetTab.programMapping);
      }
    }
  }, [activeTabIndex, navigateToMain, navigateToProgram, tabs]);

  return {
    tabs,
    activeMenuId,
    activeTab,
    canCloseAll,
    canCloseOthers,
    canMovePrevious: activeTabIndex > 0,
    canMoveNext: activeTabIndex > -1 && activeTabIndex < tabs.length - 1,
    handleSelectTab,
    handleSelectMainTab,
    handleCloseTab,
    handleCloseAllTabs,
    handleCloseOtherTabs,
    handleMovePrevious: () => handleMoveTab(-1),
    handleMoveNext: () => handleMoveTab(1),
  };
};