import React from 'react';
import {
  WiniBox,
  WiniGridLayout,
  WiniGridItem,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

const SECTIONS = [
  {
    key: 'ratio',
    title: 'ratio',
    description: [
      '역할: 같은 행 안에서 아이템 너비를 비율 기준으로 나눕니다.',
      '사용 상황: 좌/우 상세 영역처럼 정확한 컬럼 수보다 상대 폭이 중요한 레이아웃에 사용합니다.',
      '사용 방법: 부모 `WiniGridLayout container` 안에서 각 아이템에 `ratio` 값을 지정합니다.',
    ],
    requiredItems: ['부모 `WiniGridLayout container`', '`ratio`'],
    optionalItems: ['`columnSpacing`과 조합해 간격 조정'],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ratio',
        description:
          '아이템이 차지할 상대 비율입니다. 숫자가 클수록 더 넓게 차지합니다.',
      },
      {
        name: 'WiniGridLayout container',
        description:
          '`ratio`는 반드시 `WiniGridLayout container` 안에서 계산됩니다.',
      },
      {
        name: 'ui="ratio_숫자"',
        description: '직접 prop 대신 ui 토큰으로 ratio를 줄 수도 있습니다.',
      },
    ],
    code: `<WiniGridLayout container columnSpacing={1}>
  <WiniGridItem ratio={1}><WiniBox ui="line">ratio 1</WiniBox></WiniGridItem>
  <WiniGridItem ratio={2}><WiniBox ui="line">ratio 2</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'size',
    title: 'size / breakpoints',
    description: [
      '역할: 화면 크기에 따라 아이템 너비를 반응형으로 변경합니다.',
      '사용 상황: 데스크톱 2열, 모바일 1열 같은 일반적인 반응형 폼이나 카드 목록에 사용합니다.',
      '사용 방법: `size` 객체 또는 `xs`, `md` 같은 breakpoint props를 지정합니다.',
    ],
    requiredItems: ['`size` 또는 `xs/sm/md/lg/xl` 중 하나'],
    optionalItems: ['`rowSpacing`, `columnSpacing`과 함께 사용'],
    requiredProps: [],
    optionalProps: [
      {
        name: 'size',
        description: '브레이크포인트별 칸 수를 객체로 지정합니다.',
        example: '`size={{ xs: 12, md: 6 }}`',
      },
      {
        name: 'xs / sm / md / lg / xl',
        description:
          '`size` 대신 개별 breakpoint props로도 너비를 줄 수 있습니다.',
      },
      {
        name: 'WiniGridLayout rowSpacing / columnSpacing',
        description:
          '반응형 레이아웃에서도 아이템 간 간격을 일정하게 유지할 때 함께 사용합니다.',
      },
    ],
    code: `<WiniGridLayout container columnSpacing={1} rowSpacing={1}>
  <WiniGridItem size={{ xs: 12, md: 6 }}><WiniBox ui="line">A</WiniBox></WiniGridItem>
  <WiniGridItem size={{ xs: 12, md: 6 }}><WiniBox ui="line">B</WiniBox></WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'scroll_hidden',
    title: 'scrollHidden',
    description: [
      '역할: 아이템 자체는 고정 높이를 유지하면서 내부 특정 영역만 스크롤되게 합니다.',
      '사용 상황: 로그 패널, 긴 설명문, 스크롤 목록을 카드 안에 넣어야 할 때 사용합니다.',
      '사용 방법: `scrollHidden`을 켜고 내부 스크롤 대상에 `.scrollArea` 클래스를 부여합니다.',
    ],
    requiredItems: ['`scrollHidden`', '내부 `.scrollArea` 요소'],
    optionalItems: ['고정 높이용 `className`'],
    requiredProps: [],
    optionalProps: [
      {
        name: 'scrollHidden',
        description:
          '바깥쪽 overflow를 숨기고 내부 `.scrollArea`에만 스크롤을 허용합니다.',
      },
      {
        name: '.scrollArea',
        description:
          '실제 스크롤이 발생할 내부 대상 요소입니다. 이 클래스를 가진 요소가 있어야 `scrollHidden`이 동작합니다.',
      },
      {
        name: 'className',
        description: '예시처럼 `h-[140px]` 등으로 영역 높이를 고정합니다.',
      },
    ],
    code: `<WiniGridLayout container>
  <WiniGridItem scrollHidden className="h-[140px]">
    <WiniBox className="scrollArea">
      <WiniTypography>long content ...</WiniTypography>
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>`,
  },
];

const renderPreview = (key) => {
  if (key === 'ratio') {
    return (
      <WiniGridLayout container columnSpacing={1}>
        <WiniGridItem ratio={1}>
          <WiniBox ui="line">ratio 1</WiniBox>
        </WiniGridItem>
        <WiniGridItem ratio={2}>
          <WiniBox ui="line">ratio 2</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    );
  }

  if (key === 'size') {
    return (
      <WiniGridLayout container columnSpacing={1} rowSpacing={1}>
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
                {`Scrollable line ${index + 1}`}
              </WiniTypography>
            ))}
          </WiniBox>
        </WiniBox>
      </WiniGridItem>
    </WiniGridLayout>
  );
};

export default function CompWiniGridItem() {
  return (
    <GuidePage
      title="WiniGridItem"
      subtitle="WiniGridItem 가이드"
      description="WiniGridItem은 그리드 자식 컴포넌트입니다. 주요 옵션은 `ratio`, 반응형 `size`/breakpoints, `scrollHidden`입니다."
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
