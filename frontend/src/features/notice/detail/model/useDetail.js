import { useState, useCallback, useEffect, useRef } from 'react';
import { winiMsg } from '@/shared/model';
import { getNoticeDetail, deleteNotice } from '../api/api';
import { winiCom } from '@/shared/lib';

export const useNoticeDetail = (params) => {
    const { onBackToList, onOpenWriteWithData } = params;
    const { connector } = winiCom.getFormInfo('Y');

    const [notice, setNotice] = useState(null);
    const detailRequestIdRef = useRef(0);

    useEffect(() => () => { detailRequestIdRef.current += 1; }, []);

    const setDetail = useCallback((detail) => setNotice(detail), []);

    const fetchDetail = useCallback(async (noticeId) => {
        if (!connector || !noticeId) return null;
        const requestId = ++detailRequestIdRef.current;
        try {
            const data = await getNoticeDetail(connector, noticeId);
            if (requestId !== detailRequestIdRef.current) return null;
            if (data?.result === 'SUCCESS') {
                setNotice(data.data);
            }
            return data;
        } catch (e) {
            winiMsg.showSnackbar('공지사항 상세 조회 중 오류 발생');
            return null;
        }
    }, [connector]);

    const back = useCallback(() => {
        detailRequestIdRef.current += 1;
        onBackToList?.();
    }, [onBackToList]);

    const edit = useCallback(async () => {
        if (!notice) return;

        const res = await fetchDetail(notice.noticeId);
        if (res?.result !== 'SUCCESS') return;

        const editedNotice = res?.data || notice;
        onOpenWriteWithData?.(editedNotice);
    }, [notice, onOpenWriteWithData, fetchDetail]);

    const remove = useCallback(async () => {
        if (!notice?.noticeId) return;

        const result = await winiMsg.showConfirm('삭제하시겠습니까?');
        if (result !== 'Y') return;

        try {
            const data = await deleteNotice(connector, notice.noticeId);
            if (data?.result === 'SUCCESS') {
                winiMsg.showSnackbar('공지사항이 성공적으로 삭제되었습니다.');
                detailRequestIdRef.current += 1;
                onBackToList?.();
            }
        } catch (e) {
            winiMsg.showSnackbar('공지사항 삭제 중 오류 발생');
        }
    }, [connector, notice, onBackToList]);

    return {
        notice,
        setDetail,
        fetchDetail,
        back,
        edit,
        remove,
    };
};
