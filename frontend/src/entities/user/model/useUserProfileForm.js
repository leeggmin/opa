import { useCallback, useState } from 'react';
import { winiCom } from '@/shared/lib';
import { userStore, winiMsg } from '@/shared/model';
import { changeUserPassword } from '../api/userApi';

const DEFAULT_PASSWORD_DIALOG = {
    open: false,
    oldPassword: '',
    newPassword: '',
};

export function useUserProfileForm({ values = {}, showAdminOptions = false } = {}) {
    const connector = winiCom.getConnector();
    const [passwordDialog, setPasswordDialog] = useState(DEFAULT_PASSWORD_DIALOG);
    const currentUserId = userStore.getUserId();
    const isSelectedCurrentUser = Boolean(
        currentUserId && values.id && values.id.toString() === currentUserId,
    );
    const shouldShowPasswordChangeButton = !showAdminOptions || isSelectedCurrentUser;
    const passwordChangeUserId = values.id || currentUserId;

    const handleOpenPasswordDialog = useCallback(() => {
        setPasswordDialog({
            ...DEFAULT_PASSWORD_DIALOG,
            open: true,
        });
    }, []);

    const handleClosePasswordDialog = useCallback(() => {
        setPasswordDialog(DEFAULT_PASSWORD_DIALOG);
    }, []);

    const handlePasswordDialogChange = useCallback((event) => {
        const { name, value } = event.target;

        setPasswordDialog((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleChangePassword = useCallback(async () => {
        if (!passwordChangeUserId) {
            await winiMsg.showAlert('비밀번호를 변경할 사용자 정보가 없습니다.');
            return;
        }

        if (!passwordDialog.oldPassword) {
            await winiMsg.showAlert('기존 비밀번호를 입력해주세요.');
            return;
        }

        if (!passwordDialog.newPassword) {
            await winiMsg.showAlert('새 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const result = await changeUserPassword(connector, passwordChangeUserId, {
                oldPassword: passwordDialog.oldPassword,
                newPassword: passwordDialog.newPassword,
            });

            if (result.result === 'SUCCESS') {
                winiMsg.showSnackbar('비밀번호가 변경되었습니다.');
                handleClosePasswordDialog();
                return;
            }

            winiMsg.showSnackbar(result.message);
        } catch (error) {
            winiMsg.showSnackbar(
                winiCom.getErrorMessage(error.response?.data?.message),
            );
        }
    }, [connector, handleClosePasswordDialog, passwordChangeUserId, passwordDialog.newPassword, passwordDialog.oldPassword]);

    return {
        passwordDialog,
        shouldShowPasswordChangeButton,
        handleOpenPasswordDialog,
        handleClosePasswordDialog,
        handlePasswordDialogChange,
        handleChangePassword,
    };
}