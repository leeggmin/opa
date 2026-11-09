import { forwardRef } from 'react';
import CardContent from '@mui/material/CardContent';
const WiniCardContent = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicardcontent ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <CardContent {...props} className ={className} ref = {ref} >
            {children}
        </CardContent>
    );
})
export default WiniCardContent