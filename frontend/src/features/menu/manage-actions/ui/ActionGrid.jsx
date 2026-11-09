import { forwardRef } from 'react';
import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

/**
 * 액션 목록 그리드
 */
export const ActionGrid = forwardRef(
  ({ rowData, onSelectionChanged }, ref) => {
    return (
      <WiniBox className='h-[400px]'>
        <WiniAgGridReact
          ref={ref}
          rowData={rowData}
          columnDefs={[
            {
              field: 'num',
              headerName: 'No',
              width: 80,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'actionType',
              headerName: '액션 유형',
              width: 120,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'authType',
              headerName: '권한 유형',
              flex: 1,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'uri',
              headerName: 'URI',
              flex: 2,
              cellStyle: { textAlign: 'left' },
              sortable: false,
            },
          ]}
          onSelectionChanged={onSelectionChanged}
        />
      </WiniBox>
    );
  },
);
