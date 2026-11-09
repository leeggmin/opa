import { forwardRef } from 'react';
import Popover from '@mui/material/Popover';

const WiniPopover = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winipopover ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Popover {...props} className ={className} ref = {ref} >
            {children}
        </Popover>
    );
})
export default WiniPopover