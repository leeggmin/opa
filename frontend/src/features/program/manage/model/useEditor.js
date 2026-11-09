import { useState, useCallback } from 'react';
import { getProgram, createProgram, updateProgram, deleteProgram } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';
import { MENU_STATUS, PROGRAM_MAPPING_STATUS } from '@/shared/config/menuTypes';

/**
 * 프로그램 편집 Hook
 */
export const useEditor = (onSuccess) => {
  const connector = winiCom.getConnector();

  const [programData, setProgramData] = useState({
    programId: '',
    programName: '',
    programCode: '',
    programMapping: '',
    status: true,
    menuStatus: true,
    mobileStatus: false,
    programMappingStatus: false,
    remark: '',
    relProgramList: [],
  });

  const loadProgramDetail = useCallback(async (programId) => {
    if (!programId) return;

    try {
      const response = await getProgram(connector, programId);
      if (response.data !== null) {
        const res = response.data;
        setProgramData({
          programId: res.programId,
          programName: res.programName,
          programCode: res.programCode,
          programMapping: res.programMapping,
          status: res.status === MENU_STATUS.ENABLE,
          menuStatus: res.menuStatus === MENU_STATUS.ENABLE,
          mobileStatus: res.mobileStatus === MENU_STATUS.ENABLE,
          programMappingStatus:
            res.programMappingStatus === PROGRAM_MAPPING_STATUS.FIXED,
          remark: res.remark,
          relProgramList: res.relProgramList || [],
        });
      }
    } catch (err) {
      if (err.response) {
        winiMsg.showAlert(err.response.data.message);
      }
    }
  }, [connector]);

  const handleChange = useCallback((e) => {
    const isCheckbox =
      e.target.name === 'programMappingStatus' ||
      e.target.name === 'menuStatus' ||
      e.target.name === 'status';

    setProgramData((prev) => ({
      ...prev,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    }));
  }, []);

  const addRelatedProgram = useCallback((program) => {
    setProgramData((prev) => ({
      ...prev,
      relProgramList: [...prev.relProgramList, program],
    }));
  }, []);

  const removeRelatedProgram = useCallback(async (programId) => {
    const ans = await winiMsg.showConfirm('삭제하시겠습니까?');
    if (ans === 'Y') {
      setProgramData((prev) => ({
        ...prev,
        relProgramList: prev.relProgramList.filter(
          (item) => item.programId !== programId,
        ),
      }));
    }
  }, []);

  const resetProgramData = useCallback(() => {
    setProgramData({
      programId: '',
      programName: '',
      programCode: '',
      programMapping: '',
      status: true,
      menuStatus: true,
      mobileStatus: false,
      programMappingStatus: false,
      remark: '',
      relProgramList: [],
    });
  }, []);

  const handleCreateProgram = useCallback(
    async (reloadCallback) => {
      if (programData.programCode === '') {
        winiMsg.showAlert('화면Code를 입력해주세요');
        return;
      }
      if (programData.programMapping === '') {
        winiMsg.showAlert('화면경로를 입력해주세요');
        return;
      }

      const params = {
        ...programData,
        status: programData.status ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
        menuStatus: programData.menuStatus
          ? MENU_STATUS.ENABLE
          : MENU_STATUS.DISABLE,
        mobileStatus: programData.mobileStatus
          ? MENU_STATUS.ENABLE
          : MENU_STATUS.DISABLE,
        programMappingStatus: PROGRAM_MAPPING_STATUS.DEFAULT,
        relProgramIdList: programData.relProgramList.map(
          (item) => item.programId,
        ),
      };

      try {
        const response = await createProgram(connector, params);
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('화면이 저장 되었습니다.');
          if (reloadCallback) await reloadCallback(response.data.programId);
          if (onSuccess) onSuccess(response.data.programId);
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        } else {
          winiMsg.showSnackbar('네트워크 오류가 발생했습니다.');
        }
      }
    },
    [programData, onSuccess, connector],
  );

  const handleUpdateProgram = useCallback(
    async (reloadCallback) => {
      if (programData.programCode === '') {
        winiMsg.showAlert('화면Code를 입력해주세요');
        return;
      }
      if (programData.programMapping === '') {
        winiMsg.showAlert('화면경로를 입력해주세요');
        return;
      }

      const params = {
        ...programData,
        status: programData.status ? MENU_STATUS.ENABLE : MENU_STATUS.DISABLE,
        menuStatus: programData.menuStatus
          ? MENU_STATUS.ENABLE
          : MENU_STATUS.DISABLE,
        mobileStatus: programData.mobileStatus
          ? MENU_STATUS.ENABLE
          : MENU_STATUS.DISABLE,
        programMappingStatus: PROGRAM_MAPPING_STATUS.DEFAULT,
        relProgramIdList: programData.relProgramList.map(
          (item) => item.programId,
        ),
      };

      try {
        const response = await updateProgram(
          connector,
          programData.programId,
          params,
        );
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('화면이 저장 되었습니다.');
          if (reloadCallback) await reloadCallback(response.data.programId);
          if (onSuccess) onSuccess();
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        } else {
          winiMsg.showSnackbar('네트워크 오류가 발생했습니다.');
        }
      }
    },
    [programData, onSuccess, connector],
  );

  const handleDeleteProgram = useCallback(
    async (reloadCallback) => {
      if (programData.programId === '') {
        winiMsg.showAlert('삭제할 프로그램을 선택해 주세요');
        return;
      }

      const ans = await winiMsg.showConfirm('해당 프로그램을 삭제 하시겠습니까?');
      if (ans === 'N') return;

      try {
        const response = await deleteProgram(connector, programData.programId);
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('화면이 정상적으로 삭제되었습니다.');
          if (reloadCallback) await reloadCallback();
          resetProgramData();
        }
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        } else {
          winiMsg.showSnackbar('네트워크 오류가 발생했습니다.');
        }
      }
    },
    [programData, connector, resetProgramData],
  );

  return {
    programData,
    setProgramData,
    loadProgramDetail,
    handleChange,
    addRelatedProgram,
    removeRelatedProgram,
    createProgram: handleCreateProgram,
    updateProgram: handleUpdateProgram,
    deleteProgram: handleDeleteProgram,
    resetProgramData,
  };
};
