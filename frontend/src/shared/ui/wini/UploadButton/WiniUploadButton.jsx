import { forwardRef } from 'react';
import Button from "@mui/material/Button";
import { CloudUploadIcon } from '@/shared/lib';
import PropTypes from 'prop-types';

const WiniUploadButton = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winiuploadbutton ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    let accept = "*";
    if(props.accept !== undefined && props.accept !==null){
        accept = props.accept;
    }
    let fn = ()=>{};
    if(props.onChange !==null && props.onChange !==undefined){
        fn = props.onChange;
    }
    let multiple=true;
    if(props.multiple != null && props.multiple !==undefined){
        multiple=props.multiple
    }
    
    return (
        // <div>
            <WiniButton className = {className} component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon/>} size="small" >Upload files
                <input type="file" name="fileUpload" accept={accept} onChange = {fn}  multiple={multiple}  style={{visibility:'hidden',display:'none'}}/>
            </WiniButton>    
        // </div>

    );
})
WiniUploadButton.propTypes = {
    type: 'file',
    // index: PropTypes.number.isRequired,
    // value: PropTypes.number.isRequired,
};
export default WiniUploadButton
