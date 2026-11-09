import { forwardRef } from 'react';
import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

export const Grid = forwardRef(
  ({ jobList, applyStatusCellRenderer, onSelectionChanged }, ref) => {
    return (
      <WiniBox className="h-[780px]">
        <WiniAgGridReact
          ref={ref}
          rowData={jobList}
          columnDefs={[
            {
              field: 'name',
              headerName: '작업목록',
              flex: 1,
              cellClass: 'text-center',
              sortable: false,
            },
            {
              field: 'jobType',
              headerName: '유형',
              width: 70,
              cellClass: 'text-center',
              sortable: false,
            },
            {
              field: 'applyStatus',
              headerName: '적용상태',
              width: 90,
              cellClass: 'text-center',
              sortable: false,
              cellRenderer: applyStatusCellRenderer,
            },
          ]}
          onSelectionChanged={onSelectionChanged}
        />
      </WiniBox>
    );
  },
);
