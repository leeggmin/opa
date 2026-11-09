import { useCallback } from 'react';

/**
 * Dialog 선택 이벤트 핸들러 범용 훅 (Grid용)
 *
 * @param {function} onSelect - 선택 시 호출될 함수
 * @param {function} onConfirm - 확인(더블클릭) 시 호출될 함수
 * @returns {Object} Dialog 선택 이벤트 핸들러
 * @returns {function} onRowSelected - 행 선택 핸들러
 * @returns {function} onRowDoubleClicked - 행 더블클릭 핸들러
 */
export function useDialogSelection(onSelect, onConfirm) {
  // 행 선택 이벤트 핸들러 (Grid)
  const onRowSelected = useCallback(
    (event) => {
      if (onSelect && event.data) {
        onSelect(event.data);
      }
    },
    [onSelect],
  );

  // 행 더블클릭 이벤트 핸들러 (Grid)
  const onRowDoubleClicked = useCallback(
    (event) => {
      if (event.data) {
        if (onSelect) onSelect(event.data);
        if (onConfirm) onConfirm(event.data);
      }
    },
    [onSelect, onConfirm],
  );

  return {
    onRowSelected,
    onRowDoubleClicked,
  };
}

/**
 * Dialog TreeView 선택 이벤트 핸들러 범용 훅
 *
 * @param {function} onSelect - 선택 시 호출될 함수
 * @param {function} onConfirm - 확인(더블클릭) 시 호출될 함수
 * @returns {Object} TreeView 선택 이벤트 핸들러
 * @returns {function} onTreeSelected - 트리 선택 핸들러
 * @returns {function} onTreeDoubleClicked - 트리 더블클릭 핸들러
 */
export function useTreeSelection(onSelect, onConfirm) {
  // TreeView 선택 이벤트 핸들러
  const onTreeSelected = useCallback(
    (event) => {
      if (onSelect && event.length > 0 && event[0].data) {
        onSelect(event[0].data);
      }
    },
    [onSelect],
  );

  // TreeView 더블클릭 이벤트 핸들러
  const onTreeDoubleClicked = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
  }, [onConfirm]);

  return {
    onTreeSelected,
    onTreeDoubleClicked,
  };
}
