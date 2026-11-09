import { forwardRef } from 'react';
import CardHeader from '@mui/material/CardHeader';
const WiniCardHeader = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicardheader ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <CardHeader {...props} className ={className} ref = {ref} >
            {children}
        </CardHeader>
    );
})
export default WiniCardHeader