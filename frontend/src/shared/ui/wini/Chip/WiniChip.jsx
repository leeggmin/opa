import { forwardRef } from 'react';
import Chip from '@mui/material/Chip';
const WiniChip = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winichip ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Chip {...props} className ={className} ref = {ref} >
            {children}
        </Chip>
    );
})
export default WiniChip
