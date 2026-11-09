import { useState, useCallback } from 'react';
import { getNationalList } from '../api/api';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';

export const useNationalList = () => {
    const [nationalList, setNationalList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { connector } = winiCom.getFormInfo('Y');

    const fetchNationalList = useCallback(async () => {
        if (!connector) return null;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getNationalList(connector);
            if (data?.result === 'SUCCESS') {
                setNationalList(Array.isArray(data?.data) ? data.data : []);
            }
            return data;
        } catch (err) {
            setError(err);
            winiMsg.showSnackbar('국가 목록 조회 중 오류가 발생했습니다.');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [connector]);

    return {
        nationalList,
        isLoading,
        error,
        fetchNationalList,
    };
};
