import { useEffect, useRef, useState } from 'react';
import { winiCom, winiExcel, winiGrid } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniTable,
  WiniTableBody,
  WiniTableCell,
  WiniTableContainer,
  WiniTableHead,
  WiniTableRow,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const COLUMN_DEFS = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'userName', headerName: '이름', width: 160 },
  { field: 'email', headerName: '이메일', width: 260 },
  { field: 'regDate', headerName: '가입일자', width: 150 },
];

const ROW_DATA = [
  {
    id: 1,
    userName: '홍길동',
    email: 'hong@example.com',
    regDate: '2024-01-01',
  },
  {
    id: 2,
    userName: '김철수',
    email: 'kim@example.com',
    regDate: '2024-01-02',
  },
  {
    id: 3,
    userName: '이영희',
    email: 'lee@example.com',
    regDate: '2024-01-03',
  },
];

const DOWNLOAD_ARGUMENTS = [
  {
    property: 'serviceName',
    type: 'string',
    required: 'Y',
    defaultValue: '없음',
    description: '요청 URL에 사용할 MSA 서비스명',
  },
  {
    property: 'payload',
    type: 'object',
    required: 'Y',
    defaultValue: '없음',
    description: '컬럼, 데이터 및 엑셀 생성 옵션',
  },
  {
    property: 'type',
    type: "'xlsx' | 'csv'",
    required: 'N',
    defaultValue: "'xlsx'",
    description: '다운로드 형식. 생략하면 xlsx로 호출',
  },
];

const REQUEST_PROPERTIES = [
  {
    property: 'columns',
    type: 'array(object)',
    required: 'Y',
    defaultValue: '없음',
    description: '컬럼 정의 목록(key, header, width, readOnly)',
  },
  {
    property: 'dataList',
    type: 'array(object)',
    required: 'Y',
    defaultValue: '없음',
    description: '엑셀에 기록할 실제 데이터 목록(객체 1개 = 1행)',
  },
  {
    property: 'options',
    type: 'object',
    required: 'N',
    defaultValue: '{}',
    description: '엑셀 생성 옵션 묶음',
  },
];

const COLUMN_PROPERTIES = [
  {
    property: 'key',
    type: 'string',
    required: 'Y',
    defaultValue: '없음',
    description: 'dataList 각 row에서 읽을 필드명',
  },
  {
    property: 'header',
    type: 'string',
    required: 'Y',
    defaultValue: '없음',
    description: '엑셀 헤더 표시명',
  },
  {
    property: 'width',
    type: 'number',
    required: 'N',
    defaultValue: '없음',
    description: '컬럼 너비',
  },
  {
    property: 'readOnly',
    type: 'boolean',
    required: 'N',
    defaultValue: 'false',
    description: 'xlsx 전용. true이면 해당 컬럼 잠금. CSV에서는 사용 불가',
  },
];

const OPTION_PROPERTIES = [
  {
    property: 'fileName',
    type: 'string',
    required: 'N',
    defaultValue: '""',
    description: '다운로드할 파일명',
  },
  {
    property: 'excelTitle',
    type: 'string',
    required: 'N',
    defaultValue: '""',
    description: 'xlsx 전용. 시트 상단 제목. CSV에서는 사용 불가',
  },
  {
    property: 'useRowNumber',
    type: 'boolean',
    required: 'N',
    defaultValue: 'false',
    description: 'NO 컬럼(행 번호) 자동 추가 여부',
  },
  {
    property: 'useSheetProtect',
    type: 'boolean',
    required: 'N',
    defaultValue: 'false',
    description: 'xlsx 전용. 시트 보호 사용 여부. CSV에서는 사용 불가',
  },
  {
    property: 'sheetProtectPasswd',
    type: 'string',
    required: '조건부',
    defaultValue: '""',
    description:
      'xlsx에서 readOnly 또는 useSheetProtect가 true이면 필수',
  },
];

const METHOD_SIGNATURE = `await winiExcel.download(serviceName, payload); // 구분없는경우 기본 : xlsx 다운로드
await winiExcel.download(serviceName, payload, 'xlsx'); // xlsx 다운로드
await winiExcel.download(serviceName, payload, 'csv'); // csv 다운로드
await winiExcel.downloadXlsx(serviceName, payload); // xlsx 다운로드
await winiExcel.downloadCsv(serviceName, payload); // csv 다운로드`;

function PropertyTable({ caption, rows, firstColumnLabel = '프로퍼티' }) {
  return (
    <WiniTableContainer>
      <WiniTable>
        <caption className="sr-only">{caption}</caption>
        <WiniTableHead>
          <WiniTableRow>
            {[
              firstColumnLabel,
              '타입',
              '필수값',
              '기본값',
              '설명',
            ].map((header) => (
              <WiniTableCell key={header} component="th" align="center">
                {header}
              </WiniTableCell>
            ))}
          </WiniTableRow>
        </WiniTableHead>
        <WiniTableBody>
          {rows.map((row) => (
            <WiniTableRow key={row.property}>
              <WiniTableCell>
                <code>{row.property}</code>
              </WiniTableCell>
              <WiniTableCell align="center">{row.type}</WiniTableCell>
              <WiniTableCell align="center">{row.required}</WiniTableCell>
              <WiniTableCell align="center">
                <code>{row.defaultValue}</code>
              </WiniTableCell>
              <WiniTableCell>{row.description}</WiniTableCell>
            </WiniTableRow>
          ))}
        </WiniTableBody>
      </WiniTable>
    </WiniTableContainer>
  );
}

function GuideItemList({ title, items }) {
  return (
    <WiniBox className="mt-2">
      <WiniTypography variant="span" className="text-md font-bold">
        {title}
      </WiniTypography>
      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item}>
            <WiniTypography variant="span" className="text-md">
              {item}
            </WiniTypography>
          </li>
        ))}
      </ul>
    </WiniBox>
  );
}

const WINI_EXCEL_SAMPLE_CODE = `import { winiExcel } from '@/shared/lib';

const payload = {
  columns: [
    { key: 'name', header: '이름', width: 20, readOnly: true },
    { key: 'email', header: '이메일', width: 30, readOnly: true },
    { key: 'age', header: '나이', width: 10, readOnly: false },
  ],
  dataList: [
    { name: '홍길동', email: 'test01@winitech.com', age: 30 },
    { name: '김철수', email: 'test02@winitech.com', age: 25 },
  ],
  options: {
    excelTitle: '사용자 목록',
    fileName: '사용자목록',
    sheetProtectPasswd: 'secret',
    useRowNumber: false,
    useSheetProtect: false,
  },
};
const serviceName = 'system';

await winiExcel.download(serviceName, payload);
await winiExcel.downloadXlsx(serviceName, payload);
await winiExcel.downloadCsv(serviceName, {
  columns: [
    { key: 'name', header: '이름', width: 20 },
    { key: 'email', header: '이메일', width: 30 },
    { key: 'age', header: '나이', width: 10 },
  ],
  dataList: payload.dataList,
  options: {
    fileName: '사용자목록',
    useRowNumber: false,
  },
});`;

const WINI_GRID_SAMPLE_CODE = `import { useRef } from 'react';
import { winiGrid } from '@/shared/lib';
import { WiniAgGridReact, WiniBox, WiniButton } from '@/shared/ui/wini';

const columnDefs = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'userName', headerName: '이름', width: 160 },
  { field: 'email', headerName: '이메일', width: 260 },
  { field: 'regDate', headerName: '가입일자', width: 150 },
];

const rowData = [
  {
    id: 1,
    userName: '홍길동',
    email: 'hong@example.com',
    regDate: '2024-01-01',
  },
];

const gridRef = useRef(null);
const serviceName = 'system';
const handleDownload = async () => {
  await winiGrid.downloadExcel(gridRef, serviceName, {
    type: 'xlsx',
    readOnlyKeys: ['id', 'userName'],
    options: {
      fileName: '사용자목록',
      excelTitle: '사용자 목록 보고서',
      useRowNumber: true,
      useSheetProtect: true,
      sheetProtectPasswd: 'password123',
    },
  });
};

return (
  <>
    <WiniBox className="h-[320px]">
      <WiniAgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </WiniBox>
    <WiniButton onClick={handleDownload}>엑셀 다운로드</WiniButton>
  </>
);`;

export default function WiniExcel() {
  const gridRef = useRef(null);
  const copyTimersRef = useRef({});
  const [serviceName, setServiceName] = useState('system');
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyState, setCopyState] = useState({
    winiExcel: 'copy',
    winiGrid: 'copy',
  });

  useEffect(() => {
    return () => {
      Object.values(copyTimersRef.current).forEach((timer) =>
        window.clearTimeout(timer),
      );
    };
  }, []);

  const handleDownload = async () => {
    if (!serviceName.trim()) {
      await winiMsg.showAlert('서비스명을 입력해 주세요.');
      return;
    }

    setIsDownloading(true);
    try {
      const downloaded = await winiGrid.downloadExcel(
        gridRef,
        serviceName.trim(),
        {
          // type: 'xlsx',
          // readOnlyKeys: ['id', 'userName'],
          options: {
            fileName: '사용자목록',
            excelTitle: '사용자 목록 보고서',
            useRowNumber: true,
          },
        },
      );
      if (!downloaded) {
        await winiMsg.showAlert('다운로드할 그리드 컬럼이 없습니다.');
      // } else {
      //   winiMsg.showSnackbar('엑셀 다운로드를 요청했습니다.');
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        '엑셀 다운로드에 실패했습니다.';
      await winiMsg.showAlert(winiCom.getErrorMessage({ message }));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async (key, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      if (copyTimersRef.current[key]) {
        window.clearTimeout(copyTimersRef.current[key]);
      }
      copyTimersRef.current[key] = window.setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);
    } catch {
      await winiMsg.showAlert('소스 코드 복사에 실패했습니다.');
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
        <WiniTypography variant="h1">winiExcel</WiniTypography>
        <WiniTypography variant="h2">공통 엑셀 다운로드 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            columns와 dataList 형식만 맞추면 xlsx/csv 다운로드 API를 호출할 수
            있습니다. 하단에서는 Grid 데이터를 자동 변환하는
            winiGrid.downloadExcel 연동 방법도 함께 제공합니다.
          </WiniTypography>
        </WiniBox>

        <WiniBox ui="line">
          <WiniTypography variant="h2">winiExcel.download</WiniTypography>
          <WiniBox className="mb-4">
            <WiniTypography variant="span" className="text-md">
              전달받은 payload를 /commonExcel/xlsx 또는 /commonExcel/csv로
              전송하고 응답 파일을 저장합니다. type을 생략하면 xlsx입니다. CSV는
              readOnly, excelTitle, useSheetProtect를 사용할 수 없고, xlsx에서
              readOnly 또는 useSheetProtect가 true이면 sheetProtectPasswd가
              필수입니다.
            </WiniTypography>

            <GuideItemList
              title="필수 입력 요소"
              items={[
                'serviceName',
                'payload',
                'payload.columns',
                'payload.dataList',
              ]}
            />
            <GuideItemList
              title="추가 옵션"
              items={['payload.options', "type ('xlsx' | 'csv')"]}
            />
          </WiniBox>

          <WiniTypography variant="h3">메서드 시그니처</WiniTypography>
          <WiniBox className="mt-4 rounded-sm bg-[#1A1A1A] p-6">
            <WiniCode code={METHOD_SIGNATURE} language="javascript" />
          </WiniBox>

          <WiniTypography variant="h3" className="mt-8">
            함수 인자
          </WiniTypography>
          <WiniBox className="mt-4 overflow-x-auto">
            <PropertyTable
              caption="winiExcel.download 함수 인자"
              firstColumnLabel="인자"
              rows={DOWNLOAD_ARGUMENTS}
            />
          </WiniBox>

          <WiniTypography variant="h3" className="mt-8">
            payload 프로퍼티
          </WiniTypography>
          <WiniTypography variant="span" className="text-md">
            columns 순서에 맞춰 dataList 각 객체의 값을 읽습니다. API 조회 결과,
            직접 만든 배열, Grid 데이터 등 어떤 데이터든 같은 형식으로 전달할 수
            있습니다.
          </WiniTypography>
          <WiniBox className="mt-4 overflow-x-auto">
            <PropertyTable
              caption="엑셀 다운로드 요청 데이터 속성"
              rows={REQUEST_PROPERTIES}
            />
          </WiniBox>

          <WiniTypography variant="h3" className="mt-8">
            columns 하위 프로퍼티
          </WiniTypography>
          <WiniBox className="mt-4 overflow-x-auto">
            <PropertyTable
              caption="엑셀 다운로드 columns 하위 프로퍼티"
              rows={COLUMN_PROPERTIES}
            />
          </WiniBox>

          <WiniTypography variant="h3" className="mt-8">
            options 하위 프로퍼티
          </WiniTypography>
          <WiniBox className="mt-4 mb-8 overflow-x-auto">
            <PropertyTable
              caption="엑셀 다운로드 options 하위 프로퍼티"
              rows={OPTION_PROPERTIES}
            />
          </WiniBox>

          <CodeExample
            copyText={copyState.winiExcel === 'copy' ? '복사하기' : '복사 완료'}
            code={WINI_EXCEL_SAMPLE_CODE}
            onCopy={() => handleCopy('winiExcel', WINI_EXCEL_SAMPLE_CODE)}
          />
        </WiniBox>

        <WiniBox ui="line">
          <WiniTypography variant="h2">winiGrid.downloadExcel</WiniTypography>
          <WiniBox className="mb-4">
            <WiniTypography variant="span" className="text-md">
              WiniAgGridReact의 표시 컬럼과 필터·정렬된 행을 자동으로 payload로
              변환한 뒤 내부에서 winiExcel.download를 호출합니다.
            </WiniTypography>

            <GuideItemList
              title="필수 입력 요소"
              items={['gridRef', 'serviceName', 'columnDefs의 field', 'rowData']}
            />
            <GuideItemList
              title="추가 옵션"
              items={[
                'options.fileName',
                'options.excelTitle',
                'options',
                'type',
                'readOnlyKeys',
                'selectedOnly',
                'includeHiddenColumns',
              ]}
            />
          </WiniBox>

          <WiniBox className="mb-4 max-w-[360px]">
            <WiniText
              label="MSA 서비스명"
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
            />
          </WiniBox>

          <WiniBox className="h-[320px]">
            <WiniAgGridReact
              ref={gridRef}
              rowData={ROW_DATA}
              columnDefs={COLUMN_DEFS}
            />
          </WiniBox>

          <WiniBox ui="btnbox" className="mt-4 mb-8">
            <WiniBox ui="btnitem" />
            <WiniBox ui="btnitem">
              <WiniButton
                ui="default"
                loading={isDownloading}
                disabled={isDownloading}
                onClick={handleDownload}
              >
                엑셀 다운로드
              </WiniButton>
            </WiniBox>
          </WiniBox>

          <CodeExample
            copyText={copyState.winiGrid === 'copy' ? '복사하기' : '복사 완료'}
            code={WINI_GRID_SAMPLE_CODE}
            onCopy={() => handleCopy('winiGrid', WINI_GRID_SAMPLE_CODE)}
          />
        </WiniBox>
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
