import React, { useState } from 'react';
import { WiniToggleButton } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

function ToggleControlledPreview({ initialSelected = false, ...props }) {
  const [selected, setSelected] = useState(initialSelected);

  return (
    <WiniToggleButton
      {...props}
      selected={selected}
      onClick={() => setSelected((prev) => !prev)}
    />
  );
}

const TOGGLE_CHILDREN_PROP = {
  name: 'children',
  description:
    '토글 버튼의 의미를 보여주는 라벨입니다. 선택 상태가 유지되는 버튼이 무엇을 뜻하는지 명확히 전달합니다.',
  values: ['텍스트', 'React node'],
  examples: [
    createGuideExample({
      title: '라벨 포함 예제',
      code: `<WiniToggleButton ui="line" icon="blog">
  즐겨찾기
</WiniToggleButton>`,
      preview: (
        <WiniToggleButton ui="line" icon="blog">
          즐겨찾기
        </WiniToggleButton>
      ),
    }),
  ],
};

const TOGGLE_UI_PROP = {
  name: 'ui',
  description:
    '토글 버튼의 기본 상태와 선택 상태 톤을 함께 정하는 공통 스타일 속성입니다.',
  values: ['default', 'gray', 'line', 'lineGray', 'white', 'delete'],
  options: [
    {
      value: 'default',
      description: '선택 시 가장 강하게 강조되는 기본 토글 톤입니다.',
      examples: [
        createGuideExample({
          title: 'default 토글 예제',
          code: `<WiniToggleButton ui="default" icon="blog">
  Default
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="default" icon="blog">
              Default
            </WiniToggleButton>
          ),
        }),
      ],
    },
    {
      value: 'gray',
      description: '차분한 회색 계열 토글 버튼이 필요할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'gray 토글 예제',
          code: `<WiniToggleButton ui="gray" icon="blog">
  Gray
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="gray" icon="blog">
              Gray
            </WiniToggleButton>
          ),
        }),
      ],
    },
    {
      value: 'line',
      description:
        '선택 전에는 외곽선, 선택 후에는 강조 배경 없이 상태만 바꾸고 싶을 때 적합합니다.',
      examples: [
        createGuideExample({
          title: 'line 토글 예제',
          code: `<WiniToggleButton ui="line" icon="blog">
  Line
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="line" icon="blog">
              Line
            </WiniToggleButton>
          ),
        }),
      ],
    },
    {
      value: 'lineGray',
      description: '강조를 더 낮춘 외곽선형 토글 버튼입니다.',
      examples: [
        createGuideExample({
          title: 'lineGray 토글 예제',
          code: `<WiniToggleButton ui="lineGray" icon="blog">
  LineGray
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="lineGray" icon="blog">
              LineGray
            </WiniToggleButton>
          ),
        }),
      ],
    },
    {
      value: 'white',
      description:
        '배경 위에서 가볍게 배치하는 텍스트형 토글 버튼에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'white 토글 예제',
          code: `<WiniToggleButton ui="white" icon="blog">
  White
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="white" icon="blog">
              White
            </WiniToggleButton>
          ),
        }),
      ],
    },
    {
      value: 'delete',
      description: '삭제나 제거처럼 위험 의미를 가진 토글 액션에 사용합니다.',
      examples: [
        createGuideExample({
          title: 'delete 토글 예제',
          code: `<WiniToggleButton ui="delete" icon="del">
  Delete
</WiniToggleButton>`,
          preview: (
            <WiniToggleButton ui="delete" icon="del">
              Delete
            </WiniToggleButton>
          ),
        }),
      ],
    },
  ],
};

const TOGGLE_ICON_PROP = {
  name: 'icon',
  description:
    '토글 버튼 왼쪽에 표시할 아이콘 이름입니다. 라벨만으로 부족한 의미를 시각적으로 보강할 때 사용합니다.',
  values: ['등록된 icon 이름 문자열'],
  examples: [
    createGuideExample({
      title: 'icon 사용 예제',
      code: `<WiniToggleButton ui="line" icon="down">
  필터 열기
</WiniToggleButton>`,
      preview: (
        <WiniToggleButton ui="line" icon="down">
          필터 열기
        </WiniToggleButton>
      ),
    }),
  ],
};

const TOGGLE_DEFAULT_SELECTED_PROP = {
  name: 'defaultSelected',
  description:
    '비제어형 토글 버튼에서 처음 렌더링될 때 선택 상태를 지정합니다.',
  values: ['true', 'false'],
  examples: [
    createGuideExample({
      title: 'defaultSelected 예제',
      code: `<WiniToggleButton ui="line" defaultSelected icon="blog">
  기본 선택
</WiniToggleButton>`,
      preview: (
        <WiniToggleButton ui="line" defaultSelected icon="blog">
          기본 선택
        </WiniToggleButton>
      ),
    }),
  ],
};

const TOGGLE_SELECTED_PROP = {
  name: 'selected',
  description:
    '외부 상태와 연결된 제어형 토글 버튼의 현재 선택 상태를 전달합니다.',
  values: ['true', 'false'],
  examples: [
    createGuideExample({
      title: 'selected 제어 예제',
      code: `<WiniToggleButton
  ui="line"
  selected={selected}
  onClick={() => setSelected((prev) => !prev)}
  icon="down"
>
  Controlled
</WiniToggleButton>`,
      preview: (
        <ToggleControlledPreview ui="line" icon="down">
          Controlled
        </ToggleControlledPreview>
      ),
    }),
  ],
};

const TOGGLE_ON_CLICK_PROP = {
  name: 'onClick',
  description:
    '제어형 토글 버튼에서는 클릭 시 외부 상태를 직접 변경해야 합니다. 보통 `selected`와 함께 사용합니다.',
  values: ['() => void', '(event) => void'],
  examples: [
    createGuideExample({
      title: 'onClick 상태 갱신 예제',
      code: `<WiniToggleButton
  ui="line"
  selected={selected}
  onClick={() => setSelected((prev) => !prev)}
  icon="down"
>
  Controlled
</WiniToggleButton>`,
      preview: (
        <ToggleControlledPreview ui="line" icon="down">
          Controlled
        </ToggleControlledPreview>
      ),
    }),
  ],
};

const TOGGLE_SELECTED_COLOR_PROP = {
  name: 'selectedColor / selectedBgColor / selectedBorderColor',
  description:
    '선택 상태일 때 텍스트, 배경, 테두리 색을 개별적으로 덮어쓸 수 있습니다.',
  values: ['색상 문자열'],
  examples: [
    createGuideExample({
      title: '선택 상태 색상 오버라이드 예제',
      code: `<WiniToggleButton
  ui="line"
  defaultSelected
  selectedColor="#FFFFFF"
  selectedBgColor="#0F62FE"
  selectedBorderColor="#0F62FE"
  icon="blog"
>
  강조 선택
</WiniToggleButton>`,
      preview: (
        <WiniToggleButton
          ui="line"
          defaultSelected
          selectedColor="#FFFFFF"
          selectedBgColor="#0F62FE"
          selectedBorderColor="#0F62FE"
          icon="blog"
        >
          강조 선택
        </WiniToggleButton>
      ),
    }),
  ],
};

const TOGGLE_ICON_ONLY_PROP = {
  name: 'iconOnly',
  description:
    '아이콘만 화면에 보여주는 토글 모드입니다. 공간이 좁은 툴바 영역에서 유용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'iconOnly 토글 예제',
      code: `<WiniToggleButton iconOnly ui="line" icon="down">
  펼치기
</WiniToggleButton>`,
      preview: (
        <WiniToggleButton iconOnly ui="line" icon="down">
          펼치기
        </WiniToggleButton>
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'ui',
    title: 'ui 속성',
    description: [
      '역할: 토글 버튼의 기본 상태와 선택 상태 스타일을 액션 의미에 맞게 구분합니다.',
      '사용 상황: 보기 방식 전환, 필터 on/off, 즐겨찾기 토글처럼 눌린 상태가 유지되는 버튼에 사용합니다.',
      '사용 방법: `children`과 `icon`을 넣고 `ui`로 기본/선택 상태 톤을 지정합니다.',
    ],
    requiredItems: ['버튼 의미를 보여줄 `children`'],
    optionalItems: [
      '`ui`로 토글 톤 선택',
      '`icon`으로 의미 보강',
      '`defaultSelected`로 초기 선택 상태 지정',
    ],
    requiredProps: [TOGGLE_CHILDREN_PROP],
    optionalProps: [
      TOGGLE_UI_PROP,
      TOGGLE_ICON_PROP,
      TOGGLE_DEFAULT_SELECTED_PROP,
    ],
  },
  {
    key: 'controlled',
    title: '선택 상태 제어',
    description: [
      '역할: 외부 상태와 연결된 제어형 토글 버튼을 구성합니다.',
      '사용 상황: 현재 뷰 상태, 활성 필터, 즐겨찾기 여부처럼 다른 컴포넌트와 동기화가 필요한 토글에 적합합니다.',
      '사용 방법: `selected`를 상태에 연결하고 `onClick`에서 상태를 직접 갱신합니다. 필요하면 선택 색상도 함께 조정합니다.',
    ],
    requiredItems: [
      '제어형 상태 `selected`',
      '상태를 바꿀 `onClick`',
      '의미를 보여줄 `children`',
    ],
    optionalItems: [
      '`selectedColor`, `selectedBgColor`, `selectedBorderColor`로 선택 스타일 오버라이드',
      '`iconOnly`로 아이콘형 토글 구성',
    ],
    requiredProps: [TOGGLE_CHILDREN_PROP],
    optionalProps: [
      TOGGLE_SELECTED_PROP,
      TOGGLE_ON_CLICK_PROP,
      TOGGLE_SELECTED_COLOR_PROP,
      TOGGLE_ICON_ONLY_PROP,
    ],
  },
];

export default function CompWiniToggleButton() {
  return (
    <GuidePage
      title="WiniToggleButton"
      subtitle="WiniToggleButton 가이드"
      description="WiniToggleButton은 선택 상태가 유지되는 버튼 컴포넌트입니다. `ui`로 기본 톤을 바꾸고 `selected`로 외부 상태와 연결할 수 있습니다."
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
