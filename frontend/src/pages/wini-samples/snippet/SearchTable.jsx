import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniCode,
  WiniDateTimePicker,
  WiniGridItem,
  WiniGridLayout,
  WiniIconButton,
  WiniInputLabel,
  WiniList,
  WiniListItem,
  WiniListItemText,
  WiniMenuItem,
  WiniNumber,
  WiniRadio,
  WiniRadioGroup,
  WiniSelect,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

import { size } from '@/shared/config/theme';

const seedRows = Array.from({ length: 18 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `SearchTable 샘플 ${num}`,
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

export default function SearchTable() {
  const [searchForm, setSearchForm] = useState({
    category: 'all',
    status: 'all',
    keyword: '',
    dateFrom: null,
    dateTo: null,
    searchInCode: true,
    searchInName: true,
    searchInOwner: true,
  });

  const [inputForm, setInputForm] = useState(emptyInput);

  const fileInputRef = useRef(null);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const codeToCopy = `
<WiniBox ui="search">
  <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={3}>
    <WiniGridItem>
      <WiniSelect required ui="column" label="구분" value={searchForm.category} onChange={handleSearchChange('category')}>
        <WiniMenuItem value="all">전체</WiniMenuItem>
        <WiniMenuItem value="공통">공통</WiniMenuItem>
        <WiniMenuItem value="관리">관리</WiniMenuItem>
        <WiniMenuItem value="통계">통계</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>
    <WiniGridItem>
      <WiniBox className="flex flex-col gap-1">
        <WiniTypography variant="span" className="text-sm">
          사용여부 (라디오)
        </WiniTypography>
        <WiniRadioGroup row value={searchForm.status} onChange={handleSearchChange('status')}>
          <WiniRadio value="all" label="전체" />
          <WiniRadio value="사용" label="사용" />
          <WiniRadio value="미사용" label="미사용" />
        </WiniRadioGroup>
      </WiniBox>
    </WiniGridItem>
    <WiniGridItem>
      <WiniText ui="column" label="검색어" value={searchForm.keyword} onChange={handleSearchChange('keyword')} placeholder="코드/명/담당자" />
    </WiniGridItem>
    <WiniGridItem>
      <WiniBox className="flex flex-col gap-1">
        <WiniTypography variant="span" className="text-sm">
          검색 범위(Checkbox)
        </WiniTypography>
        <WiniBox className="flex flex-wrap gap-4">
          <WiniCheckbox label="코드" checked={searchForm.searchInCode} onChange={handleSearchChecked('searchInCode')} />
          <WiniCheckbox label="명" checked={searchForm.searchInName} onChange={handleSearchChecked('searchInName')} />
          <WiniCheckbox label="담당자" checked={searchForm.searchInOwner} onChange={handleSearchChecked('searchInOwner')} />
        </WiniBox>
      </WiniBox>
    </WiniGridItem>
    <WiniGridItem>
      <WiniDateTimePicker ui="column" format="YYYY-MM-DD" label="등록일 From" value={searchForm.dateFrom} onChange={handleSearchDate('dateFrom')} />
    </WiniGridItem>
    <WiniGridItem>
      <WiniDateTimePicker ui="column" format="YYYY-MM-DD" label="등록일 To" value={searchForm.dateTo} onChange={handleSearchDate('dateTo')} />
    </WiniGridItem>
  </WiniGridLayout>
  <WiniBox ui="btnbox">
    <WiniButton ui="default" icon="search" iconOnly onClick={handleSearch}>
      조회
    </WiniButton>
  </WiniBox>
</WiniBox>

{/* 입력폼 */}
<WiniBox>
  <WiniBox ui="form">
    <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={2}>
      <WiniGridItem>
        <WiniText required ui="column" label="프로그램 코드" value={inputForm.programCode} onChange={handleInputChange('programCode')} placeholder="예) PRG-001" />
      </WiniGridItem>
      <WiniGridItem>
        <WiniText required ui="column" label="프로그램 명" value={inputForm.programName} onChange={handleInputChange('programName')} placeholder="예) 메뉴관리" />
      </WiniGridItem>
      <WiniGridItem>
        <WiniSelect ui="column" label="구분" value={inputForm.category} onChange={handleInputChange('category')}>
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
          <WiniRadioGroup row value={inputForm.status} onChange={handleInputChange('status')}>
            <WiniRadio value="사용" label="사용" />
            <WiniRadio value="미사용" label="미사용" />
          </WiniRadioGroup>
        </WiniBox>
      </WiniGridItem>
      <WiniGridItem>
        <WiniText ui="column" label="담당자" value={inputForm.owner} onChange={handleInputChange('owner')} placeholder="담당자 이름" />
      </WiniGridItem>
      <WiniGridItem>
        <WiniDateTimePicker ui="column" format="YYYY-MM-DD" label="등록일" value={inputForm.createdAt} onChange={handleInputDate('createdAt')} />
      </WiniGridItem>
      <WiniGridItem>
        <WiniNumber ui="column" label="예산(숫자)" value={inputForm.amount} onChange={handleInputChange('amount')} placeholder="예) 100000" />
      </WiniGridItem>
      <WiniGridItem>
        <WiniBox className="flex flex-col gap-1">
          <WiniTypography variant="span" className="text-sm">
            옵션(Checkbox)
          </WiniTypography>
          <WiniBox className="flex flex-wrap gap-4">
            <WiniCheckbox label="옵션 A" checked={inputForm.optionA} onChange={handleInputChecked('optionA')} />
            <WiniCheckbox label="옵션 B" checked={inputForm.optionB} onChange={handleInputChecked('optionB')} />
            <WiniCheckbox label="옵션 C" checked={inputForm.optionC} onChange={handleInputChecked('optionC')} />
          </WiniBox>
        </WiniBox>
      </WiniGridItem>
      <WiniGridItem className="w-full">
        <WiniInputLabel>파일 업로드</WiniInputLabel>
        <WiniBox
          onDrop={handleDropAttachedFiles}
          onDragOver={handleDragOverAttachedFiles}
          className='border border-border-default rounded-[4px] mt-1 p-1 bg-background-white'
        >
          <WiniBox className='overflow-auto max-h-[88px] min-h-[88px]'>
          {attachedFiles.length ? (
            <WiniList listType="file">
              {attachedFiles.map((v) => (
                <WiniListItem key={v.id} className="">
                  <WiniListItemText>{v.name}</WiniListItemText>

                  <WiniIconButton
                    iconOnly
                    ui=""
                    icon="del"
                    onClick={() => removeAttachedFile(v.id)}
                    className='text-text-point w-5 h-5'
                    iconSx={{
                      width: size.icon.sm,
                      height: size.icon.sm,
                      fontSize: size.icon.sm,
                    }}
                  /> 
                </WiniListItem>
              ))}
            </WiniList>
          ) : (
            <>
            <WiniBox>
              <WiniTypography variant='span'>
                {/* 첨부파일을 이곳에 드래그 해주세요. */}
              </WiniTypography>
            </WiniBox>
          </>
          )}
          </WiniBox>
        </WiniBox>
        <WiniButton className='w-full mt-2' ui="line" onClick={handleBrowseAttachedFiles}>
            파일 업로드
          </WiniButton>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
      </WiniGridItem>
    </WiniGridLayout>
  </WiniBox>
  <WiniBox ui="btnbox">
    <WiniBox ui="btnitem">
      <WiniButton ui="delete" >삭제</WiniButton>
    </WiniBox>
    <WiniBox ui="btnitem">
      <WiniButton ui="default" onClick={handleSave}>등록</WiniButton>
      <WiniButton ui="line" >수정</WiniButton>
      <WiniButton ui="lineGray" >초기화</WiniButton>
    </WiniBox>
  </WiniBox>
</WiniBox>`;

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

  const addAttachedFiles = (filesLike) => {
    const files = Array.from(filesLike || []);
    if (files.length === 0) return;

    setAttachedFiles((prev) => {
      const existing = new Set(prev.map((v) => v.id));

      const next = files
        .map((file) => {
          const id = `${file.name}_${file.size}_${file.lastModified}`;
          return { id, name: file.name, file };
        })
        .filter((v) => !existing.has(v.id));

      return next.length ? [...prev, ...next] : prev;
    });
  };

  const removeAttachedFile = (id) => {
    setAttachedFiles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleDropAttachedFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addAttachedFiles(event.dataTransfer?.files);
  };

  const handleDragOverAttachedFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  };

  const handleBrowseAttachedFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    addAttachedFiles(event.target?.files);
    if (event.target) event.target.value = '';
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

      const matchStatus =
        searchForm.status === 'all' ? true : row.status === searchForm.status;

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
        : `${row.programCode} ${row.programName} ${row.owner}`.toLowerCase();

      const matchKeyword = keyword ? keywordTarget.includes(keyword) : true;

      return matchCategory && matchStatus && matchDateFrom && matchDateTo && matchKeyword;
    });
  }, [searchForm]);

  const handleSearch = useCallback(() => {
    const first = filteredRows[0];

    window?.pubUI?.toast?.({
      text: `조회 완료 (총 ${filteredRows.length}건)`,
      time: 1200,
      type: 'success',
    });

    if (!first) {
      setInputForm(emptyInput);
      setAttachedFiles([]);
      return;
    }

    setInputForm((prev) => ({
      ...prev,
      programCode: first.programCode,
      programName: first.programName,
      category: first.category,
      status: first.status,
      owner: first.owner,
      createdAt: first.createdAt,
    }));
  }, [filteredRows]);

  const handleResetInput = () => {
    setInputForm(emptyInput);
    setAttachedFiles([]);
    window?.pubUI?.toast?.({
      text: '입력폼이 초기화되었습니다.',
      time: 1200,
      type: 'info',
    });
  };

  const handleSave = () => {
    window?.pubUI?.toast?.({
      text: '저장(예시) 처리되었습니다.',
      time: 1200,
      type: 'success',
    });
  };

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8" rowSpacing={2}>
        <WiniTypography variant="h1">SearchTable</WiniTypography>
        <WiniTypography variant="h2">검색폼 + 입력폼</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            SearchTable은 <b>검색폼</b>과 <b>입력폼</b>을 함께 구성한 패턴입니다.
            <br />
            상단은 <b>WiniBox ui=&quot;search&quot;</b> + <b>WiniGridLayout ui=&quot;form&quot;</b>으로 검색영역을 구성하고,
            하단은 <b>WiniBox ui=&quot;form&quot;</b>으로 입력폼을 구성합니다.
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
              <WiniBox className="flex flex-col gap-1">
                <WiniTypography variant="span" className="text-sm">
                  사용여부 (라디오)
                </WiniTypography>
                <WiniRadioGroup
                  row
                  value={searchForm.status}
                  onChange={handleSearchChange('status')}
                >
                  <WiniRadio value="all" label="전체" />
                  <WiniRadio value="사용" label="사용" />
                  <WiniRadio value="미사용" label="미사용" />
                </WiniRadioGroup>
              </WiniBox>
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

        {/* 입력폼 */}
        <WiniBox>
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

              <WiniGridItem className="w-full">
              <WiniInputLabel>파일 업로드</WiniInputLabel>
              <WiniBox
                onDrop={handleDropAttachedFiles}
                onDragOver={handleDragOverAttachedFiles}
                className='border border-border-default rounded-[4px] mt-1 p-1 bg-background-white'
              >
                <WiniBox className='overflow-auto max-h-[88px] min-h-[88px]'>
                {attachedFiles.length ? (
                  <WiniList listType="file">
                    {attachedFiles.map((v) => (
                      <WiniListItem key={v.id} className="">
                        <WiniListItemText>{v.name}</WiniListItemText>

                        <WiniIconButton
                          iconOnly
                          ui=""
                          icon="del"
                          onClick={() => removeAttachedFile(v.id)}
                          className='text-text-point w-5 h-5'
                          iconSx={{
                            width: size.icon.sm,
                            height: size.icon.sm,
                            fontSize: size.icon.sm,
                          }}
                        /> 
                      </WiniListItem>
                    ))}
                  </WiniList>
                ) : (
                  <>
                  <WiniBox>
                    <WiniTypography variant='span'>
                      {/* 첨부파일을 이곳에 드래그 해주세요. */}
                    </WiniTypography>
                  </WiniBox>
                </>
                )}
                </WiniBox>
              </WiniBox>
              <WiniButton className='w-full mt-2' ui="line" onClick={handleBrowseAttachedFiles}>
                  파일 업로드
                </WiniButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
            </WiniGridItem>
            </WiniGridLayout>
          </WiniBox>


          <WiniBox ui="btnbox">
            <WiniBox ui="btnitem">
              <WiniButton ui="delete" >삭제</WiniButton>
            </WiniBox>
            <WiniBox ui="btnitem">
              <WiniButton ui="default" onClick={handleSave}>등록</WiniButton>
              <WiniButton ui="line" >수정</WiniButton>
              <WiniButton ui="lineGray" >초기화</WiniButton>
            </WiniBox>
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
