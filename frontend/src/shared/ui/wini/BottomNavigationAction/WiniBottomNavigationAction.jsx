import { forwardRef } from 'react';
import { BottomNavigationAction } from '@mui/material';
const WiniBottomNavigationAction = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winibottomnavigationaction ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <BottomNavigationAction {...props} className ={className} ref = {ref} >
            {children}
        </BottomNavigationAction>
    );
})
export default WiniBottomNavigationAction
