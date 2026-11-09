import React, { useState, useEffect  } from 'react';
import {
  WiniBox,
  WiniGridLayout,
  WiniGridItem,
  WiniText,
  WiniSelect,
  WiniMenuItem,
  WiniNumber,
  WiniButton,
  WiniTypography,
  WiniCode,
  WiniList,
  WiniListItem,
  WiniListItemText,
  WiniListItemIcon,
  WiniListSubheader,
  WiniDateTimePicker,
  WiniCheckbox,
  WiniRadioGroup,
  WiniRadio
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

export default function SnippetSearch() {

  const [searchForm, setSearchForm] = useState({
    keyword: '',
    type: '',
    amount: ''
  });

  const handleChange = (name, value) => {
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
  };

  const codeToCopy = 
`<WiniBox ui="search">
  <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={3}>
    <WiniGridItem>
      <WiniText ui="column" label="검색어" value={searchForm.keyword} onChange={(e) => handleChange('keyword', e.target.value)} placeholder='검색어 입력'/>
    </WiniGridItem>
    <WiniGridItem>
      <WiniSelect ui="column" label="검색어2" defaultValue="0" value={searchForm.type} onChange={(e) => handleChange('type', e.target.value)}>
        <WiniMenuItem value="all" >All</WiniMenuItem>
        <WiniMenuItem value="0">Item1</WiniMenuItem>
        <WiniMenuItem value="1">Item2</WiniMenuItem>
        <WiniMenuItem value="2">Item3</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>
    <WiniGridItem>
      <WiniNumber ui="column" label="검색어3" value={searchForm.amount} onChange={(e) => handleChange('amount', e.target.value)} placeholder='검색어 입력'/>
    </WiniGridItem>
    <WiniGridItem>
      <WiniDateTimePicker ui="column" format="YYYY-MM-DD hh:mm" label="검색어4" />
    </WiniGridItem>
    <WiniGridItem>
      <WiniCheckbox label="체크박스1" />
      <WiniCheckbox label="체크박스2" />
    </WiniGridItem>
    <WiniGridItem>
      <WiniRadioGroup row>
        <WiniRadio value="1" label="라디오 1" />
        <WiniRadio value="2" label="라디오 2" />
        <WiniRadio value="3" label="라디오 3" />
      </WiniRadioGroup>
    </WiniGridItem>
  </WiniGridLayout>
  {/* 버튼 영역 */}
  <WiniBox>
    <WiniButton ui="default" onClick={handleSearch}>
      조회
    </WiniButton>
  </WiniBox>
</WiniBox>`;

  const [copyState, setCopyState] = useState('copy');
  
  useEffect(() => {
    let timer;
    if (copyState === 'complete') {
      timer = setTimeout(() => {
        setCopyState('copy');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [copyState]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopyState('complete');

      pubUI.toast({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success'
      });

    } catch (error) {
      console.error('복사 실패:', error);
    }
  };


  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8">

        <WiniTypography variant='h1'>검색폼</WiniTypography>
        <WiniTypography variant='h2'>검색폼</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            검색폼(Search Form)은 사용자가 원하는 데이터를 빠르게 조회할 수 있도록 
            입력 필드와 선택 요소를 조합한 폼 영역입니다. 
            일반적으로 텍스트 입력, 드롭다운 선택, 숫자 입력, 날짜 선택기, 체크박스 등이 함께 구성됩니다.
            <br /><br />
            <b>WiniBox ui="search"</b>는 검색 영역 전용 레이아웃을 제공하며,
            내부에는 <b>WiniGridLayout ui="form"</b>을 사용해 필드를 일정한 간격으로 배치합니다.
            <br />
            <b>rowItem</b> 속성은 한 행에 배치할 컬럼 개수를 설정하는 옵션으로,
            반응형 검색폼 구성 시 유용하게 활용할 수 있습니다.
          </WiniTypography>
        </WiniBox>


        {/* 검색폼 영역 */}
        <WiniBox ui="search">
          <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={3}>
            <WiniGridItem>
              <WiniText ui="column" label="검색어" value={searchForm.keyword} onChange={(e) => handleChange('keyword', e.target.value)} placeholder='검색어 입력'/>
            </WiniGridItem>
            <WiniGridItem>
              <WiniSelect ui="column" label="검색어2" defaultValue="0" value={searchForm.type} onChange={(e) => handleChange('type', e.target.value)}>
                <WiniMenuItem value="all" >All</WiniMenuItem>
                <WiniMenuItem value="0">Item1</WiniMenuItem>
                <WiniMenuItem value="1">Item2</WiniMenuItem>
                <WiniMenuItem value="2">Item3</WiniMenuItem>
              </WiniSelect>
            </WiniGridItem>
            <WiniGridItem>
              <WiniNumber ui="column" label="검색어3" value={searchForm.amount} onChange={(e) => handleChange('amount', e.target.value)} placeholder='검색어 입력'/>
            </WiniGridItem>
            <WiniGridItem>
              <WiniDateTimePicker ui="column" format="YYYY-MM-DD hh:mm" label="검색어4" />
            </WiniGridItem>
            <WiniGridItem>
              <WiniCheckbox label="체크박스1" />
              <WiniCheckbox label="체크박스2" />
            </WiniGridItem>
            <WiniGridItem>
             <WiniRadioGroup row>
                <WiniRadio value="1" label="라디오 1" />
                <WiniRadio value="2" label="라디오 2" />
                <WiniRadio value="3" label="라디오 3" />
              </WiniRadioGroup>
            </WiniGridItem>
          </WiniGridLayout>
          {/* 버튼 영역 */}
          <WiniBox>
            <WiniButton ui="default" onClick={handleSearch}>
              조회
            </WiniButton>
          </WiniBox>
        </WiniBox>

        <WiniBox className='bg-[#1A1A1A] p-6 rounded-sm relative'>
          <WiniBox className='flex items-center justify-between'>
            <WiniTypography variant='span' className='text-white text-lg'>코드 예시</WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton ui="gray" onClick={handleCopy} className='transition-all duration-300'>
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
