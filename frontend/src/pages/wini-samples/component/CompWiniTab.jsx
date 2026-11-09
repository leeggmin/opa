import React, { useState } from 'react';
import { WiniTab, WiniTabPanel, WiniTabs } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

function TabsBasicPreview() {
  const [tab, setTab] = useState('1');

  return (
    <>
      <WiniTabs value={tab} onChange={(_, value) => setTab(value)}>
        <WiniTab label="Tab 1" value="1" />
        <WiniTab label="Tab 2" value="2" />
      </WiniTabs>
      <WiniTabPanel value={tab} index="1">
        Content 1
      </WiniTabPanel>
      <WiniTabPanel value={tab} index="2">
        Content 2
      </WiniTabPanel>
    </>
  );
}

function TabsUiPreview({ ui, initialValue = 'overview' }) {
  const [tab, setTab] = useState(initialValue);

  return (
    <WiniTabs ui={ui} value={tab} onChange={(_, value) => setTab(value)}>
      <WiniTab label="Overview" value="overview" />
      <WiniTab label="Details" value="details" />
      <WiniTab label="History" value="history" />
    </WiniTabs>
  );
}

const TABS_VALUE_PROP = {
  name: 'WiniTabs value',
  description:
    '현재 활성화된 탭 값을 의미합니다. `WiniTab`의 `value` 및 `WiniTabPanel`의 `index`와 맞아야 올바른 탭이 열립니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniTabs value 예제',
      code: `<WiniTabs value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Tab 1" value="1" />
  <WiniTab label="Tab 2" value="2" />
</WiniTabs>`,
      preview: <TabsBasicPreview />,
    }),
  ],
};

const TABS_ON_CHANGE_PROP = {
  name: 'WiniTabs onChange',
  description:
    '탭 클릭 시 활성 탭 상태를 변경하는 이벤트입니다. 보통 `setState`와 함께 사용합니다.',
  values: ['(_, value) => void'],
  examples: [
    createGuideExample({
      title: 'WiniTabs onChange 예제',
      code: `<WiniTabs value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Tab 1" value="1" />
  <WiniTab label="Tab 2" value="2" />
</WiniTabs>`,
      preview: <TabsBasicPreview />,
    }),
  ],
};

const TAB_LABEL_PROP = {
  name: 'WiniTab label',
  description:
    '탭 헤더에 표시할 제목입니다. 사용자가 클릭할 메뉴 이름 역할을 합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createGuideExample({
      title: 'WiniTab label 예제',
      code: `<WiniTab label="Overview" value="overview" />`,
      preview: <TabsUiPreview ui="barfull" />,
    }),
  ],
};

const TAB_VALUE_PROP = {
  name: 'WiniTab value',
  description:
    '각 탭을 식별하는 값입니다. `WiniTabs value`와 일치할 때 선택 상태가 됩니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniTab value 예제',
      code: `<WiniTab label="Details" value="details" />`,
      preview: <TabsUiPreview ui="barfull" />,
    }),
  ],
};

const TAB_PANEL_VALUE_PROP = {
  name: 'WiniTabPanel value',
  description:
    '현재 활성 탭 상태값을 전달합니다. `index`와 비교해 패널 표시 여부를 결정합니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniTabPanel value 예제',
      code: `<WiniTabPanel value={tab} index="1">
  Content 1
</WiniTabPanel>`,
      preview: <TabsBasicPreview />,
    }),
  ],
};

const TAB_PANEL_INDEX_PROP = {
  name: 'WiniTabPanel index',
  description:
    '해당 패널이 담당하는 탭 식별값입니다. `WiniTab value`와 같은 값을 써야 연결됩니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniTabPanel index 예제',
      code: `<WiniTabPanel value={tab} index="2">
  Content 2
</WiniTabPanel>`,
      preview: <TabsBasicPreview />,
    }),
  ],
};

const TABS_UI_PROP = {
  name: 'ui',
  description:
    '탭 헤더 모양을 바꾸는 속성입니다. 화면 레이아웃에 따라 라인형, 꽉 채우는 full형, 하단 bar형 등을 선택할 수 있습니다.',
  values: ['line', 'full', 'linefull', 'bar', 'barfull'],
  options: [
    {
      value: 'line',
      description: '선택된 탭만 강조되는 기본 라인 탭 형태입니다.',
      examples: [
        createGuideExample({
          title: 'ui="line" 예제',
          code: `<WiniTabs ui="line" value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
          preview: <TabsUiPreview ui="line" />,
        }),
      ],
    },
    {
      value: 'full',
      description: '각 탭 버튼이 부모 폭을 균등하게 채우는 full 탭 형태입니다.',
      examples: [
        createGuideExample({
          title: 'ui="full" 예제',
          code: `<WiniTabs ui="full" value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
          preview: <TabsUiPreview ui="full" />,
        }),
      ],
    },
    {
      value: 'linefull',
      description:
        '라인형 스타일을 유지하면서 각 탭이 전체 폭을 균등하게 채웁니다.',
      examples: [
        createGuideExample({
          title: 'ui="linefull" 예제',
          code: `<WiniTabs ui="linefull" value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
          preview: <TabsUiPreview ui="linefull" />,
        }),
      ],
    },
    {
      value: 'bar',
      description: '하단 인디케이터 바 중심의 탭 형태입니다.',
      examples: [
        createGuideExample({
          title: 'ui="bar" 예제',
          code: `<WiniTabs ui="bar" value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
          preview: <TabsUiPreview ui="bar" />,
        }),
      ],
    },
    {
      value: 'barfull',
      description:
        'bar 스타일을 유지하면서 각 탭이 전체 폭을 채우도록 만드는 형태입니다.',
      examples: [
        createGuideExample({
          title: 'ui="barfull" 예제',
          code: `<WiniTabs ui="barfull" value={tab} onChange={(_, value) => setTab(value)}>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
          preview: <TabsUiPreview ui="barfull" />,
        }),
      ],
    },
  ],
};

const TABS_VARIANT_PROP = {
  name: 'variant',
  description:
    '탭 개수가 많을 때 MUI 기본 동작인 `scrollable` 등을 함께 사용할 수 있습니다.',
  values: ['standard', 'scrollable', 'fullWidth'],
  examples: [
    createGuideExample({
      title: 'variant 사용 예제',
      code: `<WiniTabs
  ui="bar"
  variant="scrollable"
  scrollButtons="auto"
  value={tab}
  onChange={(_, value) => setTab(value)}
>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
      preview: <TabsUiPreview ui="bar" />,
    }),
  ],
};

const TABS_SCROLL_BUTTONS_PROP = {
  name: 'scrollButtons',
  description:
    '`variant="scrollable"`과 함께 사용해 좌우 스크롤 버튼 노출 방식을 제어합니다.',
  values: ['auto', 'true', 'false'],
  examples: [
    createGuideExample({
      title: 'scrollButtons 사용 예제',
      code: `<WiniTabs
  ui="bar"
  variant="scrollable"
  scrollButtons="auto"
  value={tab}
  onChange={(_, value) => setTab(value)}
>
  <WiniTab label="Overview" value="overview" />
  <WiniTab label="Details" value="details" />
  <WiniTab label="History" value="history" />
</WiniTabs>`,
      preview: <TabsUiPreview ui="bar" />,
    }),
  ],
};

const SECTIONS = [
  {
    key: 'tabs_basic',
    title: '기본 구조',
    description: [
      '역할: 탭 헤더와 탭 콘텐츠를 1:1로 연결하는 기본 탭 구조입니다.',
      '사용 상황: 상세 화면의 정보/이력 분리, 설정 화면의 카테고리 전환처럼 콘텐츠를 같은 위치에서 교체할 때 사용합니다.',
      '사용 방법: `WiniTabs`의 `value`, `onChange`를 상태에 연결하고 각 `WiniTab`의 `value`를 `WiniTabPanel`의 `index`와 맞춥니다.',
    ],
    requiredItems: [
      '`WiniTabs`의 `value`, `onChange`',
      '각 `WiniTab`의 `label`, `value`',
      '`WiniTabPanel`의 `value`, `index`',
    ],
    optionalItems: ['탭 헤더와 패널 래퍼에 `className`, `sx` 추가 가능'],
    requiredProps: [
      TABS_VALUE_PROP,
      TABS_ON_CHANGE_PROP,
      TAB_LABEL_PROP,
      TAB_VALUE_PROP,
      TAB_PANEL_VALUE_PROP,
      TAB_PANEL_INDEX_PROP,
    ],
    optionalProps: [],
  },
  {
    key: 'tabs_ui',
    title: 'WiniTabs ui 속성',
    description: [
      '역할: 탭 헤더의 레이아웃과 강조 방식을 화면 톤에 맞게 변경합니다.',
      '사용 상황: 팝업형 탭, 전체 폭 분할 탭, 메뉴형 상단 탭처럼 화면 구조가 다른 섹션에서 사용합니다.',
      '사용 방법: `WiniTabs`의 `ui`에 `line`, `full`, `linefull`, `bar`, `barfull` 중 하나를 지정합니다.',
    ],
    requiredItems: [
      '활성 탭 상태 `value`',
      '탭 변경 이벤트 `onChange`',
      '`WiniTab` 자식 목록',
    ],
    optionalItems: ['`variant`, `scrollButtons`로 탭 수가 많을 때 스크롤 확장'],
    requiredProps: [TABS_VALUE_PROP, TABS_ON_CHANGE_PROP],
    optionalProps: [TABS_UI_PROP, TABS_VARIANT_PROP, TABS_SCROLL_BUTTONS_PROP],
  },
];

export default function CompWiniTab() {
  return (
    <GuidePage
      title="WiniTabs / WiniTab"
      subtitle="WiniTab 가이드"
      description="탭은 `WiniTabs` 컨테이너, `WiniTab` 아이템, `WiniTabPanel` 콘텐츠 영역으로 구성합니다. 상태값과 `ui`를 조합해 다양한 탭 형태를 만들 수 있습니다."
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
