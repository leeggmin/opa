import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniBox, WiniGridItem } from '@/shared/ui';
import {
  ListAuthorizationGroupSearch,
  ListAuthorizationGroupTree,
  useListAuthorizationGroup,
} from '@/features/authorization/list-groups';
import {
  EditAuthorizationGroupEditor,
  useEditAuthorizationGroup,
} from '@/features/authorization/edit-group';
import {
  MenuAccessPermissionGrid,
  useMenuAccessPermission,
} from '@/features/menu/access-permission';

/**
 * 권한 관리 페이지
 */
const MenuAccessPermissionPage = () => {
  // 목록 조회 및 검색
  const {
    authTreeDataList,
    authList,
    searchAuthNm,
    handleSelect,
    handleSearch,
    handleKeyUpSearch,
    handleSearchChange,
  } = useListAuthorizationGroup();

  // 편집 (등록/수정/삭제)
  const {
    authInfo,
    selectedAuthTreeData,
    handleTreeSelect,
    handleChange,
    handleCheckboxChange,
    handleReset,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useEditAuthorizationGroup(() => {
    handleSelect(); // 편집 후 목록 새로고침
  });

  // 메뉴별 권한 관리
  const {
    menuGridDataList,
    handleCheckboxChange: handleMenuCheckboxChange,
    handleSave,
  } = useMenuAccessPermission(selectedAuthTreeData.id);

  return (
    <WiniFormNormal>
      <WiniGridLayout container rowSpacing={1} columnSpacing={1}>
        {/* 좌측: 권한 트리 및 편집 폼 */}
        <WiniGridItem size={{ lg: 4, xs: 12 }}>
          <ListAuthorizationGroupSearch
            searchAuthNm={searchAuthNm}
            onSearchChange={handleSearchChange}
            onKeyUp={handleKeyUpSearch}
            onSearch={handleSearch}
          />

          <WiniBox>
            <ListAuthorizationGroupTree
              authTreeDataList={authTreeDataList}
              onSelect={handleTreeSelect}
              onReset={handleReset}
            />

            <EditAuthorizationGroupEditor
              authInfo={authInfo}
              authList={authList}
              onChange={handleChange}
              onCheckboxChange={handleCheckboxChange}
              onReset={handleReset}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </WiniBox>
        </WiniGridItem>

        {/* 우측: 메뉴별 권한 그리드 */}
        <MenuAccessPermissionGrid
          menuGridDataList={menuGridDataList}
          onCheckboxChange={handleMenuCheckboxChange}
          onSave={() => handleSave(authInfo.id)}
          disabled={!authInfo.id}
        />
      </WiniGridLayout>
    </WiniFormNormal>
  );
};

export default MenuAccessPermissionPage;
