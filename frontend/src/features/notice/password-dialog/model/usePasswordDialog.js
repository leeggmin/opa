import { useState, useCallback } from 'react';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';
import { checkNoticePassword } from '../api/api';

export const useNoticePasswordDialog = () => {
    const { connector } = winiCom.getFormInfo('Y');

    const [open, setOpen] = useState(false);
    const [pw, setPw] = useState('');
    const [noticeId, setNoticeId] = useState(null);
    const [onSuccess, setOnSuccess] = useState(null);

    const openFor = useCallback((id, successCb) => {
        setNoticeId(id);
        setPw('');
        setOnSuccess(() => successCb);
        setOpen(true);
    }, []);

    const close = useCallback(() => setOpen(false), []);

    const confirm = useCallback(async () => {
        try {
            if (!connector || !noticeId) return;

            const data = await checkNoticePassword(connector, noticeId, pw);
            const ok = data?.result === 'SUCCESS' && data?.data === 'OK';

            if (!ok) {
                winiMsg.showSnackbar('비밀번호가 일치하지 않습니다.');
                return;
            }

            setOpen(false);
            if (onSuccess) onSuccess();
        } catch (e) {
            winiMsg.showSnackbar('비밀번호가 일치하지 않습니다.');
        }
    }, [connector, noticeId, pw, onSuccess]);

    return {
        open,
        pw,
        setPw,
        openFor,
        close,
        confirm,
    };
};
