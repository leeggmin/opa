import { forwardRef } from 'react';
import Badge from '@mui/material/Badge';

const WiniBadge = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winibadge ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Badge {...props} className ={className} ref = {ref} >
            {children}
        </Badge>
    );
})
export default WiniBadge
