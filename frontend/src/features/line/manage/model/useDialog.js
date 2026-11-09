import { useCallback } from 'react';
import { winiHelp, winiMsg } from '@/shared/model';

/**
 * Line Dialog 전용 비즈니스 로직
 * - 저장 검증
 * - 삭제 confirm
 * - 담당자 선택(Help Dialog)
 */
export function useLineDialog({ selectedLine, setSelectedLine, saveLine, deleteLine, userHelpEl }) {
    const onSave = useCallback(() => {
        const lineName = selectedLine?.lineName ?? '';
        const lineInfo = selectedLine?.lineInfo ?? '';
        const userId = selectedLine?.userId;

        if (!lineName || lineName.trim() === '') {
            winiMsg.showSnackbar('회선명은 필수입니다.');
            return;
        }
        if (!lineInfo || lineInfo.trim() === '') {
            winiMsg.showSnackbar('회선정보는 필수입니다.');
            return;
        }
        if (!userId) {
            winiMsg.showSnackbar('담당자는 필수입니다.');
            return;
        }

        saveLine?.();
    }, [saveLine, selectedLine?.lineInfo, selectedLine?.lineName, selectedLine?.userId]);

    const onDelete = useCallback(async () => {
        const ans = await winiMsg.showConfirm('삭제하시겠습니까?');
        if (String(ans || '').toUpperCase() !== 'Y') return;
        deleteLine?.();
    }, [deleteLine]);

    const onPickUser = useCallback(async () => {
        // 훅에서 JSX 생성 X, 주입된 엘리먼트만 사용
        const b = await winiHelp.show(
            { title: '사용자', el: userHelpEl },
            'basic'
        );

        if (b && b !== 'N' && b !== 'error' && b.username) {
            setSelectedLine?.((prev) => ({
                ...prev,
                userId: b.username,
                fullName: b.fullName,
            }));
        }
    }, [setSelectedLine, userHelpEl]);

    return {
        onSave,
        onDelete,
        onPickUser,
    };
}
