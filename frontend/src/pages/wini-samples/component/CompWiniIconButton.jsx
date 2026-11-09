import React from 'react';
import { WiniIconButton } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const ICON_BUTTON_ICON_PROP = {
  name: 'icon',
  description:
    '버튼 안에 표시할 아이콘 이름입니다. 프로젝트에 등록된 아이콘 키를 전달하면 버튼 왼쪽에 렌더링됩니다.',
  values: ['등록된 icon 이름 문자열'],
  examples: [
    createGuideExample({
      title: 'icon 지정 예제',
      code: `<WiniIconButton ui="default" icon="blog">
  상세 보기
</WiniIconButton>`,
      preview: (
        <WiniIconButton ui="default" icon="blog">
          상세 보기
        </WiniIconButton>
      ),
    }),
  ],
};

const ICON_BUTTON_CHILDREN_PROP = {
  name: 'children',
  description:
    '버튼 의미를 보여주는 가시 라벨입니다. 아이콘만으로 부족한 의미를 텍스트로 보완할 때 사용합니다.',
  values: ['텍스트', 'React node'],
  examples: [
    createGuideExample({
      title: '라벨 포함 예제',
      code: `<WiniIconButton ui="line" icon="down">
  펼치기
</WiniIconButton>`,
      preview: (
        <WiniIconButton ui="line" icon="down">
          펼치기
        </WiniIconButton>
      ),
    }),
  ],
};

const ICON_BUTTON_UI_PROP = {
  name: 'ui',
  description:
    '버튼 배경과 보더 스타일을 정하는 공통 톤 속성입니다. 액션 중요도에 따라 아이콘 버튼의 분위기를 나눌 수 있습니다.',
  values: ['default', 'gray', 'line', 'lineGray', 'white', 'delete'],
  options: [
    {
      value: 'default',
      description: '주 액션에 사용하는 기본 강조형 아이콘 버튼입니다.',
      examples: [
        createGuideExample({
          title: 'default 아이콘 버튼',
          code: `<WiniIconButton ui="default" icon="blog">
  보기
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="default" icon="blog">
              보기
            </WiniIconButton>
          ),
        }),
      ],
    },
    {
      value: 'gray',
      description: '보조 액션을 조금 더 차분하게 표현할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'gray 아이콘 버튼',
          code: `<WiniIconButton ui="gray" icon="blog">
  조회
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="gray" icon="blog">
              조회
            </WiniIconButton>
          ),
        }),
      ],
    },
    {
      value: 'line',
      description: '외곽선 중심의 보조 액션 버튼에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'line 아이콘 버튼',
          code: `<WiniIconButton ui="line" icon="blog">
  상세
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="line" icon="blog">
              상세
            </WiniIconButton>
          ),
        }),
      ],
    },
    {
      value: 'lineGray',
      description: '강조를 더 낮춘 외곽선형 보조 버튼입니다.',
      examples: [
        createGuideExample({
          title: 'lineGray 아이콘 버튼',
          code: `<WiniIconButton ui="lineGray" icon="blog">
  임시 저장
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="lineGray" icon="blog">
              임시 저장
            </WiniIconButton>
          ),
        }),
      ],
    },
    {
      value: 'white',
      description: '가벼운 텍스트형 액션 버튼처럼 사용할 때 적합합니다.',
      examples: [
        createGuideExample({
          title: 'white 아이콘 버튼',
          code: `<WiniIconButton ui="white" icon="blog">
  더보기
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="white" icon="blog">
              더보기
            </WiniIconButton>
          ),
        }),
      ],
    },
    {
      value: 'delete',
      description: '삭제, 제거 같은 위험 액션을 구분할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'delete 아이콘 버튼',
          code: `<WiniIconButton ui="delete" icon="del">
  삭제
</WiniIconButton>`,
          preview: (
            <WiniIconButton ui="delete" icon="del">
              삭제
            </WiniIconButton>
          ),
        }),
      ],
    },
  ],
};

const ICON_BUTTON_ON_CLICK_PROP = {
  name: 'onClick',
  description:
    '아이콘 버튼 클릭 시 실행할 함수를 연결합니다. 팝업 열기, 상세 보기, 다운로드 등 실제 액션을 처리합니다.',
  values: ['() => void', '(event) => void'],
  examples: [
    createGuideExample({
      title: 'onClick 연결 예제',
      code: `<WiniIconButton ui="default" icon="blog" onClick={handleOpen}>
  상세 보기
</WiniIconButton>`,
      preview: (
        <WiniIconButton ui="default" icon="blog">
          상세 보기
        </WiniIconButton>
      ),
    }),
  ],
};

const ICON_BUTTON_ICON_SX_PROP = {
  name: 'iconSx',
  description: '아이콘 크기나 색상을 버튼 단위로 따로 조정할 때 사용합니다.',
  values: ['스타일 객체', '(theme) => 스타일 객체'],
  examples: [
    createGuideExample({
      title: 'iconSx 예제',
      code: `<WiniIconButton
  ui="line"
  icon="down"
  iconSx={{ fontSize: 20, color: '#0F62FE' }}
>
  펼치기
</WiniIconButton>`,
      preview: (
        <WiniIconButton
          ui="line"
          icon="down"
          iconSx={{ fontSize: 20, color: '#0F62FE' }}
        >
          펼치기
        </WiniIconButton>
      ),
    }),
  ],
};

const ICON_BUTTON_ICON_ONLY_PROP = {
  name: 'iconOnly',
  description:
    '텍스트는 화면에서 숨기고 아이콘만 보여주는 모드입니다. 좁은 툴바나 테이블 액션 셀에서 자주 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'iconOnly 예제',
      code: `<WiniIconButton iconOnly ui="line" icon="down">
  펼치기
</WiniIconButton>`,
      preview: (
        <WiniIconButton iconOnly ui="line" icon="down">
          펼치기
        </WiniIconButton>
      ),
    }),
  ],
};

const ICON_BUTTON_ARIA_LABEL_PROP = {
  name: 'aria-label',
  description:
    '`iconOnly`처럼 텍스트를 숨긴 경우 접근성 라벨을 명시적으로 전달할 때 사용합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createGuideExample({
      title: 'aria-label 지정 예제',
      code: `<WiniIconButton
  iconOnly
  ui="line"
  icon="down"
  aria-label="펼치기"
/>`,
      preview: (
        <WiniIconButton iconOnly ui="line" icon="down" aria-label="펼치기" />
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'ui',
    title: 'ui 속성',
    description: [
      '역할: 아이콘과 버튼 라벨을 함께 보여주면서 액션 중요도에 맞는 버튼 톤을 선택합니다.',
      '사용 상황: 상세 보기, 다운로드, 펼침, 삭제처럼 아이콘으로 의미를 보강해야 하는 액션 버튼에 사용합니다.',
      '사용 방법: `icon`으로 아이콘을 지정하고 `ui`로 버튼 분위기를 정한 뒤 `children`으로 라벨을 보완합니다.',
    ],
    requiredItems: ['버튼 아이콘 `icon`', '버튼 의미를 보여줄 `children`'],
    optionalItems: [
      '`ui`로 버튼 톤 변경',
      '`onClick`으로 실제 동작 연결',
      '`iconSx`로 아이콘 스타일 보정',
    ],
    requiredProps: [ICON_BUTTON_ICON_PROP],
    optionalProps: [
      ICON_BUTTON_CHILDREN_PROP,
      ICON_BUTTON_UI_PROP,
      ICON_BUTTON_ON_CLICK_PROP,
      ICON_BUTTON_ICON_SX_PROP,
    ],
  },
  {
    key: 'icon_only',
    title: 'iconOnly 속성',
    description: [
      '역할: 화면에는 아이콘만 보여주고 접근성용 라벨은 유지하는 아이콘 전용 버튼을 만듭니다.',
      '사용 상황: 테이블 액션 셀, 툴바, 접기/펼치기 버튼처럼 공간이 좁은 영역에서 사용합니다.',
      '사용 방법: `iconOnly`를 켜고 `children` 또는 `aria-label`에 버튼 의미를 넣어 접근성을 보완합니다.',
    ],
    requiredItems: [
      '표시할 아이콘 `icon`',
      '`iconOnly`',
      '접근성 라벨 역할의 `children` 또는 `aria-label`',
    ],
    optionalItems: [
      '`ui`로 버튼 톤 조정',
      '`iconSx`로 아이콘 크기와 색상 보정',
    ],
    requiredProps: [ICON_BUTTON_ICON_PROP],
    optionalProps: [
      ICON_BUTTON_ICON_ONLY_PROP,
      ICON_BUTTON_ARIA_LABEL_PROP,
      ICON_BUTTON_ICON_SX_PROP,
      ICON_BUTTON_UI_PROP,
    ],
  },
];

export default function CompWiniIconButton() {
  return (
    <GuidePage
      title="WiniIconButton"
      subtitle="WiniIconButton 가이드"
      description="WiniIconButton은 아이콘과 버튼을 결합한 액션 컴포넌트입니다. 일반 라벨형과 `iconOnly` 모드를 모두 지원합니다."
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
