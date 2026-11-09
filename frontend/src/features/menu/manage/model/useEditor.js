import { useState, useCallback } from 'react';
import { createMenu, updateMenu, deleteMenu } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';
import { MENU_STATUS } from '@/shared/config/menuTypes';

const toPositiveSortSeq = (value) => {
  const sortSeq = Number(value);
  return Number.isInteger(sortSeq) && sortSeq > 0 ? sortSeq : null;
};

const toParentMenuId = (value) => {
  const parentMenuId = winiCom.toEmpty(value);
  return parentMenuId === '' ? null : parentMenuId;
};

/**
 * 메뉴 편집 Hook
 */
export const useEditor = (onSuccess) => {
  const connector = winiCom.getConnector();

  const [menuData, setMenuData] = useState({
    id: '',
    chk: false,
    name: '',
    menuCode: '',
    menuMapping: '',
    status: true,
    menuStatus: false,
    menuType: 'MENU',
    sortSeq: 1,
    parentMenuId: '',
    programId: '',
    programMapping: '',
    children: null,
  });

  const handleChange = useCallback((e) => {
    const isCheckbox = e.target.name === 'status';
    setMenuData((prev) => ({
      ...prev,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    }));
  }, []);

  const setMenuInfo = useCallback((data) => {
    setMenuData({
      id: winiCom.toEmpty(data.id),
      chk: data.chk,
      name: winiCom.toEmpty(data.name),
      menuCode: winiCom.toEmpty(data.menuCode),
      menuMapping: winiCom.toEmpty(data.menuMapping),
      status: data.status === MENU_STATUS.ENABLE || data.status === true,
      menuStatus:
        data.menuStatus === MENU_STATUS.ENABLE || data.menuStatus === true,
      menuType: data.menuType,
      sortSeq: data.sortSeq,
      parentMenuId: winiCom.toEmpty(data.parentMenuId),
      programId: data.programId,
      programMapping: data.programMapping,
      children: data.children,
    });
  }, []);

  const resetMenuData = useCallback(() => {
    setMenuData({
      id: '',
      chk: false,
      name: '',
      menuCode: '',
      menuMapping: '',
      status: true,
      menuStatus: false,
      menuType: 'MENU',
      sortSeq: 1,
      parentMenuId: '',
      programId: '',
      programMapping: '',
      children: null,
    });
  }, []);

  const handleCreateMenu = useCallback(
    async (reloadCallback) => {
      if (menuData.menuCode === '') {
        winiMsg.showAlert('메뉴 Code를 입력하세요.');
        return;
      }
      if (menuData.name === '') {
        winiMsg.showAlert('메뉴 이름을 입력하세요.');
        return;
      }
      if (menuData.menuType !== 'MENU') {
        winiMsg.showAlert('저장할 수 없는 메뉴 입니다. 타입을 확인해주세요.');
        return;
      }

      const sortSeq = toPositiveSortSeq(menuData.sortSeq);
      if (sortSeq === null) {
        winiMsg.showAlert('정렬순서는 양수만 입력하세요.');
        return;
      }

      const params = {
        id: menuData.id,
        menuCode: menuData.menuCode,
        menuMapping: menuData.menuMapping,
        menuName: menuData.name,
        menuStatus: menuData.menuStatus ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
        menuType: menuData.menuType,
        parentMenuId: toParentMenuId(menuData.parentMenuId),
        programId: winiCom.toEmpty(menuData.programId),
        sortSeq,
        status: menuData.status ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
      };

      try {
        const response = await createMenu(connector, params);
        if (response.result !== 'FAILURE') {
          winiMsg.showSnackbar('메뉴가 저장되었습니다.');
          if (reloadCallback) await reloadCallback();
          if (onSuccess) onSuccess();
        } else {
          winiMsg.showAlert(response.message);
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [menuData, onSuccess, connector],
  );

  const handleUpdateMenu = useCallback(
    async (reloadCallback) => {
      if (menuData.name === '') {
        winiMsg.showAlert('메뉴 이름을 입력하세요.');
        return;
      }
      if (menuData.menuType !== 'MENU') {
        let ans = await winiMsg.showConfirm('메뉴에서 프로그램 수정시 우측 프로그램은 수정 되지않습니다. 계속하시겠습니까?');
        if (ans === 'N') return;
      }
      const sortSeq = toPositiveSortSeq(menuData.sortSeq);
      if (sortSeq === null) {
        winiMsg.showAlert('정렬순서는 양수만 입력하세요.');
        return;
      }

      const params = {
        id: menuData.id,
        menuCode: menuData.menuType !== 'MENU' ? null : menuData.menuCode,
        menuMapping: menuData.menuMapping,
        menuName: menuData.name,
        menuStatus: menuData.menuStatus ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
        menuType: menuData.menuType,
        parentMenuId: toParentMenuId(menuData.parentMenuId),
        programId: winiCom.toEmpty(menuData.programId),
        sortSeq,
        status: menuData.status ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
      };
      try {
        await updateMenu(connector, menuData.id, params);
        winiMsg.showSnackbar('메뉴가 저장되었습니다.');
        if (reloadCallback) await reloadCallback();
        if (onSuccess) onSuccess();
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [menuData, onSuccess, connector],
  );

  const handleDeleteMenu = useCallback(
    async (reloadCallback) => {
      if (menuData.id === '') {
        winiMsg.showAlert('삭제할 메뉴를 선택해주세요.');
        return;
      }
      if (menuData.menuType !== 'MENU') {
        winiMsg.showAlert('삭제할 수 없는 메뉴 입니다. 타입을 확인해주세요.');
        return;
      }

      const ans = await winiMsg.showConfirm('삭제하시겠습니까?');
      if (ans === 'N') return;

      try {
        await deleteMenu(connector, menuData.id);
        winiMsg.showSnackbar('메뉴가 정상적으로 삭제 되었습니다.');
        if (reloadCallback) await reloadCallback();
        resetMenuData();
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [menuData, connector, resetMenuData],
  );

  return {
    menuData,
    setMenuData,
    setMenuInfo,
    handleChange,
    createMenu: handleCreateMenu,
    updateMenu: handleUpdateMenu,
    deleteMenu: handleDeleteMenu,
    resetMenuData,
  };
};
