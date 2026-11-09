import { useEffect, useMemo, useRef, useState } from 'react';

import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniTypography,
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const seedRows = Array.from({ length: 75 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `Paging 샘플 ${num}`,
    category: num % 3 === 0 ? '공통' : num % 3 === 1 ? '관리' : '통계',
    status: num % 4 === 0 ? '미사용' : '사용',
  };
});

export default function GridTopBottomButtonsPaging() {
  const [rowData, setRowData] = useState(seedRows);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: 'no',
        headerName: 'No',
        width: 80,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'programCode',
        headerName: '코드',
        width: 160,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'programName',
        headerName: '프로그램 명',
        flex: 1,
        minWidth: 240,
        sortable: false,
      },
      {
        field: 'category',
        headerName: '구분',
        width: 120,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'status',
        headerName: '사용여부',
        width: 120,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
    ],
    [],
  );

  const handleAdd = () => {
    const nextNo = rowData.length + 1;
    setRowData((prev) => [
      {
        no: nextNo,
        programCode: `PRG-${String(nextNo).padStart(3, '0')}`,
        programName: `추가된 데이터 ${nextNo}`,
        category: '관리',
        status: '사용',
      },
      ...prev,
    ]);
  };

  const handleSave = () => {
    window?.pubUI?.toast?.({
      text: '저장(예시) 클릭',
      time: 1200,
      type: 'success',
    });
  };

  const handleDelete = () => {
    window?.pubUI?.toast?.({
      text: '삭제(예시) 클릭',
      time: 1200,
      type: 'info',
    });
  };

  const handleCancel = () => {
    window?.pubUI?.toast?.({
      text: '취소(예시) 클릭',
      time: 1200,
      type: 'info',
    });
  };

  const codeToCopy = `
<WiniBox ui="btnbox" className="justify-end">
  <WiniBox ui="btnitem">
    <WiniButton ui="line" onClick={handleAdd}>추가</WiniButton>
    <WiniButton ui="delete" onClick={handleDelete}>삭제</WiniButton>
  </WiniBox>
</WiniBox>

<WiniBox className="h-130">
  <WiniAgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    pagination
    paginationUi="number"
    paginationPageSize={10}
  />
</WiniBox>

<WiniBox ui="btnbox" className="justify-end">
  <WiniBox ui="btnitem">
    <WiniButton ui="lineGray" onClick={handleCancel}>취소</WiniButton>
    <WiniButton onClick={handleSave}>저장</WiniButton>
  </WiniBox>
</WiniBox>`;

  const [copyState, setCopyState] = useState('copy');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopyState('complete');

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });

      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => {
        setCopyState('copy');
      }, 2000);
    } catch (error) {
      console.error('복사 실패:', error);
      window?.pubUI?.toast?.({
        text: '복사에 실패했습니다.',
        time: 2000,
        type: 'error',
      });
    }
  };

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8" rowSpacing={2}>
        <WiniTypography variant="h1">GridTopBottomButtonsPaging</WiniTypography>
        <WiniTypography variant="h2">
          그리드 + 상단버튼 + 하단버튼 + 페이징
        </WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            상단/하단 액션 영역과 페이징을 함께 쓰는 기본 패턴입니다.
          </WiniTypography>
        </WiniBox>

        <WiniBox ui="btnbox" className="justify-end">
          <WiniBox ui="btnitem">
            <WiniButton ui="line" onClick={handleAdd}>
              추가
            </WiniButton>
            <WiniButton ui="delete" onClick={handleDelete}>
              삭제
            </WiniButton>
          </WiniBox>
        </WiniBox>

        <WiniBox className="h-130">
          <WiniAgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination
            paginationUi="number"
            paginationPageSize={10}
          />
        </WiniBox>

        <WiniBox ui="btnbox" className="justify-end">
          <WiniBox ui="btnitem">
            <WiniButton ui="lineGray" onClick={handleCancel}>
              취소
            </WiniButton>
            <WiniButton onClick={handleSave}>저장</WiniButton>
          </WiniBox>
        </WiniBox>

        <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
          <WiniBox className="flex items-center justify-between">
            <WiniTypography variant="span" className="text-white text-lg">
              코드 예시
            </WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton
                ui="gray"
                onClick={handleCopy}
                className="transition-all duration-300"
              >
                {copyState === 'copy' ? '복사하기' : '복사 완료'}
              </WiniButton>
            </WiniBox>
          </WiniBox>
          <WiniCode code={codeToCopy} language="jsx" />
        </WiniBox>
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
