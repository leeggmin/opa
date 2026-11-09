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
const ENV_GUIDES = [
  {
    key: 'isLocalhost',
    name: 'isLocalhost',
    description: '현재 환경이 로컬 환경인지 체크합니다. 로컬 환경이면 true, 아니면 false를 반환합니다. ',
    code: `import { ENV } from '@/shared/config';

const result = ENV.isLocalhost();
console.log(result); // true`,
  },{
    key: 'isDevelopment',
    name: 'isDevelopment',
    description: '현재 환경이 개발 환경인지 체크합니다. 개발 환경이면 true, 아니면 false를 반환합니다. ',
    code: `
//.env 파일의 VITE_NODE_ENV 값이 'DEV'인지 체크합니다.
// VITE_NODE_ENV=DEV

import { ENV } from '@/shared/config';

const result = ENV.isDevelopment();
console.log(result); // true`,
  },
  {
    key: 'isProduction',
    name: 'isProduction',
    description: '현재 환경이 프로덕션 환경인지 체크합니다. 프로덕션 환경이면 true, 아니면 false를 반환합니다. ',
    code: `
//.env 파일의 VITE_NODE_ENV 값이 'PROP'인지 체크합니다.
// VITE_NODE_ENV=PROP

import { ENV } from '@/shared/config';

const result = ENV.isProduction();
console.log(result); // true`,
  },
  {
    key: 'isNodeEnv',
    name: 'isNodeEnv',
    description: '현재 환경을 반환합니다. "DEV", "PROP" 중 하나를 반환합니다. ',
    code: `
//.env 파일의 VITE_NODE_ENV 값을 반환합니다.
// VITE_NODE_ENV=DEV

import { ENV } from '@/shared/config';

const result = ENV.isNodeEnv();
console.log(result); // "DEV"`,
  },
  {
    key: 'isEncryption',
    name: 'isEncryption',
    description: '전체 암호화 여부를 반환합니다. 전체 암호화가 활성화되어 있으면 true, 아니면 false를 반환합니다. ',
    code: `
//.env 파일의 VITE_ENCRYPTION 값이 'true'인지 체크합니다.
// VITE_ENCRYPTION=true

import { ENV } from '@/shared/config';

const result = ENV.isEncryption();
console.log(result); // true`,
  },
  {
    key: 'getInternalUrl',
    name: 'getInternalUrl',
    description: '연결된 서버 주소를 반환합니다. ',
    code: `
//.env 파일의 VITE_INTERNAL_URL 값을 반환합니다.
// VITE_INTERNAL_URL=http://winitech.com

import { ENV } from '@/shared/config';

const result = ENV.getInternalUrl();
console.log(result); // http://winitech.com`,
  }
];
export default function samples_EnvFunc() {
	const [copyState, setCopyState] = useState(
		Object.fromEntries(ENV_GUIDES.map((item) => [item.key, 'copy'])),
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
        <WiniTypography variant="h1">ENV(환경 변수 함수)</WiniTypography>
        <WiniTypography variant="h2">환경 변수 함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `.env` 파일에 설정된 환경 변수를 조회할 수 있습니다.
            <br />
            `.env`은 frontend 폴더 루트에 존재하고 있으며,
            `ENV`함수를 이용하여여 <b>환경 변수</b>를 조회할 수 있습니다.
          </WiniTypography>
        </WiniBox>

        {ENV_GUIDES.map((item) => (
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
