import React from 'react';
import { WiniInputLabel } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const INPUT_LABEL_CHILDREN_PROP = {
  name: 'children',
  description:
    '사용자에게 보여줄 라벨 텍스트입니다. 섹션 제목, 보조 라벨, 입력 항목 설명처럼 라벨 자체의 내용을 담당합니다.',
  values: ['텍스트', 'React node'],
  examples: [
    createGuideExample({
      title: '기본 라벨 예제',
      code: `<WiniInputLabel ui="default">이름</WiniInputLabel>`,
      preview: <WiniInputLabel ui="default">이름</WiniInputLabel>,
    }),
  ],
};

const INPUT_LABEL_UI_PROP = {
  name: 'ui',
  description:
    '라벨의 텍스트 색상 톤을 바꾸는 속성입니다. 폼 내에서 기본 라벨, 보조 설명, 강조 라벨을 구분할 수 있습니다.',
  values: ['default', 'sub', 'dark', 'point'],
  options: [
    {
      value: 'default',
      description: '기본 다크 라벨 톤입니다. 일반적인 입력 라벨에 가장 많이 사용합니다.',
      examples: [
        createGuideExample({
          title: 'default 라벨 예제',
          code: `<WiniInputLabel ui="default">default</WiniInputLabel>`,
          preview: <WiniInputLabel ui="default">default</WiniInputLabel>,
        }),
      ],
    },
    {
      value: 'sub',
      description: '보조 설명이나 덜 강조된 라벨에 적합한 연한 톤입니다.',
      examples: [
        createGuideExample({
          title: 'sub 라벨 예제',
          code: `<WiniInputLabel ui="sub">sub</WiniInputLabel>`,
          preview: <WiniInputLabel ui="sub">sub</WiniInputLabel>,
        }),
      ],
    },
    {
      value: 'dark',
      description: '기본보다 조금 더 진한 색감으로 섹션 라벨을 보여줄 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'dark 라벨 예제',
          code: `<WiniInputLabel ui="dark">dark</WiniInputLabel>`,
          preview: <WiniInputLabel ui="dark">dark</WiniInputLabel>,
        }),
      ],
    },
    {
      value: 'point',
      description: '필수 경고나 포인트 문구처럼 시선을 끌어야 하는 라벨에 사용합니다.',
      examples: [
        createGuideExample({
          title: 'point 라벨 예제',
          code: `<WiniInputLabel ui="point">point</WiniInputLabel>`,
          preview: <WiniInputLabel ui="point">point</WiniInputLabel>,
        }),
      ],
    },
  ],
};

const INPUT_LABEL_CLASSNAME_PROP = {
  name: 'className',
  description:
    'Tailwind 클래스로 폰트 크기, 여백, 정렬 등을 화면별로 조정할 때 사용합니다.',
  values: ['Tailwind class 문자열'],
  examples: [
    createGuideExample({
      title: 'className 조정 예제',
      code: `<WiniInputLabel ui="dark" className="mb-2">
  첨부파일
</WiniInputLabel>`,
      preview: (
        <WiniInputLabel ui="dark" className="mb-2">
          첨부파일
        </WiniInputLabel>
      ),
    }),
  ],
};

const INPUT_LABEL_SX_PROP = {
  name: 'sx',
  description:
    'MUI `sx`로 폰트 크기나 여백을 세밀하게 보정할 때 사용합니다.',
  values: ['스타일 객체', '(theme) => 스타일 객체'],
  examples: [
    createGuideExample({
      title: 'sx 스타일 예제',
      code: `<WiniInputLabel ui="point" sx={{ mb: 1 }}>
  주의 사항
</WiniInputLabel>`,
      preview: <WiniInputLabel ui="point" sx={{ mb: 1 }}>주의 사항</WiniInputLabel>,
    }),
  ],
};

const INPUT_LABEL_HTML_FOR_PROP = {
  name: 'htmlFor',
  description:
    '특정 입력 필드 id와 명시적으로 연결하고 싶을 때 사용합니다.',
  values: ['id 문자열'],
  examples: [
    createGuideExample({
      title: 'htmlFor 연결 예제',
      code: `<WiniInputLabel htmlFor="attachment" ui="dark">
  Attachment
</WiniInputLabel>`,
      preview: <WiniInputLabel htmlFor="attachment" ui="dark">Attachment</WiniInputLabel>,
    }),
  ],
};

const SECTIONS = [
  {
    key: 'ui',
    title: 'ui 속성',
    description: [
      '역할: 폼 라벨의 강조 수준에 맞는 텍스트 색상 프리셋을 제공합니다.',
      '사용 상황: 기본 라벨, 보조 설명, 강조 라벨, 경고성 포인트 라벨을 구분해야 하는 화면에서 사용합니다.',
      '사용 방법: 표시할 라벨 텍스트를 `children`으로 넣고 `ui`로 색상 톤만 바꿔 사용합니다.',
    ],
    requiredItems: ['표시할 라벨 텍스트 `children`'],
    optionalItems: ['`ui`로 라벨 톤 변경', '`className`, `sx`로 폰트와 여백 조정'],
    requiredProps: [INPUT_LABEL_CHILDREN_PROP],
    optionalProps: [
      INPUT_LABEL_UI_PROP,
      INPUT_LABEL_CLASSNAME_PROP,
      INPUT_LABEL_SX_PROP,
    ],
  },
  {
    key: 'with_field',
    title: '입력 필드와 함께 사용',
    description: [
      '역할: 입력 필드 블록 안에서 별도의 보조 라벨이나 섹션 라벨로 동작합니다.',
      '사용 상황: 첨부파일, 추가 설명, 섹션 구분처럼 기본 input label 외에 별도 타이틀이 필요한 화면에 적합합니다.',
      '사용 방법: `WiniBox`, 업로드 영역, 입력 컴포넌트와 함께 배치하고 필요하면 `htmlFor`로 입력 필드와 연결합니다.',
    ],
    requiredItems: ['라벨 텍스트 `children`'],
    optionalItems: ['`ui`로 섹션 강조 정도 조정', '`htmlFor`로 특정 필드와 연결'],
    requiredProps: [INPUT_LABEL_CHILDREN_PROP],
    optionalProps: [INPUT_LABEL_UI_PROP, INPUT_LABEL_HTML_FOR_PROP],
  },
];

export default function CompWiniInputLabel() {
  return (
    <GuidePage
      title="WiniInputLabel"
      subtitle="WiniInputLabel 가이드"
      description="WiniInputLabel은 스타일이 적용된 폼 라벨 컴포넌트입니다. `ui`로 색상 톤을 선택하고 일반 라벨 또는 보조 라벨로 사용할 수 있습니다."
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
