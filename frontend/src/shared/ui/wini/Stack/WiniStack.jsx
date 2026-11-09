import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
const WiniStack = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winistack ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    if(props.type &&props.type=='searchBar'){
        className += 'wini-Search-bar '
    }
    return (
        <Stack {...props} className ={className} ref = {ref} >
            {children}
        </Stack>
    );
})
export default WiniStack
