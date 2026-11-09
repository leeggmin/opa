import { useCallback } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { createRoute, updateRoute, deleteRoute } from '../api/api';

/**
 * Route CRUD 액션
 */
export const useActions = (serviceName, selected, onSearch, onReset, setFindId) => {
  const { connector } = winiCom.getFormInfo();

  const onInsert = useCallback(
    async (ref) => {
      const chk = winiCom.isValidCheck(ref.current);
      if (!chk) return;

      const params = {
        ...selected,
        status: selected.status === 'ENABLE' ? 'ENABLE' : 'DISABLE',
      };

      try {
        const data = await createRoute(connector, serviceName, params);
        setFindId(data.routeId);
        winiMsg.showSnackbar('저장되었습니다.');
        await onSearch();
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
      }
    },
    [connector, serviceName, selected, onSearch, setFindId],
  );

  const onUpdate = useCallback(
    async (ref) => {
      const chk = winiCom.isValidCheck(ref.current);
      if (!chk) return;

      const params = {
        ...selected,
        status: selected.status === 'ENABLE' ? 'ENABLE' : 'DISABLE',
      };

      try {
        const data = await updateRoute(
          connector,
          serviceName,
          selected.routeId,
          params,
        );
        setFindId(data.routeId);
        winiMsg.showSnackbar('저장되었습니다.');
        await onSearch();
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
      }
    },
    [connector, serviceName, selected, onSearch, setFindId],
  );

  const onDelete = useCallback(async () => {
    const ans = await winiMsg.showConfirm(
      '삭제시 하위 모든 데이터가 삭제됩니다. \n해당 데이터를 정말로 삭제하시겠습니까? ',
    );
    if (ans === 'N') return;

    try {
      await deleteRoute(connector, serviceName, selected.routeId);
      winiMsg.showSnackbar('정상적으로 삭제되었습니다.');
      await onSearch();
      onReset();
    } catch (e) {
      winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
    }
  }, [connector, serviceName, selected.routeId, onSearch, onReset]);

  return {
    onInsert,
    onUpdate,
    onDelete,
  };
};
