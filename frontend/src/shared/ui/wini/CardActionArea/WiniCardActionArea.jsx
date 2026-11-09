import { forwardRef } from 'react';
import CardActionArea from '@mui/material/CardActionArea';
const WiniCardActionArea = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicardactionarea ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <CardActionArea {...props} className ={className} ref = {ref} >
            {children}
        </CardActionArea>
    );
})
export default WiniCardActionArea