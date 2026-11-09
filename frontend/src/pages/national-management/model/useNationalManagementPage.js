import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNationalList } from '@/features/national/list';
import { useNationalActions, useNationalManageDialog } from '@/features/national/manage';

export const useNationalManagementPage = () => {
  const { nationalList, fetchNationalList } = useNationalList();
  const { create, update, remove } = useNationalActions();

  // 검색 draft/applied
  const [searchDraft, setSearchDraft] = useState({
    nationalCode: '',
    nationalName: '',
  });
  const [searchApplied, setSearchApplied] = useState({
    nationalCode: '',
    nationalName: '',
  });

  const onSearchChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchDraft((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSelect = useCallback(async () => {
    setSearchApplied({
      nationalCode: (searchDraft.nationalCode || '').trim(),
      nationalName: (searchDraft.nationalName || '').trim(),
    });
    await fetchNationalList();
  }, [searchDraft, fetchNationalList]);

  useEffect(() => {
    fetchNationalList();
  }, [fetchNationalList]);

  const dataListView = useMemo(() => {
    let list = nationalList;

    const code = (searchApplied.nationalCode || '').trim();
    const name = (searchApplied.nationalName || '').trim();

    if (code) {
      list = list.filter((x) =>
        (x.nationalCode || '').toLowerCase().includes(code.toLowerCase()),
      );
    }
    if (name) {
      list = list.filter((x) =>
        (x.nationalName || '').toLowerCase().includes(name.toLowerCase()),
      );
    }
    return list;
  }, [nationalList, searchApplied]);

  const dialog = useNationalManageDialog({
    fetchList: fetchNationalList,
    create,
    update,
    remove,
  });

  return {
    dataListView,
    searchData: searchDraft,
    onSearchChange,
    dialog,
    onSelect,
  };
};
