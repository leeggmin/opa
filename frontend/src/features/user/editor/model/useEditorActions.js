import { useCallback } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  createUser,
  updateUser,
  deleteUser,
  acceptUserJoin,
  resetUserPassword,
  unlockUserLogin,
} from '../api/api';

/**
 * 사용자 편집 액션
 */
export const useEditorActions = (
  connector,
  selectedUser,
  setSelectedUser,
  onSuccess,
  handleReset,
) => {
  const handleCreate = useCallback(async () => {
    if (selectedUser.id) {
      await winiMsg.showAlert(
        '이미 사용자가 선택되어 있습니다.\n초기화를 진행후 추가해주세요.',
      );
      return;
    }

    if (!selectedUser.username) {
      await winiMsg.showAlert('사용자 ID는 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.lastName) {
      await winiMsg.showAlert('성은 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.firstName) {
      await winiMsg.showAlert('이름은 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.password) {
      await winiMsg.showAlert('비밀번호는 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.passwordConf) {
      await winiMsg.showAlert('비밀번호를 확인해주세요');
      return;
    }
    if (selectedUser.password !== selectedUser.passwordConf) {
      await winiMsg.showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!selectedUser.phoneNumber) {
      await winiMsg.showAlert('전화번호는 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.email) {
      await winiMsg.showAlert('이메일은 필수 입력값입니다.');
      return;
    }

    const confirm = await winiMsg.showConfirm('등록 하시겠습니까?');
    if (confirm !== 'Y') return;

    try {
      const params = {
        username: selectedUser.username,
        lastName: selectedUser.lastName,
        firstName: selectedUser.firstName,
        fullName: selectedUser.lastName + selectedUser.firstName,
        password: selectedUser.password,
        phoneNumber: selectedUser.phoneNumber,
        email: selectedUser.email,
        departmentId: selectedUser.departmentId,
        dutyName: selectedUser.dutyName,
        employeeNo: selectedUser.employeeNo,
        joinStatus: selectedUser.joinStatus,
      };

      const data = await createUser(connector, params);
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('등록 되었습니다.');
        handleReset();
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser, onSuccess, handleReset]);

  const handleUpdate = useCallback(async () => {
    if (!selectedUser.id) {
      await winiMsg.showAlert('사용자를 선택해주세요');
      return;
    }

    if (!selectedUser.lastName) {
      await winiMsg.showAlert('성은 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.firstName) {
      await winiMsg.showAlert('이름은 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.phoneNumber) {
      await winiMsg.showAlert('전화번호는 필수 입력값입니다.');
      return;
    }
    if (!selectedUser.email) {
      await winiMsg.showAlert('이메일은 필수 입력값입니다.');
      return;
    }

    const confirm = await winiMsg.showConfirm('수정 하시겠습니까?');
    if (confirm !== 'Y') return;

    try {
      const params = {
        lastName: selectedUser.lastName,
        firstName: selectedUser.firstName,
        fullName: selectedUser.lastName + selectedUser.firstName,
        phoneNumber: selectedUser.phoneNumber,
        email: selectedUser.email,
        departmentId: selectedUser.departmentId,
        dutyName: selectedUser.dutyName,
        employeeNo: selectedUser.employeeNo,
        joinStatus: selectedUser.joinStatus,
      };

      const data = await updateUser(connector, selectedUser.id, params);
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('수정 되었습니다.');
        handleReset();
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser, onSuccess, handleReset]);

  const handleDelete = useCallback(async () => {
    if (!selectedUser.id) {
      await winiMsg.showAlert('사용자를 선택해주세요');
      return;
    }

    const confirm = await winiMsg.showConfirm('삭제 하시겠습니까?');
    if (confirm !== 'Y') return;

    try {
      const data = await deleteUser(connector, selectedUser.id);
      
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('삭제 되었습니다.');
        handleReset();
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser.id, onSuccess, handleReset]);

  const handleAcceptJoin = useCallback(async () => {
    if (!selectedUser.id) {
      await winiMsg.showAlert('사용자를 선택해주세요.');
      return;
    }

    const confirm = await winiMsg.showConfirm('가입승인 하시겠습니까?');
    if (confirm !== 'Y') return;

    try {
      const data = await acceptUserJoin(connector, selectedUser.id);
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('가입승인되었습니다.');
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser.id, onSuccess]);

  const handleResetPassword = useCallback(async () => {
    if (!selectedUser.id) {
      await winiMsg.showAlert('사용자를 선택해주세요.');
      return;
    }

    const confirm = await winiMsg.showConfirm('비밀번호를 초기화하시겠습니까?');
    if (confirm !== 'Y') return;

    const newPassword =
      Array(4)
        .fill('')
        .map(() => {
          const chars = 'abcdefghjkmnpqrstuvwxyz';
          return chars.charAt(Math.floor(Math.random() * chars.length));
        })
        .join('') +
      Array(4)
        .fill('')
        .map(() => {
          const chars = '023456789';
          return chars.charAt(Math.floor(Math.random() * chars.length));
        })
        .join('');

    try {
      const data = await resetUserPassword(connector, selectedUser.id, {
        newPassword,
      });
      if (data.result === 'SUCCESS') {
        await winiMsg.showAlert(
          `비밀번호가 초기화 되었습니다.\n새 비밀번호 : ${newPassword}`,
        );
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser.id, onSuccess]);

  const handleUnlockLogin = useCallback(async () => {
    if (!selectedUser.username) {
      await winiMsg.showAlert('사용자를 선택해주세요.');
      return;
    }

    try {
      const data = await unlockUserLogin(connector, {
        username: selectedUser.username,
      });
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('사용자의 비밀번호 오류 횟수가 초기화 되었습니다.');
        onSuccess?.();
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }, [connector, selectedUser.username, onSuccess]);

  const handleGridJoinApproval = useCallback(
    async (userId) => {
      const confirm = await winiMsg.showConfirm('가입승인 하시겠습니까?');
      if (confirm !== 'Y') return;

      try {
        const data = await acceptUserJoin(connector, userId);
        if (data.result === 'SUCCESS') {
          winiMsg.showSnackbar('가입승인되었습니다.');
          onSuccess?.();
        }
      } catch (error) {
        winiMsg.showAlert(
          winiCom.getErrorMessage(error.response?.data?.message),
        );
      }
    },
    [connector, onSuccess],
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAcceptJoin,
    handleResetPassword,
    handleUnlockLogin,
    handleGridJoinApproval,
  };
};
