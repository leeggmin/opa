import { useState, useCallback } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  createAuthorizationGroup,
  updateAuthorizationGroup,
  deleteAuthorizationGroup,
} from '../api/api';

/**
 * 권한 그룹 편집 로직 (등록/수정/삭제)
 */
export const useEditor = (onSuccess) => {
  const { connector } = winiCom.getFormInfo();

  const [authInfo, setAuthInfo] = useState({
    groupCode: '',
    groupName: '',
    parentAuthorizationGroupId: '',
    remark: '',
    adminStatus: 'DISABLE',
    status: 'ENABLE',
  });

  const [selectedAuthTreeData, setSelectedAuthTreeData] = useState({});

  /**
   * 트리 노드 선택 핸들러
   */
  const handleTreeSelect = (selectedNodes) => {
    if (selectedNodes.length > 0) {
      const selectTreeData = selectedNodes[0].data;
      setAuthInfo(selectTreeData);
      setSelectedAuthTreeData(selectTreeData);
    }
  };

  /**
   * 입력 폼 변경 핸들러
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  /**
   * 체크박스 변경 핸들러
   */
  const handleCheckboxChange = (field) => {
    setAuthInfo({
      ...authInfo,
      [field]: authInfo[field] === 'ENABLE' ? 'DISABLE' : 'ENABLE',
    });
  };

  /**
   * 초기화 핸들러
   */
  const handleReset = useCallback(() => {
    setAuthInfo({
      groupCode: '',
      groupName: '',
      parentAuthorizationGroupId: '',
      remark: '',
      adminStatus: 'DISABLE',
      status: 'ENABLE',
    });
    setSelectedAuthTreeData({});
  }, []);

  /**
   * 권한 그룹 등록
   */
  const handleCreate = async () => {
    if (authInfo.id) {
      await winiMsg.showAlert(
        '이미 권한이 선택되어 있습니다. \\n초기화를 진행하고 추가해주세요'
      );
      return;
    }

    const insAuthInfo = { ...authInfo };

    if (!insAuthInfo.groupCode || !insAuthInfo.groupName) {
      await winiMsg.showAlert('필수 입력값을 확인해주세요.');
      return;
    }

    const ans = await winiMsg.showConfirm('등록 하시겠습니까?');
    if (ans !== 'Y') return;

    try {
      const data = await createAuthorizationGroup(connector, insAuthInfo);
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('등록 되었습니다.');
        handleReset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response.data.message));
    }
  };

  /**
   * 권한 그룹 수정
   */
  const handleUpdate = async () => {
    if (!authInfo.id) {
      await winiMsg.showAlert('수정할 권한을 선택해주세요');
      return;
    }

    if (!authInfo.groupCode || !authInfo.groupName) {
      await winiMsg.showAlert('필수 입력값을 확인해주세요.');
      return;
    }

    const updAuthInfo = { ...authInfo };
    delete updAuthInfo.children;

    const ans = await winiMsg.showConfirm('수정 하시겠습니까?');
    if (ans !== 'Y') return;

    try {
      const data = await updateAuthorizationGroup(
        connector,
        updAuthInfo.id,
        updAuthInfo
      );
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('수정 되었습니다.');
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response.data.message));
    }
  };

  /**
   * 권한 그룹 삭제
   */
  const handleDelete = async () => {
    if (!authInfo.id) {
      await winiMsg.showAlert('삭제할 권한을 선택해주세요');
      return;
    }

    const ans = await winiMsg.showConfirm('삭제 하시겠습니까?');
    if (ans !== 'Y') return;

    try {
      const data = await deleteAuthorizationGroup(connector, authInfo.id);
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('삭제 되었습니다.');
        handleReset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response.data.message));
    }
  };

  return {
    authInfo,
    selectedAuthTreeData,
    handleTreeSelect,
    handleChange,
    handleCheckboxChange,
    handleReset,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
