import { useState, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchUsers, fetchOrganizations } from '../api/api';

/**
 * 사용자 목록 조회 및 검색 로직
 */
export const useList = () => {
  const { connector } = winiCom.getFormInfo();

  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState({
    username: '',
    fullName: '',
  });

  /**
   * 사용자 목록 조회
   */
  const handleSelect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(connector);
      if (data.result === 'SUCCESS') {
        setUserList(data.data);
        applySearch(data.data);
      }
    } catch (error) {
      setError(error);
      winiMsg.showSnackbar(winiCom.getErrorMessage(error.response?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };


  /**
   * 검색 필터 적용
   */
  const applySearch = (list = userList) => {
    let filteredList = [...list];


    // 사용자 ID 필터링
    if (searchParam.username) {
      filteredList = filteredList.filter((user) =>
        user.username?.toLowerCase().includes(searchParam.username.toLowerCase())
      );
    }

    // 성명 필터링
    if (searchParam.fullName) {
      filteredList = filteredList.filter((user) =>
        user.fullName?.toLowerCase().includes(searchParam.fullName.toLowerCase())
      );
    }

    setFilteredUserList(filteredList);
  };

  /**
   * 검색 버튼 클릭 핸들러
   */
  const handleSearch = () => {
    applySearch();
  };

  /**
   * 검색어 입력 시 엔터키 처리
   */
  const handleKeyUpSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * 검색 조건 변경 핸들러
   */
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParam({ ...searchParam, [name]: value });
  };

  /**
   * 초기 로드
   */
  useEffect(() => {
    handleSelect();
  }, []);

  /**
   * userList 변경 시 검색 재적용
   */
  useEffect(() => {
    applySearch();
  }, [userList]);

  return {
    userList: filteredUserList,
    searchParam,
    setSearchParam,
    isLoading,
    error,
    handleSelect,
    handleSearch,
    handleKeyUpSearch,
    handleSearchChange,
  };
};
