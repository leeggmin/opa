import { forwardRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const WiniLocalizationProviderTP = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winilocalizationprovidertp ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <LocalizationProvider {...props} className ={className} ref = {ref}  dateAdapter={AdapterDateFns} >
            {children}
        </LocalizationProvider>
    );
})
export default WiniLocalizationProviderTP