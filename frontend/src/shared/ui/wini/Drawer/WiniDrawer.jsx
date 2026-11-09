import { forwardRef } from 'react';
import Drawer from '@mui/material/Drawer';

const WiniDrawer = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winidrawer ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Drawer {...props} className ={className} ref = {ref} >
            {children}
        </Drawer>
    );
})
export default WiniDrawer