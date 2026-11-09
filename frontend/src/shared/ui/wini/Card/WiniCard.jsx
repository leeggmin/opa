import { forwardRef } from 'react';
import Card from '@mui/material/Card';
const WiniCard = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicard ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Card {...props} className={className} ref={ref}>
            {children}
        </Card>
    );
})
export default WiniCard
