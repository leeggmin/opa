import React, { useMemo, useState } from 'react';
import {
  WiniBox,
  WiniTab,
  WiniTabPanel,
  WiniTabs,
  WiniTypography,
} from '@/shared/ui/wini';
import { color, size } from '@/shared/config/theme';
import {
  GuideCodeBlock,
  GuideMetaInfo,
  GuidePage,
  useGuideCopy,
} from './CompGuideCommon';

const extractVarName = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const matched = value.match(/var\(--([^)]+)\)/);
  return matched?.[1] ?? '';
};

const flattenTokenEntries = (target, prefix) => {
  const walk = (obj, path = []) =>
    Object.entries(obj).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        const varName = extractVarName(value);
        return [
          {
            key: `${prefix}.${[...path, key].join('.')}`,
            tokenValue: value,
            varName,
          },
        ];
      }

      if (value && typeof value === 'object') {
        return walk(value, [...path, key]);
      }

      return [];
    });

  return walk(target);
};

const COLOR_ENTRIES = flattenTokenEntries(color, 'color');
const SIZE_ENTRIES = flattenTokenEntries(size, 'size');

const TAILWIND_FIRST_CODE = `/* 기본 원칙: Tailwind(className) 우선 */
<WiniBox className="text-[rgb(var(--c-text-main))] [font-size:var(--size-lg)] p-[var(--margin-lg)] rounded-[var(--radius-md)]">
  토큰 기반 Tailwind 적용
</WiniBox>`;

const SX_TOKEN_CODE = `/* 예외: MUI 내부 슬롯/상태 스타일은 sx 사용 */
import { color, size } from '@/shared/config/theme';

<WiniText
  label="이름"
  sx={{
    '& .MuiInputBase-input': {
      color: color.text.main,
      fontSize: size.text.md,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: color.border.default,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: color.border.main,
    },
  }}
/>`;

const STYLE_ONLY_CODE = `/* style: 현재 요소에만 1:1 인라인 적용 */
<WiniBox
  style={{
    color: 'rgb(var(--c-text-main))',
    fontSize: 'var(--size-sm)',
    padding: 'var(--margin-sm)',
  }}
>
  style 예시
</WiniBox>`;

const SX_ONLY_CODE = `/* sx: MUI 스타일 시스템 (선택자/상태/반응형 가능) */
import { color, size } from '@/shared/config/theme';

<WiniBox
  sx={{
    color: color.text.main,
    fontSize: size.text.sm,
    '&:hover': {
      color: color.text.dark,
    },
    '& .MuiInputBase-input': {
      color: color.text.default,
    },
    '@media (max-width:760px)': {
      fontSize: size.text.xs,
    },
  }}
>
  sx 예시
</WiniBox>`;

const COLOR_SAMPLE_CODE = `import { color } from '@/shared/config/theme';

<WiniTypography style={{ color: color.text.main }}>
  color.text.main
</WiniTypography>

<WiniBox style={{ backgroundColor: color.background.mainLight }}>
  color.background.mainLight
</WiniBox>`;

const SIZE_SAMPLE_CODE = `import { size } from '@/shared/config/theme';

<WiniTypography style={{ fontSize: size.text.lg }}>
  size.text.lg
</WiniTypography>

<WiniBox style={{ borderRadius: size.radius.md, padding: size.margin.lg }}>
  size.radius.md / size.margin.lg
</WiniBox>`;

const STYLE_GUIDE_ITEMS = [
  'Wini 컴포넌트 스타일은 기본적으로 `className` + Tailwind 유틸리티 사용을 권장합니다.',
  '토큰 값을 쓸 때는 Tailwind arbitrary value 문법으로 CSS 변수(`var(--...)`)를 직접 참조할 수 있습니다.',
  'MUI 내부 슬롯(`.Mui-*`)이나 상태 선택자(`:hover`, `.Mui-focused`)가 필요한 경우 `sx`를 사용합니다.',
  '`style`은 단일 요소의 간단한 인라인 값 지정에 적합하며, 복잡한 선택자/반응형에는 `sx`가 유리합니다.',
];

const STYLE_REQUIRED_ITEMS = [
  '기본 화면 스타일은 `className` + Tailwind로 작성',
  '토큰 사용 시 출처(`color`, `size`)를 import해 의미를 명확히 유지',
];

const STYLE_OPTIONAL_ITEMS = [
  'MUI 내부 슬롯/상태 제어가 필요할 때 `sx` 사용',
  '단일 속성만 빠르게 지정할 때 `style` 선택 가능',
];

const TOKEN_TABLE_GUIDE_ITEMS = [
  '`JS 경로`는 코드에서 실제로 import해서 사용하는 토큰 경로입니다. 예: `color.text.main`',
  '`CSS 변수`는 루트에 선언된 실제 변수명입니다. 예: `--c-text-main`',
  '`실제 값`은 현재 테마에서 계산된 값으로, 테마 변경 영향 확인에 사용합니다.',
  '`미리보기`는 토큰이 화면에서 어떻게 보이는지 즉시 확인하는 영역입니다.',
];

const TOKEN_REQUIRED_ITEMS = [
  '토큰 사용 전 `JS 경로`와 `CSS 변수` 매핑을 함께 확인',
  '테마 적용 결과는 `실제 값` 컬럼으로 검증',
];

const TOKEN_OPTIONAL_ITEMS = [
  '`Color`/`Size` 탭으로 관심 영역만 선택 확인',
  '하단 샘플 코드를 복사해 실제 화면 컴포넌트에 바로 적용',
];

const resolveCssVarValue = (varName) => {
  if (!varName || typeof window === 'undefined') {
    return '';
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim();
};

const renderSizePreview = (varName) => {
  const cssVar = `var(--${varName})`;

  if (varName.startsWith('size-')) {
    return (
      <span style={{ fontSize: cssVar, color: 'rgb(var(--c-text-main))' }}>
        샘플 텍스트
      </span>
    );
  }

  if (varName.startsWith('lh-')) {
    return (
      <div style={{ lineHeight: cssVar, fontSize: '12px' }}>
        라인 높이 예시 텍스트
        <br />
        다음 줄
      </div>
    );
  }

  if (varName.startsWith('margin-')) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="h-2 bg-[rgb(var(--c-background-main))]"
          style={{ width: cssVar }}
        />
        <span className="text-xs text-[#666]">spacing</span>
      </div>
    );
  }

  if (varName.startsWith('radius-')) {
    return (
      <div
        className="w-14 h-8 bg-[rgb(var(--c-background-main-light))] border border-[rgb(var(--c-border-default))]"
        style={{ borderRadius: cssVar }}
      />
    );
  }

  if (varName.startsWith('obj-h-') || varName.startsWith('icon-h-')) {
    return (
      <div
        className="w-14 bg-[rgb(var(--c-background-main-light))] border border-[rgb(var(--c-border-default))]"
        style={{ height: cssVar }}
      />
    );
  }

  return <span className="text-xs text-[#666]">-</span>;
};

const TokenTable = ({ type, entries }) => (
  <WiniBox ui="line">
    <WiniTypography variant="h2">
      {type === 'color' ? 'Color Tokens' : 'Size Tokens'}
    </WiniTypography>
    <WiniBox className="overflow-x-auto mt-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-b-[rgb(var(--c-gray-ccc))]">
            <th className="text-left py-2 pr-3">JS 경로</th>
            <th className="text-left py-2 pr-3">CSS 변수</th>
            <th className="text-left py-2 pr-3">실제 값</th>
            <th className="text-left py-2">미리보기</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const resolved = resolveCssVarValue(entry.varName);

            return (
              <tr
                key={entry.key}
                className="border-b border-b-[rgb(var(--c-gray-eee))] align-middle"
              >
                <td className="py-2 pr-3 font-mono text-xs">{entry.key}</td>
                <td className="py-2 pr-3 font-mono text-xs">
                  {entry.varName ? `--${entry.varName}` : '-'}
                </td>
                <td className="py-2 pr-3 font-mono text-xs">
                  {resolved || entry.tokenValue}
                </td>
                <td className="py-2">
                  {type === 'color' ? (
                    <WiniBox className="flex items-center gap-2 mt-0">
                      <div
                        className="w-10 h-6 rounded-sm border border-[rgb(var(--c-gray-ddd))]"
                        style={{
                          backgroundColor: entry.varName
                            ? `rgb(var(--${entry.varName}))`
                            : 'transparent',
                        }}
                      />
                      <span className="text-xs text-[#666]">
                        {entry.tokenValue}
                      </span>
                    </WiniBox>
                  ) : (
                    <WiniBox className="mt-0">
                      {renderSizePreview(entry.varName)}
                    </WiniBox>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </WiniBox>
  </WiniBox>
);

export default function CompWiniValue() {
  const [tab, setTab] = useState(0);
  const { copyState, handleCopy } = useGuideCopy([
    'tailwind_code',
    'sx_code',
    'style_code',
    'sx_vs_code',
    'color_code',
    'size_code',
  ]);

  const colorEntries = useMemo(() => COLOR_ENTRIES, []);
  const sizeEntries = useMemo(() => SIZE_ENTRIES, []);

  return (
    <GuidePage
      title="WiniValue"
      subtitle="WiniValue 가이드"
      description="이 페이지는 `color`, `size` 토큰을 실제 화면 스타일에 적용하는 방법을 설명합니다. 초보자도 '어떤 상황에서 className/style/sx를 쓰는지'와 '토큰 표를 어떻게 읽는지'를 바로 이해할 수 있도록 구성했습니다."
    >
      <WiniBox ui="line">
        <WiniTypography variant="h2">스타일 적용 원칙</WiniTypography>
        <GuideMetaInfo
          requiredItems={STYLE_REQUIRED_ITEMS}
          optionalItems={STYLE_OPTIONAL_ITEMS}
        />
        <ul className="list-disc pl-5 space-y-1">
          {STYLE_GUIDE_ITEMS.map((item, index) => (
            <li key={index}>
              <WiniTypography variant="span" className="text-md">
                {item}
              </WiniTypography>
            </li>
          ))}
        </ul>

        <WiniBox className="overflow-x-auto mt-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-b-[rgb(var(--c-gray-ccc))]">
                <th className="text-left py-2 pr-3">구분</th>
                <th className="text-left py-2 pr-3">style</th>
                <th className="text-left py-2">sx</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-b-[rgb(var(--c-gray-eee))]">
                <td className="py-2 pr-3 font-semibold">적용 범위</td>
                <td className="py-2 pr-3">현재 요소에 직접 적용</td>
                <td className="py-2">현재 요소 + 내부 MUI 슬롯까지 제어</td>
              </tr>
              <tr className="border-b border-b-[rgb(var(--c-gray-eee))]">
                <td className="py-2 pr-3 font-semibold">상태/선택자</td>
                <td className="py-2 pr-3">제약 큼</td>
                <td className="py-2">`:hover`, `.Mui-*` 등 제어 가능</td>
              </tr>
              <tr className="border-b border-b-[rgb(var(--c-gray-eee))]">
                <td className="py-2 pr-3 font-semibold">반응형</td>
                <td className="py-2 pr-3">직접 미디어쿼리 작성 필요</td>
                <td className="py-2">`@media`를 객체로 바로 작성 가능</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-semibold">토큰 사용</td>
                <td className="py-2 pr-3">`var(--...)` 문자열 직접 작성</td>
                <td className="py-2">`color.text.main`, `size.text.sm` 사용</td>
              </tr>
            </tbody>
          </table>
        </WiniBox>

        <GuideCodeBlock
          code={TAILWIND_FIRST_CODE}
          copyText={
            copyState.tailwind_code === 'copy' ? '복사하기' : '복사 완료'
          }
          onCopy={() => handleCopy('tailwind_code', TAILWIND_FIRST_CODE)}
        />

        <GuideCodeBlock
          code={SX_TOKEN_CODE}
          copyText={copyState.sx_code === 'copy' ? '복사하기' : '복사 완료'}
          onCopy={() => handleCopy('sx_code', SX_TOKEN_CODE)}
        />

        <GuideCodeBlock
          code={STYLE_ONLY_CODE}
          copyText={
            copyState.style_code === 'copy' ? '복사하기' : '복사 완료'
          }
          onCopy={() => handleCopy('style_code', STYLE_ONLY_CODE)}
        />

        <GuideCodeBlock
          code={SX_ONLY_CODE}
          copyText={copyState.sx_vs_code === 'copy' ? '복사하기' : '복사 완료'}
          onCopy={() => handleCopy('sx_vs_code', SX_ONLY_CODE)}
        />
      </WiniBox>

      <WiniBox ui="line">
        <WiniTypography variant="h2">토큰 표 읽는 방법</WiniTypography>
        <GuideMetaInfo
          requiredItems={TOKEN_REQUIRED_ITEMS}
          optionalItems={TOKEN_OPTIONAL_ITEMS}
        />
        <ul className="list-disc pl-5 space-y-1 mt-2">
          {TOKEN_TABLE_GUIDE_ITEMS.map((item, index) => (
            <li key={index}>
              <WiniTypography variant="span" className="text-md">
                {item}
              </WiniTypography>
            </li>
          ))}
        </ul>

        <WiniTabs ui="bar" value={tab} onChange={(_, value) => setTab(value)}>
          <WiniTab label="Color" value={0} />
          <WiniTab label="Size" value={1} />
        </WiniTabs>

        <WiniTabPanel value={tab} index={0}>
          <TokenTable type="color" entries={colorEntries} />
          <GuideCodeBlock
            code={COLOR_SAMPLE_CODE}
            copyText={
              copyState.color_code === 'copy' ? '복사하기' : '복사 완료'
            }
            onCopy={() => handleCopy('color_code', COLOR_SAMPLE_CODE)}
          />
        </WiniTabPanel>

        <WiniTabPanel value={tab} index={1}>
          <TokenTable type="size" entries={sizeEntries} />
          <GuideCodeBlock
            code={SIZE_SAMPLE_CODE}
            copyText={copyState.size_code === 'copy' ? '복사하기' : '복사 완료'}
            onCopy={() => handleCopy('size_code', SIZE_SAMPLE_CODE)}
          />
        </WiniTabPanel>
      </WiniBox>
    </GuidePage>
  );
}
