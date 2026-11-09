import React from 'react';
import { WiniBox, WiniIcon } from '@/shared/ui/wini';
import { ICONS } from '@/shared/assets';
import { GuidePage, GuideSection, useGuideCopy } from './CompGuideCommon';

const ALL_ICON_NAMES = Object.keys(ICONS).sort((a, b) => a.localeCompare(b));

const ALL_ICONS_CODE = `import { ICONS } from '@/shared/assets';

const iconNames = Object.keys(ICONS).sort((a, b) => a.localeCompare(b));

<WiniBox className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
  {iconNames.map((iconName) => (
    <div
      key={iconName}
      className="border border-[#ddd] rounded-sm p-3 flex flex-col items-center gap-2"
    >
      <WiniIcon icon={iconName} />
      <span className="text-xs text-[#666]">{iconName}</span>
    </div>
  ))}
</WiniBox>`;

const SECTIONS = [
  {
    key: 'icon_name',
    title: 'icon 속성으로 기본 아이콘 렌더',
    description: [
      '역할: 프로젝트에 등록된 SVG 아이콘을 이름으로 렌더링합니다.',
      '사용 상황: 버튼, 메뉴, 상태 표시처럼 공통 아이콘이 필요한 화면에서 사용합니다.',
      '사용 방법: `icon`에는 파일 확장자를 제외한 아이콘 이름을 전달합니다. 예: `home.svg` -> `icon="home"`',
    ],
    requiredItems: [
      '`icon` 값 전달',
      '해당 아이콘 파일이 `src/shared/assets`에 등록되어 있어야 함',
    ],
    optionalItems: [
      '`className`, `sx`, `fontSize`로 크기와 색상 조절 가능',
      '`aria-label`로 접근성 텍스트 보강 가능',
    ],
    requiredProps: [
      {
        name: 'icon',
        description: '등록된 SVG 아이콘 이름을 문자열로 전달합니다.',
        values: ['ICONS에 등록된 문자열 이름', '파일 확장자 제외'],
        examples: ['icon="home"', 'icon="right"'],
      },
    ],
    optionalProps: [
      {
        name: 'className',
        description: 'Tailwind 클래스로 크기, 색상, 정렬을 빠르게 조절합니다.',
        values: ['Tailwind class 문자열'],
        examples: ['className="w-5 h-5 text-[#2563EB]"'],
      },
      {
        name: 'sx',
        description: 'MUI `sx` 문법으로 색상이나 크기를 세밀하게 제어합니다.',
        values: ['스타일 객체', '(theme) => 스타일 객체'],
        examples: ['sx={{ fontSize: 20, color: "#2563EB" }}'],
      },
      {
        name: 'fontSize',
        description: 'MUI SvgIcon 기본 크기 토큰을 사용할 때 지정합니다.',
        values: ['inherit', 'small', 'medium', 'large'],
        examples: ['fontSize="small"'],
      },
      {
        name: 'aria-label',
        description: '의미만 전달하는 아이콘일 때 접근성 텍스트를 제공합니다.',
        values: ['텍스트 문자열'],
        examples: ['aria-label="홈으로 이동"'],
      },
    ],
    code: `<WiniBox className="flex items-center gap-2">
  <WiniIcon icon="home" />
  <WiniIcon icon="right" />
  <WiniIcon icon="down" />
</WiniBox>`,
  },
  {
    key: 'icon_size',
    title: '아이콘 크기 조절',
    description: [
      '역할: 아이콘 크기를 화면 맥락에 맞게 조절합니다.',
      '사용 상황: 목록, 버튼, 헤더처럼 같은 아이콘이라도 크기 기준이 다른 영역에서 사용합니다.',
      '사용 방법: `className`, `sx`, `fontSize` 중 화면 규칙에 맞는 방식을 선택합니다.',
    ],
    requiredItems: ['기본 렌더링 대상인 `icon` 또는 `children` 중 하나는 필요'],
    optionalItems: [
      '`className="w-5 h-5"`처럼 Tailwind 크기 지정 가능',
      '`sx={{ fontSize: 28 }}`처럼 픽셀 단위 제어 가능',
      '`fontSize="small"`처럼 MUI 기본 토큰 사용 가능',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'icon',
        description: '등록된 아이콘 이름으로 렌더링할 때 사용합니다.',
        values: ['ICONS에 등록된 문자열 이름'],
        examples: ['icon="home"'],
      },
      {
        name: 'children',
        description:
          '등록되지 않은 SVG를 직접 넣어 크기를 제어할 때 사용합니다.',
        values: ['SVG element', 'React node'],
        examples: ['<circle cx="12" cy="12" r="8" />'],
      },
      {
        name: 'className',
        description: 'Tailwind 크기 클래스로 너비와 높이를 직접 지정합니다.',
        values: ['w-* h-* 조합 문자열'],
        examples: ['className="w-5 h-5"', 'className="w-8 h-8"'],
      },
      {
        name: 'sx',
        description: 'MUI `sx`에서 `fontSize`로 아이콘 크기를 지정합니다.',
        values: ['스타일 객체', '(theme) => 스타일 객체'],
        examples: ['sx={{ fontSize: 28 }}'],
      },
      {
        name: 'fontSize',
        description: '미리 정의된 크기 토큰을 간단하게 적용합니다.',
        values: ['inherit', 'small', 'medium', 'large'],
        examples: ['fontSize="small"', 'fontSize="large"'],
      },
    ],
    code: `<WiniBox className="flex items-end gap-4">
  <WiniBox className="flex flex-col items-center gap-1">
    <WiniIcon icon="home" />
    <span className="text-xs text-[#666]">기본</span>
  </WiniBox>

  <WiniBox className="flex flex-col items-center gap-1">
    <WiniIcon icon="home" className="w-5 h-5" />
    <span className="text-xs text-[#666]">className</span>
  </WiniBox>

  <WiniBox className="flex flex-col items-center gap-1">
    <WiniIcon icon="home" sx={{ fontSize: 28 }} />
    <span className="text-xs text-[#666]">sx</span>
  </WiniBox>

  <WiniBox className="flex flex-col items-center gap-1">
    <WiniIcon icon="home" fontSize="small" />
    <span className="text-xs text-[#666]">fontSize</span>
  </WiniBox>
</WiniBox>`,
  },
  {
    key: 'icon_color',
    title: '아이콘 색상 변경',
    description: [
      '역할: 화면 상태와 강조 포인트에 맞게 아이콘 색상을 변경합니다.',
      '사용 상황: 성공/경고/오류, 활성 상태, 강조 버튼처럼 색상만으로 상태를 구분해야 하는 화면에서 사용합니다.',
      '사용 방법: 기본적으로는 `sx={{ color: ... }}` 또는 텍스트 색상 클래스를 사용하고, SVG가 반응하지 않으면 `& path.fill`을 직접 지정합니다.',
    ],
    requiredItems: ['색상을 적용할 `icon` 또는 `children` 필요'],
    optionalItems: [
      '`sx.color`로 기본 색상 적용',
      '`className`의 `text-*` 클래스로 빠른 색상 적용',
      '`sx={{ "& path": { fill } }}`로 path fill 직접 제어',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'icon',
        description: '등록된 아이콘에 색상을 입힐 때 기본적으로 사용합니다.',
        values: ['ICONS에 등록된 문자열 이름'],
        examples: ['icon="home"'],
      },
      {
        name: 'children',
        description:
          '직접 넣은 SVG에도 같은 방식으로 색상을 적용할 수 있습니다.',
        values: ['SVG element', 'React node'],
        examples: ['<path d="..." />'],
      },
      {
        name: 'sx',
        description: '`color` 또는 `& path.fill`을 지정해서 색상을 바꿉니다.',
        values: ['스타일 객체', '(theme) => 스타일 객체'],
        examples: [
          'sx={{ color: "#2563EB" }}',
          'sx={{ "& path": { fill: "#DC2626" } }}',
        ],
      },
      {
        name: 'className',
        description: 'Tailwind 텍스트 색상 클래스로 빠르게 색을 적용합니다.',
        values: ['text-* 또는 text-[#hex] 문자열'],
        examples: ['className="text-[#16A34A]"', 'className="text-red-500"'],
      },
    ],
    code: `import { color } from '@/shared/config/theme';

<WiniBox className="flex items-center gap-4">
  <WiniIcon icon="home" sx={{ color: color.brand.main }} />

  <WiniIcon icon="home" className="text-[#16A34A]" />

  <WiniIcon
    icon="home"
    sx={{
      '& path': {
        fill: '#DC2626',
      },
    }}
  />
</WiniBox>`,
  },
  {
    key: 'icon_behavior',
    title: '렌더링 우선순위',
    description: [
      '역할: 아이콘 매핑 실패 시 fallback 동작을 이해하도록 정리합니다.',
      '사용 상황: 동적 아이콘 이름을 받거나 커스텀 SVG를 함께 써야 하는 화면에서 필요합니다.',
      '사용 방법: 우선순위는 `icon 매핑 성공` -> `children` -> `null`입니다.',
    ],
    requiredItems: [
      '동적 `icon` 사용 시 존재하지 않는 이름이 들어올 수 있다는 점 고려',
    ],
    optionalItems: [
      'fallback SVG를 `children`으로 제공 가능',
      '`viewBox`로 fallback SVG 좌표계 고정 가능',
    ],
    requiredProps: [
      {
        name: 'icon',
        description:
          '동적으로 주입되는 아이콘 이름입니다. 등록되지 않은 이름일 가능성도 고려해야 합니다.',
        values: [
          'ICONS에 등록된 문자열 이름',
          '외부 데이터에서 들어오는 문자열',
        ],
        examples: ['icon={menu.icon}', 'icon="not_exists"'],
      },
    ],
    optionalProps: [
      {
        name: 'children',
        description:
          '아이콘 매핑이 실패했을 때 fallback SVG를 직접 넣을 수 있습니다.',
        values: ['SVG element', 'React node'],
        examples: ['<circle cx="12" cy="12" r="8" />'],
      },
      {
        name: 'viewBox',
        description: 'fallback SVG의 좌표계를 맞출 때 지정합니다.',
        values: ['"0 0 24 24" 형태 문자열'],
        examples: ['viewBox="0 0 24 24"'],
      },
    ],
    code: `<WiniBox className="flex flex-col gap-3">
  <WiniBox className="flex items-center gap-2">
    <WiniIcon icon="home" />
    <span className="text-xs text-[#666]">1) icon 매핑 성공</span>
  </WiniBox>

  <WiniBox className="flex items-center gap-2">
    <WiniIcon icon="not_exists" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </WiniIcon>
    <span className="text-xs text-[#666]">2) icon 매핑 실패 + children 존재</span>
  </WiniBox>

  <WiniBox className="flex items-center gap-2">
    <WiniBox className="w-6 h-6 border border-dashed border-[#ccc] rounded-sm" />
    <span className="text-xs text-[#666]">3) icon 매핑 실패 + children 없음 = null</span>
  </WiniBox>
</WiniBox>`,
  },
  {
    key: 'icon_all',
    title: '전체 아이콘 목록 확인',
    description: [
      '역할: 현재 프로젝트에서 사용할 수 있는 모든 아이콘 이름을 확인합니다.',
      '사용 상황: 화면 설계나 가이드 작성 시 사용 가능한 아이콘을 빠르게 탐색할 때 사용합니다.',
      '사용 방법: `Object.keys(ICONS)`로 목록을 만들고 카드 형태로 렌더링합니다.',
    ],
    requiredItems: [
      '`ICONS` import 필요',
      '`Object.keys(ICONS)`로 이름 목록 생성',
    ],
    optionalItems: [
      '`sort()`로 이름 정렬 가능',
      '아이콘이 많아지면 검색/필터 상태 추가 가능',
    ],
    requiredProps: [
      {
        name: 'ICONS',
        description: '프로젝트에 등록된 전체 아이콘 맵 객체입니다.',
        values: ['아이콘 이름을 key로 가진 객체'],
        examples: ['import { ICONS } from "@/shared/assets"'],
      },
      {
        name: 'Object.keys(ICONS)',
        description: '사용 가능한 아이콘 이름 배열을 만듭니다.',
        values: ['string[]'],
        examples: ['const iconNames = Object.keys(ICONS)'],
      },
    ],
    optionalProps: [
      {
        name: 'sort()',
        description: '아이콘 이름을 정렬해서 찾기 쉽게 만듭니다.',
        values: ['정렬 콜백 함수'],
        examples: ['iconNames.sort((a, b) => a.localeCompare(b))'],
      },
      {
        name: 'filterKeyword',
        description:
          '아이콘 수가 많아지면 검색어 상태를 추가해 필터링할 수 있습니다.',
        values: ['텍스트 문자열'],
        examples: [
          'const filtered = iconNames.filter((name) => name.includes(keyword))',
        ],
      },
    ],
    code: ALL_ICONS_CODE,
  },
  {
    key: 'custom_svg',
    title: '커스텀 SVG children 사용',
    description: [
      '역할: 등록된 아이콘이 아닌 SVG를 직접 전달해 렌더링합니다.',
      '사용 상황: 임시 아이콘, 화면 전용 아이콘, 실험적인 SVG를 빠르게 붙여야 할 때 사용합니다.',
      '사용 방법: `icon` 없이 `WiniIcon` 내부에 SVG 노드를 직접 넣습니다.',
    ],
    requiredItems: ['`children`으로 SVG 노드 전달'],
    optionalItems: [
      '`viewBox` 지정 가능',
      '`className`/`sx`로 크기와 색상 제어 가능',
    ],
    requiredProps: [
      {
        name: 'children',
        description: '직접 렌더링할 SVG 노드를 전달합니다.',
        values: ['SVG element', 'React node'],
        examples: ['<circle cx="12" cy="12" r="8" />', '<path d="..." />'],
      },
    ],
    optionalProps: [
      {
        name: 'viewBox',
        description: 'SVG 좌표계를 명확하게 맞출 때 지정합니다.',
        values: ['"0 0 24 24" 형태 문자열'],
        examples: ['viewBox="0 0 24 24"'],
      },
      {
        name: 'className',
        description: 'Tailwind 클래스로 크기와 색상을 조절합니다.',
        values: ['Tailwind class 문자열'],
        examples: ['className="w-6 h-6 text-[#2563EB]"'],
      },
      {
        name: 'sx',
        description:
          'MUI `sx`로 크기, 색상, path 스타일을 세밀하게 조정합니다.',
        values: ['스타일 객체', '(theme) => 스타일 객체'],
        examples: ['sx={{ fontSize: 24, color: "#0F172A" }}'],
      },
    ],
    code: `<WiniIcon viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="8" />
</WiniIcon>`,
  },
];

const renderPreview = (key) => {
  if (key === 'icon_name') {
    return (
      <WiniBox className="flex items-center gap-2">
        <WiniIcon icon="home" />
        <WiniIcon icon="right" />
        <WiniIcon icon="down" />
      </WiniBox>
    );
  }

  if (key === 'icon_size') {
    return (
      <WiniBox className="flex items-end gap-4">
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" />
          <span className="text-xs text-[#666]">기본</span>
        </WiniBox>
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" className="w-5 h-5" />
          <span className="text-xs text-[#666]">className</span>
        </WiniBox>
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" sx={{ fontSize: 28 }} />
          <span className="text-xs text-[#666]">sx</span>
        </WiniBox>
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" fontSize="small" />
          <span className="text-xs text-[#666]">fontSize</span>
        </WiniBox>
      </WiniBox>
    );
  }

  if (key === 'icon_color') {
    return (
      <WiniBox className="flex items-end gap-4">
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" sx={{ color: '#2563EB' }} />
          <span className="text-xs text-[#666]">sx color</span>
        </WiniBox>
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon icon="home" className="text-[#16A34A]" />
          <span className="text-xs text-[#666]">className</span>
        </WiniBox>
        <WiniBox className="flex flex-col items-center gap-1">
          <WiniIcon
            icon="home"
            sx={{
              '& path': {
                fill: '#DC2626',
              },
            }}
          />
          <span className="text-xs text-[#666]">path fill</span>
        </WiniBox>
      </WiniBox>
    );
  }

  if (key === 'icon_behavior') {
    return (
      <WiniBox className="flex flex-col gap-3">
        <WiniBox className="flex items-center gap-2">
          <WiniIcon icon="home" />
          <span className="text-xs text-[#666]">1) icon 매핑 성공</span>
        </WiniBox>
        <WiniBox className="flex items-center gap-2">
          <WiniIcon icon="not_exists" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
          </WiniIcon>
          <span className="text-xs text-[#666]">
            2) icon 매핑 실패 + children 존재
          </span>
        </WiniBox>
        <WiniBox className="flex items-center gap-2">
          <WiniBox className="w-6 h-6 border border-dashed border-[#ccc] rounded-sm" />
          <span className="text-xs text-[#666]">
            3) icon 매핑 실패 + children 없음 = null
          </span>
        </WiniBox>
      </WiniBox>
    );
  }

  if (key === 'icon_all') {
    return (
      <WiniBox className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-0">
        {ALL_ICON_NAMES.map((iconName) => (
          <div
            key={iconName}
            className="border border-[#ddd] rounded-sm p-3 flex flex-col items-center gap-2 bg-white"
          >
            <WiniIcon icon={iconName} />
            <span className="text-xs text-[#666] break-all leading-4 text-center">
              {iconName}
            </span>
          </div>
        ))}
      </WiniBox>
    );
  }

  return (
    <WiniIcon viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </WiniIcon>
  );
};

export default function CompWiniIcon() {
  const { copyState, handleCopy } = useGuideCopy(
    SECTIONS.map((item) => item.key),
  );

  return (
    <GuidePage
      title="WiniIcon"
      subtitle="WiniIcon 가이드"
      description="WiniIcon은 공통 아이콘 렌더링 컴포넌트입니다. 설명이 길어지는 구간은 접어서 보고, 필요한 섹션만 열어 설명과 예제를 나눠 확인할 수 있도록 정리했습니다."
    >
      {SECTIONS.map((item) => (
        <GuideSection
          key={item.key}
          title={item.title}
          description={item.description}
          requiredItems={item.requiredItems}
          optionalItems={item.optionalItems}
          requiredProps={item.requiredProps}
          optionalProps={item.optionalProps}
          preview={renderPreview(item.key)}
          code={item.code}
          defaultTab={item.key === 'icon_all' ? 'example' : 'description'}
          keepSectionExample={item.key === 'icon_all'}
          copyText={copyState[item.key] === 'copy' ? '복사하기' : '복사 완료'}
          onCopy={() => handleCopy(item.key, item.code)}
        />
      ))}
    </GuidePage>
  );
}
