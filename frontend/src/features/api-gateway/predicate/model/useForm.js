import { useState, useCallback } from 'react';
import { INITIAL_PREDICATE } from './constants';

/**
 * Predicate 폼 상태 및 필드 핸들러
 */
export const useForm = () => {
  const [selected, setSelected] = useState(INITIAL_PREDICATE);

  const onReset = useCallback(() => {
    setSelected(INITIAL_PREDICATE);
  }, []);

  const onChangeTextField = useCallback((e) => {
    const isStatus = e.target.name === 'status';
    const fieldName = e.target.name;
    const fieldValue = isStatus
      ? e.target.checked
        ? 'ENABLE'
        : 'DISABLE'
      : e.target.value;

    setSelected((state) => {
      if (fieldName === 'predicateType') {
        return {
          ...INITIAL_PREDICATE,
          predicateId: state.predicateId,
          predicateType: fieldValue,
          status: state.status,
        };
      }

      return {
        ...state,
        [fieldName]: fieldValue,
      };
    });
  }, []);

  const onChangeMethodField = useCallback((e) => {
    setSelected((state) => ({
      ...state,
      methods: {
        ...state.methods,
        [e.target.value]: e.target.checked,
      },
    }));
  }, []);

  const onGridSelect = useCallback((e) => {
    const data = e.api.getSelectedRows();
    if (!data || data.length === 0) return;

    const row = data[0];
    const hostnames =
      row.predicateType === 'HOST' && row.key
        ? row.key.split(',').join('\n')
        : '';
    const paths =
      row.predicateType === 'PATH' && row.key
        ? row.key.split(',').join('\n')
        : '';
    let methods = {};
    let weight = row.predicateType === 'WEIGHT' && row.definition
      ? parseInt(row.definition)
      : 1;

    if (row.predicateType === 'METHOD' && row.key) {
      row.key.split(',').forEach((method) => {
        methods[method.toUpperCase()] = true;
      });
    }

    if (isNaN(weight)) {
      weight = 1;
    }

    setSelected({
      predicateId: row.predicateId,
      predicateType: row.predicateType,
      key: row.key,
      definition: row.definition,
      hostnames,
      methods,
      paths,
      weight,
      status: row.status,
    });
  }, []);

  return {
    selected,
    setSelected,
    onReset,
    onChangeTextField,
    onChangeMethodField,
    onGridSelect,
  };
};
