import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniBox, WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';
import {
  CommonCodeManageSearchBar,
  CommonCodeManageGrid,
  CommonCodeManageEditor,
  CommonCodeManageButtons,
  useCommonCodeManageList,
  useCommonCodeManageEditor,
  useCommonCodeManageDepthHandlers,
  useCommonCodeManageActions,
} from '@/features/common-code/manage';

/**
 * 공통 코드 페이지
 */
export const CommonCodePage = (props) => {
  const needUpdate = true;

  // 코드 목록 관리
  const {
    codeGridRef1,
    codeGridRef2,
    codeGridRef3,
    searchData,
    setSearchData,
    codeListDepth1,
    codeListDepth2,
    codeListDepth3,
    handleKeywordChange,
    handleSearchDepth1,
    handleSearchDepth2,
    handleSearchDepth3,
    loadCodeListDepth1,
    loadCodeListDepth2,
    loadCodeListDepth3,
  } = useCommonCodeManageList();

  // 새로고침 함수
  const handleRefresh = (depthLv) => {
    if (depthLv === '1') {
      loadCodeListDepth1();
    } else if (depthLv === '2') {
      loadCodeListDepth2();
    } else if (depthLv === '3') {
      loadCodeListDepth3();
    }
  };

  // 코드 편집 관리
  const {
    codeFrmRef,
    selectedCodeData,
    formDisabled,
    type,
    handleChange,
    handleCheckboxChange,
    handleRowClick,
    handleAdd,
    handleSave,
    handleUpdate,
    handleDelete,
    setSelectedCodeData,
    setFormDisabled,
    setType,
  } = useCommonCodeManageEditor(searchData, handleRefresh);

  // Depth별 추가/행 클릭 핸들러
  const {
    handleAddDepth1,
    handleAddDepth2,
    handleAddDepth3,
    handleRowClickDepth1,
    handleRowClickDepth2,
    handleRowClickDepth3,
  } = useCommonCodeManageDepthHandlers({
    searchData,
    setSearchData,
    codeGridRefs: {
      ref1: codeGridRef1,
      ref2: codeGridRef2,
      ref3: codeGridRef3,
    },
    handleAdd,
    handleRowClick,
    setSelectedCodeData,
    setFormDisabled,
  });

  // 저장/수정/삭제 핸들러
  const { onSave, onUpdate, onDelete } = useCommonCodeManageActions({
    type,
    handleSave,
    handleUpdate,
    handleDelete,
  });

  return (
    <WiniFormNormal>
      <WiniGridLayout container columnSpacing={1}>
        {/* Depth 1 */}
        <WiniGridItem sx={4}>
          <WiniGridLayout container>
            <CommonCodeManageSearchBar
              keyword={searchData.depth1Keyword}
              onKeywordChange={(e) => handleKeywordChange(1, e.target.value)}
              onSearch={handleSearchDepth1}
              onAdd={handleAddDepth1}
              canSearch={true}
              needUpdate={needUpdate}
            />
            <CommonCodeManageGrid
              ref={codeGridRef1}
              rowData={codeListDepth1}
              onRowClicked={handleRowClickDepth1}
            />
          </WiniGridLayout>
        </WiniGridItem>

        {/* Depth 2 */}
        <WiniGridItem sx={4}>
          <WiniGridLayout container>
            <CommonCodeManageSearchBar
              keyword={searchData.depth2Keyword}
              onKeywordChange={(e) => handleKeywordChange(2, e.target.value)}
              onSearch={handleSearchDepth2}
              onAdd={handleAddDepth2}
              canSearch={!!searchData.depth1CodeId}
              needUpdate={needUpdate}
            />
            <CommonCodeManageGrid
              ref={codeGridRef2}
              rowData={codeListDepth2}
              onRowClicked={handleRowClickDepth2}
            />
          </WiniGridLayout>
        </WiniGridItem>

        {/* Depth 3 */}
        <WiniGridItem sx={4}>
          <WiniGridLayout container>
            <CommonCodeManageSearchBar
              keyword={searchData.depth3Keyword}
              onKeywordChange={(e) => handleKeywordChange(3, e.target.value)}
              onSearch={handleSearchDepth3}
              onAdd={handleAddDepth3}
              canSearch={!!searchData.depth2CodeId}
              needUpdate={needUpdate}
            />
            <CommonCodeManageGrid
              ref={codeGridRef3}
              rowData={codeListDepth3}
              onRowClicked={handleRowClickDepth3}
            />
          </WiniGridLayout>
        </WiniGridItem>
      </WiniGridLayout>

      {/* 편집 폼 */}
      <CommonCodeManageEditor
        ref={codeFrmRef}
        codeData={selectedCodeData}
        nowDepth={searchData.nowDepth}
        upperCode={{
          depth1: searchData.depth1Code,
          depth2: searchData.depth2Code,
        }}
        upperCodeName={{
          depth1: searchData.depth1CodeName,
          depth2: searchData.depth2CodeName,
        }}
        onChange={handleChange}
        onCheckboxChange={handleCheckboxChange}
        formDisabled={formDisabled}
      />

      {/* 버튼 */}
      <CommonCodeManageButtons
        needUpdate={needUpdate}
        formDisabled={formDisabled}
        onSave={onSave}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </WiniFormNormal>
  );
};

export default CommonCodePage;
