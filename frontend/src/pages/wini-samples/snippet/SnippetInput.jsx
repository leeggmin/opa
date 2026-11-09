import React, { useState, useEffect  } from 'react';
import {
  WiniBox,
  WiniGridLayout,
  WiniGridItem,
  WiniText,
  WiniNumber,
  WiniSelect,
  WiniMenuItem,
  WiniButton,
  WiniTypography,
  WiniCode,
  WiniList,
  WiniCheckbox,
  WiniRadioGroup,
  WiniRadio,
  WiniListItem,
  WiniListItemText,
  WiniIconButton,
  WiniInputLabel 
} from '@/shared/ui/wini';

import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';


import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

export default function SnippetInput() {

  const fileInputRef = React.useRef(null);
  const [attachedFiles, setAttachedFiles] = React.useState([]);

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


  const codeToCopy = 
`<WiniBox ui="form">
  <WiniGridLayout container ui="form" rowSpacing={1} columnSpacing={1} rowItem={2}>
    <WiniGridItem>
      <WiniText ui="column" label="입력1" placeholder='내용 입력'/>
    </WiniGridItem>
    <WiniGridItem>
      <WiniSelect ui="column" label="입력2" defaultValue={0}>
        <WiniMenuItem value={0}>Item1</WiniMenuItem>
        <WiniMenuItem value={1}>Item2</WiniMenuItem>
        <WiniMenuItem value={2}>Item3</WiniMenuItem>
      </WiniSelect>
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
    <WiniGridItem className="w-full">
      <WiniNumber ui="column" label="입력3" placeholder='내용 입력'/>
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

        <WiniTypography variant='h1'>입력폼</WiniTypography>
        <WiniTypography variant='h2'>입력폼</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            입력폼(Input Form)은 사용자가 데이터를 입력할 수 있도록 
            입력 필드와 선택 요소를 조합한 폼 영역입니다. 
            일반적으로 텍스트 입력, 드롭다운 선택, 숫자 입력, 날짜 선택기, 체크박스, 라디오, 파일업로드 등이 함께 구성됩니다.
            <br /><br />
            <b>WiniBox ui="form"</b>는 입력 영역 전용 레이아웃을 제공하며,
            내부에는 <b>WiniGridLayout ui="form"</b>을 사용해 필드를 일정한 간격으로 배치합니다.
            <br />
            <b>WiniGridItem에 className="w-full"</b>을 추가하면 해당 아이템이 가로 전체 너비를 차지합니다.<br />
            <b>rowItem</b> 속성은 한 행에 배치할 컬럼 개수를 설정하는 옵션으로,
            반응형 입력폼 구성 시 유용하게 활용할 수 있습니다.
          </WiniTypography>
        </WiniBox>

        {/* 입력폼 영역 */}
        <WiniBox ui="form">
          <WiniGridLayout container ui="form" rowSpacing={1} columnSpacing={1} rowItem={2}>
            <WiniGridItem>
              <WiniText ui="column" label="입력1" placeholder='내용 입력'/>
            </WiniGridItem>
            <WiniGridItem>
              <WiniSelect ui="column" label="입력2" defaultValue={0}>
                <WiniMenuItem value={0}>Item1</WiniMenuItem>
                <WiniMenuItem value={1}>Item2</WiniMenuItem>
                <WiniMenuItem value={2}>Item3</WiniMenuItem>
              </WiniSelect>
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
            <WiniGridItem className="w-full">
              <WiniNumber ui="column" label="입력3" placeholder='내용 입력'/>
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
