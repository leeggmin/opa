import { forwardRef } from 'react';
import Accordion from '@mui/material/Accordion';
import { cn } from '@/shared/lib/cn';
import { color, size } from '@/shared/config/theme';

const WiniAccordion = forwardRef(({ children, ...props }, ref) => {
    const {
        className: classNameProp,
        sx: sxProp,
        disableGutters = true,
        elevation = 0,
        square = true,
        ...rest
    } = props;

    let className = "winicomponent winiaccordion";
    if (classNameProp !== undefined && classNameProp !== null && String(classNameProp).trim() !== '') {
        className += ` ${classNameProp}`;
    }

    const baseSx = {
        fontSize: size.text.md,
        fontWeight:  600,
        color: color.text.default,
        boxShadow: 'none',
        borderBottom: `1px solid ${color.border.default}`,
        borderRadius: 0,
        '&:before': { display: 'none' },
        '&.MuiAccordion-root': {
            margin: 0,
        },
        '&.MuiAccordion-root.Mui-expanded': {
            margin: 0,
        },
        '&.MuiAccordion-root:first-of-type': {
            borderTop: `1px solid ${color.border.default}`,
        },
    };

    const mergedSx = sxProp
        ? [baseSx, ...(Array.isArray(sxProp) ? sxProp : [sxProp])]
        : baseSx;
    return (
        <Accordion
            {...rest}
            disableGutters={disableGutters}
            elevation={elevation}
            square={square}
            className={className}
            sx={mergedSx}
            ref={ref}
        >
            {children}
        </Accordion>
    );
})
export default WiniAccordion

