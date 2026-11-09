import { forwardRef } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
const WiniImageListItem = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiimagelistitem ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <ImageListItem {...props} className ={className} ref = {ref} >
            {children}
        </ImageListItem>
    );
})
export default WiniImageListItem