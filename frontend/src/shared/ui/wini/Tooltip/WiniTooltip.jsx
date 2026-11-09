import { forwardRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
const WiniTooltip = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winitooltip ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Tooltip {...props} className ={className} ref = {ref} >
            {children}
        </Tooltip>
    );
})
export default WiniTooltip