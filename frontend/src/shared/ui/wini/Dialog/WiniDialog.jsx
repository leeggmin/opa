import { useMemo, useEffect, useRef, useId, useSyncExternalStore, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import { useForkRef } from '@mui/material/utils';
import Draggable from 'react-draggable';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, hasUiToken, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import WiniDialogActions from '../DialogActions/WiniDialogActions';

const baseSx = {
    
    // ui : 기본
    '& .MuiDialog-paper': {
        backgroundColor: color.background.white,
        borderTop : `2px solid ${color.background.main}`,
    },
    '& .MuiDialogTitle-root': {
        color: color.text.main,
    },
    '& .MuiDialogTitle-root:before': {
        content: '""',
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: '1px',
        display: 'block',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: color.background.divider,
    },

    '& .MuiDialogContainer': {
        minHeight: '8.4rem',
        padding: size.margin.md,
        paddingTop: `${size.margin.md} !important`,
        backgroundColor: color.background.white,
    },

    // ui : 기본, color : caution
    '&.winidialog--caution .MuiDialog-paper': {
        borderTop : `2px solid ${color.state.caution}`,
    },
    '&.winidialog--caution .MuiDialogTitle-root': {
        color: color.state.caution,
    },

    // ui : 기본, color : error
    '&.winidialog--error .MuiDialog-paper': {
        borderTop : `2px solid ${color.state.error}`,
    },
    '&.winidialog--error .MuiDialogTitle-root': {
        color: color.state.error,
    },
    '& .MuiDialogTitle-root + .MuiDialogContent-root': {
        padding: '16px',
    },

    '&.winidialog--draggable .winidialogtitle': {
        cursor: 'move',
    },
};

// 제목줄을 잡았을 때만 끌리게 하고, 닫기 버튼·입력 요소를 누를 때는 드래그를 시작하지 않는다
const DraggablePaper = forwardRef((props, ref) => {
    const nodeRef = useRef(null);
    const handleRef = useForkRef(nodeRef, ref);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".winidialogtitle"
            cancel=".MuiButton-DialogClose, button, input, textarea, select"
            bounds="parent"
        >
            <Paper {...props} ref={handleRef} />
        </Draggable>
    );
});
DraggablePaper.displayName = 'DraggablePaper';

// 비모달 팝업끼리의 앞뒤 순서 (마지막이 맨 앞)
// MUI는 연 순서로만 위아래를 정하므로, 클릭한 팝업을 앞으로 올리려면 순서를 따로 관리해야 한다
let modelessStack = [];
const modelessListeners = new Set();

const subscribeModeless = (listener) => {
    modelessListeners.add(listener);
    return () => modelessListeners.delete(listener);
};

const setModelessStack = (next) => {
    modelessStack = next;
    modelessListeners.forEach((listener) => listener());
};

const bringModelessToFront = (id) => {
    if (modelessStack[modelessStack.length - 1] === id) return;
    setModelessStack([...modelessStack.filter((item) => item !== id), id]);
};

const removeModeless = (id) => {
    if (!modelessStack.includes(id)) return;
    setModelessStack(modelessStack.filter((item) => item !== id));
};

// 일반(모달) 팝업보다 아래에 두어, 비모달 팝업에서 띄운 확인창·셀렉트 목록이 가려지지 않게 한다
const MODELESS_Z_INDEX_OFFSET = 50;

const UI_SX = {
    btn: {
        root: {
            // ui : 버튼형, color : ""
            '&.winidialog--btn .MuiDialog-paper': {
                padding: size.margin.md,
                backgroundColor: color.background.white,
                borderTop: 'none',
                borderRadius: '16px',
            },

            '&.winidialog--btn .MuiDialogTitle-root:before': {
                display: 'none',
            },
            // 아래 버튼 줄 모양은 WiniDialogActions ui="btn"에서 관리
        },
    }
};

const WiniDialog = forwardRef(
    (
        {
            children,
            color = 'normal',
            ui,
            draggable = false,
            layout: legacyLayout,
            btns,
            className,
            PaperProps: paperProps = {},
            variant,
            sx: dialogSxProp = {},
            onClose,
            disableBackdropClose = false,
            modeless = false,
            ...props
        },
        ref,
    ) => {
        const hasMuiVariant = variant !== undefined && variant !== null;
        const resolvedColor = hasMuiVariant ? undefined : color ?? 'normal';
        const uiTokens = hasMuiVariant ? [] : getUiTokens(ui, legacyLayout ?? '');

        const mergedClassName = useMemo(() => cn(
            'winicomponent winidialog',
            resolvedColor && `winidialog--${resolvedColor}`,
            uiTokens.map((token) => `winidialog--${token}`),
            uiTokens.map((token) => `winidialog--layout-${token}`),
            draggable && 'winidialog--draggable',
            className,
        ), [resolvedColor, uiTokens, draggable, className]);

        useEffect(() => {}, [props.open, onClose]);

        // MUI v5부터 disableBackdropClick이 없어져 onClose의 reason으로 외부 클릭을 걸러낸다
        const handleClose = (event, reason) => {
            if (disableBackdropClose && reason === 'backdropClick') return;
            onClose?.(event, reason);
        };

        const modelessId = useId();
        const modelessOrder = useSyncExternalStore(subscribeModeless, () => modelessStack.indexOf(modelessId));

        useEffect(() => {
            if (!modeless || !props.open) return undefined;
            bringModelessToFront(modelessId);
            return () => removeModeless(modelessId);
        }, [modeless, props.open, modelessId]);

        const { sx: paperSxProp, onPointerDown: paperOnPointerDown, onKeyDown: paperOnKeyDown, ...restPaperProps } = paperProps ?? {};

        const handlePaperPointerDown = (event) => {
            if (modeless) bringModelessToFront(modelessId);
            paperOnPointerDown?.(event);
        };

        // MUI의 ESC 처리는 마지막에 연 팝업에서만 동작하므로, 비모달일 때는 포커스가 있는 팝업에서 직접 닫는다
        const handlePaperKeyDown = (event) => {
            if (modeless && event.key === 'Escape' && !props.disableEscapeKeyDown) {
                event.stopPropagation();
                handleClose(event, 'escapeKeyDown');
            }
            paperOnKeyDown?.(event);
        };
        const basePaperSx = hasMuiVariant
            ? {}
            : {
                ...(resolvedColor ? { boxShadow: 'none' } : {}),
            };
        const uiRootSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'root');
        const uiPaperSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'paper');

        return (
            <Dialog
                {...(modeless ? { hideBackdrop: true, disableEnforceFocus: true, disableScrollLock: true } : {})}
                {...props}
                disableEscapeKeyDown={modeless || props.disableEscapeKeyDown}
                ref={ref}
                variant={variant}
                className={mergedClassName}
                onClose={handleClose}
                PaperComponent={draggable ? DraggablePaper : undefined}
                sx={(theme) => ({
                    ...baseSx,
                    ...(uiRootSx ?? {}),
                    // 팝업 바깥 영역 클릭이 뒤쪽 화면으로 전달되게 한다
                    ...(modeless ? {
                        pointerEvents: 'none',
                        zIndex: theme.zIndex.modal - MODELESS_Z_INDEX_OFFSET + Math.max(modelessOrder, 0),
                    } : {}),
                    ...(typeof dialogSxProp === 'function' ? dialogSxProp(theme) : dialogSxProp),
                })}
                PaperProps={{
                    ...restPaperProps,
                    onPointerDown: handlePaperPointerDown,
                    onKeyDown: handlePaperKeyDown,
                    sx: (theme) => ({
                        ...basePaperSx,
                        // 배경이 없어 뒤쪽 화면과 구분되도록 그림자를 준다
                        ...(modeless ? { pointerEvents: 'auto', boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.18), 0 2px 6px 0 rgba(0, 0, 0, 0.12)' } : {}),
                        // backgroundColor: color.background.white,
                        // padding: size.margin.sm,
                        borderRadius:0,
                        borderBottomLeftRadius: size.radius.md,
                        borderBottomRightRadius: size.radius.md,
                        ...(uiPaperSx ?? {}),
                        ...(typeof paperSxProp === 'function' ? paperSxProp(theme) : paperSxProp),
                    }),
                }}
            >
                {children}

                {hasUiToken(uiTokens, 'btn') && btns ? (
                    <WiniDialogActions ui="btn" className="winidialog__footer">{btns}</WiniDialogActions>
                ) : null}
            </Dialog>
        );
    },
);

export default WiniDialog;
