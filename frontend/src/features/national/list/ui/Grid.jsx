import * as React from 'react';
import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

const columnDefs = [
  {
    field: 'nationalCode',
    headerName: 'National Code',
    flex: 1,
    headerClass: 'ag-header-center',
    cellClass: 'text-center',
  },
  {
    field: 'nationalName',
    headerName: 'National Name',
    flex: 2,
    headerClass: 'ag-header-center',
    cellClass: 'text-center',
  },
];

export const Grid = (props) => {
  return (
    <WiniBox className="h-[700px]">
      <WiniAgGridReact
        rowData={props.rowData || []}
        columnDefs={columnDefs}
        onCellDoubleClicked={(e) => props.onRowDoubleClick?.(e?.data)}
      />
    </WiniBox>
  );
};
