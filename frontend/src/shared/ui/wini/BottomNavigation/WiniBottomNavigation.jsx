import { forwardRef } from 'react';
import  BottomNavigation from '@mui/material/BottomNavigation';

const WiniBottomNavigation = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winibottomnavigation ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <BottomNavigation {...props} className ={className} ref = {ref} >
            {children}
        </BottomNavigation>
    );
})
export default WiniBottomNavigation
