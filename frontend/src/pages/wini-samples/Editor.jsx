import { useState, useRef, useEffect } from 'react';

import { WiniBox, WiniButton, WiniEditor, WiniEditorViewer } from '@/shared/ui/wini';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';

export default function Editor(props) {
  const [md, setMd] = useState('# Hello\r\n안녕하세요');
  const winiEditorRef = useRef(null);

  const gotoAdd = () => {
    if (winiEditorRef.current) {
      winiEditorRef.current.setValue(winiEditorRef.current.getValue() + '.');
    }
  };

  return (
    <WiniBox>
      <WiniBox>주소 : https://ui.toast.com/tui-editor</WiniBox>
      <textarea value={md} onInput={(e) => setMd(e.target.value)}></textarea>

      <WiniButton onClick={gotoAdd}>추가</WiniButton>
      <WiniEditor
        ref={winiEditorRef}
        previewStyle="tab"
        height="600px"
        initialEditType="wysiwyg"
        serviceName="common"
        value={md}
      />
      <WiniEditorViewer
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        value={md}
      />
    </WiniBox>
  );
}
