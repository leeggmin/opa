import { forwardRef } from 'react';
import Fab from '@mui/material/Fab';
const WiniFab = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winifab ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Fab {...props} className ={className} ref = {ref} >
            {children}
        </Fab>
    );
})
export default WiniFab
