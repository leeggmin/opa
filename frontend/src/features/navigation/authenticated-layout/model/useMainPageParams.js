import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { winiCom } from '@/shared/lib';

/**
 * MainPage의 파라메터 관리 훅
 */
export const useMainPageParams = (menuUrl, selectedMenu, menulist, reloadMenu) => {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({});
  const [parentParams, setParentParams] = useState({});

  useEffect(() => {
    if (winiCom.toEmpty(menuUrl) == '') return;

    if (menuUrl.toLocaleLowerCase() === 'menu-management/ui/MenuManagementPage') {
      let menuparams = { reLoad: reloadMenu };
      setParentParams((prevParams) => ({
        ...menuparams,
        ...prevParams,
      }));
    } else {
      setParentParams((prevParams) => prevParams);
    }
    setParams({});

    const menuid = searchParams.get('id');
    if (menuid && menuUrl === menulist.all[menuid]) {
      // 파라메터로 온 경우 처리
    }

  }, [menuUrl, selectedMenu]);

  const handleParams = (obj) => {
    if (!obj) obj = {};
    setParams(obj);
  };

  return {
    params,
    parentParams,
    handleParams,
  };
};
