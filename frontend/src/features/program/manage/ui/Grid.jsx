import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';
import { STATUS_LABELS } from '@/shared/config/menuTypes';

/**
 * 프로그램 그리드
 */
export const Grid = ({ programs, onSelectionChanged, gridRef }) => {
  const gridstatusEnums = (data) => {
    return STATUS_LABELS[data.value] || data.value;
  };

  return (
    <WiniBox className='mt-4 h-[440px]'>
      <WiniAgGridReact
        ref={gridRef}
        rowData={programs}
        columnDefs={[
          {
            field: 'chk',
            width: 100,
            headerName: '선택',
            cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            cellRenderer: (params) => (
              <input
                type="checkbox"
                checked={params.value || false}
                readOnly
                style={{ cursor: 'pointer' }}
              />
            ),
            onCellClicked: (params) => {
              const newValue = !params.data.chk;
              params.node.setDataValue('chk', newValue);
            },
          },
          {
            field: 'num',
            headerName: 'No',
            flex: 1,
            cellStyle: { textAlign: 'center' },
            sortable: false,
          },
          {
            field: 'programCode',
            headerName: '화면 Code',
            flex: 1,
            cellStyle: { textAlign: 'center' },
            sortable: false,
          },
          {
            field: 'programName',
            headerName: '화면 명',
            width: 250,
            cellStyle: { textAlign: 'center' },
            sortable: false,
          },
          {
            field: 'status',
            headerName: '사용여부',
            flex: 1,
            cellStyle: { textAlign: 'center' },
            sortable: false,
            valueFormatter: gridstatusEnums,
          },
        ]}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        rowSelection="single"
        onSelectionChanged={onSelectionChanged}
      />
    </WiniBox>
  );
};
