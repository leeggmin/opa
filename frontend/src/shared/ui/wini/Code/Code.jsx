import Prism from 'prismjs';
// import "prismjs/themes/prism-okaidia.css"; // 기본 테마
// import "./prism-one-light.css"; // Custom 테마

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-objectivec';
import { forwardRef } from 'react';

const WiniCode = forwardRef(({ children, ...props }, ref) => {
  let className = 'winicomponent winicode ';
  if (props.className !== undefined && props.className !== null) {
    className += props.className;
  }
  let codeProps = {};
  codeProps = props.codeProps ? props.codeProps : {};
  return (
    <pre {...props} className={className} ref={ref}>
      <code className={`language-${props.language}`} {...codeProps}>
        {children}
      </code>
    </pre>
  );
});
export default WiniCode;
