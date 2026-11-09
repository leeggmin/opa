import { useState, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  fetchAuthorizationGroupTree,
  fetchAuthorizationGroups,
} from '../api/api';

/**
 * 권한 그룹 목록 조회 및 검색 로직
 */
export const useList = () => {
  const { connector } = winiCom.getFormInfo();

  const [authTreeData, setAuthTreeData] = useState([]);
  const [authTreeDataList, setAuthTreeDataList] = useState([]);
  const [authList, setAuthList] = useState([]);
  const [searchAuthNm, setSearchAuthNm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 권한 그룹 트리 조회
   */
  const handleSelect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAuthorizationGroupTree(connector);
      if (data.result === 'SUCCESS') {
        setAuthTreeData(data.data);
      }
    } catch (err) {
      setError(err);
      await winiMsg.showAlert(
        winiCom.getErrorMessage(err.response?.data?.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 권한 그룹 목록 조회 (SELECT 박스용)
   */
  const loadAuthorizationGroups = async () => {
    try {
      const data = await fetchAuthorizationGroups(connector);
      if (data.result === 'SUCCESS') {
        setAuthList(data.data);
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response?.data?.message));
    }
  };

  /**
   * 트리 필터링 함수
   */
  const filterTree = (nodes, term) => {
    return nodes
      .map((node) => {
        if (node.children) {
          const filteredChildren = filterTree(node.children, term);

          if (
            filteredChildren.length > 0 ||
            node.groupName.toLowerCase().includes(term.toLowerCase())
          ) {
            return { ...node, children: filteredChildren };
          }
        } else if (node.groupName.toLowerCase().includes(term.toLowerCase())) {
          return node;
        }
        return null;
      })
      .filter(Boolean);
  };

  /**
   * 검색 버튼 클릭 핸들러
   */
  const handleSearch = () => {
    if (!searchAuthNm || searchAuthNm.trim() === '') {
      setAuthTreeDataList(authTreeData);
    } else {
      setAuthTreeDataList(filterTree(authTreeData, searchAuthNm));
    }
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
   * 검색어 변경 핸들러
   */
  const handleSearchChange = (e) => {
    setSearchAuthNm(e.target.value);
  };

  /**
   * 초기 로드
   */
  useEffect(() => {
    handleSelect();
    loadAuthorizationGroups();
  }, []);

  /**
   * authTreeData 변경 시 authTreeDataList 업데이트
   */
  useEffect(() => {
    const authTreeDataList = authTreeData.map((obj) => ({ ...obj }));
    setAuthTreeDataList(authTreeDataList);
  }, [authTreeData]);

  return {
    authTreeData,
    authTreeDataList,
    authList,
    searchAuthNm,
    isLoading,
    error,
    handleSelect,
    handleSearch,
    handleKeyUpSearch,
    handleSearchChange,
  };
};
