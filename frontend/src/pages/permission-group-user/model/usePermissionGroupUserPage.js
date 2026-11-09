import { useCallback, useEffect } from 'react';
import { useGroupList } from '@/features/authorization/manage-group-users/model/useGroupList';
import { useUserList } from '@/features/authorization/manage-group-users/model/useUserList';
import { useCodeOptions } from '@/features/authorization/manage-group-users/model/useCodeOptions';

/**
 * 사용자 권한 관리 페이지 비즈니스 로직 Hook
 * 페이지 레벨 상태와 섹션 간 상호작용 관리
 */
export const usePermissionGroupUserPage = (props) => {
  // 페이지 레벨 성공 콜백
  const onSuccess = useCallback(() => {
    try {
      if (props.getParams) props.getParams.reLoad();
    } catch (e) {}
  }, [props.getParams]);

  // 권한 그룹 관리
  const {
    authGroupList,
    selectedAuthGroup,
    handleSelectAuthGroup,
    loadAuthorizationGroups,
  } = useGroupList();

  // 사용자 권한 관리
  const {
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
  } = useUserList(selectedAuthGroup);

  // 코드 옵션
  const { useStatusOptions } = useCodeOptions();

  // 기존 useSection 동작 유지
  useEffect(() => {
    loadAuthorizationGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    await saveUserAuthorizations();
    onSuccess();
  };

  const userAuthSection = {
    authGroupList,
    selectedAuthGroup,
    userAuthList,
    searchParam,
    userAuthPage,
    totalUserAuthPage,
    checkAll,
    useStatusOptions,
    handleSelectAuthGroup,
    handleSearchParamChange,
    handleSearch,
    handleKeyUpSearch,
    handlePageChange,
    handleRowClick,
    handleCheckAll,
    handleCellValueChange,
    handleSave,
  };

  return {
    userAuthSection,
  };
};
