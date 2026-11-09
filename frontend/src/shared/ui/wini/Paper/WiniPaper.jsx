import { forwardRef } from 'react';
import Paper from '@mui/material/Paper';
const WiniPaper = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winipaper ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Paper {...props} className ={"winipaper"} ref = {ref} >
            {children}
        </Paper>
    );
})
export default WiniPaper