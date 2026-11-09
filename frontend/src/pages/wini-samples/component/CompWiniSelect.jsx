import React, { useState } from 'react';
import { WiniBox, WiniMenuItem, WiniSelect } from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Y', label: 'Enabled' },
  { value: 'N', label: 'Disabled' },
];

const ROLE_OPTIONS = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
];

const CATEGORY_OPTIONS = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

function renderMenuItems(options) {
  return options.map((option) => (
    <WiniMenuItem key={option.value} value={option.value}>
      {option.label}
    </WiniMenuItem>
  ));
}

function SelectControlledPreview({ initialValue, options, ...props }) {
  const [value, setValue] = useState(initialValue);

  return (
    <WiniSelect
      {...props}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      {renderMenuItems(options)}
    </WiniSelect>
  );
}

function SelectStaticPreview({ options, ...props }) {
  return <WiniSelect {...props}>{renderMenuItems(options)}</WiniSelect>;
}

const SELECT_LABEL_PROP = {
  name: 'label',
  description:
    '셀렉트 필드의 목적을 보여주는 라벨입니다. 사용자는 이 라벨을 기준으로 어떤 값을 고르는지 이해합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createGuideExample({
      title: 'label 예제',
      code: `<WiniSelect
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <WiniMenuItem value="all">All</WiniMenuItem>
  <WiniMenuItem value="Y">Enabled</WiniMenuItem>
  <WiniMenuItem value="N">Disabled</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectControlledPreview
            label="Status"
            initialValue="all"
            options={STATUS_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_VALUE_PROP = {
  name: 'value',
  description:
    '현재 선택된 값을 외부 상태와 연결합니다. 제어형 셀렉트에서는 반드시 `onChange`와 함께 사용합니다.',
  values: ['문자열', '숫자', '배열(multiple 사용 시)'],
  examples: [
    createGuideExample({
      title: 'value 제어 예제',
      code: `<WiniSelect
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <WiniMenuItem value="all">All</WiniMenuItem>
  <WiniMenuItem value="Y">Enabled</WiniMenuItem>
  <WiniMenuItem value="N">Disabled</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectControlledPreview
            label="Status"
            initialValue="Y"
            options={STATUS_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_ON_CHANGE_PROP = {
  name: 'onChange',
  description: '사용자가 옵션을 선택했을 때 외부 상태를 갱신하는 이벤트입니다.',
  values: ['(event) => void'],
  examples: [
    createGuideExample({
      title: 'onChange 상태 갱신 예제',
      code: `<WiniSelect
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <WiniMenuItem value="all">All</WiniMenuItem>
  <WiniMenuItem value="Y">Enabled</WiniMenuItem>
  <WiniMenuItem value="N">Disabled</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectControlledPreview
            label="Status"
            initialValue="all"
            options={STATUS_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_CHILDREN_PROP = {
  name: 'children',
  description:
    '`WiniMenuItem` 자식 목록입니다. 실제로 선택할 수 있는 옵션들을 이 안에 배치합니다.',
  values: ['WiniMenuItem', 'React node'],
  examples: [
    createGuideExample({
      title: 'children 옵션 구성 예제',
      code: `<WiniSelect label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
  <WiniMenuItem value="user">User</WiniMenuItem>
  <WiniMenuItem value="admin">Admin</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectControlledPreview
            label="Role"
            initialValue="user"
            options={ROLE_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_DEFAULT_VALUE_PROP = {
  name: 'defaultValue',
  description: '비제어형 셀렉트에서 초기 선택값만 지정할 때 사용합니다.',
  values: ['문자열', '숫자'],
  examples: [
    createGuideExample({
      title: 'defaultValue 예제',
      code: `<WiniSelect label="Status" defaultValue="Y">
  <WiniMenuItem value="all">All</WiniMenuItem>
  <WiniMenuItem value="Y">Enabled</WiniMenuItem>
  <WiniMenuItem value="N">Disabled</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectStaticPreview
            label="Status"
            defaultValue="Y"
            options={STATUS_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_MENU_PROPS_PROP = {
  name: 'MenuProps',
  description:
    '드롭다운 메뉴의 스크롤 락, 높이, Paper 스타일 같은 메뉴 동작을 조정할 때 사용합니다.',
  values: ['MUI MenuProps 객체'],
  examples: [
    createGuideExample({
      title: 'MenuProps 예제',
      code: `<WiniSelect
  label="Status"
  defaultValue="all"
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 180,
      },
    },
  }}
>
  <WiniMenuItem value="all">All</WiniMenuItem>
  <WiniMenuItem value="Y">Enabled</WiniMenuItem>
  <WiniMenuItem value="N">Disabled</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectStaticPreview
            label="Status"
            defaultValue="all"
            options={STATUS_OPTIONS}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 180,
                },
              },
            }}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_UI_PROP = {
  name: 'ui',
  description:
    '라벨과 셀렉트 박스의 배치 방향을 바꾸는 속성입니다. `row`는 좌우 배치, `column`은 상하 배치입니다.',
  values: ['row', 'column'],
  options: [
    {
      value: 'row',
      description:
        '라벨을 왼쪽에 두고 셀렉트를 오른쪽에 배치합니다. 조회 조건이나 인라인 폼에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'ui="row" 예제',
          code: `<WiniSelect
  ui="row"
  label="Role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <WiniMenuItem value="user">User</WiniMenuItem>
  <WiniMenuItem value="admin">Admin</WiniMenuItem>
</WiniSelect>`,
          preview: (
            <WiniBox className="max-w-[420px]">
              <SelectControlledPreview
                ui="row"
                label="Role"
                initialValue="user"
                options={ROLE_OPTIONS}
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'column',
      description:
        '라벨을 위에 두고 셀렉트를 아래에 배치합니다. 일반 입력 폼이나 모바일 화면에 적합합니다.',
      examples: [
        createGuideExample({
          title: 'ui="column" 예제',
          code: `<WiniSelect
  ui="column"
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <WiniMenuItem value="a">A</WiniMenuItem>
  <WiniMenuItem value="b">B</WiniMenuItem>
</WiniSelect>`,
          preview: (
            <WiniBox className="max-w-[320px]">
              <SelectControlledPreview
                ui="column"
                label="Category"
                initialValue="a"
                options={CATEGORY_OPTIONS}
              />
            </WiniBox>
          ),
        }),
      ],
    },
  ],
};

const SELECT_TITLE_FIX_PROP = {
  name: 'titleFix',
  description:
    '`ui="row"`에서 라벨 폭을 고정해 여러 필드의 시작선을 맞추고 싶을 때 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'titleFix 적용 예제',
      code: `<WiniSelect
  ui="row"
  titleFix
  label="Role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <WiniMenuItem value="user">User</WiniMenuItem>
  <WiniMenuItem value="admin">Admin</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[420px]">
          <SelectControlledPreview
            ui="row"
            titleFix
            label="Role"
            initialValue="user"
            options={ROLE_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_CONTAINER_CLASSNAME_PROP = {
  name: 'containerClassName',
  description:
    '`row` 또는 `column` 레이아웃 바깥쪽 래퍼의 정렬을 Tailwind 클래스로 조정할 때 사용합니다.',
  values: ['Tailwind class 문자열'],
  examples: [
    createGuideExample({
      title: 'containerClassName 예제',
      code: `<WiniSelect
  ui="row"
  containerClassName="items-start"
  label="Role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <WiniMenuItem value="user">User</WiniMenuItem>
  <WiniMenuItem value="admin">Admin</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[420px]">
          <SelectControlledPreview
            ui="row"
            containerClassName="items-start"
            label="Role"
            initialValue="user"
            options={ROLE_OPTIONS}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_VARIANT_PROP = {
  name: 'variant',
  description:
    '셀렉트 외형을 정하는 속성입니다. 프로젝트 화면 톤에 따라 아웃라인형, 채움형, 밑줄형을 고를 수 있습니다.',
  values: ['outlined', 'filled', 'standard'],
  options: [
    {
      value: 'outlined',
      description: '가장 범용적으로 사용하는 기본 외곽선 셀렉트입니다.',
      examples: [
        createGuideExample({
          title: 'outlined 예제',
          code: `<WiniSelect variant="outlined" label="outlined" defaultValue="1">
  <WiniMenuItem value="1">One</WiniMenuItem>
</WiniSelect>`,
          preview: (
            <WiniBox className="max-w-[320px]">
              <SelectStaticPreview
                variant="outlined"
                label="outlined"
                defaultValue="1"
                options={[{ value: '1', label: 'One' }]}
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'filled',
      description:
        '배경이 채워지는 형태로 입력 영역을 좀 더 또렷하게 구분할 때 사용합니다.',
      examples: [
        createGuideExample({
          title: 'filled 예제',
          code: `<WiniSelect variant="filled" label="filled" defaultValue="1">
  <WiniMenuItem value="1">One</WiniMenuItem>
</WiniSelect>`,
          preview: (
            <WiniBox className="max-w-[320px]">
              <SelectStaticPreview
                variant="filled"
                label="filled"
                defaultValue="1"
                options={[{ value: '1', label: 'One' }]}
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'standard',
      description: '하단 밑줄 중심의 간결한 셀렉트 형태입니다.',
      examples: [
        createGuideExample({
          title: 'standard 예제',
          code: `<WiniSelect variant="standard" label="standard" defaultValue="1">
  <WiniMenuItem value="1">One</WiniMenuItem>
</WiniSelect>`,
          preview: (
            <WiniBox className="max-w-[320px]">
              <SelectStaticPreview
                variant="standard"
                label="standard"
                defaultValue="1"
                options={[{ value: '1', label: 'One' }]}
              />
            </WiniBox>
          ),
        }),
      ],
    },
  ],
};

const SELECT_DISABLED_PROP = {
  name: 'disabled',
  description:
    '셀렉트 선택을 막고 비활성 스타일을 표시합니다. 수정 불가 상태나 권한 제한 화면에 사용합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'disabled 예제',
      code: `<WiniSelect disabled label="disabled" defaultValue="1">
  <WiniMenuItem value="1">One</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectStaticPreview
            disabled
            label="disabled"
            defaultValue="1"
            options={[{ value: '1', label: 'One' }]}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SELECT_REQUIRED_PROP = {
  name: 'required',
  description: '필수 입력 항목임을 라벨과 스타일로 표시합니다.',
  values: ['true'],
  examples: [
    createGuideExample({
      title: 'required 예제',
      code: `<WiniSelect required label="required" defaultValue="1">
  <WiniMenuItem value="1">One</WiniMenuItem>
</WiniSelect>`,
      preview: (
        <WiniBox className="max-w-[320px]">
          <SelectStaticPreview
            required
            label="required"
            defaultValue="1"
            options={[{ value: '1', label: 'One' }]}
          />
        </WiniBox>
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'default',
    title: '기본 셀렉트',
    description: [
      '역할: 목록 중 하나를 선택하는 기본 드롭다운 필드입니다.',
      '사용 상황: 상태, 권한, 구분값처럼 정해진 옵션 중 하나를 선택해야 하는 폼에 사용합니다.',
      '사용 방법: `label`, `value`, `onChange`, `WiniMenuItem` 자식을 함께 연결해 제어형 셀렉트로 구성합니다.',
    ],
    requiredItems: [
      '`label`',
      '`value`, `onChange`',
      '`WiniMenuItem` 자식 옵션',
    ],
    optionalItems: [
      '`defaultValue`로 초기값만 지정 가능',
      '`MenuProps`로 드롭다운 동작 보정',
    ],
    requiredProps: [SELECT_LABEL_PROP, SELECT_CHILDREN_PROP],
    optionalProps: [
      SELECT_VALUE_PROP,
      SELECT_ON_CHANGE_PROP,
      SELECT_DEFAULT_VALUE_PROP,
      SELECT_MENU_PROPS_PROP,
    ],
  },
  {
    key: 'ui_layout',
    title: 'ui 속성 (row / column)',
    description: [
      '역할: 라벨과 셀렉트 박스의 배치 방향을 행/열 기준으로 바꿉니다.',
      '사용 상황: 조회 조건 영역은 `row`, 입력 폼이나 모바일 화면은 `column`으로 나누어 사용할 때 적합합니다.',
      '사용 방법: `ui="row"` 또는 `ui="column"`을 지정하고 필요하면 `titleFix`로 라벨 폭을 맞춥니다.',
    ],
    requiredItems: [
      '`label`',
      '`value`, `onChange`',
      '`WiniMenuItem` 자식 옵션',
    ],
    optionalItems: [
      '`ui`로 배치 방향 선택',
      '`titleFix`로 row 라벨 폭 고정',
      '`containerClassName`으로 외곽 정렬 보정',
    ],
    requiredProps: [SELECT_LABEL_PROP, SELECT_CHILDREN_PROP],
    optionalProps: [
      SELECT_UI_PROP,
      SELECT_VALUE_PROP,
      SELECT_ON_CHANGE_PROP,
      SELECT_TITLE_FIX_PROP,
      SELECT_CONTAINER_CLASSNAME_PROP,
    ],
  },
  {
    key: 'state_variant',
    title: '상태 및 스타일',
    description: [
      '역할: 셀렉트의 시각 스타일과 입력 가능 상태를 함께 제어합니다.',
      '사용 상황: 강조 폼, 일반 폼, 비활성/필수 표시가 필요한 입력 화면에서 사용합니다.',
      '사용 방법: `variant`로 외형을 바꾸고 `disabled`, `required`, `defaultValue`를 조합해 상태를 표현합니다.',
    ],
    requiredItems: ['옵션 목록 `children`', '식별 가능한 `label`'],
    optionalItems: [
      '`variant`로 스타일 변경',
      '`disabled`, `required`로 상태 제어',
      '`defaultValue`로 초기값 설정',
    ],
    requiredProps: [SELECT_LABEL_PROP, SELECT_CHILDREN_PROP],
    optionalProps: [
      SELECT_VARIANT_PROP,
      SELECT_DISABLED_PROP,
      SELECT_REQUIRED_PROP,
      SELECT_DEFAULT_VALUE_PROP,
    ],
  },
];

export default function CompWiniSelect() {
  return (
    <GuidePage
      title="WiniSelect"
      subtitle="WiniSelect 가이드"
      description="WiniSelect는 기본 선택 필드 컴포넌트입니다. `row`/`column` 레이아웃과 `variant`, 상태 props를 조합해 다양한 입력 폼에 사용할 수 있습니다."
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
