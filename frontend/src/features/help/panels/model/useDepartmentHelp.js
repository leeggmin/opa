import { useState, useCallback, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import deptdata from './119data.json';

/**
 * DepartmentHelp 비즈니스 로직
 */
export const useDepartmentHelp = () => {
  const [keyword, setKeyword] = useState('');
  const [rowdata, setRowData] = useState([]);

  const searchData = useCallback(() => {
    const rows = winiCom.createTreeSet(deptdata.result.list, 'lvl');
    setRowData(rows);
  }, []);

  useEffect(() => {
    searchData();
  }, []);

  return {
    keyword,
    setKeyword,
    rowdata,
    searchData,
  };
};
