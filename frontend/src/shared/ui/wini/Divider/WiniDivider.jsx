import { forwardRef } from 'react';
import Divider from '@mui/material/Divider';

const WiniDivider = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winidivider ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Divider {...props} className ={className} ref = {ref} >
            {children}
        </Divider>
    );
})
export default WiniDivider