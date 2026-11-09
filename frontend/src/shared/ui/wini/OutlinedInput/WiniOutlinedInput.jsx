import { forwardRef } from 'react';
import { OutlinedInput } from '@mui/material';

const WiniOutlinedInput = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winioutlineinput ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <OutlinedInput {...props} className ={className} ref = {ref} >
            {children}
        </OutlinedInput>
    );
})
export default WiniOutlinedInput