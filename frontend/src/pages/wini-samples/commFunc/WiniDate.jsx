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
import { winiDate } from '@/shared/lib';
// formatEnums.js
export const DATE_FORMAT_GROUPS = [
  [
    { format: "Y", desc: "01", sub: "년" },
    { format: "D", desc: "1-31", sub: "일" },
    { format: "H", desc: "0-23", sub: "시" },
    { format: "s", desc: "0-59", sub: "초" },
  ],
  [
    { format: "YYYY", desc: "2001", sub: "년" },
    { format: "DD", desc: "01-31", sub: "일" },
    { format: "HH", desc: "00-23", sub: "시" },
    { format: "ss", desc: "00-59", sub: "초" },
  ],
  [
    { format: "M", desc: "1-12", sub: "월" },
    { format: "Do", desc: "1st... 31st", sub: "일" },
    { format: "h", desc: "1-12", sub: "시" },
    { format: "S", desc: "0-9", sub: "초" },
  ],
  [
    { format: "MM", desc: "01-12", sub: "월" },
    { format: "A", desc: "AM PM", sub: "오전/오후" },
    { format: "hh", desc: "01-12", sub: "시" },
    { format: "SS", desc: "00-99", sub: "초" },
  ],
  [
    { format: "MMM", desc: "Jan-Dec", sub: "월" },
    { format: "a", desc: "am pm", sub: "오전/오후" },
    { format: "m", desc: "0-59", sub: "분" },
    { format: "SSS", desc: "000-999", sub: "밀리초" },
  ],
  [
    { format: "MMMM", desc: "January-December", sub: "월" },
    null,
    { format: "mm", desc: "00-59", sub: "분" },
    null,
  ],
];
const WINI_COM_GUIDES = [
  {
    key: 'winiDate',
    name: 'winiDate',
    description: '날짜 텍스트 날짜형식으로 변환합니다. 형식 : winiDate(문자형 날짜형식)',
    code: `import { winiDate } from '@/shared/lib';

winiDate('2026-02-05') // 날짜변환 (WiniDatePicker 사용시 사용! ) 
//날짜형식 return ▷ Wed, 25 Feb 2026 07:35:45 GMT`,
  }, {
    key: 'now',
    name: 'now',
    description: `오늘날짜를 반환합니다. 형식 : winiDate.now()`,
    code: `import { winiDate } from '@/shared/lib';

winiDate.now();
// 오늘날짜 반환 ▷ Wed, 25 Feb 2026 07:35:45 GMT`,
  },
  {
    key: 'dateFormat',
    name: 'dateFormat',
    description: '날짜 포맷 지정하여 해당 포맷의string형식으로 리턴합니다. 파라메터 누락시 "YYYY-MM-DD" 형식으로 리턴합니다. 형식 : winiDate.format(날짜형식,포맷) ',
    code: `import { winiDate } from '@/shared/lib';

winiDate.format(winiDate.now())
//2025-03-19
winiDate.format(winiDate.now(),'YYYY년도 MM월 DD일 hh시간 mm분 ss초')
//2025년도 03월 19일 05시간 55분 06초
winiDate.format(winiDate.now(),'YYYY-MM-DD HH:mm:ss')
//2025-03-19 17:55:06`,
  },
  {
    key: 'addDate',
    name: 'addDate',
    description: `날짜를 계산하는 합수입니다. 
    형식 : winiDate.addDate(날짜형식,더할일수,opt = "d") ▷ opt 옵션:  빈값은 "d" d:날짜, m:달, y:년
    `,
    code: `import { winiDate } from '@/shared/lib';

//기준일자 2025-03-19

winiDate.addDate(dt,3,"d") //3일 더하기
//Sat, 22 Mar 2025 08:55:06 GMT
winiDate.addDate(dt,-3,"y") //3년 빼기
// Sat, 19 Mar 2022 08:55:06 GMT`,
  },
  {
    key: 'getBetweenDay',
    name: 'getBetweenDay',
    description: `두 날짜 사이의 일수를 계산합니다.  형식 : winiDate.getBetweenDay(fromdate,toDate)     `,
    code: `import { winiCom } from '@/shared/lib';  

//기준일자 2025-03-19

//기준일자와 기준일자 3일뒤에 날짜를 비교
winiDate.getBetweenDay(winiDate.now(),winiDate.addDate(winiDate.now(),3,"d"1))
// 3`,
  },
  {
    key: 'getLastDateOfMonth',
    name: 'getLastDateOfMonth',
    description: '해당월의 마지막 날 가져옵니다. 형식 : winiDate.getLastDateOfMonth(date) ',
    code: `import { wini } from '@/shared/lib';

//기준일자 2025-03-19

winiDate.getLastDateofMonth(winiDate.now())
// 2025-03-31 (3월의 마지막날 날짜형식으로 리턴)`,
  },
  {
    key: 'getFirstDateofMonth',
    name: 'getFirstDateofMonth',
    description: '해당월의 1일 가져옵니다. 형식 : winiDate.getFirstDateofMonth(date) ',
    code: `import { winiCom } from '@/shared/lib';

//기준일자 2025-03-19

winiDate.getFirstDateofMonth(winiDate.now())
// 2025-03-01 (3월의 1일 날짜형식으로 리턴)`,
  },
  {
    key: 'dateParseStartOf',
    name: 'dateParseStartOf',
    description: '해당날짜의 0시0분0초 로 세팅합니다. 데이터 조회시 파라메터로 사용합니다. 형식 : winiDate.dateParseStartOf(date) ',
    code: `import { winiDate } from '@/shared/lib';

//기준일자 2025-03-19

winiDate.dateParseStartOf(winiDate.now())
//2025-03-19 00:00:00`,
  },
  {
    key: 'dateParseEndOf',
    name: 'dateParseEndOf',
    description: '해당날짜의 23시59분59초 로 세팅합니다. 데이터 조회시 파라메터로 사용합니다. 형식 : winiDate.dateParseEndOf(date) ',
    code: `import { winiDate } from '@/shared/lib';

//기준일자 2025-03-19

winiDate.dateParseEndOf(winiDate.now())
// 2025-03-01 (3월의 1일 날짜형식으로 리턴)`,
  }
];
export default function samples_winiDate() {
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
        <WiniTypography variant="h1">winiDate(날짜함수)</WiniTypography>
        <WiniTypography variant="h2">날짜함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `winiDate`는 프로젝트에 제공하는 공통 날짜 함수입니다. winiDate는 Dayjs를 기반으로 하고 있습니다.
            <br />
            해당 프로젝트에서는 new Date() 대신 winiDate 함수를 사용합니다.
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
            {item.key === 'dateFormat' &&
              <WiniBox className="mt-4" gap={1}>
                <WiniBox className="mb-4">
                  <WiniTypography variant="span" className="text-md">
                    날짜 포맷 참고
                  </WiniTypography>
                </WiniBox>

                <div className="w-full overflow-x-auto">
                  <div className="grid grid-cols-8 text-sm border border-gray-300 rounded-lg overflow-hidden">

                    {/* Header */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`header-${i}`} className="contents">
                        <div className="bg-gray-100 font-semibold p-2 border-b border-r border-gray-300">
                          Format
                        </div>
                        <div className="bg-gray-100 font-semibold p-2 border-b border-r border-gray-300">
                          설명
                        </div>
                      </div>
                    ))}

                    {/* Body */}
                    {DATE_FORMAT_GROUPS.map((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="contents">
                          <div className="p-2 border-b border-r border-gray-200 font-mono">
                            {cell?.format ?? ""}
                          </div>
                          <div className="p-2 border-b border-r border-gray-200 text-gray-600">
                            {cell?.sub ? `[${cell?.sub}] ${cell?.desc ?? ""}` : cell?.desc ?? ""}
                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>
              </WiniBox>}
          </WiniBox>
        ))}
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
