import React, { useState, useEffect  }  from 'react';
import {
  WiniBox,
  WiniButton,
  WiniGridLayout,
  WiniTypography,
  WiniCode,
  WiniList,
  WiniListItem,
  WiniDialog,
  WiniDialogTitle,
  WiniDialogContent,
  WiniDialogContentText,
  WiniButtonGroup,
  WiniText
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { ArrowDropDownRoundedIcon } from '@/shared/lib';

const copyCodeToClipboard = async (code) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(code);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = code;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  let copied;
  try {
    textarea.select();
    copied = document.execCommand('copy');
  } finally {
    textarea.remove();
  }
  if (!copied) throw new Error('Copy failed');
};

const getCopyLabel = (state) => {
  if (state === 'failed') return '복사 실패';
  return state === 'complete' ? '복사 완료' : '복사하기';
};

export default function SnippetButton() {

  const [dialogOpen, setDialogOpen] = useState(false);

  const codeToCopy = 
`<WiniBox ui="btnitem">
  <WiniButton ui="line" onClick={() => setDialogOpen(true)}>대화상자 열기</WiniButton>
</WiniBox>
<WiniDialog
  color=""
  ui="btn"
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  btns={
      <WiniButtonGroup ui="list">
          <WiniButton ui="white" onClick={() => setDialogOpen(false)}>취소</WiniButton>
          <WiniButton className="MuiButton-textMaindark" ui="white" onClick={() => setDialogOpen(false)} autoFocus>
              확인
          </WiniButton>
      </WiniButtonGroup>
  }
>

  <WiniDialogTitle onClose={() => setDialogOpen(false)}>
    대화상자 제목
  </WiniDialogTitle>
  <WiniDialogContent className="MuiDialogContainer">
    <WiniDialogContentText>
      확인 요청이나 정보를 표시할 때 사용할 수 있는 대화상자입니다.
    </WiniDialogContentText>
  </WiniDialogContent>
</WiniDialog>`;

  const [draggableDialogOpen, setDraggableDialogOpen] = useState(false);

  const draggableCodeToCopy =
`<WiniBox ui="btnitem">
  <WiniButton ui="line" onClick={() => setDialogOpen(true)}>대화상자 열기</WiniButton>
</WiniBox>
<WiniDialog
  draggable
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
>
  <WiniDialogTitle onClose={() => setDialogOpen(false)}>
    대화상자 제목
  </WiniDialogTitle>
  <WiniDialogContent className="MuiDialogContainer">
    <WiniDialogContentText>
      제목줄을 잡고 끌어서 위치를 옮길 수 있는 대화상자입니다.
    </WiniDialogContentText>
  </WiniDialogContent>
</WiniDialog>`;

  const [backdropDialogOpen, setBackdropDialogOpen] = useState(false);
  const [modelessOpenA, setModelessOpenA] = useState(false);
  const [modelessOpenB, setModelessOpenB] = useState(false);
  const [modelessTextA, setModelessTextA] = useState('');
  const [modelessTextB, setModelessTextB] = useState('');

  const backdropCodeToCopy =
`<WiniBox ui="btnitem">
  <WiniButton ui="line" onClick={() => setDialogOpen(true)}>대화상자 열기</WiniButton>
</WiniBox>
<WiniDialog
  color=""
  ui="btn"
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  disableBackdropClose
  btns={
      <WiniButtonGroup ui="list">
          <WiniButton ui="white" onClick={() => setDialogOpen(false)}>취소</WiniButton>
          <WiniButton className="MuiButton-textMaindark" ui="white" onClick={() => setDialogOpen(false)} autoFocus>
              확인
          </WiniButton>
      </WiniButtonGroup>
  }
>

  <WiniDialogTitle onClose={() => setDialogOpen(false)}>
    대화상자 제목
  </WiniDialogTitle>
  <WiniDialogContent className="MuiDialogContainer">
    <WiniDialogContentText>
      외부 영역을 클릭해도 닫히지 않는 대화상자입니다.
    </WiniDialogContentText>
  </WiniDialogContent>
</WiniDialog>`;

  const modelessCodeToCopy =
`<WiniBox ui="btnitem">
  <WiniButton ui="line" onClick={() => setOpenA(true)}>팝업 A 열기</WiniButton>
  <WiniButton ui="line" onClick={() => setOpenB(true)}>팝업 B 열기</WiniButton>
</WiniBox>

<WiniDialog
  modeless
  draggable
  open={openA}
  onClose={() => setOpenA(false)}
  PaperProps={{ sx: { position: 'absolute', left: '10%' } }}
>
  <WiniDialogTitle onClose={() => setOpenA(false)}>팝업 A</WiniDialogTitle>
  <WiniDialogContent className="MuiDialogContainer">
    <WiniText label="A 입력" value={textA} onChange={(e) => setTextA(e.target.value)} />
  </WiniDialogContent>
</WiniDialog>

<WiniDialog
  modeless
  draggable
  open={openB}
  onClose={() => setOpenB(false)}
  PaperProps={{ sx: { position: 'absolute', right: '10%' } }}
>
  <WiniDialogTitle onClose={() => setOpenB(false)}>팝업 B</WiniDialogTitle>
  <WiniDialogContent className="MuiDialogContainer">
    <WiniText label="B 입력" value={textB} onChange={(e) => setTextB(e.target.value)} />
  </WiniDialogContent>
</WiniDialog>`;

  const [copyState, setCopyState] = useState('copy');
  const [draggableCopyState, setDraggableCopyState] = useState('copy');
  const [backdropCopyState, setBackdropCopyState] = useState('copy');
  const [modelessCopyState, setModelessCopyState] = useState('copy');

    useEffect(() => {
      let timer;
      if (copyState !== 'copy') {
        timer = setTimeout(() => {
          setCopyState('copy');
        }, 2000);
      }
      return () => clearTimeout(timer);
    }, [copyState]);

    useEffect(() => {
      let timer;
      if (draggableCopyState !== 'copy') {
        timer = setTimeout(() => {
          setDraggableCopyState('copy');
        }, 2000);
      }
      return () => clearTimeout(timer);
    }, [draggableCopyState]);

    useEffect(() => {
      let timer;
      if (backdropCopyState !== 'copy') {
        timer = setTimeout(() => {
          setBackdropCopyState('copy');
        }, 2000);
      }
      return () => clearTimeout(timer);
    }, [backdropCopyState]);

    useEffect(() => {
      let timer;
      if (modelessCopyState !== 'copy') {
        timer = setTimeout(() => {
          setModelessCopyState('copy');
        }, 2000);
      }
      return () => clearTimeout(timer);
    }, [modelessCopyState]);

    const handleCopy = async (code, setState) => {
      try {
        await copyCodeToClipboard(code);
        setState('complete');
      } catch {
        setState('failed');
      }
    };

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8">

        <WiniTypography variant='h1'>팝업</WiniTypography>
        <WiniTypography variant='h2'>팝업</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            WiniDialog는 사용자와 상호작용하는 대화상자(Dialog)를 구현하기 위한 컴포넌트입니다.
            대화상자는 일반적으로 확인 요청, 정보 표시, 사용자 입력 등을 위해 사용됩니다.
            <br /><br />
            color="caution"을 사용하여 경고 스타일의 대화상자를 만들 수 있으며, color="error"를 사용하여 오류 스타일의 대화상자를 만들 수 있습니다. <br />
             ui="btn"을 사용하여 버튼형 대화상자를 만들 수 있습니다. <br />
             버튼형 대화상자는 일반적으로 확인과 취소 버튼이 포함된 대화상자로, 사용자에게 선택을 요구하는 상황에서 사용됩니다. <br />
          </WiniTypography>
        </WiniBox>

        <WiniBox>
          {/* 팝업 영역 */}
          <WiniBox ui="btnitem">
            <WiniButton ui="line" onClick={() => setDialogOpen(true)}>대화상자 열기</WiniButton>
          </WiniBox>
          <WiniDialog
            color=""
            ui="btn"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            btns={
                <WiniButtonGroup ui="list">
                    <WiniButton ui="white" onClick={() => setDialogOpen(false)}>취소</WiniButton>
                    <WiniButton className="MuiButton-textMaindark" ui="white" onClick={() => setDialogOpen(false)} autoFocus>
                        확인
                    </WiniButton>
                </WiniButtonGroup>
            }
          >

            <WiniDialogTitle onClose={() => setDialogOpen(false)}>
              대화상자 제목
            </WiniDialogTitle>
            <WiniDialogContent className="MuiDialogContainer">
              <WiniDialogContentText>
                확인 요청이나 정보를 표시할 때 사용할 수 있는 대화상자입니다.
              </WiniDialogContentText>
            </WiniDialogContent>
          </WiniDialog>
        </WiniBox>



        <WiniBox className='bg-[#1A1A1A] p-6 rounded-sm relative'>
          <WiniBox className='flex items-center justify-between'>
            <WiniTypography variant='span' className='text-white text-lg'>코드 예시</WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton ui="gray" onClick={() => handleCopy(codeToCopy, setCopyState)} className='transition-all duration-300'>
                {getCopyLabel(copyState)}
              </WiniButton>
            </WiniBox>
          </WiniBox>
          <WiniCode code={codeToCopy} language="jsx" />

        </WiniBox>

        <WiniBox>
          <WiniTypography variant='h2'>드래그로 이동할 수 있는 팝업</WiniTypography>

          <WiniBox ui="info">
            <WiniTypography variant="span" className="text-md">
              draggable을 사용하면 대화상자의 제목줄(WiniDialogTitle)을 잡고 끌어서 위치를 옮길 수 있습니다. <br />
              제목줄에 마우스를 올리면 이동 커서가 표시되며, 닫기 버튼과 입력 요소를 누를 때는 드래그되지 않습니다. <br />
              대화상자는 화면 밖으로 벗어나지 않으며, 뒤쪽 내용을 보면서 입력해야 하는 팝업에서 사용합니다. <br />
            </WiniTypography>
          </WiniBox>

          <WiniBox>
            <WiniBox ui="btnitem">
              <WiniButton ui="line" onClick={() => setDraggableDialogOpen(true)}>대화상자 열기</WiniButton>
            </WiniBox>
            <WiniDialog
              draggable
              open={draggableDialogOpen}
              onClose={() => setDraggableDialogOpen(false)}
            >
              <WiniDialogTitle onClose={() => setDraggableDialogOpen(false)}>
                대화상자 제목
              </WiniDialogTitle>
              <WiniDialogContent className="MuiDialogContainer">
                <WiniDialogContentText>
                  제목줄을 잡고 끌어서 위치를 옮길 수 있는 대화상자입니다.
                </WiniDialogContentText>
              </WiniDialogContent>
            </WiniDialog>
          </WiniBox>

          <WiniBox className='bg-[#1A1A1A] p-6 rounded-sm relative'>
            <WiniBox className='flex items-center justify-between'>
              <WiniTypography variant='span' className='text-white text-lg'>코드 예시</WiniTypography>
              <WiniBox ui="btnbox">
                <WiniButton ui="gray" onClick={() => handleCopy(draggableCodeToCopy, setDraggableCopyState)} className='transition-all duration-300'>
                  {getCopyLabel(draggableCopyState)}
                </WiniButton>
              </WiniBox>
            </WiniBox>
            <WiniCode code={draggableCodeToCopy} language="jsx" />
          </WiniBox>
        </WiniBox>

        <WiniBox>
          <WiniTypography variant='h2'>외부 영역 클릭 시 닫히지 않는 팝업</WiniTypography>

          <WiniBox ui="info">
            <WiniTypography variant="span" className="text-md">
              disableBackdropClose를 사용하면 대화상자 바깥(배경) 영역을 클릭해도 대화상자가 닫히지 않습니다. <br />
              닫기 버튼, 취소/확인 버튼, ESC 키로는 기존과 동일하게 닫힙니다. <br />
              입력 중인 내용이 실수로 사라지면 안 되는 등록/수정 팝업에서 사용합니다. <br />
            </WiniTypography>
          </WiniBox>
        </WiniBox>

        <WiniBox>
          <WiniBox ui="btnitem">
            <WiniButton ui="line" onClick={() => setBackdropDialogOpen(true)}>대화상자 열기</WiniButton>
          </WiniBox>
          <WiniDialog
            color=""
            ui="btn"
            open={backdropDialogOpen}
            onClose={() => setBackdropDialogOpen(false)}
            disableBackdropClose
            btns={
                <WiniButtonGroup ui="list">
                    <WiniButton ui="white" onClick={() => setBackdropDialogOpen(false)}>취소</WiniButton>
                    <WiniButton className="MuiButton-textMaindark" ui="white" onClick={() => setBackdropDialogOpen(false)} autoFocus>
                        확인
                    </WiniButton>
                </WiniButtonGroup>
            }
          >

            <WiniDialogTitle onClose={() => setBackdropDialogOpen(false)}>
              대화상자 제목
            </WiniDialogTitle>
            <WiniDialogContent className="MuiDialogContainer">
              <WiniDialogContentText>
                외부 영역을 클릭해도 닫히지 않는 대화상자입니다.
              </WiniDialogContentText>
            </WiniDialogContent>
          </WiniDialog>
        </WiniBox>

        <WiniBox className='bg-[#1A1A1A] p-6 rounded-sm relative'>
          <WiniBox className='flex items-center justify-between'>
            <WiniTypography variant='span' className='text-white text-lg'>코드 예시</WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton ui="gray" onClick={() => handleCopy(backdropCodeToCopy, setBackdropCopyState)} className='transition-all duration-300'>
                {getCopyLabel(backdropCopyState)}
              </WiniButton>
            </WiniBox>
          </WiniBox>
          <WiniCode code={backdropCodeToCopy} language="jsx" />

        </WiniBox>

        <WiniBox>
          <WiniTypography variant='h2'>여러 팝업 동시에 띄우기</WiniTypography>

          <WiniBox ui="info">
            <WiniTypography variant="span" className="text-md">
              modeless를 사용하면 화면을 막지 않는 비모달 대화상자가 되어, 여러 팝업을 동시에 열어 두고 번갈아 조작할 수 있습니다. <br />
              팝업이 열려 있어도 뒤쪽 화면을 클릭하거나 스크롤할 수 있고, 클릭한 팝업이 맨 앞으로 올라옵니다. <br />
              ESC 키는 포커스가 있는 팝업만 닫습니다. draggable을 함께 사용하면 제목줄을 끌어 위치를 옮길 수 있습니다. <br />
              팝업끼리 겹치지 않도록 PaperProps의 sx로 처음 위치를 지정하는 것을 권장합니다. <br />
            </WiniTypography>
          </WiniBox>
          <WiniBox ui="btnitem" className="mt-4">
            <WiniButton ui="line" onClick={() => setModelessOpenA(true)}>팝업 A 열기</WiniButton>
            <WiniButton ui="line" onClick={() => setModelessOpenB(true)}>팝업 B 열기</WiniButton>
          </WiniBox>
        </WiniBox>



        <WiniDialog
          modeless
          draggable
          open={modelessOpenA}
          onClose={() => setModelessOpenA(false)}
          PaperProps={{ sx: { position: 'absolute', left: '10%' } }}
        >
          <WiniDialogTitle onClose={() => setModelessOpenA(false)}>
            팝업 A
          </WiniDialogTitle>
          <WiniDialogContent className="MuiDialogContainer">
            <WiniText label="A 입력" value={modelessTextA} onChange={(e) => setModelessTextA(e.target.value)} />
            <WiniDialogContentText className="pt-2">B 입력값: {modelessTextB || '-'}</WiniDialogContentText>
          </WiniDialogContent>
        </WiniDialog>

        <WiniDialog
          modeless
          draggable
          open={modelessOpenB}
          onClose={() => setModelessOpenB(false)}
          PaperProps={{ sx: { position: 'absolute', right: '10%' } }}
        >
          <WiniDialogTitle onClose={() => setModelessOpenB(false)}>
            팝업 B
          </WiniDialogTitle>
          <WiniDialogContent className="MuiDialogContainer">
            <WiniText label="B 입력" value={modelessTextB} onChange={(e) => setModelessTextB(e.target.value)} />
            <WiniDialogContentText className="pt-2">A 입력값: {modelessTextA || '-'}</WiniDialogContentText>
          </WiniDialogContent>
        </WiniDialog>

        <WiniBox className='bg-[#1A1A1A] p-6 rounded-sm relative'>
          <WiniBox className='flex items-center justify-between'>
            <WiniTypography variant='span' className='text-white text-lg'>코드 예시</WiniTypography>
            <WiniBox ui="btnbox">
              <WiniButton ui="gray" onClick={() => handleCopy(modelessCodeToCopy, setModelessCopyState)} className='transition-all duration-300'>
                {getCopyLabel(modelessCopyState)}
              </WiniButton>
            </WiniBox>
          </WiniBox>
          <WiniCode code={modelessCodeToCopy} language="jsx" />

        </WiniBox>

        

      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
