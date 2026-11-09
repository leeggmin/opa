import { forwardRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
MenuItem.defaultProps = { style: { fontSize: 13, alignItems: 'center' }}

const WiniMenuItem = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winimenuitem ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <MenuItem {...props} className ={className} ref = {ref} >
            {children}
        </MenuItem>
    );
})
export default WiniMenuItem