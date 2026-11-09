import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  WiniAgGridReact,
  WiniBox,
  WiniGridItem,
  WiniGridLayout,
  WiniButton,
  WiniCheckbox,
  WiniCode,
  WiniDateTimePicker,
  WiniMenuItem,
  WiniNumber,
  WiniRadio,
  WiniRadioGroup,
  WiniSelect,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const seedRows = Array.from({ length: 38 }, (_, index) => {
  const num = index + 1;
  return {
    chk: false,
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `SearchMultiGrid 샘플 ${num}`,
    category: num % 3 === 0 ? '공통' : num % 3 === 1 ? '관리' : '통계',
    status: num % 4 === 0 ? '미사용' : '사용',
    owner: num % 2 === 0 ? '홍길동' : '김담당',
    createdAt: new Date(Date.now() - num * 24 * 60 * 60 * 1000),
  };
});

export default function SearchMultiGrid() {
  const [form, setForm] = useState({
    category: 'all',
    keyword: '',
    status: 'all',
    owner: '',
    programCode: '',
    programName: '',
    noFrom: '',
    noTo: '',
    dateFrom: null,
    dateTo: null,
    searchInCode: true,
    searchInName: true,
    searchInOwner: true,
  });

  const [rowData, setRowData] = useState(seedRows);

  const codeToCopy = `
{/* 검색폼 */}
<WiniBox ui="search">
  <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={4}>
    <WiniGridItem>
      <WiniSelect required ui="column" label="필수조건" value={form.category} onChange={handleChange('category')}>
        <WiniMenuItem value="all">전체</WiniMenuItem>
        <WiniMenuItem value="공통">공통</WiniMenuItem>
        <WiniMenuItem value="관리">관리</WiniMenuItem>
        <WiniMenuItem value="통계">통계</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>
    <WiniGridItem>
      <WiniBox className="flex flex-col gap-1">
        <WiniTypography variant="span" className="text-sm">
          사용여부
        </WiniTypography>
        <WiniRadioGroup row value={form.status} onChange={handleChange('status')}>
          <WiniRadio value="all" label="전체" />
          <WiniRadio value="사용" label="사용" />
          <WiniRadio value="미사용" label="미사용" />
        </WiniRadioGroup>
      </WiniBox>
    </WiniGridItem>
    <WiniGridItem>
      <WiniText ui="column" label="검색어" value={form.keyword} onChange={handleChange('keyword')} placeholder="프로그램 코드/명/담당자" />
    </WiniGridItem>

    <WiniGridItem>
      <WiniBox className="flex flex-col gap-1">
        <WiniTypography variant="span" className="text-sm">
          검색 범위(Checkbox)
        </WiniTypography>
        <WiniBox className="flex flex-wrap gap-4">
          <WiniCheckbox
            label="코드"
            checked={form.searchInCode}
            onChange={handleCheckedChange('searchInCode')}
          />
          <WiniCheckbox
            label="명"
            checked={form.searchInName}
            onChange={handleCheckedChange('searchInName')}
          />
          <WiniCheckbox
            label="담당자"
            checked={form.searchInOwner}
            onChange={handleCheckedChange('searchInOwner')}
          />
        </WiniBox>
      </WiniBox>
    </WiniGridItem>

    <WiniGridItem>
      <WiniNumber
        ui="column"
        label="No From"
        value={form.noFrom}
        onChange={handleChange('noFrom')}
        placeholder="예) 1"
      />
    </WiniGridItem>
    <WiniGridItem>
      <WiniNumber
        ui="column"
        label="No To"
        value={form.noTo}
        onChange={handleChange('noTo')}
        placeholder="예) 10"
      />
    </WiniGridItem>

    <WiniGridItem>
      <WiniDateTimePicker
        ui="column"
        format="YYYY-MM-DD"
        label="등록일 From"
        value={form.dateFrom}
        onChange={handleDateChange('dateFrom')}
      />
    </WiniGridItem>
    <WiniGridItem>
      <WiniDateTimePicker
        ui="column"
        format="YYYY-MM-DD"
        label="등록일 To"
        value={form.dateTo}
        onChange={handleDateChange('dateTo')}
      />
    </WiniGridItem>
  </WiniGridLayout>

  <WiniBox ui="btnbox">
    <WiniButton
      ui="default"
      icon="search"
      iconOnly
      onClick={applyFilter}
    >
      조회
    </WiniButton>
  </WiniBox>
</WiniBox>
{/* 멀티 그리드 */}
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem>
    <WiniTypography variant="h2">테이블(그리드)</WiniTypography>
    <WiniBox className="h-130">
      <WiniAgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
      />
    </WiniBox>
    <WiniBox ui="btnbox" className="justify-end">
      <WiniButton ui="default">
        등록
      </WiniButton>
    </WiniBox>
  </WiniGridItem>

  <WiniGridItem ratio={2}>
    <WiniTypography variant="h2">테이블(그리드) - 2배 넓이</WiniTypography>
    <WiniBox className="h-130">
      <WiniAgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
      />
    </WiniBox>
    <WiniBox ui="btnbox" className="justify-end">
      <WiniButton ui="default">
        등록
      </WiniButton>
    </WiniBox>
  </WiniGridItem>

</WiniGridLayout>`;

  const [copyState, setCopyState] = useState('copy');
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

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

  const handleChange = (name) => (event) => {
    setForm((prev) => ({
      ...prev,
      [name]: event?.target?.value ?? '',
    }));
  };

  const handleCheckedChange = (name) => (event, checked) => {
    setForm((prev) => ({
      ...prev,
      [name]: checked ?? Boolean(event?.target?.checked),
    }));
  };

  const handleDateChange = (name) => (value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value ?? null,
    }));
  };

  const applyFilter = useCallback(() => {
    const keyword = String(form.keyword ?? '').trim().toLowerCase();
    const owner = String(form.owner ?? '').trim().toLowerCase();
    const programCode = String(form.programCode ?? '').trim().toLowerCase();
    const programName = String(form.programName ?? '').trim().toLowerCase();

    const noFrom = form.noFrom !== '' ? Number(form.noFrom) : null;
    const noTo = form.noTo !== '' ? Number(form.noTo) : null;

    const toMs = (v) => {
      if (!v) return null;
      if (typeof v?.valueOf === 'function') return v.valueOf();
      const parsed = new Date(v);
      return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
    };

    const dateFromMs = toMs(form.dateFrom);
    const dateToMs = toMs(form.dateTo);

    const keywordScopes = [];
    if (form.searchInCode) keywordScopes.push('programCode');
    if (form.searchInName) keywordScopes.push('programName');
    if (form.searchInOwner) keywordScopes.push('owner');
    const useScopedKeyword = keywordScopes.length > 0;

    const next = seedRows.filter((row) => {
      const matchCategory =
        form.category === 'all' ? true : row.category === form.category;
      const matchStatus =
        form.status === 'all' ? true : row.status === form.status;

      const matchNoFrom = noFrom === null ? true : row.no >= noFrom;
      const matchNoTo = noTo === null ? true : row.no <= noTo;

      const rowCreatedAtMs = row.createdAt instanceof Date
        ? row.createdAt.getTime()
        : new Date(row.createdAt).getTime();
      const matchDateFrom = dateFromMs === null ? true : rowCreatedAtMs >= dateFromMs;
      const matchDateTo = dateToMs === null ? true : rowCreatedAtMs <= dateToMs;

      const keywordTarget = useScopedKeyword
        ? keywordScopes
            .map((k) => String(row?.[k] ?? ''))
            .join(' ')
            .toLowerCase()
        : `${row.programCode} ${row.programName} ${row.category} ${row.owner}`
            .toLowerCase();

      const matchKeyword = keyword ? keywordTarget.includes(keyword) : true;

      const matchOwner = owner ? row.owner.toLowerCase().includes(owner) : true;

      const matchProgramCode = programCode
        ? row.programCode.toLowerCase().includes(programCode)
        : true;

      const matchProgramName = programName
        ? row.programName.toLowerCase().includes(programName)
        : true;

      return (
        matchCategory &&
        matchStatus &&
        matchNoFrom &&
        matchNoTo &&
        matchDateFrom &&
        matchDateTo &&
        matchKeyword &&
        matchOwner &&
        matchProgramCode &&
        matchProgramName
      );
    });

    setRowData(next);
    window?.pubUI?.toast?.({
      text: `조회 완료 (총 ${next.length}건)`,
      time: 1200,
      type: 'success',
    });
  }, [form]);

  const checkboxRenderer = (params) => {
    return (
      <input
        type="checkbox"
        checked={params.value || false}
        readOnly
        style={{ cursor: 'pointer' }}
      />
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: 'chk',
        headerName: '',
        width: 60,
        cellStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cellRenderer: checkboxRenderer,
        sortable: false,
        onCellClicked: (params) => {
          const newValue = !params.data.chk;
          params.node.setDataValue('chk', newValue);
        },
      },
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
        minWidth: 220,
        sortable: false,
      },
      {
        field: 'category',
        headerName: '구분',
        width: 120,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
    ],
    [],
  );

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8" rowSpacing={2}>
        <WiniTypography variant="h1">SearchMultiGrid</WiniTypography>
        <WiniTypography variant="h2">검색폼 + 멀티그리드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            SearchMultiGrid는 <b>검색폼</b>과 <b>결과 멀티그리드</b>를 한 화면에 배치한 패턴입니다. <br />
            WiniBox ui="search"를 사용해 검색 영역을 구성하고, 내부에 WiniGridLayout ui="form"으로 필드를 배치합니다. <br />
            rowItem 속성으로 한 행에 배치할 컬럼 수 조절이 가능합니다.
          </WiniTypography>
        </WiniBox>

        {/* 검색폼 */}
        <WiniBox ui="search">
          <WiniGridLayout
            container
            ui="form"
            columnSpacing={1}
            rowSpacing={1}
            rowItem={4}
          >
            <WiniGridItem>
              <WiniSelect
                required
                ui="column"
                label="필수조건"
                value={form.category}
                onChange={handleChange('category')}
              >
                <WiniMenuItem value="all">전체</WiniMenuItem>
                <WiniMenuItem value="공통">공통</WiniMenuItem>
                <WiniMenuItem value="관리">관리</WiniMenuItem>
                <WiniMenuItem value="통계">통계</WiniMenuItem>
              </WiniSelect>
            </WiniGridItem>
            <WiniGridItem>
              <WiniBox className="flex flex-col gap-1">
                <WiniTypography variant="span" className="text-sm">
                  사용여부
                </WiniTypography>
                <WiniRadioGroup row value={form.status} onChange={handleChange('status')}>
                  <WiniRadio value="all" label="전체" />
                  <WiniRadio value="사용" label="사용" />
                  <WiniRadio value="미사용" label="미사용" />
                </WiniRadioGroup>
              </WiniBox>
            </WiniGridItem>
            <WiniGridItem>
              <WiniText ui="column" label="검색어" value={form.keyword} onChange={handleChange('keyword')} placeholder="프로그램 코드/명/담당자" />
            </WiniGridItem>

            <WiniGridItem>
              <WiniBox className="flex flex-col gap-1">
                <WiniTypography variant="span" className="text-sm">
                  검색 범위(Checkbox)
                </WiniTypography>
                <WiniBox className="flex flex-wrap gap-4">
                  <WiniCheckbox
                    label="코드"
                    checked={form.searchInCode}
                    onChange={handleCheckedChange('searchInCode')}
                  />
                  <WiniCheckbox
                    label="명"
                    checked={form.searchInName}
                    onChange={handleCheckedChange('searchInName')}
                  />
                  <WiniCheckbox
                    label="담당자"
                    checked={form.searchInOwner}
                    onChange={handleCheckedChange('searchInOwner')}
                  />
                </WiniBox>
              </WiniBox>
            </WiniGridItem>

            <WiniGridItem>
              <WiniNumber
                ui="column"
                label="No From"
                value={form.noFrom}
                onChange={handleChange('noFrom')}
                placeholder="예) 1"
              />
            </WiniGridItem>
            <WiniGridItem>
              <WiniNumber
                ui="column"
                label="No To"
                value={form.noTo}
                onChange={handleChange('noTo')}
                placeholder="예) 10"
              />
            </WiniGridItem>

            <WiniGridItem>
              <WiniDateTimePicker
                ui="column"
                format="YYYY-MM-DD"
                label="등록일 From"
                value={form.dateFrom}
                onChange={handleDateChange('dateFrom')}
              />
            </WiniGridItem>
            <WiniGridItem>
              <WiniDateTimePicker
                ui="column"
                format="YYYY-MM-DD"
                label="등록일 To"
                value={form.dateTo}
                onChange={handleDateChange('dateTo')}
              />
            </WiniGridItem>
          </WiniGridLayout>

          <WiniBox ui="btnbox">
            <WiniButton
              ui="default"
              icon="search"
              iconOnly
              onClick={applyFilter}
            >
              조회
            </WiniButton>
          </WiniBox>
        </WiniBox>
        {/* 멀티 그리드 */}
        <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
          <WiniGridItem>
            <WiniTypography variant="h2">테이블(그리드)</WiniTypography>
            <WiniBox className="h-130">
              <WiniAgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={false}
              />
            </WiniBox>
            <WiniBox ui="btnbox" className="justify-end">
              <WiniButton ui="default">
                등록
              </WiniButton>
            </WiniBox>
          </WiniGridItem>

          <WiniGridItem ratio={2}>
            <WiniTypography variant="h2">테이블(그리드) - 2배 넓이</WiniTypography>
            <WiniBox className="h-130">
              <WiniAgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={false}
              />
            </WiniBox>
            <WiniBox ui="btnbox" className="justify-end">
              <WiniButton ui="default">
                등록
              </WiniButton>
            </WiniBox>
          </WiniGridItem>
        </WiniGridLayout>

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
