import { forwardRef } from 'react';
import Fade from '@mui/material/Fade';
const WiniFade = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winifade ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Fade {...props} className ={className} ref = {ref} >
            {children}
        </Fade>
    );
})
export default WiniFade
