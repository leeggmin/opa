import { forwardRef } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
const WiniInputAdornment = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiinputadornment ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <InputAdornment {...props} className ={className} ref = {ref} >
            {children}
        </InputAdornment>
    );
})
export default WiniInputAdornment