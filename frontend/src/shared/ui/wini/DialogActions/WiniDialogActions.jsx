import { forwardRef } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
    // ui : 버튼형 (WiniDialog ui="btn"의 하단 버튼 줄)
    // 버튼을 가로로 꽉 채운 채움형: 기본 회색, MuiButton-textMaindark 클래스를 준 버튼은 메인 색
    btn: {
        display: 'flex',
        gap: size.margin.md,
        padding: `0 ${size.margin.sm} ${size.margin.sm}`,

        // 버튼을 WiniButtonGroup으로 감싸 넘겨도 같은 줄에 나란히 놓이도록 그룹 상자를 없앰
        '& > .winibuttongroup': {
            display: 'contents',
        },

        // MuiButtonGroup의 그룹 버튼 스타일(모서리·테두리·margin)보다 우선하도록 선택자 우선순위를 높임
        '&&& .winibutton': {
            flex: '1 1 0',
            minWidth: 0,
            height: '40px',
            margin: 0,
            border: `1px solid ${color.border.default}`,
            borderRadius: size.radius.md,
            backgroundColor: color.gray.c_eee,
            color: color.text.default,
            fontSize: size.text.sm,
            fontWeight: 600,

            '&:hover': {
                border: `1px solid ${color.border.default}`,
                backgroundColor: color.gray.c_ddd,
            },

            '&.MuiButton-textMaindark': {
                borderColor: color.brand.main,
                backgroundColor: color.brand.main,
                color: color.text.white,

                '&:hover': {
                    borderColor: color.brand.main,
                    backgroundColor: color.brand.main,
                },
            },
        },
    },
};

const WiniDialogActions = forwardRef(
    ({ children, ui, type, className, sx: sxProp = {}, ...props }, ref) => {
        const uiTokens = getUiTokens(ui, type);
        const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);

        const mergedClassName = cn(
            'winicomponent winidialogactions',
            uiTokens.map((token) => `winidialogactions--${token}`),
            className,
        );

        return (
            <DialogActions
                {...props}
                ref={ref}
                className={mergedClassName}
                sx={(theme) => ({
                    ...(uiSx ?? {}),
                    ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
                })}
            >
                {children}
            </DialogActions>
        );
    },
);

export default WiniDialogActions;
