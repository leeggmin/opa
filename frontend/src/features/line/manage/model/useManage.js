import { useCallback, useState } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';

import { getLineList, createLine, updateLine, removeLine } from '../api/api';
import { EMPTY_LINE } from './constants';

export const useManageLine = () => {
    const { connector } = winiCom.getFormInfo();

    // list
    const [lineList, setLineList] = useState([]);

    // selection
    const [selectedLine, setSelectedLine] = useState({ ...EMPTY_LINE });

    const resetSelection = useCallback(() => {
        setSelectedLine({ ...EMPTY_LINE });
    }, []);

    // -------- loaders --------
    const loadLines = useCallback(
        async (deviceId) => {
            if (!deviceId) {
                setLineList([]);
                return;
            }

            try {
                const res = await getLineList(connector, { deviceId });

                if (res?.data?.result === 'SUCCESS') {
                    setLineList(res?.data?.data ?? []);
                } else {
                    setLineList([]);
                }
            } catch (error) {
                const msg = error?.response?.data?.message;
                winiMsg.showAlert(winiCom.getErrorMessage(msg));
            }
        },
        [connector],
    );

    // -------- CRUD --------
    const saveLine = useCallback(
        async () => {
            const params = {
                deviceId: selectedLine.deviceId,
                lineInfo: selectedLine.lineInfo,
                lineName: selectedLine.lineName,
                organizationId: selectedLine.organizationId,
                userId: selectedLine.userId,
            };

            try {
                if (!selectedLine.lineId) {
                    await createLine(connector, params);
                } else {
                    await updateLine(connector, selectedLine.lineId, params);
                }
                await loadLines(params.deviceId);
            } catch (error) {
                const msg = error?.response?.data?.message;
                winiMsg.showAlert(winiCom.getErrorMessage(msg));
                throw error;
            }
        },
        [
            connector,
            loadLines,
            selectedLine.deviceId,
            selectedLine.lineId,
            selectedLine.lineInfo,
            selectedLine.lineName,
            selectedLine.organizationId,
            selectedLine.userId,
        ],
    );

    const deleteLine = useCallback(
        async () => {
            try {
                await removeLine(connector, selectedLine.lineId);
                await loadLines(selectedLine.deviceId);
            } catch (error) {
                const msg = error?.response?.data?.message;
                winiMsg.showAlert(winiCom.getErrorMessage(msg));
                throw error;
            }
        },
        [connector, loadLines, selectedLine.deviceId, selectedLine.lineId],
    );

    return {
        // list
        lineList,

        // selection
        selectedLine,
        setSelectedLine,
        resetSelection,

        // loaders
        loadLines,

        // actions
        saveLine,
        deleteLine,
    };
}
