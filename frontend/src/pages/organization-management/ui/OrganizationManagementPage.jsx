import { OrganizationManageDialog, OrganizationManageGrid, OrganizationManageSearch, useOrganizationList } from '@/features/organization/manage';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { useEffect } from 'react';


/**
 * 기관 관리 페이지
 */
const OrganizationManagementPage = () => {
  // 목록 조회 및 검색
  const {
    open,
    onClose,
    onTextChange,
    onSave,
    onDelete,
    selectedOrg,
    gridApiRef,
    orgList,
    onSelectionChanged,
    onCellDoubleClicked,
    handleSearch,
    searchParam,
    setSearchParam, 
    openCreate,
  } = useOrganizationList();

  useEffect(() => {
    handleSearch();
  }, []);
  // const { orgList, searchOrg, setSearchOrg, handleSelect, handleKeyUpSearch } =
  //   useOrganizationList();

  // 편집 (생성/수정/삭제)
  // const {
  //   selectedOrg,
  //   setSelectedOrg,
  //   handleSave,
  //   handleDelete,
  //   handleChangeSelectedOrg,
  //   open,
  //   handleDialogToggle,
  //   handleRowDoubleClick,
  //   handleAddClick,
  // } = useOrganizationEditor(() => {
  //   handleSelect(); // 편집 후 목록 새로고침
  //   handleDialogToggle(); // 다이얼로그 닫기
  // });


  return (
    <WiniFormNormal>
      <OrganizationManageSearch
        handleSearch={handleSearch}
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        openCreate={openCreate}
      />
      <OrganizationManageGrid
        gridApiRef={gridApiRef}
        orgList={orgList}
        onSelectionChanged={onSelectionChanged}
        onCellDoubleClicked={onCellDoubleClicked}
      />
      <OrganizationManageDialog 
      selectedData={selectedOrg}
      onChange={onTextChange}
      onSave={onSave}
      onDelete={onDelete}
      open={open} 
      onClose={onClose} />
      {/* <OrganizationListSearch
        searchOrg={searchOrg}
        setSearchOrg={setSearchOrg}
        onKeyUp={handleKeyUpSearch}
        onSelect={handleSelect}
        handleAddClick={handleAddClick}
      />

      <OrganizationListGrid
        orgList={orgList}
        onRowDoubleClicked={handleRowDoubleClick}
        onCellClicked={handleJoinDialogOpen}
      /> */}

      {/* <OrganizationApprovalDialog
        open={openJoin}
        onClose={handleJoinDialogClose}
        onApprove={handleApprove}
      /> */}
    </WiniFormNormal>
  );
};

export default OrganizationManagementPage;
