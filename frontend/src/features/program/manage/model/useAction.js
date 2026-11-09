import { useState, useCallback } from 'react';
import { getActions, createAction, updateAction, deleteAction } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';

/**
 * 프로그램 액션 관리 Hook
 */
export const useAction = (programId, onSuccess) => {
  const connector = winiCom.getConnector();
  const [actions, setActions] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState({
    programActionId: '',
    programId: '',
    actionType: 'RESTAPI',
    authType: '',
    uri: '',
  });
  const [actionTypeFilter, setActionTypeFilter] = useState('');

  const loadActions = useCallback(
    async (targetProgramId = programId) => {
      if (!targetProgramId) return;

      try {
        const response = await getActions(connector, targetProgramId);
        if (response.data !== null) {
          const list = response.data.map((item, idx) => ({
            ...item,
            num: idx + 1,
          }));
          setActions(list);
          setAllActions(list);
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [programId, connector],
  );

  const filterByActionType = useCallback(
    (type) => {
      setActionTypeFilter(type);
      if (type === '') {
        setActions(allActions);
      } else {
        const filtered = allActions.filter((item) => item.actionType === type);
        setActions(filtered);
      }
    },
    [allActions],
  );

  const handleChange = useCallback((e) => {
    setSelectedAction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const selectAction = useCallback((action) => {
    setSelectedAction(action);
  }, []);

  const resetAction = useCallback(() => {
    setSelectedAction({
      programActionId: '',
      programId: '',
      actionType: 'RESTAPI',
      authType: '',
      uri: '',
    });
  }, []);

  const handleCreateAction = useCallback(
    async (targetProgramId = programId) => {
      if (!targetProgramId) {
        winiMsg.showAlert('선택된 프로그램이 없습니다.');
        return;
      }

      const uri = selectedAction.uri.replace(/^\/+/, '').replace(/\/+$/, '');
      const params = {
        actionType: selectedAction.actionType,
        authType: selectedAction.authType,
        uri: uri,
      };

      try {
        const response = await createAction(
          connector,
          targetProgramId,
          params,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('액션이 저장되었습니다.');
          await loadActions(targetProgramId);
          resetAction();
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [selectedAction, programId, loadActions, onSuccess, connector],
  );

  const handleUpdateAction = useCallback(
    async (targetProgramId = programId) => {
      if (!targetProgramId) {
        winiMsg.showAlert('선택된 프로그램이 없습니다.');
        return;
      }

      const uri = selectedAction.uri.replace(/^\/+/, '').replace(/\/+$/, '');
      const params = {
        actionType: selectedAction.actionType,
        authType: selectedAction.authType,
        uri: uri,
      };

      try {
        const response = await updateAction(
          connector,
          targetProgramId,
          selectedAction.programActionId,
          params,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('액션이 저장되었습니다.');
          await loadActions(targetProgramId);
          resetAction();
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [selectedAction, programId, loadActions, onSuccess, connector],
  );

  const handleDeleteAction = useCallback(
    async (targetProgramId = programId) => {
      if (selectedAction.programActionId === '') {
        winiMsg.showAlert('선택된 액션이 없습니다');
        return;
      }

      try {
        const response = await deleteAction(
          connector,
          targetProgramId,
          selectedAction.programActionId,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('액션이 삭제되었습니다.');
          await loadActions(targetProgramId);
          resetAction();
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [selectedAction, programId, loadActions, connector],
  );

  return {
    actions,
    allActions,
    selectedAction,
    actionTypeFilter,
    setSelectedAction,
    loadActions,
    filterByActionType,
    handleChange,
    selectAction,
    createAction: handleCreateAction,
    updateAction: handleUpdateAction,
    deleteAction: handleDeleteAction,
    resetAction,
  };
};
