import { forwardRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
// const WiniInputLabel = forwardRef(({ children, ...props }, ref) => {
//     let className = "winicomponent winiinputlabel ";
//     if(props.className!==undefined && props.className!==null){
//         className += props.className
//     }
//     return (
//         <InputLabel {...props} className ={className} ref = {ref} >
//             {children}
//         </InputLabel>
//     );
// })
// export default WiniInputLabel
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
    default: {},
    sub: {
        color: color.text.sub,
    },
    dark: {
        color: color.text.dark,
    },
    point: {
        color: color.text.point,
    },
};

const WiniInputLabel = forwardRef(
    ({ children, type, ui, className, sx: sxProp = {}, ...props }, ref) => {
        const uiTokens = getUiTokens(ui, type);
        const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);

        const mergedClassName = cn(
            'winicomponent winiinputlabel',
            uiTokens.map((token) => `winiinputlabel--${token}`),
            className,
        );

        const baseSx = {
            fontSize: `var(--wini-font-size, ${size.text.sm})`,
            lineHeight: 'var(--wini-label-line-height, var(--lh-normal))',
            fontWeight: 700,
            color: color.text.dark,
            transformOrigin: 'top left',
            zIndex: 1,

            '&.Mui-focused': {
                color: color.primary.main,
            },

            '&.Mui-disabled': {
                color: color.text.disabled,
            },

            ...(uiSx ?? {}),
        };

        return (
            <InputLabel
                {...props}
                className={mergedClassName}
                ref={ref}
                sx={(theme) => ({
                    ...baseSx,
                    ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
                })}
            >
                {children}
            </InputLabel>
        );
    },
);

export default WiniInputLabel;
