import { forwardRef } from 'react';
import Masonry from '@mui/lab/Masonry';
const WiniMasonry = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winimasonry ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Masonry {...props} className ={className} ref = {ref} >
            {children}
        </Masonry>
    );
})
export default WiniMasonry
