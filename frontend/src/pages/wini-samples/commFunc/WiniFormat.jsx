import React, { useEffect, useRef, useState } from 'react';
import {
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const WINI_FORMAT_GUIDES = [
  {
    key: 'formatThousands',
    name: 'formatThousands',
    description:
      '숫자(또는 숫자로 변환 가능한 값)를 3자리마다 콤마(,)로 구분해 문자열로 반환합니다.',
    code: `import { winiFormat } from '@/shared/lib';

const value = 1234567;
const result = winiFormat.formatThousands(value);
console.log(result); // "1,234,567"`,
  },
  {
    key: 'formatPhoneNumber',
    name: 'formatPhoneNumber',
    description:
      '숫자만 포함된 전화번호를 한국 전화번호 형식에 맞게 하이픈(-)을 포함한 문자열로 변환합니다.',
    code: `import { winiFormat } from '@/shared/lib';

const value = '01012345678';
const result = winiFormat.formatPhoneNumber(value);
console.log(result); // "010-1234-5678"`,
  },
  {
    key: 'formatTime',
    name: 'formatTime',
    description:
      '초 단위 시간을 시(hours), 분(minutes), 초(seconds) 객체로 변환합니다.',
    code: `import { winiFormat } from '@/shared/lib';

const value = 3661;
const result = winiFormat.formatTime(value);
console.log(result); // { hours: 1, minutes: 1, seconds: 1 }`,
  },
  {
    key: 'formatFullName',
    name: 'formatFullName',
    description: '성과 이름을 붙여 전체 이름 문자열로 반환합니다.',
    code: `import { winiFormat } from '@/shared/lib';

const lastName = '홍';
const firstName = '길동';
const result = winiFormat.formatFullName(lastName, firstName);
console.log(result); // "홍길동"`,
  },
];

export default function samples_winiFormat() {
  const [copyState, setCopyState] = useState(
    Object.fromEntries(WINI_FORMAT_GUIDES.map((item) => [item.key, 'copy'])),
  );

  const timersRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

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
        <WiniTypography variant="h1">WiniFormat(포맷 유틸리티)</WiniTypography>
        <WiniTypography variant="h2">포맷 유틸리티 함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `WiniFormat`은 프로젝트에서 사용하는 공통 포맷 함수입니다.
            <br />
            `WiniFormat`은 <b>숫자, 전화번호, 시간, 이름</b> 등의 값을
            일관된 형식으로 변환할 수 있도록 지원합니다.
          </WiniTypography>
        </WiniBox>

        {WINI_FORMAT_GUIDES.map((item) => (
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