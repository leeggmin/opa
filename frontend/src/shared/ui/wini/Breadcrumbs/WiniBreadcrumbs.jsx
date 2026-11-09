import { forwardRef } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
const WiniBreadcrumbs = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winibreadcrumbs ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Breadcrumbs {...props} className ={className} ref = {ref} >
            {children}
        </Breadcrumbs>
    );
})
export default WiniBreadcrumbs