import { forwardRef } from 'react';
import ImageList from '@mui/material/ImageList';
const WiniImageList = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiimagelist ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <ImageList {...props} className ={className} ref = {ref} >
            {children}
        </ImageList>
    );
})
export default WiniImageList