import { WiniGridItem, WiniGridLayout } from '@/shared/ui/wini';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import {
  WiniBox,
  WiniButton,
  WiniDivider,
  WiniText,
} from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import {
  MenuManagementSearch,
  MenuManagementTreeView,
  MenuManagementEditor,
} from '@/features/menu/manage';
import {
  ProgramManagementGrid,
  ProgramManagementEditor,
  ProgramManagementRelationDialog,
} from '@/features/program/manage';
import { MenuProgramMapper } from '@/features/menu/program-mapping';
import { useMenuManagementPage } from '../model/useMenuManagementPage';
import menuSectionStyle from '@/features/menu/manage/ui/Section.module.css';
import programSectionStyle from '@/features/program/manage/ui/Section.module.css';

/**
 * 메뉴 관리 페이지
 * 섹션들을 조합하여 레이아웃만 구성
 */
export const MenuManagementPage = (props) => {
  const {
    isSmallScreen,
    // 메뉴
    searchMenu,
    setSearchMenu,
    menu,
    menuOnly,
    menuTreeRef,
    handleMenuTreeChange,
    menuData,
    selectNode,
    handleToggleNodeCheck,
    handleSearchMenu,
    handleSaveOrder,
    handleInsertMenu,
    handleUpdateMenu,
    handleDeleteMenu,
    handleMenuChange,
    resetMenuData,
    // 프로그램
    programs,
    programGridRef,
    programData,
    searchKeyword,
    setSearchKeyword,
    searchPrograms,
    onSelectionProgramGrid,
    handleInsertProgram,
    handleUpdateProgram,
    handleDeleteProgram,
    handleProgramChange,
    removeRelatedProgram,
    resetProgramData,
    relDialogOpen,
    handleOpenRelDialog,
    handleSelectRelProgram,
    // 매핑
    handleRemovePrograms,
    handleAddPrograms,
  } = useMenuManagementPage(props);

  return (
    <WiniFormNormal>
      <WiniGridLayout container sx={{ width: '100%', minWidth: 0 }}>
        {/* 왼쪽: 메뉴 관리 섹션 */}
        <WiniGridItem item size={{ md: 5, xs: 12 }} sx={{ minWidth: 0 }}>
          <MenuManagementSearch
            searchValue={searchMenu}
            menuOnly={menuOnly}
            onSearchChange={(e) => setSearchMenu(e.target.value)}
            onSearch={handleSearchMenu}
            onSaveOrder={handleSaveOrder}
          />
          <WiniDivider className='mt-2'/>
          <MenuManagementTreeView
            treeRef={menuTreeRef}
            menu={menu}
            onSelect={selectNode}
            onChange={handleMenuTreeChange}
            onToggleCheck={handleToggleNodeCheck}
            className={menuSectionStyle.treestyle}
          />
          <MenuManagementEditor
            menuData={menuData}
            menuOnly={menuOnly}
            onChange={handleMenuChange}
            onInsert={handleInsertMenu}
            onUpdate={handleUpdateMenu}
            onDelete={handleDeleteMenu}
            onReset={resetMenuData}
          />
        </WiniGridItem>

        {/* 중앙: 매핑 버튼 */}
        <WiniGridItem item size={{ md: 1, xs: 12 }} sx={{ minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MenuProgramMapper
            isSmallScreen={isSmallScreen}
            onRemovePrograms={handleRemovePrograms}
            onAddPrograms={handleAddPrograms}
          />
        </WiniGridItem>
        {/* 오른쪽: 프로그램 관리 섹션 */}
        <WiniGridItem item size={{ md: 6, xs: 12 }} sx={{ minWidth: 0 }}>
          <WiniBox ui="search">
            <WiniText
              ui="column"
              label="프로그램 검색"
              name="searchPg"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchPrograms();
                }
              }}
            />
            {winiCom.checkMenuAut(
              's',
              <WiniButton
                ui="default"
                className="w-20 ml-1"
                tabIndex={4}
                onClick={searchPrograms}
              >
                검색
              </WiniButton>,
            )}
          </WiniBox>
          <WiniDivider className='mt-2'/>
          <ProgramManagementGrid
            programs={programs}
            onSelectionChanged={onSelectionProgramGrid}
            gridRef={programGridRef}
          />
          <ProgramManagementEditor
            programData={programData}
            onChange={handleProgramChange}
            onInsert={handleInsertProgram}
            onUpdate={handleUpdateProgram}
            onDelete={handleDeleteProgram}
            onReset={resetProgramData}
            onOpenRelDialog={handleOpenRelDialog}
            onRemoveRelProgram={removeRelatedProgram}
            listStyle={programSectionStyle.list}
          />
          <ProgramManagementRelationDialog
            open={relDialogOpen}
            onClose={handleOpenRelDialog}
            onSelect={handleSelectRelProgram}
          />
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
};

export default MenuManagementPage;
