import { useEffect, useRef, forwardRef } from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

import '@toast-ui/editor/toastui-editor.css';
import { customHtmlImageRenderer } from '@/shared/ui/wini';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
import "prismjs/themes/prism-tomorrow.css"; // 다크 테마
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const ViewerComponent = forwardRef((props, ref) => {
  const rootEl = useRef(null);
  const viewerInst = useRef(null);

  const setForwardedRef = (value) => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(value);
      return;
    }

    ref.current = value;
  };

  const getBindingEventNames = (sourceProps) => {
    return Object.keys(sourceProps)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => sourceProps[key]);
  };

  const bindEventHandlers = (sourceProps) => {
    if (!viewerInst.current) return;

    getBindingEventNames(sourceProps).forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      viewerInst.current.off(eventName);
      viewerInst.current.on(eventName, sourceProps[key]);
    });
  };

  const getInitEvents = (sourceProps) => {
    return getBindingEventNames(sourceProps).reduce((acc, key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      acc[eventName] = sourceProps[key];
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!rootEl.current) return undefined;

    if (viewerInst.current) {
      viewerInst.current.destroy();
      viewerInst.current = null;
    }

    rootEl.current.innerHTML = '';

    let pluginList = [
      [codeSyntaxHighlight, { highlighter: Prism }],
      tableMergedCell,
    ];
    if (props.plugin !== undefined && props.plugin !== null) {
      pluginList = [...pluginList, ...props.plugin];
    }

    viewerInst.current = new Viewer({
      el: rootEl.current,
      ...props,
      plugins: pluginList,

      events: getInitEvents(props),
      linkAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      customHTMLRenderer: {
        image(node, context) {
          return customHtmlImageRenderer(node, context);
        },
      },
    });

    setForwardedRef({ viewerInst });

    return () => {

      if (viewerInst.current) {
        viewerInst.current.destroy();
        viewerInst.current = null;
      }

      if (rootEl.current) {
        rootEl.current.innerHTML = '';
      }

      setForwardedRef(null);
    };
  }, []);

  useEffect(() => {
    if (!viewerInst.current) return;
    viewerInst.current.setMarkdown(props.value || '');
  }, [props.value]);

  useEffect(() => {
    bindEventHandlers(props);
  }, [props]);

  return <div ref={rootEl} />;
});

export default ViewerComponent;