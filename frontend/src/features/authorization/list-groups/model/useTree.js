import { useRef, useEffect } from 'react';

/**
 * 권한 그룹 트리 동작 관리 훅
 * @param {Array} authTreeDataList - 트리 데이터 목록
 * @param {Function} onReset - 리셋 함수
 */
export const useTree = (authTreeDataList, onReset) => {
  const treeRef = useRef(null);
  const onResetRef = useRef(onReset);

  // authTreeDataList 변경 시 모든 트리 열기
  useEffect(() => {
    if (treeRef.current && authTreeDataList.length > 0) {
      treeRef.current.openAll();
    }
  }, [authTreeDataList]);

  // onReset 함수 참조 업데이트
  useEffect(() => {
    onResetRef.current = onReset;
  }, [onReset]);

  // 초기화 시 트리 선택 해제
  useEffect(() => {
    if (onResetRef.current && treeRef.current) {
      treeRef.current.deselectAll();
    }
  }, [onReset]);

  return { treeRef };
};
