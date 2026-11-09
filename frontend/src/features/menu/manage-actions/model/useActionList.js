import { useState, useRef, useCallback, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchProgramActions } from '../api/api';

/**
 * 액션 목록 관리 훅
 */
export const useActionList = (selectedProgramId) => {
  const { connector } = winiCom.getFormInfo();
  const refActionGrid = useRef();
  const [actionAllList, setActionAllList] = useState([]);
  const [actionList, setActionList] = useState([]);
  const [actionTypeFilter, setActionTypeFilter] = useState('');
  const [reloadId, setReloadId] = useState('');

  const loadActionList = useCallback(async () => {
    if (!selectedProgramId) return;

    try {
      const response = await fetchProgramActions(connector, selectedProgramId);
      if (response !== null) {
        const list = response.map((item, idx) => ({
          ...item,
          num: idx + 1,
        }));
        setActionList(list);
        setActionAllList(list);
      }
    } catch (err) {
      if (err.response) {
        winiMsg.showAlert(err.response.data.message);
      } else {
        winiMsg.showSnackbar('액션 목록 조회 중 오류가 발생했습니다.');
      }
    }
  }, [connector, selectedProgramId]);

  const handleFilterChange = (e) => {
    setActionTypeFilter(e.target.value);

    if (e.target.value === '') {
      setActionList(actionAllList);
    } else {
      const list = actionAllList.filter(
        (item) => item.actionType === e.target.value,
      );
      setActionList(list);
    }
  };

  const selectedRowGrid = useCallback((grid, id) => {
    grid.current.api.forEachNode((item) => {
      if (id === item.data.programActionId) {
        item.setSelected(true);
      }
    });
    setReloadId('');
  }, []);

  useEffect(() => {
    if (reloadId !== '') {
      selectedRowGrid(refActionGrid, reloadId);
    }
  }, [actionList, reloadId, selectedRowGrid]);

  useEffect(() => {
    if (selectedProgramId) {
      setActionTypeFilter('');
      loadActionList();
    }
  }, [selectedProgramId, loadActionList]);

  return {
    refActionGrid,
    actionAllList,
    actionList,
    actionTypeFilter,
    setReloadId,
    setActionAllList,
    setActionList,
    handleFilterChange,
    loadActionList,
  };
};
