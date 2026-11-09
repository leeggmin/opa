import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniCode,
  WiniDateTimePicker,
  WiniGridItem,
  WiniGridLayout,
  WiniMenuItem,
  WiniNumber,
  WiniRadio,
  WiniRadioGroup,
  WiniSelect,
  WiniTab,
  WiniTabPanel,
  WiniTabs,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const seedRows = Array.from({ length: 24 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `SearchTab 샘플 ${num}`,
    category: num % 3 === 0 ? '공통' : num % 3 === 1 ? '관리' : '통계',
    status: num % 4 === 0 ? '미사용' : '사용',
    owner: num % 2 === 0 ? '홍길동' : '김담당',
    createdAt: new Date(Date.now() - num * 24 * 60 * 60 * 1000),
  };
});

const emptyInput = {
  programCode: '',
  programName: '',
  category: '공통',
  status: '사용',
  owner: '',
  createdAt: null,
  amount: '',
  optionA: false,
  optionB: false,
  optionC: false,
};

export default function SearchTab() {
  const [searchForm, setSearchForm] = useState({
    category: 'all',
    keyword: '',
    dateFrom: null,
    dateTo: null,
    searchInCode: true,
    searchInName: true,
    searchInOwner: true,
  });

  const [tabValue, setTabValue] = useState('grid');

  const [rowData, setRowData] = useState(seedRows);
  const [inputForm, setInputForm] = useState(emptyInput);

  const codeToCopy = `
{/* 검색폼 */}
<WiniBox ui="search">
  <WiniGridLayout
    container
    ui="form"
    columnSpacing={1}
    rowSpacing={1}
    rowItem={3}
  >
    <WiniGridItem>
      <WiniSelect
        required
        ui="column"
        label="구분"
        value={searchForm.category}
        onChange={handleSearchChange('category')}
      >
        <WiniMenuItem value="all">전체</WiniMenuItem>
        <WiniMenuItem value="공통">공통</WiniMenuItem>
        <WiniMenuItem value="관리">관리</WiniMenuItem>
        <WiniMenuItem value="통계">통계</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>

    <WiniGridItem>
      <WiniText
        ui="column"
        label="검색어"
        value={searchForm.keyword}
        onChange={handleSearchChange('keyword')}
        placeholder="코드/명/담당자"
      />
    </WiniGridItem>

    <WiniGridItem>
      <WiniBox className="flex flex-col gap-1">
        <WiniTypography variant="span" className="text-sm">
          검색 범위(Checkbox)
        </WiniTypography>
        <WiniBox className="flex flex-wrap gap-4">
          <WiniCheckbox
            label="코드"
            checked={searchForm.searchInCode}
            onChange={handleSearchChecked('searchInCode')}
          />
          <WiniCheckbox
            label="명"
            checked={searchForm.searchInName}
            onChange={handleSearchChecked('searchInName')}
          />
          <WiniCheckbox
            label="담당자"
            checked={searchForm.searchInOwner}
            onChange={handleSearchChecked('searchInOwner')}
          />
        </WiniBox>
      </WiniBox>
    </WiniGridItem>

    <WiniGridItem>
      <WiniDateTimePicker
        ui="column"
        format="YYYY-MM-DD"
        label="등록일 From"
        value={searchForm.dateFrom}
        onChange={handleSearchDate('dateFrom')}
      />
    </WiniGridItem>

    <WiniGridItem>
      <WiniDateTimePicker
        ui="column"
        format="YYYY-MM-DD"
        label="등록일 To"
        value={searchForm.dateTo}
        onChange={handleSearchDate('dateTo')}
      />
    </WiniGridItem>
  </WiniGridLayout>

  <WiniBox ui="btnbox">
    <WiniButton ui="default" icon="search" iconOnly onClick={handleSearch}>
      조회
    </WiniButton>
  </WiniBox>
</WiniBox>

{/* 탭 */}
<WiniBox>
  <WiniTabs
    ui=""
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    value={tabValue}
    onChange={handleTabChange}
  >
    <WiniTab label="그리드" value="grid" />
    <WiniTab label="입력폼" value="form" />
    <WiniTab label="요약" value="summary" />
  </WiniTabs>
</WiniBox>

<WiniTabPanel value={tabValue} index="grid">
  <WiniBox className="h-130">
    <WiniAgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      onRowClicked={handleRowClicked}
    />
  </WiniBox>
</WiniTabPanel>

<WiniTabPanel value={tabValue} index="form">
  <WiniBox ui="form">
    <WiniGridLayout
      container
      ui="form"
      columnSpacing={1}
      rowSpacing={1}
      rowItem={2}
    >
      <WiniGridItem>
        <WiniText
          required
          ui="column"
          label="프로그램 코드"
          value={inputForm.programCode}
          onChange={handleInputChange('programCode')}
          placeholder="예) PRG-001"
        />
      </WiniGridItem>
      <WiniGridItem>
        <WiniText
          required
          ui="column"
          label="프로그램 명"
          value={inputForm.programName}
          onChange={handleInputChange('programName')}
          placeholder="예) 메뉴관리"
        />
      </WiniGridItem>

      <WiniGridItem>
        <WiniSelect
          ui="column"
          label="구분"
          value={inputForm.category}
          onChange={handleInputChange('category')}
        >
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
          <WiniRadioGroup
            row
            value={inputForm.status}
            onChange={handleInputChange('status')}
          >
            <WiniRadio value="사용" label="사용" />
            <WiniRadio value="미사용" label="미사용" />
          </WiniRadioGroup>
        </WiniBox>
      </WiniGridItem>

      <WiniGridItem>
        <WiniText
          ui="column"
          label="담당자"
          value={inputForm.owner}
          onChange={handleInputChange('owner')}
          placeholder="담당자 이름"
        />
      </WiniGridItem>

      <WiniGridItem>
        <WiniDateTimePicker
          ui="column"
          format="YYYY-MM-DD"
          label="등록일"
          value={inputForm.createdAt}
          onChange={handleInputDate('createdAt')}
        />
      </WiniGridItem>

      <WiniGridItem>
        <WiniNumber
          ui="column"
          label="예산(숫자)"
          value={inputForm.amount}
          onChange={handleInputChange('amount')}
          placeholder="예) 100000"
        />
      </WiniGridItem>

      <WiniGridItem>
        <WiniBox className="flex flex-col gap-1">
          <WiniTypography variant="span" className="text-sm">
            옵션(Checkbox)
          </WiniTypography>
          <WiniBox className="flex flex-wrap gap-4">
            <WiniCheckbox
              label="옵션 A"
              checked={inputForm.optionA}
              onChange={handleInputChecked('optionA')}
            />
            <WiniCheckbox
              label="옵션 B"
              checked={inputForm.optionB}
              onChange={handleInputChecked('optionB')}
            />
            <WiniCheckbox
              label="옵션 C"
              checked={inputForm.optionC}
              onChange={handleInputChecked('optionC')}
            />
          </WiniBox>
        </WiniBox>
      </WiniGridItem>
    </WiniGridLayout>
  </WiniBox>
</WiniTabPanel>

<WiniTabPanel value={tabValue} index="summary">
  <WiniBox ui="info">
    <WiniTypography variant="span" className="text-sm">
      검색 결과 기준 집계: 전체 {statusCounts.total} / 사용 {statusCounts.used} / 미사용 {statusCounts.unused}
    </WiniTypography>
  </WiniBox>
</WiniTabPanel>`;

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

  const handleSearchChange = (name) => (event) => {
    setSearchForm((prev) => ({
      ...prev,
      [name]: event?.target?.value ?? '',
    }));
  };

  const handleSearchChecked = (name) => (event, checked) => {
    setSearchForm((prev) => ({
      ...prev,
      [name]: checked ?? Boolean(event?.target?.checked),
    }));
  };

  const handleSearchDate = (name) => (value) => {
    setSearchForm((prev) => ({
      ...prev,
      [name]: value ?? null,
    }));
  };

  const handleTabChange = (_event, newValue) => {
    setTabValue(String(newValue));
  };

  const filteredRows = useMemo(() => {
    const keyword = String(searchForm.keyword ?? '').trim().toLowerCase();

    const toMs = (v) => {
      if (!v) return null;
      if (typeof v?.valueOf === 'function') return v.valueOf();
      const parsed = new Date(v);
      return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
    };

    const dateFromMs = toMs(searchForm.dateFrom);
    const dateToMs = toMs(searchForm.dateTo);

    const keywordScopes = [];
    if (searchForm.searchInCode) keywordScopes.push('programCode');
    if (searchForm.searchInName) keywordScopes.push('programName');
    if (searchForm.searchInOwner) keywordScopes.push('owner');
    const useScopedKeyword = keywordScopes.length > 0;

    return seedRows.filter((row) => {
      const matchCategory =
        searchForm.category === 'all'
          ? true
          : row.category === searchForm.category;

      const rowCreatedAtMs = row.createdAt instanceof Date
        ? row.createdAt.getTime()
        : new Date(row.createdAt).getTime();
      const matchDateFrom =
        dateFromMs === null ? true : rowCreatedAtMs >= dateFromMs;
      const matchDateTo = dateToMs === null ? true : rowCreatedAtMs <= dateToMs;

      const keywordTarget = useScopedKeyword
        ? keywordScopes
            .map((k) => String(row?.[k] ?? ''))
            .join(' ')
            .toLowerCase()
        : `${row.programCode} ${row.programName} ${row.owner}`.toLowerCase();
      const matchKeyword = keyword ? keywordTarget.includes(keyword) : true;

      return matchCategory && matchDateFrom && matchDateTo && matchKeyword;
    });
  }, [searchForm]);

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

  const handleRowClicked = useCallback((event) => {
    const row = event?.data;
    if (!row) return;

    setInputForm((prev) => ({
      ...prev,
      programCode: row.programCode,
      programName: row.programName,
      category: row.category,
      status: row.status,
      owner: row.owner,
      createdAt: row.createdAt,
    }));
  }, []);

  const handleInputChange = (name) => (event) => {
    setInputForm((prev) => ({
      ...prev,
      [name]: event?.target?.value ?? '',
    }));
  };

  const handleInputChecked = (name) => (event, checked) => {
    setInputForm((prev) => ({
      ...prev,
      [name]: checked ?? Boolean(event?.target?.checked),
    }));
  };

  const handleInputDate = (name) => (value) => {
    setInputForm((prev) => ({
      ...prev,
      [name]: value ?? null,
    }));
  };

  const statusCounts = useMemo(() => {
    const total = rowData.length;
    const used = rowData.filter((r) => r.status === '사용').length;
    const unused = rowData.filter((r) => r.status === '미사용').length;
    return { total, used, unused };
  }, [rowData]);

  const handleSearch = () => {
    const first = filteredRows[0];
    setRowData(filteredRows);

    if (first) {
      setInputForm((prev) => ({
        ...prev,
        programCode: first.programCode,
        programName: first.programName,
        category: first.category,
        status: first.status,
        owner: first.owner,
        createdAt: first.createdAt,
      }));
    } else {
      setInputForm(emptyInput);
    }

    window?.pubUI?.toast?.({
      text: `조회 완료 (총 ${filteredRows.length}건)`,
      time: 1200,
      type: 'success',
    });
  };

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8" rowSpacing={2}>
        <WiniTypography variant="h1">SearchTab</WiniTypography>
        <WiniTypography variant="h2">검색폼 + 탭</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            SearchTab은 <b>검색폼</b>과 <b>탭</b>을 함께 배치하는 패턴입니다.
            <br />
            상단에서 조건을 입력하고, 하단에서 탭별로 <b>그리드/입력폼 등</b> 다양한 샘플 섹션을 전환하는 패턴에 사용합니다.
          </WiniTypography>
        </WiniBox>

        {/* 검색폼 */}
        <WiniBox ui="search">
          <WiniGridLayout
            container
            ui="form"
            columnSpacing={1}
            rowSpacing={1}
            rowItem={3}
          >
            <WiniGridItem>
              <WiniSelect
                required
                ui="column"
                label="구분"
                value={searchForm.category}
                onChange={handleSearchChange('category')}
              >
                <WiniMenuItem value="all">전체</WiniMenuItem>
                <WiniMenuItem value="공통">공통</WiniMenuItem>
                <WiniMenuItem value="관리">관리</WiniMenuItem>
                <WiniMenuItem value="통계">통계</WiniMenuItem>
              </WiniSelect>
            </WiniGridItem>

            <WiniGridItem>
              <WiniText
                ui="column"
                label="검색어"
                value={searchForm.keyword}
                onChange={handleSearchChange('keyword')}
                placeholder="코드/명/담당자"
              />
            </WiniGridItem>

            <WiniGridItem>
              <WiniBox className="flex flex-col gap-1">
                <WiniTypography variant="span" className="text-sm">
                  검색 범위(Checkbox)
                </WiniTypography>
                <WiniBox className="flex flex-wrap gap-4">
                  <WiniCheckbox
                    label="코드"
                    checked={searchForm.searchInCode}
                    onChange={handleSearchChecked('searchInCode')}
                  />
                  <WiniCheckbox
                    label="명"
                    checked={searchForm.searchInName}
                    onChange={handleSearchChecked('searchInName')}
                  />
                  <WiniCheckbox
                    label="담당자"
                    checked={searchForm.searchInOwner}
                    onChange={handleSearchChecked('searchInOwner')}
                  />
                </WiniBox>
              </WiniBox>
            </WiniGridItem>

            <WiniGridItem>
              <WiniDateTimePicker
                ui="column"
                format="YYYY-MM-DD"
                label="등록일 From"
                value={searchForm.dateFrom}
                onChange={handleSearchDate('dateFrom')}
              />
            </WiniGridItem>

            <WiniGridItem>
              <WiniDateTimePicker
                ui="column"
                format="YYYY-MM-DD"
                label="등록일 To"
                value={searchForm.dateTo}
                onChange={handleSearchDate('dateTo')}
              />
            </WiniGridItem>
          </WiniGridLayout>

          <WiniBox ui="btnbox">
            <WiniButton ui="default" icon="search" iconOnly onClick={handleSearch}>
              조회
            </WiniButton>
          </WiniBox>
        </WiniBox>

        {/* 탭 */}
        <WiniBox>
          <WiniTabs
            ui=""
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={tabValue}
            onChange={handleTabChange}
          >
            <WiniTab label="그리드" value="grid" />
            <WiniTab label="입력폼" value="form" />
            <WiniTab label="요약" value="summary" />
          </WiniTabs>
        </WiniBox>

        <WiniTabPanel value={tabValue} index="grid">
          <WiniBox className="h-130">
            <WiniAgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onRowClicked={handleRowClicked}
            />
          </WiniBox>
        </WiniTabPanel>

        <WiniTabPanel value={tabValue} index="form">
          <WiniBox ui="form">
            <WiniGridLayout
              container
              ui="form"
              columnSpacing={1}
              rowSpacing={1}
              rowItem={2}
            >
              <WiniGridItem>
                <WiniText
                  required
                  ui="column"
                  label="프로그램 코드"
                  value={inputForm.programCode}
                  onChange={handleInputChange('programCode')}
                  placeholder="예) PRG-001"
                />
              </WiniGridItem>
              <WiniGridItem>
                <WiniText
                  required
                  ui="column"
                  label="프로그램 명"
                  value={inputForm.programName}
                  onChange={handleInputChange('programName')}
                  placeholder="예) 메뉴관리"
                />
              </WiniGridItem>

              <WiniGridItem>
                <WiniSelect
                  ui="column"
                  label="구분"
                  value={inputForm.category}
                  onChange={handleInputChange('category')}
                >
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
                  <WiniRadioGroup
                    row
                    value={inputForm.status}
                    onChange={handleInputChange('status')}
                  >
                    <WiniRadio value="사용" label="사용" />
                    <WiniRadio value="미사용" label="미사용" />
                  </WiniRadioGroup>
                </WiniBox>
              </WiniGridItem>

              <WiniGridItem>
                <WiniText
                  ui="column"
                  label="담당자"
                  value={inputForm.owner}
                  onChange={handleInputChange('owner')}
                  placeholder="담당자 이름"
                />
              </WiniGridItem>

              <WiniGridItem>
                <WiniDateTimePicker
                  ui="column"
                  format="YYYY-MM-DD"
                  label="등록일"
                  value={inputForm.createdAt}
                  onChange={handleInputDate('createdAt')}
                />
              </WiniGridItem>

              <WiniGridItem>
                <WiniNumber
                  ui="column"
                  label="예산(숫자)"
                  value={inputForm.amount}
                  onChange={handleInputChange('amount')}
                  placeholder="예) 100000"
                />
              </WiniGridItem>

              <WiniGridItem>
                <WiniBox className="flex flex-col gap-1">
                  <WiniTypography variant="span" className="text-sm">
                    옵션(Checkbox)
                  </WiniTypography>
                  <WiniBox className="flex flex-wrap gap-4">
                    <WiniCheckbox
                      label="옵션 A"
                      checked={inputForm.optionA}
                      onChange={handleInputChecked('optionA')}
                    />
                    <WiniCheckbox
                      label="옵션 B"
                      checked={inputForm.optionB}
                      onChange={handleInputChecked('optionB')}
                    />
                    <WiniCheckbox
                      label="옵션 C"
                      checked={inputForm.optionC}
                      onChange={handleInputChecked('optionC')}
                    />
                  </WiniBox>
                </WiniBox>
              </WiniGridItem>
            </WiniGridLayout>
          </WiniBox>
        </WiniTabPanel>

        <WiniTabPanel value={tabValue} index="summary">
          <WiniBox ui="info">
            <WiniTypography variant="span" className="text-sm">
              검색 결과 기준 집계: 전체 {statusCounts.total} / 사용 {statusCounts.used} / 미사용 {statusCounts.unused}
            </WiniTypography>
          </WiniBox>
        </WiniTabPanel>

        <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
          <WiniBox className="flex items-center justify-between">
            <WiniTypography variant="span" className="text-white text-lg">
              코드 예시
            </WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton ui="gray" onClick={handleCopy} className="transition-all duration-300">
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
