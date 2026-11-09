import { forwardRef } from 'react';
import Toolbar from '@mui/material/Toolbar';
const WiniToolbar = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winitoolbar ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Toolbar {...props} className ={className} ref = {ref} >
            {children}
        </Toolbar>
    );
})
export default WiniToolbar