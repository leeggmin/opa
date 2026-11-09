import { useState, useCallback, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchProgramList } from '../api/api';

/**
 * 프로그램 목록 관리 훅
 */
export const useProgramList = () => {
  const { connector } = winiCom.getFormInfo();
  const [listView, setListView] = useState([]);
  const [searchPg, setSearchPg] = useState('');
  const [selectedData, setSelectedData] = useState({
    id: '',
    name: '',
    code: '',
    mapping: '',
  });

  const loadProgramList = useCallback(async () => {
    try {
      const list = await fetchProgramList(connector, searchPg);
      const newList = list.map((item, idx) => ({
        ...item,
        num: idx + 1,
        chk: false,
      }));
      setListView(newList);
    } catch (err) {
      if (err.response) {
        winiMsg.showAlert(err.response.data.message);
      } else {
        winiMsg.showSnackbar('프로그램 목록 조회 중 오류가 발생했습니다.');
      }
    }
  }, [connector, searchPg]);

  const handleSearchChange = (e) => {
    setSearchPg(e.target.value);
  };

  const handleSearch = () => {
    loadProgramList();
  };

  const handleProgramSelect = (e) => {
    const data = e.api.getSelectedRows();
    if (!data || data.length === 0) return;

    setSelectedData({
      id: data[0].programId,
      name: data[0].programName,
      code: data[0].programCode,
      mapping: data[0].programMapping,
    });
  };

  useEffect(() => {
    loadProgramList();
  }, []);

  return {
    listView,
    searchPg,
    selectedData,
    handleSearchChange,
    handleSearch,
    handleProgramSelect,
    loadProgramList,
  };
};
