import React from 'react';
import { WiniButton, WiniButtonGroup } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const GROUP_CHILDREN_PROP = {
  name: 'children',
  description:
    '그룹 안에 배치할 버튼 목록입니다. 보통 `WiniButton` 2개 이상을 묶어 관련 액션을 한 덩어리로 보여줍니다.',
  values: ['WiniButton', 'React node'],
  examples: [
    createGuideExample({
      title: '기본 버튼 그룹 예제',
      code: `<WiniButtonGroup>
  <WiniButton ui="default">저장</WiniButton>
  <WiniButton ui="line">취소</WiniButton>
</WiniButtonGroup>`,
      preview: (
        <WiniButtonGroup>
          <WiniButton ui="default">저장</WiniButton>
          <WiniButton ui="line">취소</WiniButton>
        </WiniButtonGroup>
      ),
    }),
  ],
};

const GROUP_UI_PROP = {
  name: 'ui',
  description:
    '버튼 그룹의 배치 방식을 바꾸는 레이아웃 속성입니다. 기본값은 가로 한 줄 배치이고, 필요 시 `full` 또는 `list`를 사용합니다.',
  values: ['full', 'list'],
  options: [
    {
      value: 'full',
      description:
        '버튼을 세로로 쌓고 각 버튼이 부모 폭을 꽉 채우도록 만듭니다. 모바일 팝업이나 좁은 사이드 영역에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'ui="full" 예제',
          code: `<WiniButtonGroup ui="full">
  <WiniButton ui="default">Primary</WiniButton>
  <WiniButton ui="line">Secondary</WiniButton>
</WiniButtonGroup>`,
          preview: (
            <WiniButtonGroup ui="full">
              <WiniButton ui="default">Primary</WiniButton>
              <WiniButton ui="line">Secondary</WiniButton>
            </WiniButtonGroup>
          ),
        }),
      ],
    },
    {
      value: 'list',
      description:
        '버튼을 가로로 배치하되 공간이 부족하면 자동 줄바꿈합니다. 필터 버튼이나 옵션 목록형 액션에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'ui="list" 예제',
          code: `<WiniButtonGroup ui="list" itemMinWidth={120}>
  <WiniButton ui="default">Item 1</WiniButton>
  <WiniButton ui="gray">Item 2</WiniButton>
  <WiniButton ui="line">Item 3</WiniButton>
</WiniButtonGroup>`,
          preview: (
            <WiniButtonGroup ui="list" itemMinWidth={120}>
              <WiniButton ui="default">Item 1</WiniButton>
              <WiniButton ui="gray">Item 2</WiniButton>
              <WiniButton ui="line">Item 3</WiniButton>
            </WiniButtonGroup>
          ),
        }),
      ],
    },
  ],
};

const GROUP_ITEM_MIN_WIDTH_PROP = {
  name: 'itemMinWidth',
  description:
    '`ui="list"`에서 각 버튼이 너무 좁아지지 않도록 최소 너비를 지정합니다. 옵션 수가 많아도 버튼 형태를 유지하기 좋습니다.',
  values: ['숫자(px)', '문자열'],
  examples: [
    createGuideExample({
      title: 'itemMinWidth 적용 예제',
      code: `<WiniButtonGroup ui="list" itemMinWidth={120}>
  <WiniButton ui="default">상세 조건</WiniButton>
  <WiniButton ui="gray">임시 저장</WiniButton>
  <WiniButton ui="line">복사</WiniButton>
</WiniButtonGroup>`,
      preview: (
        <WiniButtonGroup ui="list" itemMinWidth={120}>
          <WiniButton ui="default">상세 조건</WiniButton>
          <WiniButton ui="gray">임시 저장</WiniButton>
          <WiniButton ui="line">복사</WiniButton>
        </WiniButtonGroup>
      ),
    }),
  ],
};

const GROUP_CLASSNAME_PROP = {
  name: 'className',
  description:
    '버튼 그룹의 외곽 정렬이나 폭을 Tailwind 클래스로 조정할 때 사용합니다.',
  values: ['Tailwind class 문자열'],
  examples: [
    createGuideExample({
      title: 'className 조정 예제',
      code: `<WiniButtonGroup className="max-w-[320px]">
  <WiniButton ui="default">저장</WiniButton>
  <WiniButton ui="line">취소</WiniButton>
</WiniButtonGroup>`,
      preview: (
        <WiniButtonGroup className="max-w-[320px]">
          <WiniButton ui="default">저장</WiniButton>
          <WiniButton ui="line">취소</WiniButton>
        </WiniButtonGroup>
      ),
    }),
  ],
};

const GROUP_SX_PROP = {
  name: 'sx',
  description:
    'MUI `sx`로 그룹 전체 폭이나 간격을 세밀하게 조정할 때 사용합니다.',
  values: ['스타일 객체', '(theme) => 스타일 객체'],
  examples: [
    createGuideExample({
      title: 'sx 스타일 예제',
      code: `<WiniButtonGroup sx={{ maxWidth: 360 }}>
  <WiniButton ui="default">저장</WiniButton>
  <WiniButton ui="line">취소</WiniButton>
</WiniButtonGroup>`,
      preview: (
        <WiniButtonGroup sx={{ maxWidth: 360 }}>
          <WiniButton ui="default">저장</WiniButton>
          <WiniButton ui="line">취소</WiniButton>
        </WiniButtonGroup>
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'default',
    title: '기본 그룹',
    description: [
      '역할: 관련된 버튼들을 한 줄에 묶어 기본 가로 정렬로 보여줍니다.',
      '사용 상황: 저장/취소, 조회/초기화처럼 한 세트로 움직이는 액션을 묶을 때 사용합니다.',
      '사용 방법: `WiniButtonGroup` 안에 `WiniButton`을 순서대로 배치해 하나의 액션 묶음처럼 구성합니다.',
    ],
    requiredItems: ['그룹 내부 버튼 목록 `children`'],
    optionalItems: ['`className`, `sx`로 그룹 폭과 정렬 보정'],
    requiredProps: [GROUP_CHILDREN_PROP],
    optionalProps: [GROUP_CLASSNAME_PROP, GROUP_SX_PROP],
  },
  {
    key: 'ui_layout',
    title: 'ui 속성 (full / list)',
    description: [
      '역할: 버튼 그룹의 배치 방향과 확장 방식을 바꾸는 레이아웃 속성입니다.',
      '사용 상황: 모바일 세로 버튼 묶음, 필터 버튼 목록처럼 기본 가로 한 줄이 아닌 배치가 필요할 때 사용합니다.',
      '사용 방법: `ui="full"` 또는 `ui="list"`를 주고 필요하면 `itemMinWidth`로 버튼 최소 폭을 함께 지정합니다.',
    ],
    requiredItems: ['배치할 버튼 목록 `children`'],
    optionalItems: ['`ui`로 세로형/목록형 레이아웃 선택', '`itemMinWidth`로 list 버튼 최소 너비 설정'],
    requiredProps: [GROUP_CHILDREN_PROP],
    optionalProps: [GROUP_UI_PROP, GROUP_ITEM_MIN_WIDTH_PROP],
  },
];

export default function CompWiniButtonGroup() {
  return (
    <GuidePage
      title="WiniButtonGroup"
      subtitle="WiniButtonGroup 가이드"
      description="WiniButtonGroup은 관련 액션 버튼을 한 덩어리로 배치하는 컴포넌트입니다. 기본 가로형 외에 `full`, `list` 레이아웃을 지원합니다."
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
          hideSectionExample
        />
      ))}
    </GuidePage>
  );
}
