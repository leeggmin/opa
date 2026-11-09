import { forwardRef } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { size } from '@/shared/config/theme';
const WiniButtonGroup = forwardRef(({ children, ui, itemMinWidth = 120, sx: sxProp = {}, ...props }, ref) => {
    const uiTokens = getUiTokens(ui);
    const layoutUi = getLastUiToken(uiTokens, ['full', 'list']);
    const isFull = layoutUi === 'full';
    const isList = layoutUi === 'list';
    const mergedClassName = cn(
        'winicomponent winibuttongroup',
        uiTokens.map((token) => `winibuttongroup--${token}`),
        props.className,
    );
    const baseSx = {
        '&:not(:first-of-type)': {
            marginTop: size.margin.xl,
        },
    };
    const layoutSx = (isFull || isList) ? {
        display: 'flex',
        width: '100%',
        flexDirection: isFull ? 'column' : 'row',
        flexWrap: isList ? 'wrap' : 'nowrap',
        '& .MuiButtonGroup-grouped': {
            flex: '1 1 0',
            ...(isList ? { minWidth: itemMinWidth } : {}),
        },
    } : {};
    return (
        <ButtonGroup
            {...props}
            ref={ref}
            className ={mergedClassName}
            sx={(theme) => ({
                ...baseSx,
                ...layoutSx,
                ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
            })}
        >
            {children}
        </ButtonGroup>
    );
})
export default WiniButtonGroup
