import { useCallback } from 'react';
import { winiMsg } from '@/shared/model';

/**
 * Depth별 추가/행 클릭 핸들러 관리
 */
export const useDepthHandlers = ({
  searchData,
  setSearchData,
  codeGridRefs,
  handleAdd,
  handleRowClick,
  setSelectedCodeData,
  setFormDisabled,
}) => {
  // depth 초기화 헬퍼 함수
  const resetDepthData = useCallback(
    (fromDepth) => {
      const resetData = { ...searchData };
      if (fromDepth <= 1) {
        resetData.depth1Code = '';
        resetData.depth1CodeId = '';
        resetData.depth1CodeName = '';
      }
      if (fromDepth <= 2) {
        resetData.depth2Code = '';
        resetData.depth2CodeId = '';
        resetData.depth2CodeName = '';
      }
      resetData.depth3Code = '';
      resetData.depth3CodeId = '';
      resetData.depth3CodeName = '';
      return resetData;
    },
    [searchData],
  );
  // Depth1 추가
  const handleAddDepth1 = useCallback(() => {
    setSearchData({
      ...resetDepthData(1),
      nowDepth: '1',
    });
    handleAdd(1);
    codeGridRefs.ref1.current?.api.deselectAll();
  }, [resetDepthData, setSearchData, handleAdd, codeGridRefs]);

  // Depth2 추가
  const handleAddDepth2 = useCallback(() => {
    if (searchData.depth1CodeId) {
      setSearchData({
        ...resetDepthData(2),
        nowDepth: '2',
      });
      handleAdd(
        2,
        searchData.depth1CodeId,
        searchData.depth1Code,
        searchData.depth1CodeName,
      );
      codeGridRefs.ref2.current?.api.deselectAll();
    } else {
      setSelectedCodeData({});
      setFormDisabled({
        inputCode: true,
        saveBtn: true,
        updateBtn: true,
        deleteBtn: true,
      });
      winiMsg.showAlert('1단계 코드를 선택해주세요.');
    }
  }, [
    searchData,
    resetDepthData,
    setSearchData,
    handleAdd,
    codeGridRefs,
    setSelectedCodeData,
    setFormDisabled,
  ]);

  // Depth3 추가
  const handleAddDepth3 = useCallback(() => {
    if (searchData.depth2CodeId) {
      setSearchData({
        ...resetDepthData(3),
        nowDepth: '3',
      });
      handleAdd(
        3,
        searchData.depth2CodeId,
        searchData.depth2Code,
        searchData.depth2CodeName,
      );
      codeGridRefs.ref3.current?.api.deselectAll();
    } else {
      setSelectedCodeData({});
      setFormDisabled({
        inputCode: true,
        saveBtn: true,
        updateBtn: true,
        deleteBtn: true,
      });
      winiMsg.showAlert('2단계 코드를 선택해주세요.');
    }
  }, [
    searchData,
    resetDepthData,
    setSearchData,
    handleAdd,
    codeGridRefs,
    setSelectedCodeData,
    setFormDisabled,
  ]);

  // Depth1 행 클릭
  const handleRowClickDepth1 = useCallback(
    (e) => {
      setSearchData({
        ...resetDepthData(1),
        depth1CodeId: e.data.codeId,
        depth1Code: e.data.code,
        depth1CodeName: e.data.codeName,
        nowDepth: '1',
      });
      handleRowClick(e, 1);
    },
    [resetDepthData, setSearchData, handleRowClick],
  );

  // Depth2 행 클릭
  const handleRowClickDepth2 = useCallback(
    (e) => {
      setSearchData({
        ...resetDepthData(2),
        depth2CodeId: e.data.codeId,
        depth2Code: e.data.code,
        depth2CodeName: e.data.codeName,
        nowDepth: '2',
      });
      handleRowClick(e, 2);
    },
    [resetDepthData, setSearchData, handleRowClick],
  );

  // Depth3 행 클릭
  const handleRowClickDepth3 = useCallback(
    (e) => {
      setSearchData({
        ...searchData,
        depth3CodeId: e.data.codeId,
        depth3Code: e.data.code,
        depth3CodeName: e.data.codeName,
        nowDepth: '3',
      });
      handleRowClick(e, 3);
    },
    [searchData, setSearchData, handleRowClick],
  );

  return {
    handleAddDepth1,
    handleAddDepth2,
    handleAddDepth3,
    handleRowClickDepth1,
    handleRowClickDepth2,
    handleRowClickDepth3,
  };
};
