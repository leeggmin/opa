import { useCallback } from 'react';
import { updateMenuOrder } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';
import { convertTreeToOrderList } from '@/shared/lib/menuUtils';

/**
 * 메뉴 순서 관리 Hook
 */
export const useOrder = (onSuccess) => {
  const connector = winiCom.getConnector();

  const saveMenuOrder = useCallback(
    async (menuTree) => {
      const ans = await winiMsg.showConfirm('메뉴 목록를 변경하시겠습니까?');
      if (ans === 'N') return;

      try {
        const params = convertTreeToOrderList(menuTree);
        await updateMenuOrder(connector, params);
        winiMsg.showSnackbar('메뉴목록 순서가 정상적으로 저장되었습니다.');
        if (onSuccess) onSuccess();
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [onSuccess, connector],
  );

  return {
    saveMenuOrder,
  };
};
