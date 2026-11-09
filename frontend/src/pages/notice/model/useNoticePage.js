import { useState, useRef, useCallback, useEffect } from 'react';
import { winiDate } from '@/shared/lib';

import { useNoticeList } from '@/features/notice/list';
import { NOTICE_PAGE } from './constants';
import { useNoticeDetail } from '@/features/notice/detail';
import { useNoticeWrite } from '@/features/notice/write';
import { useNoticePasswordDialog } from '@/features/notice/password-dialog';

const VIS = { SECRET: 'SECRET' };

export const useNoticePage = () => {
    const [pageType, setPageType] = useState(NOTICE_PAGE.LIST);
    const prevPageTypeRef = useRef(pageType);

    const passwordDialog = useNoticePasswordDialog();

    const detail = useNoticeDetail({
        onBackToList: () => setPageType(NOTICE_PAGE.LIST),
        onOpenWriteWithData: (d) => {
            write.startEdit(d);
            setPageType(NOTICE_PAGE.WRITE);
        },
    });

    const write = useNoticeWrite({
        onBackToList: () => setPageType(NOTICE_PAGE.LIST),
        onBackToDetailWithData: (d) => {
            detail.setDetail(d);
            setPageType(NOTICE_PAGE.DETAIL);
        },
    });

    const openDetailFromRow = useCallback(
        async (row) => {
            const noticeId = row?.noticeId;
            if (!noticeId) return;

            const res = await detail.fetchDetail?.(noticeId);
            if (res?.result !== 'SUCCESS') return;

            const d = res.data;

            if (d?.visibilityStatus === VIS.SECRET) {
                passwordDialog.openFor(noticeId, () => {
                    detail.setDetail(d);
                    setPageType(NOTICE_PAGE.DETAIL);
                });
                return;
            }

            detail.setDetail(d);
            setPageType(NOTICE_PAGE.DETAIL);
        },
        [detail, passwordDialog],
    );

    const list = useNoticeList({
        onOpenWrite: () => {
            write.startCreate();
            setPageType(NOTICE_PAGE.WRITE);
        },
        onOpenDetailRow: openDetailFromRow,
    });

    const startDateValue =
        write.notice.noticeStatus === 'NOTICE' ? winiDate(write.notice.startDate) : null;

    const endDateValue =
        write.notice.noticeStatus === 'NOTICE' ? winiDate(write.notice.endDate) : null;

    const [pwOpen, setPwOpen] = useState(false);
    const [pwDraft, setPwDraft] = useState('');

    const openPwDialog = useCallback(() => {
        setPwDraft(write.notice.pw || '');
        setPwOpen(true);
    }, [write.notice.pw]);

    const closePwDialog = useCallback(() => setPwOpen(false), []);
    const confirmPwDialog = useCallback(() => {
        write.setPassword(pwDraft);
        setPwOpen(false);
    }, [write, pwDraft]);

    useEffect(() => {
        const prev = prevPageTypeRef.current;
        if (pageType === NOTICE_PAGE.LIST && prev !== NOTICE_PAGE.LIST) {
            list.reload?.();
        }
        prevPageTypeRef.current = pageType;
    }, [pageType, list]);

    return {
        pageType,
        setPageType,

        list,
        detail,
        write,

        startDateValue,
        endDateValue,

        // 비밀글 확인용 password dialog(목록→상세 진입)
        passwordDialog,

        // write 화면에서 pw 입력용
        pwDialog: {
            open: pwOpen,
            pw: pwDraft,
            setPw: setPwDraft,
            close: closePwDialog,
            onConfirm: confirmPwDialog,
        },
        openPwDialog,
    };
};
