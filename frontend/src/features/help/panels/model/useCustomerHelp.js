import { useState, useCallback, useEffect } from 'react';

const mockData = [
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
  { make: 'Fiat', model: '500', price: 15774, electric: false },
  { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
];

/**
 * CustomerHelp 비즈니스 로직
 */
export const useCustomerHelp = (params = {}) => {
  const [keyword, setKeyword] = useState('');
  const [rowdata, setRowData] = useState([]);
  const [first, setFirst] = useState(true);

  const colDefs = [
    { field: 'make', flex: 2 },
    { field: 'model', flex: 1 },
    { field: 'price', flex: 1 },
    { field: 'electric', flex: 1 },
  ];

  const searchData = useCallback(() => {
    let rows = mockData;

    if (first === true) {
      setFirst(false);
      if (Object.keys(params).indexOf('keyword') > -1) {
        setKeyword(params.keyword);
        rows = rows.filter((item) => {
          return (
            item.make.toLowerCase().includes(params.keyword.toLowerCase()) ||
            item.model.toLowerCase().includes(params.keyword.toLowerCase())
          );
        });
      }
    } else {
      if (keyword !== '') {
        rows = rows.filter((item) => {
          return (
            item.make.toLowerCase().includes(keyword.toLowerCase()) ||
            item.model.toLowerCase().includes(keyword.toLowerCase())
          );
        });
      }
    }
    setRowData(rows);
  }, [keyword, first, params]);

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
