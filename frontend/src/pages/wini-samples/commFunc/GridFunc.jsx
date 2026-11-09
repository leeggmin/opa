import { useEffect, useRef, useState } from 'react';
import {
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const GRID_GUIDES = [
  {
    key: 'basic',
    name: '기본 설정',
    description:
      'WiniAgGridReact에 ref를 연결한 뒤 winiGrid 함수에 같은 ref를 전달합니다.',
    code: `import { useRef } from 'react';
import { winiGrid } from '@/shared/lib';
import { WiniAgGridReact } from '@/shared/ui/wini';

const gridRef = useRef(null);

<WiniAgGridReact
  ref={gridRef}
  rowData={rowData}
  columnDefs={columnDefs}
  rowSelection="multiple"
/>`,
  },
  {
    key: 'getApi',
    name: 'getApi',
    description:
      'gridRef에서 AG Grid API를 가져옵니다. API가 준비되지 않았으면 null을 반환합니다.',
    code: `const api = winiGrid.getApi(gridRef);

if (api) {
  api.refreshCells();
}`,
  },
  {
    key: 'withGridApi',
    name: 'withGridApi',
    description:
      'Grid API가 있을 때만 콜백을 실행합니다. 반복적인 API null 체크를 줄일 수 있습니다.',
    code: `winiGrid.withGridApi(gridRef, (api) => {
  api.sizeColumnsToFit();
});

const displayedRowCount = winiGrid.withGridApi(
  gridRef,
  (api) => api.getDisplayedRowCount(),
);`,
  },
  {
    key: 'findRowNodeById',
    name: 'findRowNodeById',
    description:
      '지정한 필드의 값으로 첫 번째 행 노드를 찾습니다. 기본 비교 필드는 id입니다.',
    code: `// rowData의 id가 10인 행 찾기
const rowNode = winiGrid.findRowNodeById(gridRef, 10);

// programId처럼 별도 식별 필드를 사용하는 경우
const programNode = winiGrid.findRowNodeById(
  gridRef,
  'PGM_001',
  'programId',
);`,
  },
  {
    key: 'selectRowById',
    name: 'selectRowById',
    description:
      '식별값과 일치하는 행을 선택합니다. 페이지 이동과 선택 지연 옵션도 지원합니다.',
    code: `// id가 10인 행 선택
winiGrid.selectRowById(gridRef, 10);

// 페이지가 있는 그리드에서 programId 기준으로 선택
winiGrid.selectRowById(gridRef, 'PGM_001', {
  idField: 'programId',
  moveToPage: true,
  selectDelayMs: 100,
});`,
  },
  {
    key: 'selectRowsByIds',
    name: 'selectRowsByIds',
    description:
      '여러 식별값과 일치하는 행을 모두 선택하고 실제 선택한 행 개수를 반환합니다.',
    code: `const selectedCount = winiGrid.selectRowsByIds(
  gridRef,
  [1, 3, 5],
);

// 별도 식별 필드 사용
winiGrid.selectRowsByIds(
  gridRef,
  ['USER_01', 'USER_02'],
  'userId',
);`,
  },
  {
    key: 'clearSelection',
    name: 'clearSelection',
    description:
      '현재 선택된 모든 행을 해제합니다. 성공 여부를 boolean으로 반환합니다.',
    code: `const handleClearSelection = () => {
  winiGrid.clearSelection(gridRef);
};

<WiniButton onClick={handleClearSelection}>
  선택 해제
</WiniButton>`,
  },
  {
    key: 'getSelectedRows',
    name: 'getSelectedRows',
    description:
      '현재 선택된 행의 rowData 배열을 가져옵니다. 선택이 없으면 빈 배열을 반환합니다.',
    code: `const handleGetSelectedRows = () => {
  const selectedRows = winiGrid.getSelectedRows(gridRef);

  selectedRows.forEach((row) => {
    console.log(row.id, row.name);
  });
};`,
  },
  {
    key: 'getSelectedSingleRow',
    name: 'getSelectedSingleRow',
    description:
      '정확히 한 행만 선택된 경우 해당 rowData를 반환합니다. 0건 또는 다건이면 null을 반환합니다.',
    code: `import { winiMsg } from '@/shared/model';

const handleUpdate = () => {
  const selectedRow = winiGrid.getSelectedSingleRow(gridRef, {
    warnMessage: '수정할 행을 하나만 선택해주세요.',
    warn: (message) => winiMsg.showAlert(message),
  });

  if (!selectedRow) return;

  // 선택된 행으로 수정 처리
  updateData(selectedRow);
};`,
  },
  {
    key: 'selectFirstRow',
    name: 'selectFirstRow',
    description:
      '그리드의 첫 번째 행을 선택합니다. 기존 선택을 유지하는 옵션을 사용할 수 있습니다.',
    code: `// 첫 번째 행 선택
winiGrid.selectFirstRow(gridRef);

// 선택된 행이 없을 때만 첫 번째 행 선택
winiGrid.selectFirstRow(gridRef, {
  ifNoneSelected: true,
});`,
  },
  {
    key: 'scrollToSelected',
    name: 'scrollToSelected',
    description:
      '선택된 첫 번째 행이 보이도록 스크롤합니다. 위치는 top, middle, bottom 중에서 지정합니다.',
    code: `// 선택 행을 화면 중앙으로 이동
winiGrid.scrollToSelected(gridRef);

// 선택 행을 화면 상단으로 이동
winiGrid.scrollToSelected(gridRef, 'top');`,
  },
  {
    key: 'updateRowById',
    name: 'updateRowById',
    description:
      '식별값으로 행을 찾아 기존 데이터에 patch를 병합하여 부분 업데이트합니다.',
    code: `// id가 10인 행의 이름과 사용 여부 변경
winiGrid.updateRowById(gridRef, 10, {
  name: '변경된 메뉴명',
  useYn: 'N',
});

// programId 필드를 식별값으로 사용
winiGrid.updateRowById(
  gridRef,
  'PGM_001',
  { status: 'ENABLE' },
  'programId',
);`,
  },
  {
    key: 'reselectAfterDataLoad',
    name: 'reselectAfterDataLoad',
    description:
      '데이터 재조회 후 이전 선택 행을 다시 선택합니다. 사용 방법과 옵션은 selectRowById와 같습니다.',
    code: `const handleReload = async () => {
  const selectedRow = winiGrid.getSelectedSingleRow(gridRef);
  const selectedId = selectedRow?.id;

  const nextRows = await fetchRows();
  setRowData(nextRows);

  if (selectedId != null) {
    winiGrid.reselectAfterDataLoad(gridRef, selectedId, {
      moveToPage: true,
      selectDelayMs: 100,
    });
  }
};`,
  },
];

export default function GridFunc() {
  const [copyState, setCopyState] = useState(
    Object.fromEntries(GRID_GUIDES.map((item) => [item.key, 'copy'])),
  );

  const timersRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleCopy = async (key, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      if (timersRef.current[key]) {
        clearTimeout(timersRef.current[key]);
      }

      timersRef.current[key] = setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  const CodeExample = ({ copyText, code, onCopy }) => (
    <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
      <WiniBox className="flex items-center justify-between">
        <WiniTypography variant="span" className="text-white text-lg">
          코드 예시
        </WiniTypography>
        <WiniBox ui="btnbox">
          <WiniButton
            ui="gray"
            onClick={onCopy}
            className="transition-all duration-300"
          >
            {copyText}
          </WiniButton>
        </WiniBox>
      </WiniBox>
      <WiniCode code={code} language="jsx" />
    </WiniBox>
  );

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8">
        <WiniTypography variant="h1">winiGrid(AG Grid 유틸리티)</WiniTypography>
        <WiniTypography variant="h2">AG Grid 공통 함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            <code>winiGrid</code>는 <code>WiniAgGridReact</code>의 ref를 이용해
            행 조회, 선택, 스크롤 및 데이터 변경을 처리하는 공통 함수입니다.
          </WiniTypography>
        </WiniBox>

        {GRID_GUIDES.map((item) => (
          <WiniBox key={item.key} ui="line">
            <WiniTypography variant="h2">{item.name}</WiniTypography>
            <WiniBox className="mb-4">
              <WiniTypography variant="span" className="text-md">
                {item.description}
              </WiniTypography>
            </WiniBox>

            <CodeExample
              copyText={copyState[item.key] === 'copy' ? '복사하기' : '복사 완료'}
              code={item.code}
              onCopy={() => handleCopy(item.key, item.code)}
            />
          </WiniBox>
        ))}
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
