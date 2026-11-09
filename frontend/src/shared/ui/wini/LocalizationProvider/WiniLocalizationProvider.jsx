// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const WiniLocalizationProvider = ({ children, ...props }) => {
    let className = "winicomponent winilocalizationprovider ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <LocalizationProvider {...props} className ={className}  >
            {children}
        </LocalizationProvider>
    );
}
export default WiniLocalizationProvider