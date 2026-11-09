import { useState, useCallback } from 'react';
import { updateNodeCheckStatus } from '@/shared/lib';

/**
 * 메뉴 트리 선택 및 체크 관리
 */
export const useTreeSelection = () => {
  const [checkedProgramIds, setCheckedProgramIds] = useState([]);

  const toggleNodeCheck = useCallback(
    (menu, setMenu, id, isChecked, node) => {
      const updatedTree = updateNodeCheckStatus(menu, id, isChecked);
      setMenu(updatedTree);

      if (node && typeof node === 'object' && node.menuType === 'PROGRAM') {
        setCheckedProgramIds((prev) =>
          isChecked ? [...prev, id] : prev.filter((item) => item !== id),
        );
      }
    },
    [],
  );

  const resetCheckedPrograms = useCallback(() => {
    setCheckedProgramIds([]);
  }, []);

  return {
    checkedProgramIds,
    toggleNodeCheck,
    resetCheckedPrograms,
  };
};
