import { useState, useRef, useCallback, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchPredicateList } from '../api/api';
import { INITIAL_SEARCH_PREDICATE } from './constants';

/**
 * Predicate 목록 상태 및 조회
 */
export const useList = (serviceName, selectedRouteId, onReset) => {
  const { connector } = winiCom.getFormInfo();
  const refGrid = useRef();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState(INITIAL_SEARCH_PREDICATE);
  const searchRef = useRef(search);
  searchRef.current = search;
  const [findId, setFindId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPredicateList(
        connector,
        serviceName,
        selectedRouteId,
        searchRef.current,
      );
      setList(data);
      onReset?.();
    } catch (err) {
      setError(err);
      winiMsg.showSnackbar('Predicate 목록 조회 중 오류가 발생했습니다.');
      setList([]);
      onReset?.();
    } finally {
      setIsLoading(false);
    }
  }, [connector, serviceName, selectedRouteId, onReset]);

  const resetAll = useCallback(() => {
    setList([]);
  }, []);

  // 수정한 그리드 찾아가기
  const selectRowById = useCallback((id) => {
    refGrid.current?.api?.forEachNode((item) => {
      if (id === item.data.id) {
        item.setSelected(true);
      }
    });
  }, []);

  // Route 변경 시 Predicate 조회
  useEffect(() => {
    onSearch();
  }, [selectedRouteId]);

  // 조회 후 그리드 선택 처리
  useEffect(() => {
    if (findId !== '') {
      selectRowById(findId);
      setFindId('');
    }
  }, [list, findId, selectRowById]);

  return {
    refGrid,
    list,
    search,
    setSearch,
    isLoading,
    error,
    onSearch,
    resetAll,
    setFindId,
  };
};
