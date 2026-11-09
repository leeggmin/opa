import { forwardRef } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
const WiniSwich = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiswitch ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    let label = props.label?props.label:'';
    let labelProps={};
    if(props.labelProps){
        labelProps = props.labelProps
    }
    return (
        // <FormControlLabel control={
        //     <Switch {...props} className ={className} ref = {ref} >
        //         {children}
        //     </Switch>
        // }
        // label={props.label?props.label:'' }
        // />
        <>
        {
            label!=='' ? (
                <FormControlLabel {...labelProps}
                    control={<Switch {...props} className ={className} ref = {ref} >{children}</Switch>} 
                    label ={props.label?props.label:''}/>
            ):(
                    <Switch {...props} className ={className} ref = {ref} >
                        {children}
                    </Switch>
            )
        }
        </>
    );
})
export default WiniSwich