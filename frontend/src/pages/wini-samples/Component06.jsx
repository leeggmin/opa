import { useState, Fragment } from 'react';
import Editor from '@monaco-editor/react';
import { WiniCodeEditor, WiniBox, WiniButton } from '@/shared/ui/wini';

export default function Component06() {
  const [code, setCode] = useState(
    '//Type your code here 이거 아직쓰지마세요',
  );

  return (
    <Fragment>
      <WiniBox>
        <WiniCodeEditor
          height={500}
          width={'128rem'}
          language="java"
          value={code}
          theme="vs-dark"
          options={{
            fontSize: 15,
            minimap: { enabled: true },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
          }}
          onMount={mount}
          onChange={change}
        />
      </WiniBox>
    </Fragment>
  );
}
