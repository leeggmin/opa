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

const seedRows = Array.from({ length: 35 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `Grid 샘플 ${num}`,
    status: num % 4 === 0 ? '미사용' : '사용',
    owner: num % 2 === 0 ? '홍길동' : '김담당',
    createdAt: new Date(Date.now() - num * 24 * 60 * 60 * 1000),
  };
});

export default function GridTopButtons() {
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
        headerName: '프로그램 코드',
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
        field: 'owner',
        headerName: '담당자',
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
      {
        field: 'createdAt',
        headerName: '등록일',
        width: 140,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (params) => {
          const v = params.value;
          if (!v) return '';
          const d = v instanceof Date ? v : new Date(v);
          if (Number.isNaN(d.getTime())) return '';
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          return `${yyyy}-${mm}-${dd}`;
        },
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
        status: '사용',
        owner: '김담당',
        createdAt: new Date(),
      },
      ...prev,
    ]);
  };

  const handleRefresh = () => {
    setRowData(seedRows);
    window?.pubUI?.toast?.({
      text: '그리드를 새로고침했습니다.',
      time: 1200,
      type: 'success',
    });
  };

  const codeToCopy = `
<WiniBox ui="btnbox" className='justify-end'>
  <WiniBox ui="btnitem">
    <WiniButton ui="line" onClick={handleRefresh}>
      새로고침
    </WiniButton>
    <WiniButton onClick={handleAdd}>추가</WiniButton>
  </WiniBox>
</WiniBox>

<WiniBox className="h-130">
  <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} />
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
        <WiniTypography variant="h1">GridTopButtons</WiniTypography>
        <WiniTypography variant="h2">그리드 + 상단버튼</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            그리드 상단에 액션 버튼 영역을 두는 기본 패턴입니다.
          </WiniTypography>
        </WiniBox>

        <WiniBox ui="btnbox" className='justify-end'>
          <WiniBox ui="btnitem">
            <WiniButton ui="line" onClick={handleRefresh}>
              새로고침
            </WiniButton>
            <WiniButton onClick={handleAdd}>추가</WiniButton>
          </WiniBox>
        </WiniBox>

        <WiniBox className="h-130">
          <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} />
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
