import { useState, useCallback, useEffect } from 'react';
import { useList } from './useList';
import { winiCom } from '@/shared/lib';

/**
 * 프로그램 관계 다이얼로그 Hook
 * @param {boolean} open - 다이얼로그 열림 상태
 * @param {Function} onSelect - 선택 콜백
 * @param {Function} onClose - 닫기 콜백
 */
export const useRelationDialog = (open, onSelect, onClose) => {
  const { programs, loadPrograms } = useList();
  const [search, setSearch] = useState('');

  // 다이얼로그 열릴 때 초기화
  useEffect(() => {
    if (open) {
      loadPrograms();
    }
  }, [open, loadPrograms]);

  const handleSearch = useCallback(async () => {
    await loadPrograms(search);
  }, [loadPrograms, search]);

  const handleGridSelection = useCallback(
    (e) => {
      const row = e.api.getSelectedRows()[0];
      if (winiCom.toEmpty(row) === '') return;

      const selected = {
        programId: row.programId,
        programName: row.programName,
        programCode: row.programCode,
        programMapping: row.programMapping,
      };

      onSelect(selected);
      onClose();
    },
    [onSelect, onClose],
  );

  return {
    programs,
    search,
    setSearch,
    handleSearch,
    handleGridSelection,
  };
};
