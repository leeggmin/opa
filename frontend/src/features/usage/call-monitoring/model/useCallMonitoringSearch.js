import { useCallback, useMemo, useState } from 'react';
import { winiCom, winiDate } from '@/shared/lib';
import { getCallHistory } from '../api/api';

/**
 * @param {Object} params
 * @param {string} [params.initialOrgName] - 초기 기관명
 * @param {(list: any[]) => void} [params.onSuccess] - 조회 성공 시 리스트 전달
 * @param {(error: any) => void} [params.onError] - 에러 콜백(선택)
 */
export const useCallMonitoringSearch = (params = {}) => {
    const { initialOrgName = '', onSuccess, onError } = params;

    const { connector } = winiCom.getFormInfo();

    const [orgName, setOrgName] = useState(initialOrgName);
    const [queryTime, setQueryTime] = useState('');

    const onSearchChange = useCallback((e) => {
        setOrgName(e?.target?.value ?? '');
    }, []);

    const onSearchAction = useCallback(async () => {
        try {
        const now = winiDate.now();

        // 화면 표시용 조회 시간
        setQueryTime(winiDate.dateFormat(now, 'YYYY.MM.DD A hh:mm:ss'));

        // API 파라미터용 기준일
        const baseDateTime = winiDate.dateFormat(now, 'YYYY-MM-DD');

        if (!connector) {
            throw new Error('[useCallMonitoringSearch] connector가 없습니다.');
        }

        const data = await getCallHistory(connector, baseDateTime, orgName);

        if (data?.result === 'SUCCESS') {
            onSuccess?.(data.data ?? []);
        } else {
            onSuccess?.([]);
        }
        } catch (err) {
        onError?.(err);
        onSuccess?.([]);
        }
    }, [connector, orgName, onSuccess, onError]);

    const viewModel = useMemo(
        () => ({
        orgName,
        queryTime,
        onSearchChange,
        onSearch: onSearchAction,
        }),
        [orgName, queryTime, onSearchChange, onSearchAction],
    );

    return viewModel;
};
