import React, { useState } from 'react';
import {
  WiniBox,
  WiniGridItem,
  WiniGridLayout,
  WiniText,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

const createTextExample = ({
  title,
  code,
  preview,
  description,
  previewTitle,
  previewDescription,
}) => ({
  title,
  code,
  preview,
  description,
  previewTitle,
  previewDescription,
});

function TextControlledPreview({ initialValue = '', ...props }) {
  const [value, setValue] = useState(initialValue);

  return (
    <WiniText
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function TextStaticPreview({ value = '', ...props }) {
  return <WiniText {...props} value={value} onChange={() => {}} />;
}

const TEXT_VALUE_PROP = {
  name: 'value',
  description: '입력값을 상태와 연결하는 제어형 값입니다. 비제어형으로 사용할 때는 생략할 수 있습니다.',
  values: ['문자열 상태값', '숫자 상태값'],
  examples: [
    createTextExample({
      title: 'value 제어형 입력 예제',
      code: `<WiniText
  label="이름"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview label="이름" initialValue="홍길동" />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_ON_CHANGE_PROP = {
  name: 'onChange',
  description: '입력 변경 시 상태를 갱신하는 이벤트 핸들러입니다. `value`를 연결한 제어형 입력에서 함께 사용합니다.',
  values: ['(event) => void'],
  examples: [
    createTextExample({
      title: 'onChange 상태 연동 예제',
      code: `<WiniText
  label="이름"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            label="이름"
            placeholder="입력하면 바로 반영됩니다"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_LABEL_PROP = {
  name: 'label',
  description: '필드명을 사용자에게 보여주는 라벨 텍스트입니다.',
  values: ['텍스트 문자열'],
  examples: [
    createTextExample({
      title: 'label 표시 예제',
      code: `<WiniText
  label="이름"
  placeholder="이름을 입력하세요"
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            label="이름"
            placeholder="이름을 입력하세요"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_PLACEHOLDER_PROP = {
  name: 'placeholder',
  description: '입력 전 안내 문구를 표시합니다.',
  values: ['텍스트 문자열'],
  examples: [
    createTextExample({
      title: 'placeholder 안내 문구 예제',
      code: `<WiniText
  label="이름"
  placeholder="이름을 입력하세요"
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            label="이름"
            placeholder="이름을 입력하세요"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_UI_PROP = {
  name: 'ui',
  description: '라벨과 입력창의 배치 방식을 정하는 레이아웃 속성입니다.',
  values: ['row', 'column'],
  options: [
    {
      value: 'row',
      description:
        '라벨 좌측 + 입력창 우측의 가로 배치입니다. 조회 조건, 등록 폼처럼 여러 필드를 정렬할 때 적합합니다.',
      examples: [
        createTextExample({
          title: 'row 값 예제',
          code: `<WiniText
  ui="row"
  label="이메일"
  placeholder="email@domain.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
          preview: (
            <WiniBox className="max-w-[420px]">
              <TextControlledPreview
                ui="row"
                label="이메일"
                placeholder="email@domain.com"
                initialValue=""
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'column',
      description:
        '라벨 상단 + 입력창 하단의 세로 배치입니다. 실제 사용 값은 `col`이 아니라 `column`입니다.',
      examples: [
        createTextExample({
          title: 'column 값 예제',
          code: `<WiniText
  ui="column"
  label="부서"
  placeholder="부서를 입력하세요"
  value={dept}
  onChange={(e) => setDept(e.target.value)}
/>`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                ui="column"
                label="부서"
                placeholder="부서를 입력하세요"
                initialValue=""
              />
            </WiniBox>
          ),
        }),
      ],
    },
  ],
};

const TEXT_SIZE_PROP = {
  name: 'size',
  description: '입력 높이와 기본 폰트 크기를 함께 조절합니다.',
  values: ['small', 'medium', 'large'],
  options: [
    {
      value: 'small',
      description: '좁은 리스트형 폼이나 밀도 높은 화면에 적합한 기본 크기입니다.',
      examples: [
        createTextExample({
          title: 'small 크기 예제',
          code: `<WiniText label="small" size="small" placeholder="small" />`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="small"
                size="small"
                placeholder="small"
                initialValue=""
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'medium',
      description: '일반적인 등록/수정 화면에서 무난하게 쓰는 중간 크기입니다.',
      examples: [
        createTextExample({
          title: 'medium 크기 예제',
          code: `<WiniText label="medium" size="medium" placeholder="medium" />`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="medium"
                size="medium"
                placeholder="medium"
                initialValue=""
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'large',
      description: '중요 입력창이나 터치 영역을 더 크게 보여줘야 하는 화면에 적합합니다.',
      examples: [
        createTextExample({
          title: 'large 크기 예제',
          code: `<WiniText label="large" size="large" placeholder="large" />`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="large"
                size="large"
                placeholder="large"
                initialValue=""
              />
            </WiniBox>
          ),
        }),
      ],
    },
  ],
};

const TEXT_VARIANT_PROP = {
  name: 'variant',
  description: '입력 외형과 라벨 동작 방식을 정하는 스타일 속성입니다.',
  values: ['outlined', 'filled', 'standard'],
  options: [
    {
      value: 'outlined',
      description: '테두리가 있는 기본 입력 형태입니다. 가장 범용적으로 사용합니다.',
      examples: [
        createTextExample({
          title: 'outlined 형태 예제',
          code: `<WiniText
  label="outlined"
  variant="outlined"
  placeholder="outlined"
  slotProps={{ inputLabel: { shrink: true } }}
/>`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="outlined"
                variant="outlined"
                placeholder="outlined"
                initialValue=""
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'filled',
      description: '배경이 채워진 형태입니다. 입력 영역을 더 또렷하게 구분하고 싶을 때 사용합니다.',
      examples: [
        createTextExample({
          title: 'filled 형태 예제',
          code: `<WiniText
  label="filled"
  variant="filled"
  placeholder="filled"
  slotProps={{ inputLabel: { shrink: true } }}
/>`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="filled"
                variant="filled"
                placeholder="filled"
                initialValue=""
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </WiniBox>
          ),
        }),
      ],
    },
    {
      value: 'standard',
      description: '하단 라인 중심의 간결한 형태입니다. 밀도 높은 화면이나 단순 입력에 적합합니다.',
      examples: [
        createTextExample({
          title: 'standard 형태 예제',
          code: `<WiniText
  label="standard"
  variant="standard"
  placeholder="standard"
  slotProps={{ inputLabel: { shrink: true } }}
/>`,
          preview: (
            <WiniBox className="max-w-[360px]">
              <TextControlledPreview
                label="standard"
                variant="standard"
                placeholder="standard"
                initialValue=""
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </WiniBox>
          ),
        }),
      ],
    },
  ],
};

const TEXT_CLASSNAME_PROP = {
  name: 'className',
  description: 'Tailwind 클래스로 폭, 높이, 여백 같은 레이아웃을 조정합니다.',
  values: ['Tailwind class 문자열'],
  examples: [
    createTextExample({
      title: 'className 레이아웃 예제',
      code: `<WiniText
  label="이름"
  className="w-full h-[40px]"
  placeholder="className 예시"
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            label="이름"
            className="w-full h-[40px]"
            placeholder="className 예시"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_SX_PROP = {
  name: 'sx',
  description: 'MUI `sx`로 세부 스타일을 직접 조정합니다.',
  values: ['스타일 객체', '(theme) => 스타일 객체'],
  examples: [
    createTextExample({
      title: 'sx 스타일 예제',
      code: `<WiniText
  label="이름"
  sx={{ width: 320 }}
  placeholder="sx 예시"
/>`,
      preview: (
        <WiniBox className="max-w-[420px]">
          <TextControlledPreview
            label="이름"
            sx={{ width: 320 }}
            placeholder="sx 예시"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_REQUIRED_PROP = {
  name: 'required',
  description: '필수 입력 항목임을 표시합니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'required 표시 예제',
      code: `<WiniText
  required
  label="필수 항목"
  placeholder="필수 입력"
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            required
            label="필수 항목"
            placeholder="필수 입력"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_READ_ONLY_PROP = {
  name: 'slotProps.input.readOnly',
  description: '입력은 막고 값만 읽을 수 있는 상태로 만듭니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'readOnly 상태 예제',
      code: `<WiniText
  label="readOnly"
  value="읽기 전용 값"
  slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextStaticPreview
            label="readOnly"
            value="읽기 전용 값"
            slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_DISABLED_PROP = {
  name: 'disabled',
  description: '입력을 완전히 비활성화합니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'disabled 상태 예제',
      code: `<WiniText
  disabled
  label="disabled"
  value="비활성 값"
  slotProps={{ inputLabel: { shrink: true } }}
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextStaticPreview
            disabled
            label="disabled"
            value="비활성 값"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_INPUT_LABEL_SHRINK_PROP = {
  name: 'slotProps.inputLabel.shrink',
  description: '라벨이 항상 축소된 상태를 유지하도록 설정합니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'inputLabel shrink 예제',
      code: `<WiniText
  label="outlined"
  variant="outlined"
  placeholder="outlined"
  slotProps={{ inputLabel: { shrink: true } }}
/>`,
      preview: (
        <WiniBox className="max-w-[360px]">
          <TextControlledPreview
            label="outlined"
            variant="outlined"
            placeholder="outlined"
            initialValue=""
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_MULTILINE_PROP = {
  name: 'multiline',
  description: '입력을 여러 줄 textarea 형태로 바꿉니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'multiline 입력 예제',
      code: `<WiniText
  label="상세 설명"
  multiline
  minRows={4}
  placeholder="상세 설명을 입력하세요"
/>`,
      preview: (
        <WiniBox className="max-w-[420px]">
          <TextControlledPreview
            ui="column"
            label="상세 설명"
            multiline
            minRows={4}
            placeholder="상세 설명을 입력하세요"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_MIN_ROWS_PROP = {
  name: 'minRows',
  description: '멀티라인 입력의 최소 줄 수를 지정합니다.',
  values: ['숫자'],
  examples: [
    createTextExample({
      title: 'minRows 높이 예제',
      code: `<WiniText
  label="상세 설명"
  multiline
  minRows={4}
  placeholder="상세 설명을 입력하세요"
/>`,
      preview: (
        <WiniBox className="max-w-[420px]">
          <TextControlledPreview
            ui="column"
            label="상세 설명"
            multiline
            minRows={4}
            placeholder="상세 설명을 입력하세요"
            initialValue=""
          />
        </WiniBox>
      ),
    }),
  ],
};

const TEXT_TITLE_FIX_PROP = {
  name: 'titleFix',
  description: '`ui="row"`에서 라벨 폭을 고정해 입력 시작선을 맞춥니다.',
  values: ['true'],
  examples: [
    createTextExample({
      title: 'titleFix 정렬 예제',
      code: `<WiniGridLayout container rowSpacing={1}>
  <WiniGridItem>
    <WiniText ui="row" titleFix label="이름" placeholder="이름 입력" />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText ui="row" titleFix label="상세 주소" placeholder="상세 주소 입력" />
  </WiniGridItem>
</WiniGridLayout>`,
      preview: (
        <WiniGridLayout container rowSpacing={1} className="max-w-[420px]">
          <WiniGridItem>
            <TextControlledPreview
              ui="row"
              titleFix
              label="이름"
              placeholder="이름 입력"
              initialValue=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <TextControlledPreview
              ui="row"
              titleFix
              label="상세 주소"
              placeholder="상세 주소 입력"
              initialValue=""
            />
          </WiniGridItem>
        </WiniGridLayout>
      ),
    }),
  ],
};

const SECTIONS = [
  {
    key: 'ui_default',
    title: '기본 입력 (ui 미지정)',
    description: [
      '역할: 일반 단일 텍스트 입력 필드를 구성합니다.',
      '사용 상황: 가장 기본적인 입력 폼에서 이름/코드/제목 같은 문자열 입력에 사용합니다.',
      '사용 방법: 기본적으로 `label`로 입력 목적을 명확히 하고, 필요하면 `value`와 `onChange`를 연결해 제어형 입력으로 사용합니다.',
    ],
    requiredItems: ['`label`로 입력 목적을 명확히 지정'],
    optionalItems: ['제어형 입력은 `value`, `onChange` 연결', '`placeholder`로 보조 안내 문구 추가', '`size`/`variant`/`className`/`sx`로 화면 맞춤'],
    requiredProps: [
      TEXT_LABEL_PROP,
    ],
    optionalProps: [
      TEXT_PLACEHOLDER_PROP,
      TEXT_VALUE_PROP,
      TEXT_ON_CHANGE_PROP,
      TEXT_SIZE_PROP,
      TEXT_VARIANT_PROP,
      TEXT_CLASSNAME_PROP,
      TEXT_SX_PROP,
    ],
    code: `<WiniText
  label="이름"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
  },
  {
    key: 'ui_layout',
    title: 'ui 속성 (row / column)',
    description: [
      '역할: `ui` 속성으로 라벨과 입력창의 배치 방향을 제어합니다.',
      '사용 상황: 조회 조건처럼 가로 정렬이 필요한 폼과, 모바일/좁은 폭처럼 세로 정렬이 필요한 폼을 같은 컴포넌트에서 제어할 때 사용합니다.',
      '사용 방법: `ui="row"` 또는 `ui="column"` 중 하나를 지정합니다.',
    ],
    requiredItems: ['`label`로 필드 목적 표시'],
    optionalItems: ['`ui` 값: `row | column`', '`value`, `onChange`로 제어형 연결', '`row`에서는 `titleFix`로 라벨 폭 고정 가능', '`column`에서는 `multiline`, `minRows`와 조합하기 좋음'],
    requiredProps: [
      TEXT_LABEL_PROP,
    ],
    optionalProps: [
      TEXT_UI_PROP,
      TEXT_VALUE_PROP,
      TEXT_ON_CHANGE_PROP,
      TEXT_TITLE_FIX_PROP,
      TEXT_MULTILINE_PROP,
      TEXT_MIN_ROWS_PROP,
      TEXT_REQUIRED_PROP,
      TEXT_DISABLED_PROP,
      TEXT_READ_ONLY_PROP,
    ],
    code: `<WiniGridLayout container rowSpacing={2}>
  <WiniGridItem>
    <WiniText
      ui="row"
      label="이메일"
      placeholder="email@domain.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </WiniGridItem>

  <WiniGridItem>
    <WiniText
      ui="column"
      label="부서"
      placeholder="부서를 입력하세요"
      value={dept}
      onChange={(e) => setDept(e.target.value)}
    />
  </WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'size',
    title: 'size (small / medium / large)',
    description: [
      '역할: 입력 컴포넌트의 높이와 폰트 크기를 조절합니다.',
      '사용 상황: 페이지 밀도(좁은 리스트형/일반형/강조형)에 따라 입력 크기를 통일할 때 사용합니다.',
      '사용 방법: `size`에 `small`, `medium`, `large` 중 하나를 전달합니다.',
    ],
    requiredItems: [],
    optionalItems: ['`size` 값: `small | medium | large`', '폼별 기준 크기를 정해 일괄 적용'],
    requiredProps: [],
    optionalProps: [TEXT_SIZE_PROP],
    code: `<WiniGridLayout container columnSpacing={1} rowSpacing={1}>
  <WiniGridItem>
    <WiniText label="small" size="small" placeholder="small" />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText label="medium" size="medium" placeholder="medium" />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText label="large" size="large" placeholder="large" />
  </WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'variant',
    title: 'variant (outlined / filled / standard)',
    description: [
      '역할: 입력 테두리/배경 스타일을 바꿉니다.',
      '사용 상황: 화면 성격(기본/강조/단순)에 맞춰 폼 시각 톤을 맞출 때 사용합니다.',
      '사용 방법: `variant`를 지정하고 라벨 표시를 명확히 하려면 `slotProps.inputLabel.shrink`를 함께 사용합니다.',
    ],
    requiredItems: [],
    optionalItems: ['`variant` 값: `outlined | filled | standard`', '`slotProps={{ inputLabel: { shrink: true } }}`', '`sx`로 포커스/보더 스타일 세부 조정'],
    requiredProps: [],
    optionalProps: [
      TEXT_VARIANT_PROP,
      TEXT_INPUT_LABEL_SHRINK_PROP,
      TEXT_SX_PROP,
    ],
    code: `<WiniGridLayout container columnSpacing={1} rowSpacing={1}>
  <WiniGridItem>
    <WiniText
      label="outlined"
      variant="outlined"
      placeholder="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
    />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText
      label="filled"
      variant="filled"
      placeholder="filled"
      slotProps={{ inputLabel: { shrink: true } }}
    />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText
      label="standard"
      variant="standard"
      placeholder="standard"
      slotProps={{ inputLabel: { shrink: true } }}
    />
  </WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'state',
    title: '상태 props (required / readOnly / disabled)',
    description: [
      '역할: 입력 가능 여부와 검증 의도를 표현합니다.',
      '사용 상황: 필수값 강조, 조회 전용 필드, 비활성 필드를 구분할 때 사용합니다.',
      '사용 방법: 목적에 따라 `required`, `slotProps.input.readOnly`, `disabled`를 선택합니다.',
    ],
    requiredItems: [],
    optionalItems: ['필수 입력 강조 시 `required`', '읽기 전용은 `slotProps={{ input: { readOnly: true } }}`', '비활성 처리 시 `disabled`', '`value`를 고정해 상태 표현 강화', '`slotProps.inputLabel.shrink`로 라벨 겹침 방지'],
    requiredProps: [],
    optionalProps: [
      TEXT_REQUIRED_PROP,
      TEXT_READ_ONLY_PROP,
      TEXT_DISABLED_PROP,
      TEXT_VALUE_PROP,
      TEXT_INPUT_LABEL_SHRINK_PROP,
    ],
    code: `<WiniGridLayout container columnSpacing={1} rowSpacing={1}>
  <WiniGridItem>
    <WiniText required label="required" placeholder="필수 입력" />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText
      label="readOnly"
      value="읽기 전용 값"
      slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
    />
  </WiniGridItem>
  <WiniGridItem>
    <WiniText
      disabled
      label="disabled"
      value="비활성 값"
      slotProps={{ inputLabel: { shrink: true } }}
    />
  </WiniGridItem>
</WiniGridLayout>`,
  },
  {
    key: 'multiline',
    title: 'multiline + minRows',
    description: [
      '역할: 여러 줄 텍스트 입력(설명, 비고, 사유)을 받습니다.',
      '사용 상황: 게시글 본문, 상세 설명, 승인/반려 사유 입력 등에 사용합니다.',
      '사용 방법: `multiline`을 켜고 `minRows`로 최소 높이를 지정합니다.',
    ],
    requiredItems: [],
    optionalItems: ['`multiline`', '`label` 또는 `placeholder`', '`minRows`로 최소 줄 수 지정', '`ui="column"`과 조합해 가독성 향상'],
    requiredProps: [],
    optionalProps: [
      TEXT_MULTILINE_PROP,
      TEXT_LABEL_PROP,
      TEXT_PLACEHOLDER_PROP,
      TEXT_MIN_ROWS_PROP,
    ],
    code: `<WiniText
  ui="column"
  label="상세 설명"
  multiline
  minRows={4}
  placeholder="상세 설명을 입력하세요"
/>`,
  },
  {
    key: 'title_fix',
    title: 'titleFix (row 라벨 폭 고정)',
    description: [
      '역할: `ui="row"`에서 라벨 폭을 고정해 입력 시작선을 맞춥니다.',
      '사용 상황: 라벨 길이가 서로 다른 폼을 세로로 나열할 때 정렬 품질을 높입니다.',
      '사용 방법: `ui="row"`와 함께 `titleFix`를 지정합니다.',
    ],
    requiredItems: [],
    optionalItems: ['`ui="row"`와 함께 `titleFix` 사용', '`label`로 라벨 텍스트 지정', '동일 화면의 row 필드에 공통 적용'],
    requiredProps: [],
    optionalProps: [
      TEXT_TITLE_FIX_PROP,
      TEXT_LABEL_PROP,
    ],
    code: `<WiniText
  ui="row"
  titleFix
  label="고정 라벨"
  placeholder="titleFix 예시"
/>`,
  },
];

export default function CompWiniText() {
  return (
    <GuidePage
      title="WiniText"
      subtitle="WiniText 가이드"
      description="WiniText는 프로젝트 기본 입력 컴포넌트입니다. 이 가이드는 입력 레이아웃(ui), 스타일(variant/size), 상태 props, 멀티라인 입력까지 초보자 기준으로 바로 적용할 수 있도록 구성했습니다."
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
          code={item.code}
          hideSectionExample
        />
      ))}
    </GuidePage>
  );
}
