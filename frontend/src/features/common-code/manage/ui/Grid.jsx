import { forwardRef } from 'react';
import { WiniAgGridReact, WiniGridItem } from '@/shared/ui/wini';

const columnDefs = [
  {
    field: 'code',
    headerName: '코드',
    flex: 2,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'codeName',
    headerName: '코드명',
    flex: 2,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'codeOrderNo',
    headerName: '순서',
    flex: 1,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'codeUseStatus',
    headerName: '사용여부',
    flex: 1,
    cellStyle: { textAlign: 'center' },
    valueGetter: (params) => (params.data.codeUseStatus === 'USED' ? 'Y' : 'N'),
  },
];

/**
 * 공통 코드 그리드
 */
export const Grid = forwardRef(({ rowData, onRowClicked }, ref) => {
  return (
    <WiniGridItem
      size={{ lg: 12, md: 12, xs: 12 }}
      className="pt-2 min-h-[450px]"
    >
      <WiniAgGridReact
        ref={ref}
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClicked={onRowClicked}
      />
    </WiniGridItem>
  );
});
Grid.displayName = 'Grid';
