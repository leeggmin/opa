import { forwardRef } from 'react';
import DialogContent from '@mui/material/DialogContent';
import { color } from '@/shared/config/theme';
const WiniDialogContent = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winidialogcontent ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <DialogContent {...props} className={className} ref={ref}
            sx={(theme) => ({

                '& .MuiDialogContentText-root ': {
                    color: color.text.default,
                }
            })}
        >
            {children}
        </DialogContent>
    );
})
export default WiniDialogContent
