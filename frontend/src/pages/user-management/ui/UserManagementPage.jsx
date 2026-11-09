import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { UserProfileForm } from '@/entities/user';
import {
  UserListSearch,
  UserListGrid,
  useUserList,
} from '@/features/user/list';
import { useUserEditor } from '@/features/user/editor';

/**
 * 사용자 관리 페이지
 */
const UserManagementPage = () => {
  // 목록 조회 및 검색
  const {
    userList,
    searchParam,
    handleSelect,
    handleSearch,
    handleKeyUpSearch,
    handleSearchChange,
  } = useUserList();

  // 편집 (생성/수정/삭제)
  const {
    selectedUser,
    departmentOptions,
    handleRowClick,
    handleChange,
    handleReset,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAcceptJoin,
    handleResetPassword,
    handleUnlockLogin,
    handleGridJoinApproval,
  } = useUserEditor(() => {
    handleSelect(); // 편집 후 목록 새로고침
  });

  return (
    <WiniFormNormal>
      <UserListSearch
        searchParam={searchParam}
        onSearchChange={handleSearchChange}
        onKeyUp={handleKeyUpSearch}
        onSearch={handleSearch}
      />

      <UserListGrid
        userList={userList}
        onCellClick={handleRowClick}
        onJoinApproval={handleGridJoinApproval}
      />

      <UserProfileForm
        title="사용자 상세정보"
        values={selectedUser}
        departmentOptions={departmentOptions}
        onChange={handleChange}
        showAdminOptions={true}
        showActionButtons={true}
        onReset={handleReset}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onAcceptJoin={handleAcceptJoin}
        onResetPassword={handleResetPassword}
        onUnlockLogin={handleUnlockLogin}
      />
    </WiniFormNormal>
  );
};

export { UserManagementPage };
export default UserManagementPage;
