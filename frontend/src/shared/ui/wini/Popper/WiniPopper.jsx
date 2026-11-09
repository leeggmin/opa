import { forwardRef } from 'react';
import Popper from '@mui/material/Popper';

const WiniPopper = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winipopper ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Popper {...props} className ={className} ref = {ref} >
            {children}
        </Popper>
    );
})
export default WiniPopper