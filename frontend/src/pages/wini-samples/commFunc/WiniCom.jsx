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
const WINI_COM_GUIDES = [
  {
    key: 'toNull',
    name: 'toNull',
    description: '데이터가 undefined면 null로 변경합니다. undifined -> null',
    code: `import { winiCom } from '@/shared/lib';

const data = undefined;
const result = winiCom.toNull(data);
console.log(result); // null`,
  },{
    key: 'toEmpty',
    name: 'toEmpty',
    description: `데이터가 null 또는 undefined 값이면 ''(빈값)으로 치환합니다. `,
    code: `import { winiCom } from '@/shared/lib';

const data = null;
const result = winiCom.toEmpty(data);
console.log(result); // ''`,
  },
  {
    key: 'isNumber',
    name: 'isNumber',
    description: '데이터가 숫자인지 아닌지 판단합니다. 숫자면 true, 아니면 false를 반환합니다. ',
    code: `import { winiCom } from '@/shared/lib';

const data = 'winitech';
const result = winiCom.isNumber(data);
console.log(result); // false`,
  },
  {
    key: 'isMobile',
    name: 'isMobile',
    description: '현재 환경이 모바일인지 체크합니다. 모바일이면 true, 아니면 false를 반환합니다. ',
    code: `import { winiCom } from '@/shared/lib';

const result = winiCom.isMobile();
console.log(result); // true`,
  },
  {
    key: 'phoneCheck',
    name: 'phoneCheck',
    description: '일반 전화번호 형식 체크합니다.(000-000-0000 / 000-0000-0000 (070가능) 형식만 체크) ',
    code: `import { winiCom } from '@/shared/lib';

const data ='053-124-5679'; //02,070 가능
const result = winiCom.phoneCheck(data);
console.log(result); // true`,
  },
  {
    key: 'mobileCheck',
    name: 'mobileCheck',
    description: '휴대폰 번호 형식 체크합니다.(010-0000-0000 형식만 체크) ',
    code: `import { winiCom } from '@/shared/lib';

const data = '010-1234-5678';
const result = winiCom.mobileCheck(data);
console.log(result); // true`,
  },
  {
    key: 'emailCheck',
    name: 'emailCheck',
    description: '이메일 형식 체크합니다. ',
    code: `import { winiCom } from '@/shared/lib';

const data = 'test@winitech.com';
const result = winiCom.emailCheck(data);
console.log(result); // true`,
  },
  {
    key: 'navigateToProgram',
    name: 'navigateToProgram',
    description:
      '메뉴의 programMapping으로 이동합니다. 탭 모드에서는 탭을 열거나 활성화하고, 일반 모드에서는 해당 프로그램으로 이동합니다.',
    code: `import { winiCom } from '@/shared/lib';
import { WiniButton } from '@/shared/ui/wini';

const handleMoveProgram = () => {
  winiCom.navigateToProgram('user-management/ui/UserManagementPage');
};

<WiniButton onClick={handleMoveProgram}>
  사용자 관리 열기
</WiniButton>`,
  },
];
export default function samples_winiCom() {
	const [copyState, setCopyState] = useState(
		Object.fromEntries(WINI_COM_GUIDES.map((item) => [item.key, 'copy'])),
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
        <WiniTypography variant="h1">winiCom(유틸리티 함수)</WiniTypography>
        <WiniTypography variant="h2">유틸리티 함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `winiCom`은 프로젝트에 제공하는 공통 함수입니다.
            <br />
            `winiCom`은 <b>여러가지 편의 및 유틸리티 함수</b>를 지원하며,
            `형변환`, `에러체크`등의 기능을 편리하게 사용할 수 있습니다.
          </WiniTypography>
        </WiniBox>

        {WINI_COM_GUIDES.map((item) => (
          <WiniBox key={item.key} ui="line">
            <WiniTypography variant="h2">{item.name}</WiniTypography>
            <WiniBox className="mb-4">
              <WiniTypography variant="span" className="text-md">
                {item.description}
              </WiniTypography>
            </WiniBox>

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
