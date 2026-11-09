import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';

const gridStatusEnums = (data) => {
  const enums = {
    DISABLE: '미사용',
    ENABLE: '사용',
  };
  return enums[data.value];
};

/**
 * 프로그램 목록 그리드
 */
export const ProgramGrid = ({ rowData, onSelectionChanged }) => {
  return (
    <WiniBox className='h-full'>
      <WiniAgGridReact
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
            field: 'programCode',
            headerName: '화면 Code',
            flex: 1,
            cellStyle: { textAlign: 'center' },
            sortable: false,
          },
          {
            field: 'programName',
            headerName: '화면 명',
            flex: 2,
            cellStyle: { textAlign: 'center' },
            sortable: false,
          },
          {
            field: 'status',
            headerName: '사용여부',
            width: 100,
            cellStyle: { textAlign: 'center' },
            sortable: false,
            valueFormatter: gridStatusEnums,
          },
        ]}
        onSelectionChanged={onSelectionChanged}
      />
    </WiniBox>
  );
};
