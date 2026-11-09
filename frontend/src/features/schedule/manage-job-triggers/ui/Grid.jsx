import { forwardRef } from 'react';
import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

export const Grid = forwardRef(
  ({ triggerList, applyStatusCellRenderer, onSelectionChanged }, ref) => {
    return (
      <WiniBox className='h-[444px]'>
        <WiniAgGridReact
          ref={ref}
          rowData={triggerList}
          columnDefs={[
            {
              field: 'name',
              headerName: '스케줄 목록',
              flex: 1,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'applyStatus',
              headerName: '적용상태',
              width: 90,
              cellStyle: { textAlign: 'center' },
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
