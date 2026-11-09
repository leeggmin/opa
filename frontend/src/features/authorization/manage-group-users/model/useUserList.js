import { useState, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  getUsersByAuthorizationGroup,
  updateUsersAuthorizationBatch,
} from '../api/api';

/**
 * 사용자 권한 목록 관리 Hook
 */
export const useUserList = (selectedAuthGroup) => {
  const { connector } = winiCom.getFormInfo();

  const [userAuthList, setUserAuthList] = useState([]);
  const [defaultUserAuthList, setDefaultUserAuthList] = useState([]);
  const [searchParam, setSearchParam] = useState({
    searchKeyword: '',
    status: '',
  });

  const userAuthPageSize = 16;
  const [userAuthPage, setUserAuthPage] = useState(0);
  const [totalUserAuthPage, setTotalUserAuthPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);

  /**
   * 사용자 목록 조회
   */
  const loadUserAuthorizationList = async () => {
    if (!selectedAuthGroup.id) {
      return;
    }

    try {
      const params = {
        pageSize: userAuthPageSize,
        page: userAuthPage ? userAuthPage - 1 : 0,
      };

      for (const [key, value] of Object.entries(searchParam)) {
        if (value && value !== 'defaultValue') {
          params[key] = value;
        }
      }

      const data = await getUsersByAuthorizationGroup(
        connector,
        selectedAuthGroup.id,
        params,
      );

      if (data.result === 'SUCCESS' && data.data) {
        setUserAuthList(data.data);
        setDefaultUserAuthList(data.data);

        if (data.metadata && data.metadata.totalRecords) {
          let totalRecords = data.metadata.totalRecords;
          totalRecords = totalRecords < 0 ? 1 : totalRecords;
          totalRecords =
            totalRecords % userAuthPageSize === 0
              ? totalRecords / userAuthPageSize
              : Math.ceil(totalRecords / userAuthPageSize);
          setTotalUserAuthPage(totalRecords);
        } else {
          setTotalUserAuthPage(1);
        }
      }
    } catch (error) {
      winiMsg.showSnackbar('사용자 목록 조회 중 오류 발생');
    }
  };

  /**
   * 사용자 권한 일괄 저장
   */
  const saveUserAuthorizations = async () => {
    const saveUserAuthList = [];
    for (const [idx, item] of userAuthList.entries()) {
      if (JSON.stringify(item) !== JSON.stringify(defaultUserAuthList[idx])) {
        saveUserAuthList.push({
          userId: item.userId,
          authorizationGroupUserStatus: item.authorizationGroupUserStatus,
        });
      }
    }

    if (saveUserAuthList.length === 0) {
      winiMsg.showSnackbar('수정된 내용이 없습니다.');
      return;
    }

    try {
      const data = await updateUsersAuthorizationBatch(
        connector,
        selectedAuthGroup.id,
        saveUserAuthList,
      );

      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('성공적으로 저장되었습니다.');
        handleSearch();
      }
    } catch (error) {
      winiMsg.showSnackbar('저장 중 오류 발생.');
    }
  };

  /**
   * 검색 조건 변경 핸들러
   */
  const handleSearchParamChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (value === 'defaultValue') {
      value = '';
    }

    setSearchParam({
      ...searchParam,
      [name]: value,
    });
  };

  /**
   * 검색 실행
   */
  const handleSearch = () => {
    if (!selectedAuthGroup.id) {
      winiMsg.showAlert('권한 선택 후 조회해주세요.');
      return;
    }
    setUserAuthPage(1);
    loadUserAuthorizationList();
  };

  /**
   * 엔터키 검색
   */
  const handleKeyUpSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * 페이지 변경 핸들러
   */
  const handlePageChange = (e, pages) => {
    setUserAuthPage(pages);
  };

  /**
   * 개별 행 클릭 (권한 토글)
   */
  const handleRowClick = (e) => {
    const gridRowIndex = e.rowIndex;

    setUserAuthList((prev) =>
      prev.map((item, idx) => {
        if (idx === gridRowIndex) {
          return {
            ...item,
            authorizationGroupUserStatus:
              item.authorizationGroupUserStatus === 'ENABLE'
                ? 'DISABLE'
                : 'ENABLE',
          };
        }
        return item;
      }),
    );
  };

  /**
   * 전체 선택/해제
   */
  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setUserAuthList((prev) =>
      prev.map((item) => ({
        ...item,
        authorizationGroupUserStatus: checked ? 'ENABLE' : 'DISABLE',
      })),
    );
  };

  /**
   * 개별 셀 값 변경 핸들러
   */
  const handleCellValueChange = (rowIndex, field, value) => {
    setUserAuthList((prev) =>
      prev.map((item, idx) => {
        if (idx === rowIndex) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      }),
    );
  };

  /**
   * 페이지 변경 시 조회
   */
  useEffect(() => {
    loadUserAuthorizationList();
  }, [userAuthPage]);

  /**
   * 권한 그룹 선택 시 검색 초기화 및 조회
   */
  useEffect(() => {
    if (selectedAuthGroup.id) {
      setSearchParam({
        searchKeyword: '',
        status: '',
      });
      setUserAuthPage(1);
      loadUserAuthorizationList();
    }
  }, [selectedAuthGroup]);

  /**
   * 전체 선택 체크박스 상태 업데이트
   */
  useEffect(() => {
    const enabledCount = userAuthList.filter(
      (item) => item.authorizationGroupUserStatus === 'ENABLE',
    ).length;

    setCheckAll(enabledCount === userAuthList.length && userAuthList.length > 0);
  }, [userAuthList]);

  return {
    userAuthList,
    searchParam,
    userAuthPage,
    totalUserAuthPage,
    checkAll,
    handleSearchParamChange,
    handleSearch,
    handleKeyUpSearch,
    handlePageChange,
    handleRowClick,
    handleCheckAll,
    handleCellValueChange,
    saveUserAuthorizations,
  };
};
