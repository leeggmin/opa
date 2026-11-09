import { WiniAgGridReact, WiniBox, WiniGridLayout } from '@/shared/ui/wini';

/**
 * 컬럼 정의 (컴포넌트 외부로 분리하여 재생성 방지)
 */
const COLUMN_DEFS = [
  {
    field: 'groupCode',
    headerName: '권한그룹',
    flex: 1,
    cellStyle: { textAlign: 'center' },
  },
  {
    field: 'groupName',
    headerName: '권한그룹명',
    flex: 1,
    cellStyle: { textAlign: 'center' },
  },
];

/**
 * 권한 그룹 그리드 컴포넌트
 */
export const GroupGrid = ({ authGroupList, onRowClick }) => {

  return (
    <WiniBox className = 'mt-2'>
      <WiniGridLayout container className='h-[735px]'>
        <WiniAgGridReact
          rowData={authGroupList}
          onRowClicked={onRowClick}
          columnDefs={COLUMN_DEFS}
        />
      </WiniGridLayout>
    </WiniBox>
  );
};
