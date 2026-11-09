import { useState, useEffect, useMemo, useRef } from 'react';
import { Communicator } from '@/shared/api';
import { menuAdapter } from '@/shared/adapters';
import { fetchMenuPermission } from '../api/api';
import menuPermissionData from '@/shared/adapters/data/menuPermission.json';

/**
 * 메뉴별 권한 관리 Hook
 */
export const useMenuPermission = (userId, menuId) => {
  const connector = useMemo(() => new Communicator(), []);
  const [menuAuthInfo, setMenuAuthInfo] = useState();
  const [loading, setLoading] = useState(false);
  const requestSequenceRef = useRef(0);

  const loadMenuPermission = async () => {
    if (!userId || !menuId) {
      requestSequenceRef.current += 1;
      setMenuAuthInfo(undefined);
      setLoading(false);
      return;
    }

    const requestSequence = requestSequenceRef.current + 1;
    requestSequenceRef.current = requestSequence;

    try {
      setMenuAuthInfo(undefined);
      setLoading(true);
      connector.client.defaults.headers.common['X-Menu-Id'] = menuId;
      const data = menuAdapter.toMenuPermissionResult(
        await fetchMenuPermission(connector, userId, menuId),
        // menuPermissionData,
        menuId,
      );
      if (requestSequenceRef.current !== requestSequence) {
        return;
      }
      setMenuAuthInfo({ ...data, _menuId: menuId });
    } catch {
      if (requestSequenceRef.current !== requestSequence) {
        return;
      }
      setMenuAuthInfo(undefined);
    } finally {
      if (requestSequenceRef.current === requestSequence) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadMenuPermission();
  }, [userId, menuId]);

  const currentMenuAuthInfo = menuAuthInfo?._menuId === menuId ? menuAuthInfo : undefined;

  const winiAut = currentMenuAuthInfo
    ? {
        select: currentMenuAuthInfo.selectStatus || 'NONE',
        insert: currentMenuAuthInfo.insertStatus || 'NONE',
        update: currentMenuAuthInfo.updateStatus || 'NONE',
        delete: currentMenuAuthInfo.deleteStatus || 'NONE',
        print: currentMenuAuthInfo.printStatus || 'NONE',
        down: currentMenuAuthInfo.downStatus || 'NONE',
        manage: currentMenuAuthInfo.manageStatus || 'NONE',
      }
    : {
        select: 'NONE',
        insert: 'NONE',
        update: 'NONE',
        delete: 'NONE',
        print: 'NONE',
        down: 'NONE',
        manage: 'NONE',
      };

  return {
    menuAuthInfo: currentMenuAuthInfo,
    winiAut,
    loading,
    reload: loadMenuPermission,
  };
};
