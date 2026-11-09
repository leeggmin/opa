import { forwardRef } from 'react';
import AppBar from '@mui/material/AppBar';

const WiniAppBar = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiappbar ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <AppBar {...props} className ={className} ref = {ref} >
            {children}
        </AppBar>
    );
})
export default WiniAppBar
