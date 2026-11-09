import { useCallback } from 'react';
import {
    createNational,
    updateNational,
    deleteNational,
} from '../api/api';
import { winiCom } from '@/shared/lib';

export const useNationalActions = () => {
    const { connector } = winiCom.getFormInfo('Y');

    const create = useCallback(
        async (body) => {
            if (!connector) return null;
            return createNational(connector, body);
        },
        [connector],
    );

    const update = useCallback(
        async (nationalCode, body) => {
            if (!connector) return null;
            return updateNational(connector, nationalCode, body);
        },
        [connector],
    );

    const remove = useCallback(
        async (nationalCode) => {
            if (!connector) return null;
            return deleteNational(connector, nationalCode);
        },
        [connector],
    );

    return {
        create,
        update,
        remove,
    };
};
