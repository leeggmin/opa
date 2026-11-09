import { useState, useCallback, useEffect, useRef } from 'react';
import { winiMsg } from '@/shared/model';
import { getNoticeList } from '../api/api';
import { winiCom } from '@/shared/lib';

export const useNoticeList = (params) => {
    const { pageSize = 10, onOpenWrite, onOpenDetailRow } = params;
    const { connector } = winiCom.getFormInfo('Y');
    const connectorRef = useRef();

    if (!connectorRef.current && connector) {
        connectorRef.current = connector;
    }

    const activeConnector = connectorRef.current ?? connector;

    const [searchDraft, setSearchDraft] = useState({
        title: '',
        content: '',
        author: '',
    });

    const [searchApplied, setSearchApplied] = useState({
        title: '',
        content: '',
        author: '',
    });

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearchChange = useCallback((e) => {
        const { name, value } = e.target;
        setSearchDraft((prev) => ({ ...prev, [name]: value }));
    }, []);

    const buildParams = useCallback(() => {
        const params = {
            pageSize,
            page: page ? page - 1 : 0,
        };
        for (const [k, v] of Object.entries(searchApplied)) {
            if (v) params[k] = v;
        }
        return params;
    }, [pageSize, page, searchApplied]);

    const load = useCallback(async () => {
        if (!activeConnector) return;

        setIsLoading(true);
        setError(null);
        try {
            const data = await getNoticeList(activeConnector, buildParams());
            if (data?.result !== 'SUCCESS') return;

            const list = Array.isArray(data?.data) ? data.data : [];
            const totalRecordsRaw = data?.metadata?.totalRecords ?? 0;

            let totalRecords = totalRecordsRaw - pageSize * ((page < 1 ? 1 : page) - 1);

            const withNo = list.map((item) => ({
                ...item,
                no: totalRecords--,
            }));

            setRows(withNo);

            const total = totalRecordsRaw < 1 ? 1 : totalRecordsRaw;
            const tp = total % pageSize === 0 ? total / pageSize : Math.ceil(total / pageSize);
            setTotalPage(tp || 1);
        } catch (e) {
            setError(e);
            winiMsg.showSnackbar('공지사항 목록 조회 중 오류 발생');
        } finally {
            setIsLoading(false);
        }
    }, [activeConnector, buildParams, page, pageSize]);

    useEffect(() => {
        load();
    }, [load]);

    const applySearch = useCallback(() => {
        setSearchApplied({
            title: (searchDraft.title || '').trim(),
            content: (searchDraft.content || '').trim(),
            author: (searchDraft.author || '').trim(),
        });
        setPage(1);
    }, [searchDraft]);

    const onSelect = useCallback(() => {
        applySearch(); // effect가 load 실행
    }, [applySearch]);

    const reload = useCallback(
        (includeDraft = false) => {
            if (includeDraft) {
                applySearch();
                return;
            }
            load();
        },
        [load, applySearch],
    );

    const onEnter = useCallback((e) => {
        if (e.key === 'Enter') onSelect();
    }, [onSelect]);

    const onChangePage = useCallback((_, p) => setPage(p), []);

    const openWrite = useCallback(() => onOpenWrite?.(), [onOpenWrite]);

    const openDetail = useCallback(
        (row) => onOpenDetailRow?.(row),
        [onOpenDetailRow],
    );

    return {
        rows,
        page,
        totalPage,
        isLoading,
        error,

        searchData: searchDraft,
        onSearchChange,
        onEnter,
        onSelect,

        onChangePage,

        openWrite,
        openDetail,

        reload,
    };
};
