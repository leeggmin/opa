import React, { useState } from 'react';
import { WiniRadio, WiniRadioGroup } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

function RadioGroupPreview({ row = true, ...props }) {
  const [value, setValue] = useState('1');

  return (
    <WiniRadioGroup
      row={row}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...props}
    >
      <WiniRadio value="1" label="Option 1" />
      <WiniRadio value="2" label="Option 2" />
      <WiniRadio value="3" label="Option 3" />
    </WiniRadioGroup>
  );
}

const RADIO_GROUP_VALUE_PROP = {
  name: 'WiniRadioGroup value',
  description:
    '현재 선택된 라디오 값을 그룹 상태와 연결합니다. 그룹 안에서 어떤 옵션이 선택됐는지 판단하는 기준입니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniRadioGroup value 예제',
      code: `<WiniRadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
  <WiniRadio value="1" label="Option 1" />
  <WiniRadio value="2" label="Option 2" />
  <WiniRadio value="3" label="Option 3" />
</WiniRadioGroup>`,
      preview: <RadioGroupPreview />,
    }),
  ],
};

const RADIO_GROUP_ON_CHANGE_PROP = {
  name: 'WiniRadioGroup onChange',
  description: '사용자가 다른 라디오를 선택했을 때 그룹 상태를 갱신합니다.',
  values: ['(event) => void'],
  examples: [
    createGuideExample({
      title: 'WiniRadioGroup onChange 예제',
      code: `<WiniRadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
  <WiniRadio value="1" label="Option 1" />
  <WiniRadio value="2" label="Option 2" />
  <WiniRadio value="3" label="Option 3" />
</WiniRadioGroup>`,
      preview: <RadioGroupPreview />,
    }),
  ],
};

const RADIO_GROUP_ROW_PROP = {
  name: 'WiniRadioGroup row',
  description:
    '그룹 안 라디오들을 가로 방향으로 정렬합니다. 한 줄 배치가 필요한 조회 조건 영역에서 많이 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'row 배치 예제',
      code: `<WiniRadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
  <WiniRadio value="1" label="Option 1" />
  <WiniRadio value="2" label="Option 2" />
  <WiniRadio value="3" label="Option 3" />
</WiniRadioGroup>`,
      preview: <RadioGroupPreview row />,
    }),
  ],
};

const RADIO_GROUP_NAME_PROP = {
  name: 'WiniRadioGroup name',
  description: '폼 제출이나 접근성 기준으로 그룹 이름을 지정할 때 사용합니다.',
  values: ['문자열'],
  examples: [
    createGuideExample({
      title: 'name 지정 예제',
      code: `<WiniRadioGroup
  name="exposure"
  row
  value={value}
  onChange={(e) => setValue(e.target.value)}
>
  <WiniRadio value="Y" label="공개" />
  <WiniRadio value="N" label="비공개" />
</WiniRadioGroup>`,
      preview: <RadioGroupPreview name="exposure" />,
    }),
  ],
};

const RADIO_VALUE_PROP = {
  name: 'WiniRadio value',
  description:
    '각 라디오 옵션을 식별하는 값입니다. 그룹 사용 시 이 값이 실제 저장값이 됩니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'WiniRadio value 예제',
      code: `<WiniRadio value="1" label="Option 1" />`,
      preview: <RadioGroupPreview />,
    }),
  ],
};

const RADIO_LABEL_PROP = {
  name: 'WiniRadio label',
  description:
    '사용자에게 보여줄 옵션 이름입니다. 라디오가 어떤 선택지를 뜻하는지 직접 표시합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createGuideExample({
      title: 'WiniRadio label 예제',
      code: `<WiniRadio value="2" label="Option 2" />`,
      preview: <RadioGroupPreview />,
    }),
  ],
};

const RADIO_UI_PROP = {
  name: 'ui',
  description:
    '단일 라디오를 폼 필드처럼 배치할 때 라벨과 본문 위치를 정하는 속성입니다. `row`는 좌우, `column`은 상하 배치입니다.',
  values: ['row', 'column'],
  options: [
    {
      value: 'row',
      description:
        '필드 라벨을 왼쪽에 두고 라디오 본문을 오른쪽에 배치합니다. 조회 조건형 화면에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'ui="row" 예제',
          code: `<WiniRadio ui="row" value="row" label="Row Label" />`,
          preview: <WiniRadio ui="row" value="row" label="Row Label" />,
        }),
      ],
    },
    {
      value: 'column',
      description:
        '필드 라벨을 위에 두고 라디오 본문을 아래에 배치합니다. 일반 입력 폼에서 사용하기 좋습니다.',
      examples: [
        createGuideExample({
          title: 'ui="column" 예제',
          code: `<WiniRadio ui="column" value="column" label="Column Label" />`,
          preview: (
            <WiniRadio ui="column" value="column" label="Column Label" />
          ),
        }),
      ],
    },
  ],
};

const RADIO_TITLE_FIX_PROP = {
  name: 'titleFix',
  description:
    '`ui="row"`에서 라벨 폭을 고정해 여러 필드의 시작선을 맞출 때 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'titleFix 예제',
      code: `<WiniRadio
  ui="row"
  titleFix
  value="row"
  label="Row Label"
/>`,
      preview: <WiniRadio ui="row" titleFix value="row" label="Row Label" />,
    }),
  ],
};

const RADIO_LABEL_STYLE_PROP = {
  name: 'labelSx / labelClassName',
  description:
    '필드 라벨의 색상, 여백, 폰트 스타일을 개별 화면에 맞게 조정할 때 사용합니다.',
  values: ['스타일 객체', 'Tailwind class 문자열'],
  examples: [
    createGuideExample({
      title: '라벨 스타일 조정 예제',
      code: `<WiniRadio
  ui="row"
  value="row"
  label="Row Label"
  labelSx={{ color: '#0F62FE' }}
/>`,
      preview: (
        <WiniRadio
          ui="row"
          value="row"
          label="Row Label"
          labelSx={{ color: '#0F62FE' }}
        />
      ),
    }),
  ],
};

const RADIO_CHECKED_PROP = {
  name: 'checked',
  description:
    '그룹 없이 단독 라디오를 보여줄 때 현재 선택 상태를 직접 지정합니다.',
  values: ['true', 'false'],
  examples: [
    createGuideExample({
      title: 'checked 예제',
      code: `<WiniRadio value="b" label="readOnly" readOnly checked />`,
      preview: <WiniRadio value="b" label="readOnly" readOnly checked />,
    }),
  ],
};

const RADIO_READ_ONLY_PROP = {
  name: 'readOnly',
  description:
    '현재 선택 상태만 보여주고 사용자 변경은 막습니다. 조회 전용 화면에 적합합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'readOnly 예제',
      code: `<WiniRadio value="b" label="readOnly" readOnly checked />`,
      preview: <WiniRadio value="b" label="readOnly" readOnly checked />,
    }),
  ],
};

const RADIO_DISABLED_PROP = {
  name: 'disabled',
  description: '라디오 선택 자체를 막고 비활성 스타일을 표시합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'disabled 예제',
      code: `<WiniRadio value="c" label="disabled" disabled checked />`,
      preview: <WiniRadio value="c" label="disabled" disabled checked />,
    }),
  ],
};

const RADIO_REQUIRED_PROP = {
  name: 'required',
  description: '필수 선택 항목임을 라벨에 반영합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'required 예제',
      code: `<WiniRadio value="d" label="required" required />`,
      preview: <WiniRadio value="d" label="required" required />,
    }),
  ],
};

const SECTIONS = [
  {
    key: 'group',
    title: 'WiniRadioGroup',
    description: [
      '역할: 여러 라디오 중 하나만 선택할 수 있는 단일 선택 그룹을 구성합니다.',
      '사용 상황: 공개/비공개, 사용/미사용, 단일 옵션 선택 폼처럼 중복 선택이 불가능한 항목에 사용합니다.',
      '사용 방법: `WiniRadioGroup`에 `value`, `onChange`를 연결하고 내부에 `WiniRadio`를 나열합니다.',
    ],
    requiredItems: [
      '`WiniRadioGroup`의 `value`, `onChange`',
      '각 `WiniRadio`의 `value`, `label`',
    ],
    optionalItems: ['`row`로 가로 배치', '`name`으로 폼 필드명 지정'],
    requiredProps: [RADIO_VALUE_PROP, RADIO_LABEL_PROP],
    optionalProps: [
      RADIO_GROUP_VALUE_PROP,
      RADIO_GROUP_ON_CHANGE_PROP,
      RADIO_GROUP_ROW_PROP,
      RADIO_GROUP_NAME_PROP,
    ],
  },
  {
    key: 'ui',
    title: 'ui 속성 (row / column)',
    description: [
      '역할: 단일 라디오를 폼 항목처럼 사용할 때 라벨과 라디오 본문의 배치 방향을 정합니다.',
      '사용 상황: "구분: 공개" 같은 필드형 라디오가 필요할 때 사용합니다.',
      '사용 방법: `ui="row"` 또는 `ui="column"`을 지정하고 필요하면 `titleFix`로 라벨 폭을 맞춥니다.',
    ],
    requiredItems: ['`ui`', '`label`', '`value`'],
    optionalItems: [
      '`titleFix`로 row 라벨 폭 고정',
      '`labelSx`, `labelClassName`으로 라벨 스타일 조정',
    ],
    requiredProps: [RADIO_LABEL_PROP, RADIO_VALUE_PROP],
    optionalProps: [
      RADIO_UI_PROP,
      RADIO_TITLE_FIX_PROP,
      RADIO_LABEL_STYLE_PROP,
    ],
  },
  {
    key: 'state',
    title: '상태 속성',
    description: [
      '역할: 선택 가능 여부와 필수 여부를 상태별로 명확하게 표현합니다.',
      '사용 상황: 조회 전용 폼, 수정 불가 상태, 필수 선택 항목을 구분해야 하는 화면에 사용합니다.',
      '사용 방법: `checked`, `readOnly`, `disabled`, `required`를 상황별로 조합합니다.',
    ],
    requiredItems: ['옵션 설명용 `label`', '옵션 식별값 `value`'],
    optionalItems: [
      '`checked`로 선택 상태 고정',
      '`readOnly`, `disabled`, `required`로 상태 제어',
    ],
    requiredProps: [RADIO_LABEL_PROP, RADIO_VALUE_PROP],
    optionalProps: [
      RADIO_CHECKED_PROP,
      RADIO_READ_ONLY_PROP,
      RADIO_DISABLED_PROP,
      RADIO_REQUIRED_PROP,
    ],
  },
];

export default function CompWiniRadio() {
  return (
    <GuidePage
      title="WiniRadio"
      subtitle="WiniRadio 가이드"
      description="WiniRadio는 단일 선택 입력 컴포넌트입니다. 그룹형 사용과 단일 필드형 사용을 모두 지원하며 `row`, `column` 레이아웃을 제공합니다."
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
