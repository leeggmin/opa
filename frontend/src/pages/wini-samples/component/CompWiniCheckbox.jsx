import React, { useState } from 'react';
import { WiniCheckbox } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

function CheckboxControlledPreview({ initialChecked = false, ...props }) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <WiniCheckbox
      {...props}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

const CHECKBOX_LABEL_PROP = {
  name: 'label',
  description:
    '체크박스가 무엇을 의미하는지 설명하는 텍스트입니다. 실제 서비스에서도 거의 항상 함께 사용합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createGuideExample({
      title: 'label 예제',
      code: `<WiniCheckbox label="개인정보 수집 동의" />`,
      preview: <WiniCheckbox label="개인정보 수집 동의" />,
    }),
  ],
};

const CHECKBOX_CHECKED_PROP = {
  name: 'checked',
  description:
    '외부 상태와 연결된 제어형 체크박스에서 현재 체크 상태를 전달합니다.',
  values: ['true', 'false'],
  examples: [
    createGuideExample({
      title: 'checked 제어 예제',
      code: `<WiniCheckbox
  label="알림 받기"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,
      preview: <CheckboxControlledPreview label="알림 받기" initialChecked />,
    }),
  ],
};

const CHECKBOX_DEFAULT_CHECKED_PROP = {
  name: 'defaultChecked',
  description:
    '비제어형 체크박스에서 처음 렌더링될 때 체크된 상태로 시작합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'defaultChecked 예제',
      code: `<WiniCheckbox label="기본 체크" defaultChecked />`,
      preview: <WiniCheckbox label="기본 체크" defaultChecked />,
    }),
  ],
};

const CHECKBOX_ON_CHANGE_PROP = {
  name: 'onChange',
  description:
    '사용자가 체크 상태를 바꿨을 때 외부 상태를 갱신하는 이벤트입니다.',
  values: ['(event) => void'],
  examples: [
    createGuideExample({
      title: 'onChange 상태 갱신 예제',
      code: `<WiniCheckbox
  label="알림 받기"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,
      preview: <CheckboxControlledPreview label="알림 받기" initialChecked />,
    }),
  ],
};

const CHECKBOX_READ_ONLY_PROP = {
  name: 'readOnly',
  description:
    '현재 체크 상태만 보여주고 사용자 클릭은 막습니다. 조회 전용 화면에 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'readOnly 예제',
      code: `<WiniCheckbox label="readOnly" readOnly defaultChecked />`,
      preview: <WiniCheckbox label="readOnly" readOnly defaultChecked />,
    }),
  ],
};

const CHECKBOX_DISABLED_PROP = {
  name: 'disabled',
  description:
    '체크 동작을 막고 비활성 스타일을 표시합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'disabled 예제',
      code: `<WiniCheckbox label="disabled" disabled defaultChecked />`,
      preview: <WiniCheckbox label="disabled" disabled defaultChecked />,
    }),
  ],
};

const CHECKBOX_REQUIRED_PROP = {
  name: 'required',
  description:
    '필수 선택 항목임을 라벨에 반영합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'required 예제',
      code: `<WiniCheckbox label="required" required />`,
      preview: <WiniCheckbox label="required" required />,
    }),
  ],
};

const CHECKBOX_UI_PROP = {
  name: 'ui',
  description:
    '체크박스의 기본/선택 상태 색상 프리셋을 지정합니다. 화면 의미에 따라 톤을 나눌 수 있습니다.',
  values: ['default', 'gray', 'line', 'lineGray', 'white', 'delete', 'yellow'],
  options: [
    {
      value: 'default',
      description: '가장 기본적으로 사용하는 공통 체크박스 톤입니다.',
      examples: [
        createGuideExample({
          title: 'default 체크박스 예제',
          code: `<WiniCheckbox ui="default" label="default" defaultChecked />`,
          preview: <WiniCheckbox ui="default" label="default" defaultChecked />,
        }),
      ],
    },
    {
      value: 'gray',
      description: '회색 계열의 보조 체크박스 톤입니다.',
      examples: [
        createGuideExample({
          title: 'gray 체크박스 예제',
          code: `<WiniCheckbox ui="gray" label="gray" defaultChecked />`,
          preview: <WiniCheckbox ui="gray" label="gray" defaultChecked />,
        }),
      ],
    },
    {
      value: 'line',
      description: '테두리 강조형 느낌의 체크박스 톤입니다.',
      examples: [
        createGuideExample({
          title: 'line 체크박스 예제',
          code: `<WiniCheckbox ui="line" label="line" defaultChecked />`,
          preview: <WiniCheckbox ui="line" label="line" defaultChecked />,
        }),
      ],
    },
    {
      value: 'lineGray',
      description: '강조를 낮춘 회색 외곽선 계열 체크박스 톤입니다.',
      examples: [
        createGuideExample({
          title: 'lineGray 체크박스 예제',
          code: `<WiniCheckbox ui="lineGray" label="lineGray" defaultChecked />`,
          preview: <WiniCheckbox ui="lineGray" label="lineGray" defaultChecked />,
        }),
      ],
    },
    {
      value: 'white',
      description: '밝은 배경 위에서 가볍게 표시하는 체크박스 톤입니다.',
      examples: [
        createGuideExample({
          title: 'white 체크박스 예제',
          code: `<WiniCheckbox ui="white" label="white" defaultChecked />`,
          preview: <WiniCheckbox ui="white" label="white" defaultChecked />,
        }),
      ],
    },
    {
      value: 'delete',
      description: '삭제, 해제처럼 위험 의미를 가진 선택 항목을 표시할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'delete 체크박스 예제',
          code: `<WiniCheckbox ui="delete" label="delete" defaultChecked />`,
          preview: <WiniCheckbox ui="delete" label="delete" defaultChecked />,
        }),
      ],
    },
    {
      value: 'yellow',
      description: '즐겨찾기나 찜하기처럼 감성적인 상태를 표현할 때 적합합니다.',
      examples: [
        createGuideExample({
          title: 'yellow 체크박스 예제',
          code: `<WiniCheckbox ui="yellow" label="yellow" defaultChecked />`,
          preview: <WiniCheckbox ui="yellow" label="yellow" defaultChecked />,
        }),
      ],
    },
  ],
};

const CHECKBOX_BOX_COLOR_PROP = {
  name: 'checkedBoxColor / checkedBorderColor',
  description:
    '체크 상태의 배경색과 테두리 색을 개별적으로 덮어쓸 때 사용합니다.',
  values: ['색상 문자열'],
  examples: [
    createGuideExample({
      title: '체크 색상 오버라이드 예제',
      code: `<WiniCheckbox
  label="커스텀 색상"
  defaultChecked
  checkedBoxColor="#0F62FE"
  checkedBorderColor="#0F62FE"
/>`,
      preview: (
        <WiniCheckbox
          label="커스텀 색상"
          defaultChecked
          checkedBoxColor="#0F62FE"
          checkedBorderColor="#0F62FE"
        />
      ),
    }),
  ],
};

const CHECKBOX_ICON_NAME_PROP = {
  name: 'iconName',
  description:
    '체크되지 않은 기본 상태에서 표시할 아이콘 이름입니다.',
  values: ['등록된 icon 이름 문자열'],
  examples: [
    createGuideExample({
      title: 'iconName 예제',
      code: `<WiniCheckbox
  label="favorite"
  iconName="fav"
  checkedIconName="fav2"
  ui="yellow"
/>`,
      preview: (
        <WiniCheckbox
          label="favorite"
          iconName="fav"
          checkedIconName="fav2"
          ui="yellow"
        />
      ),
    }),
  ],
};

const CHECKBOX_CHECKED_ICON_NAME_PROP = {
  name: 'checkedIconName',
  description:
    '체크됐을 때 다른 아이콘을 보여주고 싶을 때 사용합니다.',
  values: ['등록된 icon 이름 문자열'],
  examples: [
    createGuideExample({
      title: 'checkedIconName 예제',
      code: `<WiniCheckbox
  label="favorite"
  iconName="fav"
  checkedIconName="fav2"
  ui="yellow"
/>`,
      preview: (
        <WiniCheckbox
          label="favorite"
          iconName="fav"
          checkedIconName="fav2"
          ui="yellow"
        />
      ),
    }),
  ],
};

const CHECKBOX_ICON_COLOR_PROP = {
  name: 'iconColor / checkedIconColor',
  description:
    '커스텀 아이콘 상태별 색상을 직접 제어합니다.',
  values: ['색상 문자열'],
  examples: [
    createGuideExample({
      title: '커스텀 아이콘 색상 예제',
      code: `<WiniCheckbox
  label="favorite"
  iconName="fav"
  checkedIconName="fav2"
  iconColor="#707070"
  checkedIconColor="#FEA900"
/>`,
      preview: (
        <WiniCheckbox
          label="favorite"
          iconName="fav"
          checkedIconName="fav2"
          iconColor="#707070"
          checkedIconColor="#FEA900"
        />
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'basic',
    title: '기본 상태',
    description: [
      '역할: 체크 가능, 읽기 전용, 비활성, 필수 여부 같은 기본 상태를 표현합니다.',
      '사용 상황: 약관 동의, 사용 여부 토글, 설정 항목 체크처럼 불린 값을 다룰 때 사용합니다.',
      '사용 방법: `label`을 붙여 의미를 명확히 하고 상황에 따라 `checked`, `readOnly`, `disabled`, `required`를 조합합니다.',
    ],
    requiredItems: ['체크 목적을 설명하는 `label`'],
    optionalItems: ['`checked`, `defaultChecked`로 상태 지정', '`onChange`로 제어형 상태 연결', '`readOnly`, `disabled`, `required` 조합'],
    requiredProps: [CHECKBOX_LABEL_PROP],
    optionalProps: [
      CHECKBOX_CHECKED_PROP,
      CHECKBOX_DEFAULT_CHECKED_PROP,
      CHECKBOX_ON_CHANGE_PROP,
      CHECKBOX_READ_ONLY_PROP,
      CHECKBOX_DISABLED_PROP,
      CHECKBOX_REQUIRED_PROP,
    ],
  },
  {
    key: 'ui',
    title: 'ui 속성',
    description: [
      '역할: 체크 아이콘과 박스 색상을 목적에 맞는 톤으로 바꿉니다.',
      '사용 상황: 일반 선택, 보조 선택, 위험 액션, 즐겨찾기처럼 상태 의미를 색상으로 구분할 때 사용합니다.',
      '사용 방법: 동일한 체크박스 구조를 유지한 채 `ui`만 바꿔 시각적 의미를 전달합니다.',
    ],
    requiredItems: ['항목 의미가 드러나는 `label`'],
    optionalItems: ['`ui`로 색상 토큰 선택', '`checkedBoxColor`, `checkedBorderColor`로 세부 색상 보정'],
    requiredProps: [CHECKBOX_LABEL_PROP],
    optionalProps: [CHECKBOX_UI_PROP, CHECKBOX_BOX_COLOR_PROP],
  },
  {
    key: 'custom_icon',
    title: '커스텀 아이콘',
    description: [
      '역할: 기본 체크 모양 대신 별, 북마크 등 커스텀 아이콘 기반 체크 UI를 만듭니다.',
      '사용 상황: 즐겨찾기, 중요 표시, 찜하기처럼 기본 체크박스보다 감성적인 표현이 필요한 경우에 적합합니다.',
      '사용 방법: `iconName`과 `checkedIconName`에 등록된 아이콘 이름을 넣고 필요하면 상태별 색상도 따로 조정합니다.',
    ],
    requiredItems: ['상태를 설명하는 `label`', '기본 아이콘 이름 `iconName`'],
    optionalItems: ['`checkedIconName`으로 체크 상태 전용 아이콘 지정', '`iconColor`, `checkedIconColor`로 상태별 아이콘 색상 보정'],
    requiredProps: [CHECKBOX_LABEL_PROP, CHECKBOX_ICON_NAME_PROP],
    optionalProps: [
      CHECKBOX_CHECKED_ICON_NAME_PROP,
      CHECKBOX_ICON_COLOR_PROP,
      CHECKBOX_UI_PROP,
    ],
  },
];

export default function CompWiniCheckbox() {
  return (
    <GuidePage
      title="WiniCheckbox"
      subtitle="WiniCheckbox 가이드"
      description="WiniCheckbox는 체크 상태를 다루는 기본 입력 컴포넌트입니다. 상태 props, `ui` 색상 톤, 커스텀 아이콘 구성을 모두 지원합니다."
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
