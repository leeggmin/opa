import { forwardRef } from 'react';
import CardActions from '@mui/material/CardActions';
const WiniCardActions = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicardactions ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <CardActions {...props} className ={className} ref = {ref} >
            {children}
        </CardActions>
    );
})
export default WiniCardActions
