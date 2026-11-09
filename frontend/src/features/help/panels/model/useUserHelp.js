import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchCommonUsers } from '../api/api';
import { winiMsg } from '@/shared/model';
import { Communicator } from '@/shared/api';

/**
 * UserHelp 비즈니스 로직
 */
export const useUserHelp = (service, params = {}) => {
  const connector = useMemo(() => new Communicator(), []);
  const [keyword, setKeyword] = useState('');
  const [rowdata, setRowData] = useState([]);
  const [first, setFirst] = useState(true);

  const colDefs = [
    { field: 'employeeNo', headerName: '사번', flex: 1 },
    { field: 'fullName', headerName: '이름', flex: 2 },
    { field: 'dutyName', headerName: '직위', flex: 1 },
    { field: 'departmentName', headerName: '부서', flex: 1 },
  ];

  const searchData = useCallback(async () => {
    try {
      const users = await fetchCommonUsers(connector, service);
      let rows = users;

      if (first === true) {
        setFirst(false);
        if (Object.keys(params).indexOf('keyword') > -1) {
          setKeyword(params.keyword);
          rows = rows.filter((item) =>
            item.fullName.toLowerCase().includes(params.keyword.toLowerCase()),
          );
        }
      } else {
        if (keyword !== '') {
          rows = rows.filter((item) =>
            item.fullName.toLowerCase().includes(keyword.toLowerCase()),
          );
        }
      }
      setRowData(rows);
    } catch (e) {
      winiMsg.showAlert(e.response?.data?.message || '사용자 조회 실패');
    }
  }, [service, keyword, first, params, connector]);

  useEffect(() => {
    searchData();
  }, []);

  return {
    keyword,
    setKeyword,
    rowdata,
    colDefs,
    searchData,
  };
};
