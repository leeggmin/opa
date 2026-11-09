import { useCallback, useEffect, useRef, forwardRef, Component, createRef } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import { Communicator } from '@/shared/api';
import { winiDate } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Prism from 'prismjs';
import {
  prepareSignedImage,
  customHtmlImageRenderer,
  winiEditorImageUploadHook,
  winiEditorImagePlugin,
  EditorImageResize,
} from '@/shared/ui/wini';
// import 'prismjs/themes/prism.css';
import "prismjs/themes/prism-tomorrow.css"; // 다크 테마
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-objectivec';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'

let _imageIdListChangeTimeout = 0;

const EditorComponent = forwardRef((props, ref) => {
  const rootEl = useRef(null);
  const editorInst = useRef(null);
  const prevMarkdown = useRef(null);
  const { serviceName, onImageIdListChange } = props;
  const DEFAULT_LANGUAGE = 'java';
  const editorImageResizer = useRef(null);

  const getBindingEventNames = () => {
    const eventNames = Object.keys(props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => !{ onImageUpload: true, onImageIdListChange: true }[key])
      .filter((key) => props[key]);

    if (!props.onChange && !props.onInput) {
      eventNames.push('onChange');
    }

    return eventNames;
  };

  const bindEventHandlers = (props) => {
    getBindingEventNames().forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      let eventFn = props[key];

      if (eventName === 'change' || eventName === 'input') {
        const orgEventFn = eventFn;

        eventFn = (mode) => {
          const markdown = editorInst.current.getMarkdown();

          if (markdown !== prevMarkdown.current) {
            const isPrevEmpty = !prevMarkdown.current;

            if (orgEventFn) {
              orgEventFn(markdown, mode);
            }

            prevMarkdown.current = markdown;

            if (onImageIdListChange && ref) {
              if (isPrevEmpty) {
                // markdown이 비어있는 경우에는 즉시 호출
                onImageIdListChange(ref.current.getImageIdList());
              } else {
                // markdown이 비어있지 않은 경우에는 수정중으로 보고 500ms 후에 호출.
                // 저장하기전에 .getImageIdList()를 저장하는 측에서 조회하면 제일 좋지만 useState를 사용하기 위해서
                // 수정해서 변경된 파일 ID는 성능을 위해 즉시 반영하지 않음.
                //
                // 이미지를 삭제하자마자 500ms 이전에 저장한 경우 파일 ID 목록에 남아있겠지만
                // 그러한 경우의 삭제되어야 하는 파일은 많지 않을것이기 때문에 이렇게 처리함.

                if (_imageIdListChangeTimeout) {
                  clearTimeout(_imageIdListChangeTimeout);
                  _imageIdListChangeTimeout = 0;
                }
                _imageIdListChangeTimeout = setTimeout(() => {
                  onImageIdListChange(ref.current.getImageIdList());
                  _imageIdListChangeTimeout = 0;
                }, 500);
              }
            }

            if (editorImageResizer.current) {
              editorImageResizer.current.reset();
            }
          }
        };
      }

      editorInst.current.off(eventName);
      editorInst.current.on(eventName, eventFn);
    });
  };

  const getInitEvents = () => {
    return getBindingEventNames().reduce((acc, key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      acc[eventName] = props[key];
      return acc;
    }, {});
  };

  useEffect(() => {
    let plulginList = [
      colorSyntax,
      [codeSyntaxHighlight, { highlighter: Prism }],
      winiEditorImagePlugin,
      tableMergedCell,
    ];
    if (props.plugin !== undefined && props.plugin !== null) {
      plulginList = [...plulginList, ...props.plugin];
    }
    editorInst.current = new Editor({
      el: rootEl.current,
      language: 'ko-KR',
      initialValue: props.value,
      ...props,
      usageStatistics: false,
      plugins: plulginList,
      events: getInitEvents(),
      customHTMLRenderer: {
        image(node, context) {
          // Markdown모드의 Preview 탭에서 사용됨
          return customHtmlImageRenderer(node, context);
        },
        // codeBlock(node) {
        //     const language = node.info || DEFAULT_LANGUAGE; // 언어 미지정 시 기본값 사용
        //     return {
        //         type: 'html',
        //         content: `<pre><code class="language-${language}">${node.literal}</code></pre>`,
        //     };
        // },
      },
      hooks: {
        addImageBlobHook: async (blob, callback, uploadType) => {
          if (!serviceName) {
            winiMsg.showAlert('이미지 업로드 기능을 사용하려면 서비스명을 지정해주세요.');
            return;
          }

          const uploadInfo = await winiEditorImageUploadHook(
            serviceName,
            uploadType,
            blob,
          );

          if (uploadInfo) {
            prepareSignedImage(
              serviceName,
              uploadInfo.fileId,
              URL.createObjectURL(blob),
            );

            callback(
              `@${serviceName}@${uploadInfo.fileId}`,
              uploadInfo.fileName,
            );

            if (typeof props.onImageUpload === 'function') {
              props.onImageUpload({
                entityId: uploadInfo.entityId,
                entityName: uploadInfo.entityName,
                subKey: uploadInfo.subKey,
                fileId: uploadInfo.fileId,
                fileName: uploadInfo.fileName,
                fileSize: uploadInfo.fileSize,
                signedFileId: uploadInfo.signedFileId,
                width: uploadInfo.imageWidth,
                height: uploadInfo.imageHeight,
                previewUrl: `${import.meta.env.VITE_INTERNAL_URL}/api/v1/${serviceName}/commonFile/preview/${uploadInfo.signedFileId}`,
              });
            }

            if (onImageIdListChange && ref) {
              onImageIdListChange(ref.current.getImageIdList());
            }
          }
        },
      },
    });
    // editorInst.current.on('change', () => {
    //     Prism.highlightAll();
    // });

    if (ref) {
      ref.current = {
        setValue: (value) => {
          if (editorInst.current) {
            editorInst.current.setMarkdown(value);
          }
        },
        getValue: () => {
          if (editorInst.current) {
            return editorInst.current.getMarkdown();
          }

          return '';
        },
        getImageIdList: () => {
          const imageIdList = [];
          const imageIdSet = {};

          if (editorInst.current) {
            const md = editorInst.current.getMarkdown();

            const matches =
              md.match(
                new RegExp(
                  `\\(@${serviceName}@([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(@[^)]+)?\\)`,
                  'g',
                ),
              ) || [];

            matches.forEach((it) => {
              const uuidMatches = it.match(
                /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
              );
              if (uuidMatches && uuidMatches.length > 0) {
                const imageId = uuidMatches[0];

                if (!imageIdSet.hasOwnProperty(imageId)) {
                  imageIdList.push(imageId);
                  imageIdSet[imageId] = true;
                }
              }
            });
          }

          return imageIdList;
        },
        getImageFiles: () => {
          const divEl = document.createElement('div');
          divEl.innerHTML = editorInst.current.getHTML();
          return Array.from(divEl.querySelectorAll('img'))
            .filter((elem) => {
              return (
                !!elem.attributes &&
                elem.attributes['data-raw-url'] &&
                elem.attributes['data-raw-url'].value &&
                elem.attributes['data-raw-url'].value.startsWith('@')
              );
            })
            .map((elem) => {
              return elem.attributes['data-raw-url'].value.substring(
                elem.attributes['data-raw-url'].value.indexOf('@', 1) + 1,
              );
            });
        },
      };
    }

    if (rootEl.current) {
      editorImageResizer.current = new EditorImageResize(rootEl.current, {
        editorInst: editorInst,
        onResize: (e, img, width, height) => {
          let imageId;

          if (img.attributes.hasOwnProperty('data-image-id')) {
            imageId = img.attributes['data-image-id'].value;
          } else {
            imageId = img.src;
          }

          editorInst.current.eventEmitter.emit('command', 'resize', {
            width: width,
            height: height,
            imageId: imageId,
          });

          img.style.width = width + 'px';
          img.style.height = height + 'px';
        },
      });
    }

    return () => {
      if (editorImageResizer.current) {
        editorImageResizer.current.destroy();
      }

      editorInst.current.destroy();
    };
  }, []);

  const trimedValue = props.value.trim();

  if (editorInst.current && editorInst.current._md !== trimedValue) {
    editorInst.current._md = trimedValue;

    if (editorInst.current.getMarkdown() !== props.value || '') {
      editorInst.current.setMarkdown(props.value || '');
    }
  }

  useEffect(() => {
    const instance = editorInst.current;
    const { height, previewStyle } = props;

    if (height) {
      instance.setHeight(height);
    }

    if (previewStyle) {
      instance.changePreviewStyle(previewStyle);
    }

    bindEventHandlers(props);
  }, [props]);

  return <div ref={rootEl} />;
});

export default EditorComponent;