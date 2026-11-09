import { forwardRef } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl } from '@mui/material';
const WiniRadioGroup = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiradiogroup ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <FormControl>
            <RadioGroup {...props} className ={className} ref = {ref} >
                {children}
            </RadioGroup>
        </FormControl>
    );
})
export default WiniRadioGroup