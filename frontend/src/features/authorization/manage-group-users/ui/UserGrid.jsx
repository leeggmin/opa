import { useMemo } from 'react';
import { WiniAgGridReact, WiniBox, WiniGridLayout } from '@/shared/ui/wini';

/**
 * 사용자 권한 그리드 컴포넌트
 */
export const UserGrid = ({
  userAuthList,
  checkAll,
  onRowClick,
  onCheckAll,
  onCellValueChange,
}) => {
  // columnDefs는 의존성이 변경될 때만 재생성
  const columnDefs = useMemo(() => [
    {
      field: 'groupCode',
      headerName: '',
      flex: 1,
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: true,
      valueGetter: (params) =>
        params.data.authorizationGroupUserStatus === 'ENABLE',
      valueSetter: (params) => {
        const rowIndex = params.node.rowIndex;
        const newValue = params.newValue ? 'ENABLE' : 'DISABLE';

        // 상태 변경을 부모 컴포넌트에 위임
        onCellValueChange(rowIndex, 'authorizationGroupUserStatus', newValue);
        return true;
      },
      headerComponent: () => {
        return (
          <WiniBox
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ width: '100%', height: '100%' }}
          >
            <input
              type="checkbox"
              checked={checkAll}
              onClick={(event) => event.stopPropagation()}
              onChange={onCheckAll}
              className="m-0 h-4 w-4 shrink-0 -translate-x-0.5 cursor-pointer p-0 align-middle"
            />
          </WiniBox>
        );
      },
    },
    {
      field: 'username',
      headerName: '사용자 ID',
      flex: 2,
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'fullName',
      headerName: '사용자명',
      flex: 2,
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'status',
      headerName: '사용여부',
      flex: 1,
      cellStyle: { textAlign: 'center' },
      valueGetter: (params) => (params.data.status === 'ENABLE' ? 'Y' : 'N'),
    },
  ], [checkAll, onCheckAll, onCellValueChange]);

  return (
    <WiniGridLayout container sx={{ height: 630 }}>
      <WiniAgGridReact
        rowData={userAuthList}
        onRowClicked={onRowClick}
        columnDefs={columnDefs}
      />
    </WiniGridLayout>
  );
};
