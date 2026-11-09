import { WiniBox, WiniGridLayout, WiniPagination } from '@/shared/ui/wini';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import {
  ManageGroupUsersGroupGrid,
  ManageGroupUsersSearch,
  ManageGroupUsersUserGrid,
} from '@/features/authorization/manage-group-users';
import { usePermissionGroupUserPage } from '../model/usePermissionGroupUserPage';

/**
 * 사용자 권한 관리 페이지
 * 섹션을 조합하여 레이아웃만 구성
 */
export default function PermissionGroupUserPage(props) {
  const { userAuthSection } = usePermissionGroupUserPage(props);
  const {
    authGroupList,
    userAuthList,
    searchParam,
    userAuthPage,
    totalUserAuthPage,
    checkAll,
    useStatusOptions,
    handleSelectAuthGroup,
    handleSearchParamChange,
    handleKeyUpSearch,
    handlePageChange,
    handleRowClick,
    handleCheckAll,
    handleCellValueChange,
  } = userAuthSection;

  return (
    <WiniFormNormal>
      <WiniBox>
        <WiniGridLayout container>
          <WiniGridLayout
            size={{ lg: 5, md: 5, xs: 12 }}
            className="border-none p-1 mt-1"
          >
            <ManageGroupUsersGroupGrid
              authGroupList={authGroupList}
              onRowClick={(e) => handleSelectAuthGroup(e.data)}
            />
          </WiniGridLayout>

          <WiniGridLayout
            size={{ lg: 7, md: 7, xs: 12 }}
            className="border-none"
          >
            <WiniBox className="m-1 mt-0">
              <ManageGroupUsersSearch
                searchParam={searchParam}
                useStatusOptions={useStatusOptions}
                onSearchChange={handleSearchParamChange}
                onKeyUp={handleKeyUpSearch}
                userAuthSection={userAuthSection}
              />

              <ManageGroupUsersUserGrid
                userAuthList={userAuthList}
                checkAll={checkAll}
                onRowClick={handleRowClick}
                onCheckAll={handleCheckAll}
                onCellValueChange={handleCellValueChange}
              />

              <WiniBox
                className="m-3"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <WiniPagination
                  count={totalUserAuthPage}
                  page={userAuthPage}
                  size="small"
                  onChange={handlePageChange}
                />
              </WiniBox>
            </WiniBox>
          </WiniGridLayout>
        </WiniGridLayout>
      </WiniBox>
    </WiniFormNormal>
  );
}
