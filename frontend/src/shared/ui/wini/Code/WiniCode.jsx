import { useEffect, forwardRef } from 'react';
import Prism from "prismjs";
// import "prismjs/themes/prism-solarizedlight.css"; // 기본 테마
import "./prism-one-light.css"; // Custom 테마


import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-jsx';


const WiniCode = forwardRef(({ children, preProps = {}, codeProps = {}, ...props }, ref) => {
    let className = "winicomponent winicode ";
    if (props.className !== undefined && props.className !== null) {
        className += props.className;
    }
    let code_language = props.language;
    if(!!props.language &&props.language=='objective-c'){
        code_language = 'objectivec';
    }
    let font_Size ='1.44rem';
    if(!!props.style){
        if(props.style.fontSize !== undefined){
            font_Size = props.style.fontSize;
        }
    }   
    
        
    useEffect(() => {
        Prism.highlightAll();
    }, [props.code]);

    return (
        <pre key={props.key} {...preProps} className={className} ref={ref} style={{ background: '#1a1a1a', textShadow: 'none', overflowY: 'auto', maxHeight: '310px', ...props.style }} 
        >
            <code className={`language-${code_language}`} {...codeProps} style={{fontSize:font_Size, textShadow: 'none'}}>
                {props.code}
            </code>
        </pre>
    );
});

export default WiniCode;
