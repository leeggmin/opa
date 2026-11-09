import { useEffect, useRef, useState } from 'react';
import { fetchDepartments } from '@/entities/department';
import { winiCom, winiFormat } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchUser } from '../api/api';
import { useEditorActions } from './useEditorActions';

/**
 * 사용자 편집 로직 (생성/수정/삭제)
 */
export const useEditor = (onSuccess) => {
  const { connector } = winiCom.getFormInfo();
  const connectorRef = useRef(connector);

  const [selectedUser, setSelectedUser] = useState({});
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments(connectorRef.current);
        if (data.result === 'SUCCESS') {
          setDepartmentOptions(data.data || []);
        }
      } catch (error) {
        winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
      }
    };

    loadDepartments();
  }, []);

  /**
   * 그리드 행 클릭 핸들러
   */
  const handleRowClick = async (params) => {
    const userId = params.data.id;
    if (userId) {
      try {
        const data = await fetchUser(connector, userId);
        if (data.result === 'SUCCESS') {
          let userData = data.data;

          // 전화번호 포맷팅
          if (userData.phoneNumber) {
            const cleaned = userData.phoneNumber.replace(/\D/g, '');
            userData.phoneNumber = winiFormat.formatPhoneNumber(cleaned);
          }

          setSelectedUser(userData);
        }
      } catch (error) {
        winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
      }
    }
  };

  /**
   * 폼 데이터 변경 핸들러
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호 처리
    if (name === 'phoneNumber') {
      const cleaned = value.replace(/\D/g, '');

      if (
        (cleaned.startsWith('02') && cleaned.length <= 10) ||
        (!cleaned.startsWith('02') && cleaned.length <= 11)
      ) {
        setSelectedUser({ ...selectedUser, [name]: winiFormat.formatPhoneNumber(cleaned) });
      }
    } else if (name === 'departmentId') {
      const selectedDepartment = departmentOptions.find((department) => department.id === value);
      setSelectedUser({
        ...selectedUser,
        departmentId: value,
        departmentName: selectedDepartment?.departmentName || selectedDepartment?.name || '',
      });
    } else {
      setSelectedUser({ ...selectedUser, [name]: value });
    }
  };

  /**
   * 초기화 버튼 핸들러
   */
  const handleReset = () => {
    setSelectedUser({});
  };

  const {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAcceptJoin,
    handleResetPassword,
    handleUnlockLogin,
    handleGridJoinApproval,
  } = useEditorActions(
    connector,
    selectedUser,
    setSelectedUser,
    onSuccess,
    handleReset,
  );

  return {
    selectedUser,
    setSelectedUser,
    departmentOptions,
    handleRowClick,
    handleChange,
    handleReset,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAcceptJoin,
    handleResetPassword,
    handleUnlockLogin,
    handleGridJoinApproval,
  };
};
