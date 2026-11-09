import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';

const WiniAvatar = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiavatar ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Avatar {...props} className ={className} ref = {ref} >
            {children}
        </Avatar>
    );
})
export default WiniAvatar
