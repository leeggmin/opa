import { forwardRef } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
const WiniDialogContentText = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winidialogcontenttext ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <DialogContentText {...props} className ={className} ref = {ref} >
            {children}
        </DialogContentText>
    );
})
export default WiniDialogContentText