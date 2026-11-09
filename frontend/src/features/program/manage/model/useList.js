import React, { useState, useCallback } from 'react';
import { getPrograms } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';

/**
 * 프로그램 목록 조회 Hook
 */
export const useList = () => {
  const connector = winiCom.getConnector();

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPrograms = useCallback(async (keyword = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await getPrograms(connector, keyword);
      const newList = list.map((item, idx) => ({
        ...item,
        num: idx + 1,
        chk: false,
      }));
      setPrograms(newList);
    } catch (err) {
      setError(err);
      if (err.response) {
        winiMsg.showAlert(err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  const searchPrograms = useCallback(() => {
    loadPrograms(searchKeyword);
  }, [loadPrograms, searchKeyword]);

  const selectProgram = useCallback((program) => {
    setSelectedProgram(program);
  }, []);

  const toggleProgramCheck = useCallback((programId, checked) => {
    setPrograms((prev) =>
      prev.map((item) =>
        item.programId === programId ? { ...item, chk: checked } : item,
      ),
    );
  }, []);

  const getCheckedPrograms = useCallback(() => {
    return programs.filter((item) => item.chk);
  }, [programs]);

  return {
    programs,
    selectedProgram,
    searchKeyword,
    isLoading,
    error,
    setPrograms,
    setSelectedProgram,
    setSearchKeyword,
    loadPrograms,
    searchPrograms,
    selectProgram,
    toggleProgramCheck,
    getCheckedPrograms,
  };
};
