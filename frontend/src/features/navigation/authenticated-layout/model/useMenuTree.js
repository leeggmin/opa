import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Communicator } from '@/shared/api';
import { menuAdapter } from '@/shared/adapters';
import { fetchMenuTree } from '../api/api';
import menuData from '@/shared/adapters/data/menu.json';
import {
  buildBreadcrumb,
  convertProgramMappingToPath,
  findMenuByUrlPath,
} from '@/shared/lib';
import { menuStore, winiMsg } from '@/shared/model';

/**
 * 메뉴 트리 관리 Hook
 */
export const useMenuTree = (userId, firstloadingOpen = true, tabModeEnabled = false) => {
  const navigate = useNavigate();
  const location = useLocation();
  const connector = useMemo(() => new Communicator(), []);
  const setMenuInfo = menuStore((state) => state.setMenuInfo);

  const [menuAllData, setMenuAllData] = useState();
  const [menulist, setMenuList] = useState({
    menu: [],
    all: {},
    info: [],
    origin: [],
  });
  const [selectedMenu, setSelectedMenu] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [openMenuList, setOpenMenuList] = useState([]);
  const [menuSelectionKey, setMenuSelectionKey] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPathResolved, setIsPathResolved] = useState(false);

  const { breadcrumb, title } = useMemo(() => (
    selectedMenu
      ? buildBreadcrumb(menulist.info, selectedMenu)
      : { breadcrumb: '', title: '' }
  ), [menulist.info, selectedMenu]);

  const updateTreeMenuOpenState = (menus, targetId, forcedOpen) => {
    let found = false;
    let isOpen = false;

    const nextMenus = menus.map((menu) => {
      const nextMenu = { ...menu };
      const currentId = menu._id || menu.id;

      if (currentId === targetId) {
        found = true;
        if (forcedOpen === true) {
          nextMenu.isOpen = true;
        } else {
          nextMenu.isOpen = !menu.isOpen;
        }
        isOpen = nextMenu.isOpen;
      }

      if (menu.children && menu.children.length > 0) {
        const childResult = updateTreeMenuOpenState(menu.children, targetId, forcedOpen);
        nextMenu.children = childResult.nextMenus;
        if (childResult.found) {
          found = true;
          isOpen = childResult.isOpen;
        }
      }

      return nextMenu;
    });

    return { nextMenus, found, isOpen };
  };

  const applyOpenListToTree = (menus, openList) => {
    return menus.map((menu) => {
      const nextMenu = { ...menu };
      const menuId = menu._id || menu.id;
      nextMenu.isOpen = openList.indexOf(menuId) > -1;

      if (menu.children && menu.children.length > 0) {
        nextMenu.children = applyOpenListToTree(menu.children, openList);
      }
      return nextMenu;
    });
  };

  const closeTree = (menus) => {
    return menus.map((menu) => {
      const nextMenu = { ...menu, isOpen: false };
      if (menu.children && menu.children.length > 0) {
        nextMenu.children = closeTree(menu.children);
      }
      return nextMenu;
    });
  };

  const loadMenuTree = async () => {
    if (!userId) return;

    try {
      const data = menuAdapter.toMenuTreeResult(
        await fetchMenuTree(connector, userId),
        // menuData,
        firstloadingOpen,
      );
      setMenuAllData(data);
    } catch {
      winiMsg.showSnackbar('메뉴를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    if (userId) {
      loadMenuTree();
    }
  }, [userId]);

  useEffect(() => {
    if (menuAllData?.data) {
      const treeData = menuAllData.data;
      setMenuList(treeData);

      if (firstloadingOpen) {
        const opm = treeData.origin.map((item) => item._id || item.id);
        setOpenMenuList(opm);
      }

      setIsInitialized(true);
    }
  }, [menuAllData, firstloadingOpen]);

  useEffect(() => {
    if (!isInitialized || !menulist.all || Object.keys(menulist.all).length === 0) {
      return;
    }

    const currentPath = location.pathname;
    const menuInfo = findMenuByUrlPath(menulist, currentPath);

    if (tabModeEnabled) {
      if (currentPath === '/' || currentPath === '/main') {
        if (currentPath !== '/main') {
          navigate('/main', { replace: true });
        }
      } else if (menuInfo) {
        setSelectedMenu(menuInfo.menuId);
        setMenuUrl(menuInfo.programMapping);
        navigate('/main', { replace: true });
      } else {
        setSelectedMenu('');
        setMenuUrl('');
      }

      setIsPathResolved(true);
      return;
    }

    if (menuInfo) {
      if (menuInfo.menuId !== selectedMenu) {
        setSelectedMenu(menuInfo.menuId);
        setMenuUrl(menuInfo.programMapping);
      }
    } else {
      // 유효하지 않은 메뉴 경로
      setSelectedMenu('');
      setMenuUrl('');
    }

    setIsPathResolved(true);
  }, [location.pathname, isInitialized, menulist, navigate, tabModeEnabled]);

  const handleMenuClick = (item, isOpen) => {
    const targetId = item._id || item.id;
    if (!targetId) return;

    let forcedOpen;
    if (!isOpen) {
      forcedOpen = true;
    }

    const result = updateTreeMenuOpenState(menulist.origin, targetId, forcedOpen);
    if (!result.found) return;

    setMenuList((prev) => ({ ...prev, origin: result.nextMenus }));

    setOpenMenuList((prev) => {
      const hasTarget = prev.indexOf(targetId) > -1;

      if (result.isOpen) {
        if (hasTarget) {
          return prev;
        }
        return [...prev, targetId];
      }

      if (!hasTarget) {
        return prev;
      }

      return prev.filter((id) => id !== targetId);
    });
  };

  const handleMenuSelect = (url, id) => {
    setSelectedMenu(id);
    setMenuUrl(url);
    setMenuSelectionKey((prev) => prev + 1);

    navigate(tabModeEnabled ? '/main' : convertProgramMappingToPath(url));
  };

  const navigateToProgram = useCallback((programMapping) => {
    const targetProgramMapping = typeof programMapping === 'string'
      ? programMapping.toLowerCase()
      : '';
    const menuEntry = Object.entries(menulist.all ?? {}).find(([, item]) => (
      typeof item === 'string' && item.toLowerCase() === targetProgramMapping
    ));

    const menuId = menuEntry?.[0] ?? '';
    if (menuId === '') {
      winiMsg.showSnackbar('해당하는 아이디가 메뉴에 존재하지 않습니다.');
    } else {
      const url = menuEntry[1];
      setSelectedMenu(menuId);
      setMenuUrl(url);
      setMenuSelectionKey((prev) => prev + 1);

      navigate(tabModeEnabled ? '/main' : convertProgramMappingToPath(url));
    }
  }, [menulist.all, navigate, tabModeEnabled]);

  useEffect(() => {
    menuStore.getState().setNavigateHandler(navigateToProgram);

    return () => {
      menuStore.getState().clearNavigateHandler(navigateToProgram);
    };
  }, [navigateToProgram]);

  const openMenu = (clickid) => {
    let nextOpenList = openMenuList;
    if (clickid && openMenuList.indexOf(clickid) === -1) {
      nextOpenList = [...openMenuList, clickid];
    }
    setOpenMenuList(nextOpenList);

    const omenu = applyOpenListToTree(menulist.origin, nextOpenList);
    setMenuList((prev) => ({ ...prev, origin: omenu }));
  };

  const closeAllMenu = () => {
    const cmenu = closeTree(menulist.origin);
    setMenuList((prev) => ({ ...prev, origin: cmenu }));
  };

  useEffect(() => {
    setMenuInfo(menulist.info);
  }, [menulist.info, setMenuInfo]);
  return {
    menulist,
    selectedMenu,
    menuUrl,
    menuSelectionKey,
    openMenuList,
    breadcrumb,
    title,
    isMenuLoaded: isInitialized,
    isPathResolved,
    handleMenuClick,
    handleMenuSelect,
    navigateToProgram,
    openMenu,
    closeAllMenu,
    reloadMenu: loadMenuTree,
  };
};
