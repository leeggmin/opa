import { useCallback } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { createPredicate, updatePredicate, deletePredicate } from '../api/api';
import { preparePredicateData } from './prepareData';

/**
 * Predicate CRUD 액션
 */
export const useActions = (serviceName, selectedRouteId, selected, onSearch, onReset, setFindId) => {
  const { connector } = winiCom.getFormInfo();

  const onInsert = useCallback(
    async (ref) => {
      const chk = winiCom.isValidCheck(ref.current);
      if (!chk) return;

      if (!selected || !selected.predicateType) {
        winiMsg.showSnackbar('조건절 유형을 선택하세요.');
        return;
      }

      const params = preparePredicateData(selected);
      params.routeId = selectedRouteId;
      params.status = selected.status === 'ENABLE' ? 'ENABLE' : 'DISABLE';

      try {
        const data = await createPredicate(
          connector,
          serviceName,
          selectedRouteId,
          params,
        );
        setFindId(data.id);
        winiMsg.showSnackbar('저장되었습니다.');
        await onSearch();
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
      }
    },
    [connector, serviceName, selectedRouteId, selected, onSearch, setFindId],
  );

  const onUpdate = useCallback(
    async (ref) => {
      const chk = winiCom.isValidCheck(ref.current);
      if (!chk) return;

      if (!selected || !selected.predicateType) {
        winiMsg.showSnackbar('조건절 유형을 선택하세요.');
        return;
      }

      const params = preparePredicateData(selected);
      params.status = selected.status === 'ENABLE' ? 'ENABLE' : 'DISABLE';

      try {
        const data = await updatePredicate(
          connector,
          serviceName,
          selectedRouteId,
          selected.predicateId,
          params,
        );
        setFindId(data.id);
        winiMsg.showSnackbar('저장되었습니다.');
        await onSearch();
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
      }
    },
    [connector, serviceName, selectedRouteId, selected, onSearch, setFindId],
  );

  const onDelete = useCallback(async () => {
    const ans = await winiMsg.showConfirm(
      '해당 데이터를 정말로 삭제하시겠습니까?',
    );
    if (ans === 'N') return;

    try {
      await deletePredicate(
        connector,
        serviceName,
        selectedRouteId,
        selected.predicateId,
      );
      winiMsg.showSnackbar('정상적으로 삭제되었습니다.');
      await onSearch();
      onReset();
    } catch (e) {
      winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
    }
  }, [connector, serviceName, selectedRouteId, selected.predicateId, onSearch, onReset]);

  return {
    onInsert,
    onUpdate,
    onDelete,
  };
};
