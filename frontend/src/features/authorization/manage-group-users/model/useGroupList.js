import { useState, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { getAuthorizationGroups } from '../api/api';

/**
 * 권한 그룹 목록 관리 Hook
 */
export const useGroupList = () => {
  const { connector } = winiCom.getFormInfo();

  const [authGroupList, setAuthGroupList] = useState([]);
  const [selectedAuthGroup, setSelectedAuthGroup] = useState({});

  /**
   * 권한 그룹 목록 조회
   */
  const loadAuthorizationGroups = async () => {
    try {
      const data = await getAuthorizationGroups(connector);
      if (data.result === 'SUCCESS' && data.data) {
        setAuthGroupList(data.data);
      }
    } catch (error) {
      winiMsg.showSnackbar('권한 목록 조회 중 오류 발생');
    }
  };

  /**
   * 권한 그룹 선택 핸들러
   */
  const handleSelectAuthGroup = (authGroup) => {
    setSelectedAuthGroup(authGroup);
  };

  /**
   * 초기 로드
   */
  useEffect(() => {
    loadAuthorizationGroups();
  }, []);

  return {
    authGroupList,
    selectedAuthGroup,
    handleSelectAuthGroup,
    loadAuthorizationGroups,
  };
};
