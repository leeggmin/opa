import { forwardRef } from 'react';
import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

export const Grid = forwardRef(
  ({ jobGroupList, onSelectionChanged, height }, ref) => {
    const gridHeight = height || 740;
    return (
      <WiniBox className="mt-2" sx={{ height: `${gridHeight}px` }}>
        <WiniAgGridReact
          ref={ref}
          rowData={jobGroupList}
          columnDefs={[
            {
              field: 'name',
              headerName: '작업그룹목록',
              flex: 1,
              cellClass: 'text-center',
              sortable: false,
            },
          ]}
          onSelectionChanged={onSelectionChanged}
        />
      </WiniBox>
    );
  },
);
