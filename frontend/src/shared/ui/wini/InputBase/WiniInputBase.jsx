import { forwardRef } from 'react';
import InputBase from '@mui/material/InputBase';
const WiniInputBase = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiinputbase ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <InputBase {...props} className ={className} ref = {ref} >
            {children}
        </InputBase>
    );
})
export default WiniInputBase