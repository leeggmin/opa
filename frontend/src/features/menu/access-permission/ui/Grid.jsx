import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniGridItem,
  WiniGridLayout,
  WiniTypography,
} from '@/shared/ui';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴 접근 권한 그리드 컴포넌트
 */
export const Grid = ({
  menuGridDataList,
  onCheckboxChange,
  onSave,
  disabled,
}) => {
  /**
   * 체크박스 셀 렌더러 설정
   */
  const createCheckboxColumn = (field, headerName) => ({
    field,
    headerName,
    cellRenderer: 'agCheckboxCellRenderer',
    cellEditor: 'agCheckboxCellEditor',
    editable: true,
    minWidth: 90,
    flex: 1,
    cellStyle: { textAlign: 'center' },
    valueGetter: (params) => params.data[field] === 'ALLOW',
    valueSetter: (params) => {
      onCheckboxChange(params);
    },
    onCellClicked: (params) => {
      params.newValue = !params.value;
      onCheckboxChange(params);
    },
  });

  const columnDefs = [
    {
      field: 'name',
      headerName: '메뉴명',
      minWidth: 300,
      flex: 4,
      cellRenderer: (params) => {
        const numSpaces = params.data.depth || 0;
        const space = 'ㅤ'.repeat(numSpaces);
        let returnV = '';
        if (numSpaces > 1) {
          returnV = space + params.value;
        } else {
          returnV = params.value;
        }
        return returnV.replaceAll('&nbsp;', '');
      },
      cellStyle: { textAlign: 'left' },
    },
    createCheckboxColumn('chkAll', '전체'),
    createCheckboxColumn('selectStatus', '조회'),
    createCheckboxColumn('insertStatus', '등록'),
    createCheckboxColumn('updateStatus', '수정'),
    createCheckboxColumn('deleteStatus', '삭제'),
    createCheckboxColumn('printStatus', '출력'),
    createCheckboxColumn('downStatus', '다운'),
    createCheckboxColumn('manageStatus', '관리'),
    createCheckboxColumn('custom1Status', '기타1'),
    createCheckboxColumn('custom2Status', '기타2'),
    createCheckboxColumn('custom3Status', '기타3'),
  ];

  return (
    <WiniGridItem size={{ lg: 8, xs: 12 }}>
      <WiniGridLayout container >
        <WiniGridItem size={{ lg: 12, xs: 12 }}>
          <WiniBox display={'flex'} justifyContent={'space-between'}>
            <WiniTypography className='font-bold mt-2 ml-1'>메뉴별 권한 관리</WiniTypography>
            {winiCom.checkMenuAut(
              'i',
              <WiniButton
                ui="default"
                className="w-20 ml-1"
                tabIndex={4}
                onClick={onSave}
                disabled={disabled}
              >
                등록
              </WiniButton>
            )}
          </WiniBox>
        </WiniGridItem>

        <WiniBox className="w-full h-390">
          <WiniAgGridReact
            rowStyle={{ lineHeight: 20 }}
            rowData={menuGridDataList}
            columnDefs={columnDefs}
          />
        </WiniBox>
      </WiniGridLayout>
    </WiniGridItem>
  );
};
