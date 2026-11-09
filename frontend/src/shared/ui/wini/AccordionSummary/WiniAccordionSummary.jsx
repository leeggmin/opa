import { forwardRef } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import WiniIcon from '../Icon/WiniIcon';

const WiniAccordionSummary = forwardRef(({ children, ...props }, ref) => {
    const { className: classNameProp, sx: sxProp, expandIcon, ...rest } = props;

    let className = "winicomponent winiaccordionsummery ";
    if (classNameProp !== undefined && classNameProp !== null && String(classNameProp).trim() !== '') {
        className += ` ${classNameProp}`;
    }

    const baseSx = {
        px: 0,
        minHeight: 56,
        '&.Mui-expanded': {
            minHeight: 56,
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'inherit',
        },
    };

    const mergedSx = sxProp
        ? [baseSx, ...(Array.isArray(sxProp) ? sxProp : [sxProp])]
        : baseSx;
    return (
        <AccordionSummary
            {...rest}
            expandIcon={expandIcon ?? <WiniIcon icon="down" />}
            className={className}
            sx={mergedSx}
            ref={ref}
        >
            {children}
        </AccordionSummary>
    );
})
export default WiniAccordionSummary