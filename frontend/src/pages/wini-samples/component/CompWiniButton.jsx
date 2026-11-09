import React from 'react';
import { WiniBox, WiniButton } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const BUTTON_CHILDREN_PROP = {
  name: 'children',
  description:
    '버튼 안에 표시할 텍스트 또는 React 노드입니다. 사용자는 이 내용을 보고 버튼의 목적을 바로 이해합니다.',
  values: ['텍스트', 'React node'],
  examples: [
    createGuideExample({
      title: '버튼 라벨 예제',
      code: `<WiniBox ui="btnitem">
  <WiniButton ui="default">저장</WiniButton>
  <WiniButton ui="line">취소</WiniButton>
</WiniBox>`,
      preview: (
        <WiniBox ui="btnitem">
          <WiniButton ui="default">저장</WiniButton>
          <WiniButton ui="line">취소</WiniButton>
        </WiniBox>
      ),
    }),
  ],
};

const BUTTON_UI_PROP = {
  name: 'ui',
  description:
    '프로젝트 공통 버튼 톤을 지정하는 속성입니다. 같은 클릭 동작이라도 의미에 따라 시각적 강도를 나눌 수 있습니다.',
  values: ['default', 'gray', 'line', 'lineGray', 'white', 'delete'],
  options: [
    {
      value: 'default',
      description: '저장, 등록처럼 가장 강조해야 하는 주 액션 버튼에 사용합니다.',
      examples: [
        createGuideExample({
          title: 'default 버튼 예제',
          code: `<WiniButton ui="default">저장</WiniButton>`,
          preview: <WiniButton ui="default">저장</WiniButton>,
        }),
      ],
    },
    {
      value: 'gray',
      description: '주 액션은 아니지만 눈에 띄는 보조 버튼이 필요할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'gray 버튼 예제',
          code: `<WiniButton ui="gray">조회</WiniButton>`,
          preview: <WiniButton ui="gray">조회</WiniButton>,
        }),
      ],
    },
    {
      value: 'line',
      description: '취소, 닫기처럼 외곽선 중심의 보조 액션 버튼에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'line 버튼 예제',
          code: `<WiniButton ui="line">취소</WiniButton>`,
          preview: <WiniButton ui="line">취소</WiniButton>,
        }),
      ],
    },
    {
      value: 'lineGray',
      description: '강조를 더 낮춘 외곽선 보조 버튼이 필요할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'lineGray 버튼 예제',
          code: `<WiniButton ui="lineGray">초기화</WiniButton>`,
          preview: <WiniButton ui="lineGray">초기화</WiniButton>,
        }),
      ],
    },
    {
      value: 'white',
      description: '배경 위에 가볍게 배치하는 텍스트형 버튼 성격으로 사용합니다.',
      examples: [
        createGuideExample({
          title: 'white 버튼 예제',
          code: `<WiniButton ui="white">자세히 보기</WiniButton>`,
          preview: <WiniButton ui="white">자세히 보기</WiniButton>,
        }),
      ],
    },
    {
      value: 'delete',
      description: '삭제, 해제처럼 위험도가 높은 액션을 구분할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'delete 버튼 예제',
          code: `<WiniButton ui="delete">삭제</WiniButton>`,
          preview: <WiniButton ui="delete">삭제</WiniButton>,
        }),
      ],
    },
  ],
};

const BUTTON_ON_CLICK_PROP = {
  name: 'onClick',
  description:
    '버튼 클릭 시 실행할 함수를 연결합니다. 저장, 조회, 팝업 열기 같은 실제 동작은 모두 이 이벤트에서 시작합니다.',
  values: ['() => void', '(event) => void'],
  examples: [
    createGuideExample({
      title: 'onClick 연결 예제',
      code: `<WiniButton ui="default" onClick={handleSave}>
  저장
</WiniButton>`,
      preview: <WiniButton ui="default">저장</WiniButton>,
    }),
  ],
};

const BUTTON_CLASSNAME_PROP = {
  name: 'className',
  description:
    'Tailwind 클래스로 버튼 폭, 정렬, 여백 같은 레이아웃 속성을 빠르게 조정할 때 사용합니다.',
  values: ['Tailwind class 문자열'],
  examples: [
    createGuideExample({
      title: 'className 조정 예제',
      code: `<WiniButton ui="line" className="min-w-[140px]">
  상세 조회
</WiniButton>`,
      preview: (
        <WiniButton ui="line" className="min-w-[140px]">
          상세 조회
        </WiniButton>
      ),
    }),
  ],
};

const BUTTON_SX_PROP = {
  name: 'sx',
  description:
    'MUI `sx`로 버튼 크기나 세부 스타일을 화면별로 미세 조정할 때 사용합니다.',
  values: ['스타일 객체', '(theme) => 스타일 객체'],
  examples: [
    createGuideExample({
      title: 'sx 스타일 예제',
      code: `<WiniButton ui="default" sx={{ minWidth: 160 }}>
  넓은 버튼
</WiniButton>`,
      preview: <WiniButton ui="default" sx={{ minWidth: 160 }}>넓은 버튼</WiniButton>,
    }),
  ],
};

const BUTTON_DISABLED_PROP = {
  name: 'disabled',
  description:
    '버튼 클릭을 막고 비활성 스타일을 표시합니다. 필수값 미입력이나 권한 없음 상태를 표현할 때 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'disabled 상태 예제',
      code: `<WiniButton ui="default" disabled>
  저장
</WiniButton>`,
      preview: <WiniButton ui="default" disabled>저장</WiniButton>,
    }),
  ],
};

const BUTTON_LOADING_PROP = {
  name: 'loading',
  description:
    'API 요청 중처럼 처리 진행 상태를 버튼 안에서 직접 보여주는 속성입니다. 중복 클릭 방지와 상태 전달을 함께 처리합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'loading 상태 예제',
      code: `<WiniButton ui="gray" loading loadingPosition="start">
  저장 중
</WiniButton>`,
      preview: (
        <WiniButton ui="gray" loading loadingPosition="start">
          저장 중
        </WiniButton>
      ),
    }),
  ],
};

const BUTTON_LOADING_POSITION_PROP = {
  name: 'loadingPosition',
  description:
    '로딩 인디케이터가 버튼의 어디에 표시될지 정합니다. 버튼 라벨 구조에 따라 가장 보기 좋은 위치를 고를 수 있습니다.',
  values: ['start', 'center', 'end'],
  options: [
    {
      value: 'start',
      description: '버튼 텍스트 왼쪽에 스피너를 배치합니다.',
      examples: [
        createGuideExample({
          title: 'start 위치 예제',
          code: `<WiniButton ui="gray" loading loadingPosition="start">
  조회 중
</WiniButton>`,
          preview: (
            <WiniButton ui="gray" loading loadingPosition="start">
              조회 중
            </WiniButton>
          ),
        }),
      ],
    },
    {
      value: 'center',
      description: '버튼 중앙에 로딩 인디케이터를 표시합니다.',
      examples: [
        createGuideExample({
          title: 'center 위치 예제',
          code: `<WiniButton ui="default" loading loadingPosition="center">
  저장 중
</WiniButton>`,
          preview: (
            <WiniButton ui="default" loading loadingPosition="center">
              저장 중
            </WiniButton>
          ),
        }),
      ],
    },
    {
      value: 'end',
      description: '버튼 텍스트 오른쪽에 스피너를 배치합니다.',
      examples: [
        createGuideExample({
          title: 'end 위치 예제',
          code: `<WiniButton ui="line" loading loadingPosition="end">
  불러오는 중
</WiniButton>`,
          preview: (
            <WiniButton ui="line" loading loadingPosition="end">
              불러오는 중
            </WiniButton>
          ),
        }),
      ],
    },
  ],
};

const BUTTON_LOADING_INDICATOR_COLOR_PROP = {
  name: 'loadingIndicatorColor',
  description:
    '기본 색상 대신 스피너 색상을 직접 지정할 때 사용합니다. 밝은 버튼이나 특수 배경 위에서 대비를 맞추기 좋습니다.',
  values: ['색상 문자열'],
  examples: [
    createGuideExample({
      title: '스피너 색상 지정 예제',
      code: `<WiniButton
  ui="line"
  loading
  loadingPosition="start"
  loadingIndicatorColor="#0F62FE"
>
  조회 중
</WiniButton>`,
      preview: (
        <WiniButton
          ui="line"
          loading
          loadingPosition="start"
          loadingIndicatorColor="#0F62FE"
        >
          조회 중
        </WiniButton>
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'ui',
    title: 'ui 속성',
    description: [
      '역할: 버튼의 의미와 강조 수준에 맞는 공통 스타일 프리셋을 선택합니다.',
      '사용 상황: 저장/조회/취소/삭제처럼 액션 중요도를 시각적으로 구분해야 하는 화면에서 사용합니다.',
      '사용 방법: `children`으로 버튼 의미를 전달하고 `ui`로 주 액션과 보조 액션을 나눕니다.',
    ],
    requiredItems: ['버튼 의미를 보여줄 `children`'],
    optionalItems: ['`ui`로 버튼 톤 변경', '`onClick`으로 실제 액션 연결', '`className`, `sx`로 화면별 레이아웃 조정'],
    requiredProps: [BUTTON_CHILDREN_PROP],
    optionalProps: [
      BUTTON_UI_PROP,
      BUTTON_ON_CLICK_PROP,
      BUTTON_CLASSNAME_PROP,
      BUTTON_SX_PROP,
    ],
  },
  {
    key: 'state',
    title: '상태 속성',
    description: [
      '역할: 버튼의 사용 가능 여부와 처리 진행 상태를 함께 제어합니다.',
      '사용 상황: 저장 중 중복 클릭 방지, 입력값 부족, 권한 제한 같은 흐름 제어가 필요할 때 사용합니다.',
      '사용 방법: `disabled`, `loading`, `loadingPosition`을 조건식으로 연결해 화면 상태와 버튼 상태를 맞춥니다.',
    ],
    requiredItems: ['상태가 바뀌어도 의미가 유지되는 `children`'],
    optionalItems: ['`disabled`로 비활성 처리', '`loading`으로 진행 중 표시', '`loadingPosition`과 `loadingIndicatorColor`로 로딩 표현 조정'],
    requiredProps: [BUTTON_CHILDREN_PROP],
    optionalProps: [
      BUTTON_DISABLED_PROP,
      BUTTON_LOADING_PROP,
      BUTTON_LOADING_POSITION_PROP,
      BUTTON_LOADING_INDICATOR_COLOR_PROP,
    ],
  },
];

export default function CompWiniButton() {
  return (
    <GuidePage
      title="WiniButton"
      subtitle="WiniButton 가이드"
      description="WiniButton은 기본 액션 버튼 컴포넌트입니다. `ui`로 시각적 의미를 나누고, 상태 props로 사용자 흐름을 제어합니다."
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
