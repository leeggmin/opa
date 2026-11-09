import { useState, useCallback } from 'react';
import { INITIAL_ROUTE } from './constants';

/**
 * Route 폼 상태 및 필드 핸들러
 */
export const useForm = () => {
  const [selected, setSelected] = useState(INITIAL_ROUTE);

  const onReset = useCallback(() => {
    setSelected(INITIAL_ROUTE);
  }, []);

  const onChangeField = useCallback((e) => {
    const isStatus = e.target.name === 'status';
    setSelected((state) => ({
      ...state,
      [e.target.name]: isStatus
        ? e.target.checked
          ? 'ENABLE'
          : 'DISABLE'
        : e.target.value,
    }));
  }, []);

  const onGridSelect = useCallback((e) => {
    const data = e.api.getSelectedRows();
    if (!data || data.length === 0) return;

    const row = data[0];
    setSelected({
      routeId: row.routeId,
      name: row.name,
      uri: row.uri,
      remark: row.remark,
      sortSeq: row.sortSeq || 0,
      status: row.status,
    });
  }, []);

  return {
    selected,
    setSelected,
    onReset,
    onChangeField,
    onGridSelect,
  };
};
