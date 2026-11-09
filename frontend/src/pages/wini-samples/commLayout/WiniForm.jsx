import React, { useEffect, useRef, useState } from 'react';
import {
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniGridItem,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const WINI_FORM_GUIDES = [
  {
    key: 'WiniFormNormal',
    name: 'WiniFormNormal',
    description: 'WiniFormNormal은 타이틀 바(화면 제목과 브레드크럼)가 기본으로 표시되는 표준 화면 레이아웃입니다. 메인 메뉴 구조에 맞추어 타이틀 정보와 화면 여백이 자동으로 설정됩니다.',
    code: `import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
  
const 화면명 = () => {
  return (
  <WiniFormNormal>
    {/* 화면 내용 코드 작성 */}
  </WiniFormNormal>
  );
}

export default 화면명;`,
  }, {
    key: 'WiniFormEmpty',
    name: 'WiniFormEmpty',
    description: 'WiniFormEmpty는 기본 디자인이 적용 되지 않은 레이아웃입니다. 대시보드와 같은 특수한 화면에서 개별적으로 디자인을 구성할 수 있도록, 여백이나 기본 스타일이 적용되어 있지 않습니다.',
    code: `import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
  
const 화면명 = () => {
  return (
  <WiniFormEmpty>
    {/* 화면 내용 코드 작성 */}
  </WiniFormEmpty>
  );
}

export default 화면명;`,
  },
  {
    key: 'FormTitle',
    name: 'FormTitle',
    description: 'WiniFormEmpty처럼 타이틀 바가 없는 레이아웃에서 타이틀 바만 별도로 사용해야 할 때 FormTitle을 추가할 수 있습니다. 현재 화면의 메뉴 ID를 전달하면 화면 제목과 브레드크럼이 표시됩니다.',
    code: `import { FormTitle, WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { useFormContext } from '@/shared/model';

const 화면명 = () => {
  const { id } = useFormContext();

  return (
    <WiniFormEmpty>
      <FormTitle id={id} />
      {/* 화면 내용 코드 작성 */}
    </WiniFormEmpty>
  );
}

export default 화면명;`,
  },
//   {
//     key: 'WiniFormCommon',
//     name: 'WiniFormCommon',
//     description: `WiniFormCommon은 화면상단에 공통버튼(자동생성되는 버튼)을 사용 할수 있는 레이아웃입니다. 해당폼에 권한과 기본여백이 모두 들어 있는 레이아웃입니다.`,
//     code: `import { WiniFormCommon } from '@/shared/ui/blocks/form-layout';
// import { winiCom } from '@/shared/lib';
  
// const 화면명 = () => {
//   const { winiEvent } = winiCom.getFormInfo(); //버튼 이벤트 가져오기

//   winiEvent.select = () => {
//     //조회버튼이벤트 작성
//   };

//   return (
//   <WiniFormCommon>
//     {/* 화면 내용 코드 작성 */}
//   </WiniFormCommon>
//   );
// }

// export default 화면명;`,
//   }
];
export default function samples_winiForm() {
  const [copyState, setCopyState] = useState(
    Object.fromEntries(WINI_FORM_GUIDES.map((item) => [item.key, 'copy'])),
  );

  const timersRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async (key, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      if (timersRef.current[key]) {
        clearTimeout(timersRef.current[key]);
      }

      timersRef.current[key] = setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });
    } catch (error) {
      console.error('복사 실패:', error);
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
        <WiniTypography variant="h1">winiForm</WiniTypography>
        <WiniTypography variant="h2">화면 레이아웃 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `winiForm`은 프로젝트 전반에 공통으로 적용되는 기본 화면 레이아웃으로, 디자인과 권한 설정이 포함되어 있습니다.
            <br />
            전체 화면의 여백을 일괄적으로 관리하기 위해 반드시 사용해야 하며, 권한 처리 로직이 포함될 수 있으므로 화면의 최상위(가장 하단 Wrapper 위치)에 추가해야 합니다.
          </WiniTypography>
        </WiniBox>

        {WINI_FORM_GUIDES.map((item) => (
          <WiniBox key={item.key} ui="line">
            <WiniTypography variant="h2">{item.name}</WiniTypography>
            <WiniBox className="mb-4">
              <WiniTypography variant="span" className="text-md">
                {item.description}
              </WiniTypography>
            </WiniBox>
            {item.key === 'WiniFormCommon' &&
              <WiniBox className="mt-4" gap={1}>
                <WiniBox ui="info" className="p-4">
                  <WiniTypography variant="span" className="text-md font-bold ">
                    WiniEvent 객체의 사용<br />
                  </WiniTypography>
                  <WiniTypography variant="span" className="text-md pl-4">
                    WiniFormCommon에서 제공하는 공통 버튼의 이벤트는 winiEvent 객체를 통해 설정할 수 있습니다.
                    <br />
                  </WiniTypography>
                  <WiniTypography variant="span" className="text-md pl-4">
                    winiEvent 객체는 화면에서 winiCom.getFormInfo() 함수를 호출하여 가져올 수 있습니다. (단, winiEvent를 정의할때 이벤트 이름은 변경하지 않아야 합니다.)
                    <br />
                  </WiniTypography>
                  <WiniTypography variant="span" className="text-md pl-4">
                    공통 버튼은 조회, 등록, 수정, 삭제 버튼이 자동으로 생성되며, 해당 이벤트가 정의되어 있지 않거나 사용자에게 권한이 없는 경우에는 버튼이 화면에 표시되지 않습니다.
                    <br />
                  </WiniTypography>
                  <WiniTypography variant="span" className="text-md pl-4">
                    각 버튼의 이벤트는 winiEvent 객체의 select, insert, update, delete 속성을 통해 설정할 수 있습니다.
                    <br />
                  </WiniTypography>
                </WiniBox>
              </WiniBox>
            }
            <CodeExample
              copyText={copyState[item.key] === 'copy' ? '복사하기' : '복사 완료'}
              code={item.code}
              onCopy={() => handleCopy(item.key, item.code)}
            />
          </WiniBox>
        ))}
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
