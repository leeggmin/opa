import { useState, useRef } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  createProgramAction,
  updateProgramAction,
  deleteProgramAction,
} from '../api/api';

/**
 * 액션 편집 훅
 */
export const useEditor = (selectedProgramData, onActionChanged, ref) => {
  const { winiAut, connector } = winiCom.getFormInfo();
  const internalFormRef = useRef(null);
  const formRef = ref ?? internalFormRef;
  const [selectedActionData, setSelectedActionData] = useState({
    programActionId: '',
    programId: '',
    actionType: 'RESTAPI',
    authType: '',
    uri: '',
  });

  const handleActionSelect = (e) => {
    const data = e.api.getSelectedRows();
    if (!data || data.length === 0) return;

    setSelectedActionData({
      programActionId: data[0].programActionId,
      programId: data[0].programId,
      actionType: data[0].actionType,
      authType: data[0].authType,
      uri: data[0].uri,
    });
  };

  const handleChange = (e) => {
    setSelectedActionData({
      ...selectedActionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setSelectedActionData({
      programActionId: '',
      programId: '',
      actionType: 'RESTAPI',
      authType: '',
      uri: '',
    });
  };

  const handleSave = async () => {
    if (selectedProgramData.code === '') {
      winiMsg.showAlert('선택된 프로그램이 없습니다.');
      return;
    }

    if (!formRef?.current) {
      winiMsg.showAlert('폼 참조가 없어 저장할 수 없습니다.');
      return;
    }

    const check = winiCom.isValidCheck(formRef.current);
    if (!check) return;

    const uri = selectedActionData.uri.replace(/^\/+/, '').replace(/\/+$/, '');
    const parameter = {
      actionType: selectedActionData.actionType,
      authType: selectedActionData.authType,
      uri: uri,
    };

    try {
      if (winiCom.toEmpty(selectedActionData.programActionId) === '') {
        if (winiAut.insert === 'ALLOW') {
          const result = await createProgramAction(
            connector,
            selectedProgramData.id,
            parameter,
          );
          winiMsg.showSnackbar('액션이 저장되었습니다.');
          onActionChanged(result.programActionId);
          handleReset();
        } else {
          winiMsg.showAlert('권한이 없습니다');
        }
      } else {
        if (winiAut.update === 'ALLOW') {
          const result = await updateProgramAction(
            connector,
            selectedProgramData.id,
            selectedActionData.programActionId,
            parameter,
          );
          winiMsg.showSnackbar('액션이 저장되었습니다.');
          onActionChanged(result.programActionId);
          handleReset();
        } else {
          winiMsg.showAlert('권한이 없습니다');
        }
      }
    } catch (err) {
      if (err.response) {
        winiMsg.showAlert(err.response.data.message);
      } else {
        winiMsg.showSnackbar('액션 저장 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDelete = async () => {
    if (selectedActionData.programActionId === '') {
      winiMsg.showAlert('선택된 액션이 없습니다');
      return;
    }

    try {
      await deleteProgramAction(
        connector,
        selectedProgramData.id,
        selectedActionData.programActionId,
      );
      winiMsg.showSnackbar('액션이 삭제되었습니다.');
      onActionChanged();
      handleReset();
    } catch (err) {
      if (err.response) {
        winiMsg.showAlert(err.response.data.message);
      } else {
        winiMsg.showSnackbar('액션 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return {
    formRef,
    selectedActionData,
    handleActionSelect,
    handleChange,
    handleReset,
    handleSave,
    handleDelete,
  };
};
