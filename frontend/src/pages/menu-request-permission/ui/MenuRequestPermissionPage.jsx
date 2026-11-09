import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';
import {
  MenuProgramSearchBar,
  MenuProgramGrid,
  MenuSelectedProgramInfo,
  MenuActionTypeFilter,
  MenuActionGrid,
  MenuActionEditor,
  useMenuProgramList,
  useMenuActionList,
  useMenuActionEditor,
  useMenuSourceLoader,
} from '@/features/menu/manage-actions';
import React from 'react';

/**
 * 시스템 메뉴 액션 관리 페이지
 */
export const MenuRequestPermissionPage = (props) => {
  const formRef = React.useRef();

  // 프로그램 목록 관리
  const {
    listView,
    searchPg,
    selectedData,
    handleSearchChange,
    handleSearch,
    handleProgramSelect,
    loadProgramList,
  } = useMenuProgramList();

  // 액션 목록 관리
  const {
    refActionGrid,
    actionAllList,
    actionList,
    actionTypeFilter,
    setReloadId,
    handleFilterChange,
    loadActionList,
  } = useMenuActionList(selectedData.id);

  // 액션 편집 (등록/수정/삭제)
  const {
    // formRef,
    selectedActionData,
    handleActionSelect,
    handleChange,
    handleReset,
    handleSave,
    handleDelete,
  } = useMenuActionEditor(selectedData, (reloadId) => {
    loadActionList();
    if (reloadId) {
      setReloadId(reloadId);
    }
  },formRef);

  // 소스에서 가져오기
  const { loadFromSource } = useMenuSourceLoader(
    selectedData,
    actionAllList,
    () => {
      loadActionList();
    },
  );

  return (
    <WiniFormNormal>
      {/* scrollFix: WiniGridItem에 y축 스크롤 가능 */}
      <WiniGridLayout container columnSpacing={2} scrollFix >
        {/*  scrollHidden: y축 스크롤 숨겨짐 */}
        <WiniGridItem scrollHidden>
          {/* 좌측: 프로그램 목록 */}
          <MenuProgramSearchBar
            searchValue={searchPg}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
          />
          <MenuProgramGrid
            rowData={listView}
            onSelectionChanged={handleProgramSelect}
          />
        </WiniGridItem>

        {/* 우측: 액션 목록 및 편집 */}
        <WiniGridItem ratio={1.5}>
          <MenuSelectedProgramInfo
            programCode={selectedData.code}
            programName={selectedData.name}
          />

          <MenuActionTypeFilter
            value={actionTypeFilter}
            onChange={handleFilterChange}
          />

          <MenuActionGrid
            ref={refActionGrid}
            rowData={actionList}
            onSelectionChanged={handleActionSelect}
          />

          <MenuActionEditor
            ref={formRef}
            actionData={selectedActionData}
            selectedProgramId={selectedData.id}
            selectedProgramMapping={selectedData.mapping}
            selectedActionId={selectedActionData.programActionId}
            actionAllList={actionAllList}
            onChange={handleChange}
            onReset={handleReset}
            onSave={handleSave}
            onDelete={handleDelete}
            onLoadFromSource={loadFromSource}
          />
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
};

export default MenuRequestPermissionPage;
