import React from 'react';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { Box } from '@mui/material';
import { cn } from '@/shared/lib/cn';
import { Tree } from 'react-arborist';
import { getUiTokens, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
// //import TreeView from '@mui/lab/TreeView';
// import { SimpleTreeView as TreeView} from '@mui/x-tree-view';

const baseSx = {
  width: '100%',
  height: 'auto',
  borderRadius: size.radius.md,
  border: `1px solid ${color.background.divider}`,
  minHeight: 300,
  minWidth: 0,
  overflow: 'hidden',
  // backgroundColor: color.background.mainLight,
};

const UI_SX = {};

const WiniTreeView = forwardRef(
  ({ ui, className, children, sx: sxProp = {}, ...props }, ref) => {
    const uiTokens = getUiTokens(ui);
    const uiRootSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'root');

    const [datalist, setDataList] = useState(() => props.winiData ?? []);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(() => props.width ?? 0);
    const mergedClassName = cn(
      'winicomponent winitreeview',
      uiTokens.map((token) => `winitreeview--${token}`),
      className,
    );

    // react-arborist Tree는 width/height 숫자값이 필요해서,
    // width prop이 없으면 컨테이너 너비를 측정해 자동으로 채워줌
    React.useLayoutEffect(() => {
      if (props.width != null) return;
      const el = containerRef.current;
      if (!el) return;

      const updateWidth = () => {
        // 테두리를 포함한 getBoundingClientRect 폭을 자식 Tree에 넘기면
        // Tree가 컨테이너 content 영역보다 커져 가로 overflow가 발생한다.
        const nextWidth = el.clientWidth ?? 0;
        setContainerWidth((prev) => (Math.abs(prev - nextWidth) > 1 ? nextWidth : prev));
      };

      updateWidth();

      if (typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(() => updateWidth());
      ro.observe(el);
      return () => ro.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.width]);
    
    // const dragndrop = 
    // const rowHeight = props.rowHeight==undefined||props.rowHeight==null? 32: props.rowHeight
    const handleMove = (e) => {
      const { dragIds, parentId, index } = e;
      // const moveData = (prevData,dragIdslist, parent_Id, index) =>{
      // }
      let newData = datalist;
      if (props.winiData) {
        setDataList((prevData) => {
          newData = JSON.parse(JSON.stringify(prevData));

          // 이동할 노드들을 찾아 제거
          const nodesToMove = dragIds.map((id) => {
            let nodeToMove;
            const removeNode = (nodes) => {
              for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                  nodeToMove = nodes.splice(i, 1)[0];
                  return true;
                }
                if (nodes[i].children) {
                  if (removeNode(nodes[i].children)) return true;
                }
              }
              return false;
            };
            removeNode(newData);
            return nodeToMove;
          });

          // 새 부모 노드를 찾아 이동할 노드들을 삽입
          const insertNodes = (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].id === parentId) {
                nodes[i].children = nodes[i].children || [];
                nodes[i].children.splice(index, 0, ...nodesToMove);
                return true;
              }
              if (nodes[i].children) {
                if (insertNodes(nodes[i].children)) return true;
              }
            }
            return false;
          };

          if (parentId) {
            insertNodes(newData);
          } else {
            // 루트 레벨로 이동
            newData.splice(index, 0, ...nodesToMove);
          }
          props.winiData = newData;
          return newData;
        });
      }
      if (props.onMove) props.onMove(e, newData);
    };
    useEffect(() => {
      setDataList(props.winiData);
    }, [props.winiData]);
    useEffect(() => {
      if (props.onChange) {
        props.onChange(datalist);
      }
    }, [datalist]);

    const disableDrag =
      props.disableDrag == undefined || props.disableDrag == null
        ? true
        : props.disableDrag;
    const rowHeight =
      props.rowHeight == undefined || props.rowHeight == null
        ? 32
        : props.rowHeight;

    return (
      <Box
        className={mergedClassName}
        ref={containerRef}
        sx={(theme) => ({
          ...baseSx,
          ...(uiRootSx ?? {}),
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
          maxWidth: '100%',
          boxSizing: 'border-box',
        })}
      >
        <Tree
          {...props}
          className={mergedClassName}
          ref={ref}
          data={datalist}
          width={props.width ?? containerWidth}
          // winiData ={datalist}
          onMove={handleMove}
          disableDrag={disableDrag}
          rowHeight={rowHeight}
        >
          {/* {Node}{} */}
          {children}
        </Tree>
      </Box>
    );
  },
);

export default WiniTreeView;
