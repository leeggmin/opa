import React from 'react';
import {
  WiniBox,
  WiniGridItem,
  WiniGridLayout,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

const SECTIONS = [
  {
    key: 'layout_basic',
    title: 'WiniGridLayout 기본 컨테이너',
    description: [
      '역할: 여러 `WiniGridItem`을 행/열 구조로 배치하는 기본 레이아웃 컨테이너입니다.',
      '사용 상황: 목록 필터, 입력 폼, 카드형 배치처럼 동일 폭 아이템을 정렬할 때 사용합니다.',
      '사용 방법: `container`를 켜고 `columnSpacing`, `rowSpacing`으로 간격을 지정합니다.',
    ],
    requiredItems: ['`container`', '`WiniGridItem` 자식 요소'],
    optionalItems: [
      '`columnSpacing`, `rowSpacing`',
      '`className`으로 추가 정렬/폭 조정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'container',
        description: '그리드 컨테이너 모드를 켜는 기본 prop입니다.',
      },
      {
        name: 'WiniGridItem',
        description:
          '`container` 안에 배치되는 실제 그리드 아이템 컴포넌트입니다.',
      },
      {
        name: 'columnSpacing',
        description: '아이템 사이의 가로 간격을 지정합니다.',
      },
      {
        name: 'rowSpacing',
        description: '아이템 사이의 세로 간격을 지정합니다.',
      },
      {
        name: 'className / sx',
        description: '정렬, 너비, 외곽 여백을 페이지에 맞게 조정합니다.',
      },
    ],
    code: `<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem><WiniBox ui="line">Item 1</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">Item 2</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">Item 3</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'layout_form',
    title: 'WiniGridLayout ui="form"',
    description: [
      '역할: 폼 입력 기준선에 맞춘 정렬을 제공하는 레이아웃 모드입니다.',
      '사용 상황: 라벨/입력 조합이 많은 등록/수정 화면에 사용합니다.',
      '사용 방법: `ui="form"`에 spacing 토큰(`columnSpacing_1`, `rowSpacing_1`)을 함께 조합합니다.',
    ],
    requiredItems: ['`container`', '`ui`에 `form` 토큰 포함'],
    optionalItems: [
      '`columnSpacing_숫자`, `rowSpacing_숫자` 토큰',
      '`rowItem`으로 기본 열 분할',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'container',
        description: '폼 레이아웃도 기본적으로 컨테이너 모드에서 동작합니다.',
      },
      {
        name: 'ui',
        description:
          '`form` 토큰을 포함해 폼 기준선 정렬용 스타일을 적용합니다.',
      },
      {
        name: 'rowItem',
        description: '폼 기본 분할 수를 제어할 때 사용합니다.',
      },
      {
        name: 'ui="columnSpacing_숫자"',
        description:
          '`columnSpacing_1`처럼 ui 문자열 안에 열 간격 토큰을 함께 넣을 수 있습니다.',
      },
      {
        name: 'ui="rowSpacing_숫자"',
        description:
          '`rowSpacing_1`처럼 ui 문자열 안에 행 간격 토큰을 함께 넣을 수 있습니다.',
      },
    ],
    code: `<WiniGridLayout container ui="form columnSpacing_1 rowSpacing_1">
  <WiniGridItem><WiniBox ui="line">Field A</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">Field B</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'layout_col_row',
    title: 'WiniGridLayout ui="col_ / row_"',
    description: [
      '역할: `ui` 토큰으로 컬럼/행 개수를 규칙적으로 강제합니다.',
      '사용 상황: 동일 규칙으로 반복되는 폼/카드/타일형 UI 배치에 사용합니다.',
      '사용 방법: `col_숫자`, `row_숫자` 토큰과 spacing 토큰을 함께 전달합니다.',
    ],
    requiredItems: ['`container`', '`ui`에 `col_숫자` 또는 `row_숫자` 포함'],
    optionalItems: [
      '`columnSpacing_숫자`, `rowSpacing_숫자` 병행',
      '필요 시 `WiniGridItem`별 `size`로 일부 재정의',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'container',
        description: '규칙형 배치도 컨테이너 모드에서 사용합니다.',
      },
      {
        name: 'ui',
        description:
          '`col_3`, `row_2`처럼 배치 규칙 토큰을 문자열로 전달합니다.',
      },
      {
        name: 'ui="columnSpacing_숫자"',
        description: '열 규칙과 함께 열 간격 토큰을 조합할 수 있습니다.',
      },
      {
        name: 'ui="rowSpacing_숫자"',
        description: '행 규칙과 함께 행 간격 토큰을 조합할 수 있습니다.',
      },
      {
        name: 'WiniGridItem size',
        description:
          '특정 아이템만 예외적으로 다른 폭을 주고 싶을 때 개별로 재정의합니다.',
      },
    ],
    code: `<WiniGridLayout container ui="col_3 row_2 columnSpacing_1 rowSpacing_1">
  <WiniGridItem><WiniBox ui="line">A</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">B</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">C</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">D</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">E</WiniBox></WiniGridItem>
  <WiniGridItem><WiniBox ui="line">F</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'item_ratio',
    title: 'WiniGridItem ratio',
    description: [
      '역할: 같은 행 안에서 아이템 너비를 비율 기반으로 분배합니다.',
      '사용 상황: 좌/우 영역 비대칭 레이아웃(예: 1:2, 2:3)에 사용합니다.',
      '사용 방법: `ratio` prop 또는 `ui="ratio_숫자"` 토큰을 사용합니다.',
    ],
    requiredItems: [
      '`WiniGridLayout container` 내부 배치',
      '`ratio` 또는 `ui="ratio_숫자"`',
    ],
    optionalItems: [
      '`columnSpacing`과 조합해 간격 균형 조정',
      '일부 아이템에 `size`를 줘 반응형 혼합',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'WiniGridItem ratio',
        description: '각 아이템의 상대 폭을 지정합니다.',
      },
      {
        name: 'container',
        description: 'ratio 배치는 반드시 컨테이너 안에서 계산됩니다.',
      },
      {
        name: 'columnSpacing',
        description: 'ratio 레이아웃에서도 아이템 사이 간격을 유지합니다.',
      },
      {
        name: 'WiniGridItem size',
        description:
          '특정 breakpoint에서만 폭 규칙을 바꿀 때 함께 쓸 수 있습니다.',
      },
    ],
    code: `<WiniGridLayout container ui="columnSpacing_1">
  <WiniGridItem ui="ratio_1"><WiniBox ui="line">ratio 1</WiniBox></WiniGridItem>
  <WiniGridItem ui="ratio_2"><WiniBox ui="line">ratio 2</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'item_size',
    title: 'WiniGridItem size / breakpoints',
    description: [
      '역할: 화면 크기별로 아이템 너비를 다르게 지정합니다.',
      '사용 상황: 데스크톱 2열/모바일 1열 같은 반응형 폼에 사용합니다.',
      '사용 방법: `size={{ xs: 12, md: 6 }}` 또는 `xs`, `md` 개별 props를 지정합니다.',
    ],
    requiredItems: ['`size` 또는 `xs/sm/md/lg/xl` 중 하나'],
    optionalItems: [
      '`ratio`와 조합 가능(명시 size 우선)',
      '`rowSpacing`, `columnSpacing`로 간격 최적화',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'WiniGridItem size',
        description: '브레이크포인트별 칸 수를 객체로 지정합니다.',
      },
      {
        name: 'container',
        description: 'breakpoint 기반 배치도 컨테이너 안에서 계산됩니다.',
      },
      {
        name: 'rowSpacing / columnSpacing',
        description: '반응형에서도 아이템 간 간격을 일정하게 유지합니다.',
      },
      {
        name: 'ratio',
        description:
          'size를 주지 않은 다른 아이템과 비율 혼합 배치를 구성할 수 있습니다.',
      },
    ],
    code: `<WiniGridLayout container ui="columnSpacing_1 rowSpacing_1">
  <WiniGridItem size={{ xs: 12, md: 6 }}><WiniBox ui="line">A</WiniBox></WiniGridItem>
  <WiniGridItem size={{ xs: 12, md: 6 }}><WiniBox ui="line">B</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'item_scroll_hidden',
    title: 'WiniGridItem scrollHidden',
    description: [
      '역할: 아이템 외부 overflow를 숨기고 내부 스크롤 영역만 스크롤되게 만듭니다.',
      '사용 상황: 고정 높이 패널, 로그/목록, 긴 텍스트 본문 영역에 사용합니다.',
      '사용 방법: `scrollHidden`을 켜고 내부 스크롤 대상에 `.scrollArea` 클래스를 지정합니다.',
    ],
    requiredItems: ['`scrollHidden`', '내부 `.scrollArea` 요소'],
    optionalItems: [
      '`className`으로 높이 고정(`h-[140px]`)',
      '내부 콘텐츠에 리스트/타이포그래피 조합',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'WiniGridItem scrollHidden',
        description:
          '아이템 바깥 overflow를 숨기고 내부 영역만 스크롤되게 합니다.',
      },
      {
        name: '.scrollArea',
        description: '실제 스크롤이 발생할 내부 대상 요소입니다.',
      },
      {
        name: 'className',
        description: '스크롤 영역 높이를 고정하기 위해 사용합니다.',
      },
    ],
    code: `<WiniGridLayout container>
  <WiniGridItem scrollHidden className="h-[140px]">
    <WiniBox className="scrollArea">
      <WiniTypography>스크롤 콘텐츠...</WiniTypography>
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>`,
  },
];

const renderPreview = (key) => {
  if (key === 'layout_basic') {
    return (
      <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
        <WiniGridItem>
          <WiniBox ui="line">Item 1</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">Item 2</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">Item 3</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  if (key === 'layout_form') {
    return (
      <WiniGridLayout container ui="form columnSpacing_1 rowSpacing_1">
        <WiniGridItem>
          <WiniBox ui="line">Field A</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">Field B</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  if (key === 'layout_col_row') {
    return (
      <WiniGridLayout container ui="col_3 row_2 columnSpacing_1 rowSpacing_1">
        <WiniGridItem>
          <WiniBox ui="line">A</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">B</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">C</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">D</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">E</WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="line">F</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  if (key === 'item_ratio') {
    return (
      <WiniGridLayout container ui="columnSpacing_1">
        <WiniGridItem ui="ratio_1">
          <WiniBox ui="line">ratio 1</WiniBox>
        </WiniGridItem>
        <WiniGridItem ui="ratio_2">
          <WiniBox ui="line">ratio 2</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  if (key === 'item_size') {
    return (
      <WiniGridLayout container ui="columnSpacing_1 rowSpacing_1">
        <WiniGridItem size={{ xs: 12, md: 6 }}>
          <WiniBox ui="line">A</WiniBox>
        </WiniGridItem>
        <WiniGridItem size={{ xs: 12, md: 6 }}>
          <WiniBox ui="line">B</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  return (
    <WiniGridLayout container>
      <WiniGridItem scrollHidden className="h-[140px]">
        <WiniBox ui="line" className="h-full mt-0">
          <WiniBox className="scrollArea h-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <WiniTypography key={index} variant="span" className="block">
                {`스크롤 라인 ${index + 1}`}
              </WiniTypography>
            ))}
          </WiniBox>
        </WiniBox>
      </WiniGridItem>
    </WiniGridLayout>
  );
};

export default function CompWiniGridLayout() {
  return (
    <GuidePage
      title="WiniGridLayout"
      subtitle="WiniGridLayout 가이드"
      description="WiniGridLayout/WiniGridItem은 화면 배치의 기준 컴포넌트입니다. 이 가이드는 배치 역할, 실제 사용 상황, 필수/선택 props를 초보자 기준으로 정리했습니다."
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
        />
      ))}
    </GuidePage>
  );
}
