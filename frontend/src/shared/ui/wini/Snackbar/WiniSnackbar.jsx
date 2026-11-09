import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
const WiniSnackbar = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winisnackbar ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Snackbar {...props} className ={className} ref = {ref} >
            {children}
        </Snackbar>
    );
})
export default WiniSnackbar