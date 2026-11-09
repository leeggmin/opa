import { forwardRef } from 'react';
import { CardMedia } from '@mui/material';
import bgDataNull from '@/shared/assets/img/bg_datanull.png';

const WiniCardMedia = forwardRef(({ children, onError, ...props }, ref) => {
    let className = "winicomponent winicardmedia ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    
    const actualOnError = (e) => {
        if (e && e.target && e.target.tagName === 'IMG' && e.target.dataset) {
            e.target.dataset['orgSrc'] = e.target.src;
            e.target.src = bgDataNull;
        }
        
        if (onError) {
            onError.apply(this, [e]);
        }
    }
    
    return (
        <CardMedia {...props} className ={className} ref = {ref} onError={actualOnError}>
            {children}
        </CardMedia>
    );
})
export default WiniCardMedia