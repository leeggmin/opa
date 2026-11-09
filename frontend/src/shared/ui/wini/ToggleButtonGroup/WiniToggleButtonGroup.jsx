import { forwardRef } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const WiniToggleButtonGroup = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winitogglebuttongroup ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <ToggleButtonGroup {...props} className ={className} ref = {ref} >
            {children}
        </ToggleButtonGroup>
    );
})
export default WiniToggleButtonGroup