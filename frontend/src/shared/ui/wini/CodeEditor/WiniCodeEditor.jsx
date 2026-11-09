import { forwardRef } from 'react';
// import Checkbox from '@mui/material/Checkbox';
import Editor from '@monaco-editor/react'
const WiniCodeEditor = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winicodeEditor ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Editor {...props} className ={className} ref = {ref} >
            {children}
        </Editor>
    );
})
export default WiniCodeEditor