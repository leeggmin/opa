import { forwardRef } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
const WiniAccordionDetails = forwardRef(({ children, ...props }, ref) => {
    const { className: classNameProp, sx: sxProp, ...rest } = props;

    let className = "winicomponent winiaccordiondetails";
    if (classNameProp !== undefined && classNameProp !== null && String(classNameProp).trim() !== '') {
        className += ` ${classNameProp}`;
    }

    const baseSx = {
        px: 0,
    };
    const mergedSx = sxProp
        ? [baseSx, ...(Array.isArray(sxProp) ? sxProp : [sxProp])]
        : baseSx;
    return (
        <AccordionDetails {...rest} className={className} sx={mergedSx} ref={ref}>
            {children}
        </AccordionDetails>
    );
})
export default WiniAccordionDetails
