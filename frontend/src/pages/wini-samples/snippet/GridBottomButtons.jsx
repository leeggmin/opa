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

const seedRows = Array.from({ length: 25 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `Grid 샘플 ${num}`,
    status: num % 4 === 0 ? '미사용' : '사용',
    owner: num % 2 === 0 ? '홍길동' : '김담당',
  };
});

export default function GridBottomButtons() {
  const [rowData] = useState(seedRows);
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
    ],
    [],
  );

  const handleSave = () => {
    window?.pubUI?.toast?.({
      text: '저장(예시) 클릭',
      time: 1200,
      type: 'success',
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
<WiniBox className="h-130">
  <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} />
</WiniBox>

<WiniBox ui="btnbox" className="justify-end">
  <WiniBox ui="btnitem">
    <WiniButton ui="lineGray" onClick={handleCancel}>
      취소
    </WiniButton>
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
        <WiniTypography variant="h1">GridBottomButtons</WiniTypography>
        <WiniTypography variant="h2">그리드 + 하단버튼</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            그리드 하단에 저장/취소 같은 액션 영역을 두는 기본 패턴입니다.
          </WiniTypography>
        </WiniBox>

        <WiniBox className="h-130">
          <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} />
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
