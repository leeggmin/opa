import { useRef, useState } from 'react';

import { WiniFormEmpty, WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniBox, WiniTypography, WiniButton, WiniCode } from '@/shared/ui/wini';


const SnippetBasic = () => {

const codeToCopy = 
`import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { 
	WiniGridLayout,
	WiniBox,
	WiniGridItem 
} from '@/shared/ui/wini';

const 화면명 = () => {
	return (
		<WiniFormNormal>
			
		</WiniFormNormal>
	);
}

export default 화면명;`;
  
  const [copyState, setCopyState] = useState('copy');
  const copyTimerRef = useRef(null);

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
      <WiniGridLayout>
        <WiniTypography variant="h1">기본구성</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            기본 골격에 대한 설명입니다. 화면을 구성하기 전에 기본 골격을 먼저 만듭니다. <br />

            
            1) 기본 골격 : import → const 화면명 = () =&gt; {'{'} return ( ); {'}'} → export default 화면명;
            까지만 먼저 만들어서 파일 구조/문법을 안전하게 잡습니다.
            <br />
            2) 화면 구성 : return ( ... ) 안에 실제 컴포넌트/레이아웃(WiniFormNormal, WiniGridLayout, WiniBox, WiniGridItem 등)을
            배치해서 화면 레이아웃을 완성합니다.
          </WiniTypography>
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
};

export default SnippetBasic;
