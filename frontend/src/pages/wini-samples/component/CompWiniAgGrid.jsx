import React, { useMemo, useState } from 'react';
import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniFormControl,
  WiniMenuItem,
  WiniPagination,
  WiniSelect,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection, useGuideCopy } from './CompGuideCommon';

const BASE_ROW_DATA = [
  {
    id: 1,
    code: 'MENU_001',
    name: '대시보드',
    useYn: 'Y',
    updatedAt: '2026-02-01 09:30',
  },
  {
    id: 2,
    code: 'MENU_002',
    name: '사용자 관리',
    useYn: 'Y',
    updatedAt: '2026-02-05 14:20',
  },
  {
    id: 3,
    code: 'MENU_003',
    name: '권한 설정',
    useYn: 'N',
    updatedAt: '2026-02-11 11:10',
  },
  {
    id: 4,
    code: 'MENU_004',
    name: '로그 조회',
    useYn: 'Y',
    updatedAt: '2026-02-17 17:42',
  },
];

const PAGINATION_ROW_DATA = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  code: `MENU_${String(index + 1).padStart(3, '0')}`,
  name: `메뉴 ${index + 1}`,
  useYn: index % 2 === 0 ? 'Y' : 'N',
  updatedAt: `2026-02-${String((index % 28) + 1).padStart(2, '0')} 10:00`,
}));

const BASE_COLUMN_DEFS = [
  {
    headerName: 'No',
    field: 'id',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '코드',
    field: 'code',
    minWidth: 140,
  },
  {
    headerName: '메뉴명',
    field: 'name',
    minWidth: 180,
  },
  {
    headerName: '사용여부',
    field: 'useYn',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '수정일시',
    field: 'updatedAt',
    minWidth: 180,
  },
];

const CHECKBOX_COLUMN_DEFS = [
  {
    headerName: 'No',
    field: 'id',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '메뉴명',
    field: 'name',
    minWidth: 180,
  },
  {
    headerName: '사용여부',
    field: 'useYn',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
];

const PAGINATION_PAGE_SIZE = 10;
const NOTICE_PAGE_SIZE = 10;

const PAGINATION_UI_OPTIONS = [
  {
    value: 'number',
    label: '번호형 (1 2 3 4 5)',
  },
  {
    value: 'fraction',
    label: '분수형 (1 / 10)',
  },
];

const PAGINATION_GUIDE_CODES = {
  number: `<WiniBox className="h-[340px]">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    pagination
    paginationUi="number"
    paginationPageSize={10}
  />
</WiniBox>`,
  fraction: `<WiniBox className="h-[340px]">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    pagination
    paginationUi="fraction"
    paginationPageSize={10}
  />
</WiniBox>`,
};

const NOTICE_PAGINATION_GUIDE_CODE = `<WiniBox className="h-[340px]">
  <WiniAgGridReact
    rowData={pagedRows}
    columnDefs={columnDefs}
  />
</WiniBox>

<WiniBox className="mt-3 flex justify-center">
  <WiniPagination
    count={totalPage}
    page={page}
    size="small"
    onChange={(_event, nextPage) => setPage(nextPage)}
  />
</WiniBox>`;

const SECTIONS = [
  {
    key: 'basic',
    title: '기본 그리드',
    description: [
      '역할: 행 데이터와 컬럼 정의만으로 가장 기본적인 목록 테이블을 렌더링합니다.',
      '사용 상황: 메뉴 목록, 사용자 목록, 기준 정보 목록처럼 표 형태의 데이터를 처음 구성할 때 사용합니다.',
      '사용 방법: `rowData`와 `columnDefs`를 준비하고, 부모 박스에 높이를 지정한 뒤 그리드를 렌더링합니다.',
    ],
    requiredItems: [
      '`rowData`',
      '`columnDefs`',
      '그리드 높이를 가진 부모 컨테이너',
    ],
    optionalItems: [
      '컬럼별 `width`, `minWidth`, `cellStyle`',
      '`className`으로 높이 지정',
    ],
    requiredProps: [
      {
        name: 'rowData',
        description: '표시할 행 데이터 배열입니다.',
      },
      {
        name: 'columnDefs',
        description:
          '컬럼 헤더, 필드명, 폭, 셀 스타일 등을 정의하는 배열입니다.',
          example: `const columnDefs = [
  {
    headerName: 'No',
    field: 'id',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '코드',
    field: 'code',
    minWidth: 140,
  },
  {
    headerName: '메뉴명',
    field: 'name',
    minWidth: 180,
  },
  {
    headerName: '사용여부',
    field: 'useYn',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '수정일시',
    field: 'updatedAt',
    minWidth: 180,
  },
];`,
      },
      {
        name: 'height wrapper',
        description:
          '그리드는 부모 높이를 기준으로 렌더링되므로 상위 `WiniBox` 등에 높이를 지정해야 합니다.',
        example: '`className="h-[300px]"`',
      },
    ],
    optionalProps: [
      {
        name: 'defaultColDef / cellStyle',
        description:
          '반복되는 컬럼 옵션이나 셀 정렬을 공통으로 적용할 때 사용합니다.',
      },
    ],
    code: `<WiniBox className="h-[300px]">
  <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} />
</WiniBox>`,
  },
  {
    key: 'pagination',
    title: 'Pagination UI 유형',
    description: [
      '역할: 그리드 내부 페이지네이션 UI를 번호형 또는 분수형으로 표시합니다.',
      '사용 상황: 긴 목록을 그리드 자체 페이지네이션으로 처리하면서 화면 톤에 맞는 페이지 UI를 고를 때 사용합니다.',
      '사용 방법: `pagination`, `paginationUi`, `paginationPageSize`를 함께 설정합니다.',
    ],
    requiredItems: [
      '`pagination`',
      '`paginationUi`',
      '`paginationPageSize`',
      '`rowData`, `columnDefs`',
    ],
    optionalItems: [
      'UI 타입 전환용 외부 `WiniSelect` 연결',
      '페이지 크기 변경 시 `paginationPageSize`만 수정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'pagination',
        description: '그리드 내부 페이지네이션 기능을 켭니다.',
      },
      {
        name: 'paginationUi',
        description:
          '페이지 UI 형태를 지정합니다. 현재 가이드 기준 `number`, `fraction`을 사용합니다.',
      },
      {
        name: 'paginationPageSize',
        description: '한 페이지에 보여줄 행 수입니다.',
      },
      {
        name: '외부 제어 상태',
        description:
          '예시처럼 `WiniSelect`로 UI 타입을 동적으로 바꿔 비교할 수 있습니다.',
      },
    ],
    code: PAGINATION_GUIDE_CODES.number,
  },
  {
    key: 'pagination_notice',
    title: '하단에 별도 WiniPagination',
    description: [
      '역할: 그리드는 현재 페이지 데이터만 그리고, 페이지 컨트롤은 별도 컴포넌트로 분리합니다.',
      '사용 상황: 공통 페이지네이션 컴포넌트 사용, 서버 페이징, 화면 하단 고정 페이징 UI가 필요한 경우에 적합합니다.',
      '사용 방법: 현재 페이지 데이터만 `rowData`로 전달하고, 아래에 `WiniPagination`을 배치합니다.',
    ],
    requiredItems: [
      '현재 페이지 기준 `rowData`',
      '`WiniPagination`의 `count`, `page`, `onChange`',
    ],
    optionalItems: [
      '서버 호출과 연결 시 페이지 변경마다 재조회',
      '`size="small"` 등 페이지네이션 크기 조정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'pagedRows',
        description: '현재 페이지에 보여줄 행 데이터만 잘라낸 배열입니다.',
      },
      {
        name: 'WiniPagination count',
        description: '전체 페이지 수입니다.',
      },
      {
        name: 'WiniPagination page',
        description: '현재 선택된 페이지 번호입니다.',
      },
      {
        name: 'WiniPagination onChange',
        description: '페이지 이동 시 상태를 갱신하거나 서버를 재호출합니다.',
      },
      {
        name: 'size',
        description: '하단 페이지네이션 컴포넌트의 크기를 조정합니다.',
      },
    ],
    code: NOTICE_PAGINATION_GUIDE_CODE,
  },
  {
    key: 'selection_string',
    title: '행 선택 - 문자열 모드',
    description: [
      '역할: 행 선택 방식을 간단한 문자열 모드로 지정합니다.',
      '사용 상황: 단건 선택 상세보기, 다건 선택 삭제/엑셀 처리처럼 선택 모드만 빠르게 정하면 되는 화면에 사용합니다.',
      '사용 방법: `rowSelection`에 `"single"` 또는 `"multiple"`을 전달합니다.',
    ],
    requiredItems: ['`rowSelection`', '`rowData`, `columnDefs`'],
    optionalItems: ['선택 결과를 이벤트로 받아 후속 액션 연결'],
    requiredProps: [],
    optionalProps: [
      {
        name: 'rowSelection',
        description:
          '행 선택 모드입니다. `single` 또는 `multiple` 문자열을 사용합니다.',
      },
      {
        name: 'rowData / columnDefs',
        description: '선택 기능이 적용될 기본 그리드 데이터와 컬럼 정의입니다.',
      },
      {
        name: 'selection changed handler',
        description:
          '선택된 행 데이터를 저장, 삭제, 상세보기 등 후속 액션과 연결할 때 사용합니다.',
      },
    ],
    code: `<WiniBox className="h-[300px]">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    rowSelection="multiple"
  />
</WiniBox>`,
  },
  {
    key: 'selection_object',
    title: '행 선택 - 상세 설정 객체',
    description: [
      '역할: 체크박스 노출 여부, 헤더 체크박스, 클릭 선택 허용 등 선택 방식을 세부 설정합니다.',
      '사용 상황: 목록 상단에서 다건 처리, 전체 선택, 체크박스 기반 선택 UX가 필요한 관리자 화면에 사용합니다.',
      '사용 방법: `rowSelection`에 객체를 넣어 `mode`, `checkboxes`, `headerCheckbox` 등을 제어합니다.',
    ],
    requiredItems: ['`rowSelection.mode`', '`rowData`, `columnDefs`'],
    optionalItems: [
      '`checkboxes`, `headerCheckbox`, `enableClickSelection` 조합',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'rowSelection.mode',
        description: '선택 모드입니다. 예시에서는 `multiRow`를 사용합니다.',
      },
      {
        name: 'rowSelection.checkboxes',
        description: '각 행 앞에 체크박스를 표시할지 결정합니다.',
      },
      {
        name: 'rowSelection.headerCheckbox',
        description: '헤더에서 전체 선택 체크박스를 노출합니다.',
      },
      {
        name: 'rowSelection.enableClickSelection',
        description: '행 클릭만으로도 선택되게 할지 지정합니다.',
      },
      {
        name: '체크박스 전용 columnDefs',
        description:
          '선택용 화면에서는 예시처럼 컬럼을 줄여 선택 UX를 단순화할 수 있습니다.',
      },
    ],
    code: `<WiniBox className="h-[300px]">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    rowSelection={{
      mode: 'multiRow',
      checkboxes: true,
      headerCheckbox: true,
      enableClickSelection: true,
    }}
  />
</WiniBox>`,
  },
  {
    key: 'row_size',
    title: '행/헤더 높이 조정',
    description: [
      '역할: 헤더와 행 높이를 조절해 화면 밀도를 바꿉니다.',
      '사용 상황: 조밀한 데이터 표, 읽기 쉬운 넓은 행, 큰 터치 영역이 필요한 화면에서 사용합니다.',
      '사용 방법: `headerHeight`와 `rowHeight`를 숫자로 지정합니다.',
    ],
    requiredItems: ['`headerHeight` 또는 `rowHeight` 중 필요한 높이 설정'],
    optionalItems: ['두 속성을 함께 조정해 균형 맞추기'],
    requiredProps: [],
    optionalProps: [
      {
        name: 'headerHeight',
        description: '헤더 행의 높이입니다.',
      },
      {
        name: 'rowHeight',
        description: '본문 행의 높이입니다.',
      },
      {
        name: 'size tuned columnDefs',
        description:
          '행 높이를 키울 때 셀 정렬, padding, 아이콘 크기까지 함께 점검하는 것이 좋습니다.',
      },
    ],
    code: `<WiniBox className="h-[300px]">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    headerHeight={48}
    rowHeight={44}
  />
</WiniBox>`,
  },
  {
    key: 'empty',
    title: '빈 데이터(Empty) 상태',
    description: [
      '역할: 조회 결과가 없을 때 빈 상태 메시지를 자연스럽게 보여줍니다.',
      '사용 상황: 검색 결과 없음, 초기 데이터 없음, 조건 변경 후 데이터 미존재 상태를 표현할 때 사용합니다.',
      '사용 방법: `rowData`에 빈 배열을 전달합니다.',
    ],
    requiredItems: ['빈 배열 `rowData={[]}`', '`columnDefs`'],
    optionalItems: [
      '외부 버튼으로 샘플/빈 데이터 전환',
      '빈 상태 안내 문구를 별도 영역과 함께 제공',
    ],
    requiredProps: [
      {
        name: 'rowData',
        description: '데이터가 없을 때는 빈 배열을 전달합니다.',
        example: '`rowData={[]}`',
      },
      {
        name: 'columnDefs',
        description:
          '데이터가 없어도 컬럼 구조는 유지해야 헤더와 empty 상태가 정상 표시됩니다.',
      },
    ],
    optionalProps: [
      {
        name: '외부 상태 버튼',
        description:
          '가이드처럼 버튼으로 빈 상태와 샘플 상태를 전환해 테스트할 수 있습니다.',
      },
    ],
    code: `<WiniBox className="h-[300px]">
  <WiniAgGridReact rowData={[]} columnDefs={columnDefs} />
</WiniBox>`,
  },
];

export default function CompWiniAgGrid() {
  const [showEmpty, setShowEmpty] = useState(false);
  const [paginationUiMode, setPaginationUiMode] = useState('number');
  const [noticePage, setNoticePage] = useState(1);
  const { copyState, handleCopy } = useGuideCopy(
    SECTIONS.map((item) => item.key),
  );

  const paginationPreview = useMemo(
    () => (
      <WiniBox className="h-[340px]">
        <WiniAgGridReact
          rowData={PAGINATION_ROW_DATA}
          columnDefs={BASE_COLUMN_DEFS}
          pagination
          paginationUi={paginationUiMode}
          paginationPageSize={PAGINATION_PAGE_SIZE}
        />
      </WiniBox>
    ),
    [paginationUiMode],
  );

  const noticeTotalPage = Math.max(
    1,
    Math.ceil(PAGINATION_ROW_DATA.length / NOTICE_PAGE_SIZE),
  );
  const safeNoticePage = Math.min(Math.max(noticePage, 1), noticeTotalPage);
  const noticePagedRows = useMemo(() => {
    const start = (safeNoticePage - 1) * NOTICE_PAGE_SIZE;
    return PAGINATION_ROW_DATA.slice(start, start + NOTICE_PAGE_SIZE);
  }, [safeNoticePage]);

  const renderPreview = (key) => {
    if (key === 'basic') {
      return (
        <WiniBox className="h-[300px]">
          <WiniAgGridReact
            rowData={BASE_ROW_DATA}
            columnDefs={BASE_COLUMN_DEFS}
          />
        </WiniBox>
      );
    }

    if (key === 'pagination') {
      return (
        <>
          <WiniBox className="mb-3 max-w-[280px]">
            <WiniFormControl fullWidth>
              <WiniSelect
                value={paginationUiMode}
                onChange={(event) => setPaginationUiMode(event.target.value)}
                MenuProps={{ disableScrollLock: true }}
              >
                {PAGINATION_UI_OPTIONS.map((mode) => (
                  <WiniMenuItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </WiniMenuItem>
                ))}
              </WiniSelect>
            </WiniFormControl>
          </WiniBox>
          {paginationPreview}
        </>
      );
    }

    if (key === 'pagination_notice') {
      return (
        <>
          <WiniBox className="h-[340px]">
            <WiniAgGridReact
              rowData={noticePagedRows}
              columnDefs={BASE_COLUMN_DEFS}
            />
          </WiniBox>
          <WiniBox className="mt-3 flex justify-center">
            <WiniPagination
              count={noticeTotalPage}
              page={safeNoticePage}
              size="small"
              onChange={(_event, nextPage) => setNoticePage(nextPage)}
            />
          </WiniBox>
        </>
      );
    }

    if (key === 'selection_string') {
      return (
        <WiniBox className="h-[300px]">
          <WiniAgGridReact
            rowData={BASE_ROW_DATA}
            columnDefs={BASE_COLUMN_DEFS}
            rowSelection="multiple"
          />
        </WiniBox>
      );
    }

    if (key === 'selection_object') {
      return (
        <WiniBox className="h-[300px]">
          <WiniAgGridReact
            rowData={BASE_ROW_DATA}
            columnDefs={CHECKBOX_COLUMN_DEFS}
            rowSelection={{
              mode: 'multiRow',
              checkboxes: true,
              headerCheckbox: true,
              enableClickSelection: true,
            }}
          />
        </WiniBox>
      );
    }

    if (key === 'row_size') {
      return (
        <WiniBox className="h-[300px]">
          <WiniAgGridReact
            rowData={BASE_ROW_DATA}
            columnDefs={BASE_COLUMN_DEFS}
            headerHeight={48}
            rowHeight={44}
          />
        </WiniBox>
      );
    }

    return (
      <>
        <WiniBox ui="btnitem" className="mb-3">
          <WiniButton ui="line" onClick={() => setShowEmpty((prev) => !prev)}>
            {showEmpty ? '데이터 보기' : '빈 데이터 보기'}
          </WiniButton>
          <WiniTypography variant="span">
            {showEmpty ? '빈 데이터 상태입니다.' : '샘플 데이터 상태입니다.'}
          </WiniTypography>
        </WiniBox>
        <WiniBox className="h-[300px]">
          <WiniAgGridReact
            rowData={showEmpty ? [] : BASE_ROW_DATA}
            columnDefs={BASE_COLUMN_DEFS}
          />
        </WiniBox>
      </>
    );
  };

  return (
    <GuidePage
      title="WiniAgGridReact"
      subtitle="WiniAgGridReact 가이드"
      description="WiniAgGridReact는 목록/테이블 화면을 구성하는 그리드 컴포넌트입니다. 자주 사용하는 props를 유형별로 확인할 수 있습니다."
    >
      {SECTIONS.map((item) => {
        const paginationCode = PAGINATION_GUIDE_CODES[paginationUiMode];
        const sectionCode =
          item.key === 'pagination' ? paginationCode : item.code;
        const sectionDescription =
          item.key === 'pagination'
            ? [
                ...(Array.isArray(item.description)
                  ? item.description
                  : [item.description]),
                `현재 UI 타입: ${PAGINATION_UI_OPTIONS.find((mode) => mode.value === paginationUiMode)?.label}`,
              ]
            : item.description;

        return (
          <GuideSection
            key={item.key}
            title={item.title}
            description={sectionDescription}
            requiredItems={item.requiredItems}
            optionalItems={item.optionalItems}
            requiredProps={item.requiredProps}
            optionalProps={item.optionalProps}
            preview={renderPreview(item.key)}
            code={sectionCode}
            copyText={copyState[item.key] === 'copy' ? '복사하기' : '복사 완료'}
            onCopy={() => handleCopy(item.key, sectionCode)}
          />
        );
      })}
    </GuidePage>
  );
}
