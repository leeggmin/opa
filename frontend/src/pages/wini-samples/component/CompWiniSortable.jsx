import React, { useState } from 'react';
import {
  WiniBox,
  WiniSortable,
  WiniSortableItem,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';
import { createGuideExample } from './utils/CompGuideExampleUtils';

const DEMO_ITEMS = [
  { id: 'item-1', label: 'ITEM01' },
  { id: 'item-2', label: 'ITEM02' },
  { id: 'item-3', label: 'ITEM03' },
  { id: 'item-4', label: 'ITEM04' },
];

const DEFAULT_ROW_CLASS = 'rounded';

/** 기본 예제: 핸들 드래그 + onChange */
const DemoBasic = () => {
  const [items, setItems] = useState(DEMO_ITEMS);

  return (
    <WiniBox ui="noAutoGap" className="">
      <WiniSortable items={items} onChange={setItems}>
        {(item) => (
          <WiniSortableItem id={item.id}>
            <WiniTypography>{item.label}</WiniTypography>
          </WiniSortableItem>
        )}
      </WiniSortable>
    </WiniBox>
  );
};

/** onMove 예제: 이동 정보를 직접 받아 처리 */
const DemoOnMove = () => {
  const [items, setItems] = useState(DEMO_ITEMS);
  const [message, setMessage] = useState('항목을 이동해 보세요.');

  const handleMove = (activeId, overId, { oldIndex, newIndex }) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);

      return next;
    });
    setMessage(`${activeId}: ${oldIndex + 1}번째 → ${newIndex + 1}번째`);
  };

  return (
    <WiniBox ui="noAutoGap" className="">
      <WiniSortable items={items} onMove={handleMove}>
        {(item) => (
          <WiniSortableItem id={item.id}>
            <WiniTypography>{item.label}</WiniTypography>
          </WiniSortableItem>
        )}
      </WiniSortable>
      <WiniTypography className="mt-2 text-slate-500">
        {message}
      </WiniTypography>
    </WiniBox>
  );
};

/** getItemId 예제: id 필드명이 다른 데이터 + 입력창 row */
const DemoGetItemId = () => {
  const [items, setItems] = useState([
    { evalId: 101, name: '위치 확인' },
    { evalId: 102, name: '인명 피해 확인' },
    { evalId: 103, name: '대피 안내' },
  ]);

  const handleChangeName = (evalId, name) =>
    setItems((prev) => prev.map((item) => (item.evalId === evalId ? { ...item, name } : item)));

  return (
    <WiniBox ui="noAutoGap" className="">
      <WiniSortable items={items} getItemId={(item) => item.evalId} onChange={setItems}>
        {(item) => (
          <WiniSortableItem id={item.evalId}>
            <WiniText
              value={item.name}
              className="flex-1"
              onChange={(event) => handleChangeName(item.evalId, event.target.value)}
            />
          </WiniSortableItem>
        )}
      </WiniSortable>
    </WiniBox>
  );
};

/** WiniSortableItem 옵션 예제 */
const DemoItemOption = ({ itemProps, sortableProps }) => {
  const [items, setItems] = useState(DEMO_ITEMS);

  return (
    <WiniBox ui="noAutoGap" className="">
      <WiniSortable items={items} onChange={setItems} {...sortableProps}>
        {(item) => (
          <WiniSortableItem id={item.id} {...itemProps}>
            <WiniTypography>{item.label}</WiniTypography>
          </WiniSortableItem>
        )}
      </WiniSortable>
    </WiniBox>
  );
};

/** handlePosition 예제: 아이콘을 오른쪽 끝에 배치 */
const DemoHandleRight = () => {
  const [items, setItems] = useState(DEMO_ITEMS);

  return (
    <WiniBox ui="noAutoGap" className="">
      <WiniSortable items={items} onChange={setItems}>
        {(item) => (
          <WiniSortableItem id={item.id} ui="line" handlePosition="right">
            <WiniTypography className="flex-1">{item.label}</WiniTypography>
          </WiniSortableItem>
        )}
      </WiniSortable>
    </WiniBox>
  );
};

const SORTABLE_ITEMS_PROP = {
  name: 'items',
  description:
    '정렬할 데이터 배열입니다. 화면에 보이는 순서와 같은 순서여야 하며, 각 항목은 목록 안에서 고유한 id를 가져야 합니다.',
  values: ['배열'],
  examples: [],
};

const SORTABLE_CHILDREN_PROP = {
  name: 'children',
  description:
    '각 항목을 그리는 함수입니다. `(item, index)`를 받아 `WiniSortableItem`을 반환합니다. `key`는 내부에서 붙이므로 따로 주지 않아도 됩니다.',
  values: ['(item, index) => ReactNode'],
  examples: [],
};

const SORTABLE_ON_CHANGE_PROP = {
  name: 'onChange',
  description:
    '순서가 바뀐 새 배열을 그대로 받습니다. 상태가 단순 배열이면 `setItems`를 바로 넘기면 됩니다.',
  values: ['(nextItems) => void'],
  examples: [
    createGuideExample({
      title: '기본 정렬 예제',
      code: `const [items, setItems] = useState(ITEMS);

<WiniSortable items={items} onChange={setItems}>
  {(item) => (
    <WiniSortableItem id={item.id}>
      <WiniTypography>{item.label}</WiniTypography>
    </WiniSortableItem>
  )}
</WiniSortable>`,
      preview: <DemoBasic />,
    }),
  ],
};

const SORTABLE_ON_MOVE_PROP = {
  name: 'onMove',
  description:
    '끌어온 항목 id, 놓은 위치의 항목 id, 이동 전후 index를 받습니다. 정렬 순서 값(`sortOrder`)을 다시 매기는 등 배열 교체 외의 처리가 필요할 때 `onChange` 대신 사용합니다.',
  values: ['(activeId, overId, { oldIndex, newIndex }) => void'],
  examples: [
    createGuideExample({
      title: 'onMove 예제',
      code: `const handleMove = (activeId, overId, { oldIndex, newIndex }) => {
  setItems((prev) => {
    const next = [...prev];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);

    return next;
  });
};

<WiniSortable items={items} onMove={handleMove}>
  {(item) => <WiniSortableItem id={item.id}>...</WiniSortableItem>}
</WiniSortable>`,
      preview: <DemoOnMove />,
    }),
  ],
};

const SORTABLE_GET_ITEM_ID_PROP = {
  name: 'getItemId',
  description:
    '항목에서 id를 꺼내는 함수입니다. 지정하지 않으면 `item.id`를 사용합니다. 여기서 반환한 값과 `WiniSortableItem`의 `id`가 같아야 합니다.',
  values: ['(item) => string | number'],
  examples: [
    createGuideExample({
      title: 'id 필드명이 다른 데이터 + 입력창 row 예제',
      code: `<WiniSortable items={items} getItemId={(item) => item.evalId} onChange={setItems}>
  {(item) => (
    <WiniSortableItem id={item.evalId}>
      <WiniText
        value={item.name}
        className="flex-1"
        onChange={(event) => handleChangeName(item.evalId, event.target.value)}
      />
    </WiniSortableItem>
  )}
</WiniSortable>`,
      preview: <DemoGetItemId />,
    }),
  ],
};

const SORTABLE_DIRECTION_PROP = {
  name: 'direction',
  description:
    '목록의 배열 방향입니다. `horizontal`이면 항목을 가로로 나란히 배치하고 좌우로만 이동합니다. 항목 사이 기본 간격도 위쪽 대신 왼쪽에 들어갑니다. 가로 목록은 한 줄 배치만 지원하며 줄바꿈(여러 줄)은 지원하지 않습니다.',
  values: ['vertical (기본)', 'horizontal'],
  examples: [
    createGuideExample({
      title: '가로 배열 예제',
      code: `<WiniSortable items={items} onChange={setItems} direction="horizontal">
  {(item) => (
    <WiniSortableItem id={item.id} ui="line">
      <WiniTypography>{item.label}</WiniTypography>
    </WiniSortableItem>
  )}
</WiniSortable>`,
      preview: (
        <DemoItemOption sortableProps={{ direction: 'horizontal' }} itemProps={{ ui: 'line' }} />
      ),
    }),
    createGuideExample({
      title: '가로 배열 + 항목 전체 드래그 예제',
      code: `<WiniSortable items={items} onChange={setItems} direction="horizontal">
  {(item) => (
    <WiniSortableItem id={item.id} ui="line" handle={false}>
      <WiniTypography>{item.label}</WiniTypography>
    </WiniSortableItem>
  )}
</WiniSortable>`,
      preview: (
        <DemoItemOption
          sortableProps={{ direction: 'horizontal' }}
          itemProps={{ ui: 'line', handle: false }}
        />
      ),
    }),
  ],
};

const SORTABLE_MODIFIERS_PROP = {
  name: 'modifiers',
  description:
    '드래그 이동 범위를 제한하는 dnd-kit modifier 배열입니다. 기본값은 목록 방향(세로 또는 가로) + 목록 영역 안으로 제한이며, 제한을 풀려면 빈 배열을 넘깁니다.',
  values: ['기본: 방향 축 제한 + restrictToParentElement', '[]'],
  examples: [
    createGuideExample({
      title: '이동 범위 제한 해제 예제',
      code: `<WiniSortable items={items} onChange={setItems} modifiers={[]}>
  ...
</WiniSortable>`,
      preview: <DemoItemOption sortableProps={{ modifiers: [] }} />,
    }),
  ],
};

const SORTABLE_DISABLED_PROP = {
  name: 'disabled',
  description:
    '`WiniSortable`에 주면 목록 전체, `WiniSortableItem`에 주면 해당 항목만 드래그할 수 없습니다.',
  values: ['true', 'false'],
  examples: [
    createGuideExample({
      title: '목록 전체 비활성 예제',
      code: `<WiniSortable items={items} onChange={setItems} disabled>
  {(item) => (
    <WiniSortableItem id={item.id} disabled>
      ...
    </WiniSortableItem>
  )}
</WiniSortable>`,
      preview: (
        <DemoItemOption sortableProps={{ disabled: true }} itemProps={{ disabled: true }} />
      ),
    }),
  ],
};

const ITEM_ID_PROP = {
  name: 'id',
  description:
    '항목의 고유 id입니다. `WiniSortable`의 `getItemId`가 반환하는 값과 같아야 합니다.',
  values: ['string', 'number'],
  examples: [],
};

const ITEM_HANDLE_PROP = {
  name: 'handle',
  description:
    '핸들 아이콘의 표시 여부입니다. `false`로 주면 아이콘 없이 row 전체가 드래그 영역이 됩니다.',
  values: ['true (기본)', 'false'],
  examples: [
    createGuideExample({
      title: '아이콘 없이 row 전체 드래그 예제',
      code: `<WiniSortableItem id={item.id} handle={false}>
  <WiniTypography>{item.label}</WiniTypography>
</WiniSortableItem>`,
      preview: <DemoItemOption itemProps={{ handle: false }} />,
    }),
  ],
};

const ITEM_DRAG_AREA_PROP = {
  name: 'dragArea',
  description:
    '아이콘이 있을 때 드래그가 시작되는 영역입니다. `handle`은 아이콘에서만, `row`는 아이콘은 그대로 두고 row 전체에서 드래그가 시작됩니다. row 안에 입력창이나 버튼이 있으면 `handle`을 사용합니다.',
  values: ['handle (기본)', 'row'],
  examples: [
    createGuideExample({
      title: '아이콘으로만 드래그 예제',
      code: `<WiniSortableItem id={item.id} dragArea="handle">
  <WiniTypography>{item.label}</WiniTypography>
</WiniSortableItem>`,
      preview: <DemoItemOption itemProps={{ dragArea: 'handle' }} />,
    }),
    createGuideExample({
      title: '아이콘 + row 전체 드래그 예제',
      code: `<WiniSortableItem id={item.id} dragArea="row">
  <WiniTypography>{item.label}</WiniTypography>
</WiniSortableItem>`,
      preview: <DemoItemOption itemProps={{ dragArea: 'row' }} />,
    }),
  ],
};

const ITEM_HANDLE_POSITION_PROP = {
  name: 'handlePosition',
  description:
    '핸들 아이콘의 위치입니다. `right`로 주면 아이콘이 내용 뒤(오른쪽)에 붙습니다. 오른쪽 끝에 붙이려면 내용에 `flex-1`을 줍니다.',
  values: ['left (기본)', 'right'],
  examples: [
    createGuideExample({
      title: '아이콘 오른쪽 배치 예제',
      code: `<WiniSortableItem id={item.id} ui="line" handlePosition="right">
  <WiniTypography className="flex-1">{item.label}</WiniTypography>
</WiniSortableItem>`,
      preview: <DemoHandleRight />,
    }),
  ],
};

const ITEM_HANDLE_STYLE_PROP = {
  name: 'handleIcon / handleTitle / handleClassName',
  description:
    '핸들의 아이콘(`WiniIcon`의 icon 이름), 마우스를 올렸을 때 문구, 추가 클래스를 지정합니다. 기본 아이콘은 `drag`입니다.',
  values: ['icon 이름', '문자열', 'className'],
  examples: [
    createGuideExample({
      title: '핸들 아이콘 / 스타일 변경 예제',
      code: `<WiniSortableItem
  id={item.id}
  handleIcon="drag"
  handleTitle="순서 이동"
  handleClassName="border-none"
>
  ...
</WiniSortableItem>`,
      preview: (
        <DemoItemOption
          itemProps={{
            handleIcon: 'drag',
            handleTitle: '순서 이동',
            handleClassName: 'border-none',
          }}
        />
      ),
    }),
  ],
};

const ITEM_UI_PROP = {
  name: 'ui',
  description:
    'row의 기본 모양을 지정합니다. `line`은 row 전체에 테두리·흰 배경·안쪽 여백을 주고, 핸들의 테두리는 없앱니다.',
  values: ['line'],
  examples: [
    createGuideExample({
      title: 'ui="line" 예제',
      code: `<WiniSortableItem id={item.id} ui="line">
  <WiniTypography>{item.label}</WiniTypography>
</WiniSortableItem>`,
      preview: <DemoItemOption itemProps={{ ui: 'line' }} />,
    }),
  ],
};

const ITEM_CLASS_NAME_PROP = {
  name: 'className',
  description:
    'row에 적용할 클래스입니다. row는 기본적으로 `flex items-center gap-2`이며 첫 번째를 제외한 항목 위쪽(가로 목록은 왼쪽)에 기본 간격(`size.margin.sm`)이 들어갑니다.',
  values: ['className'],
  examples: [],
};

const SECTIONS = [
  {
    key: 'sortable',
    title: 'WiniSortable',
    description: [
      '역할: 목록 항목을 드래그해서 순서를 바꿀 수 있는 정렬 영역을 만듭니다.',
      '사용 상황: 평가 항목, 메뉴 순서처럼 사용자가 정렬 순서를 직접 정해야 하는 목록에 사용합니다.',
      '사용 방법: `items`에 배열을 넘기고, children 함수에서 항목마다 `WiniSortableItem`을 반환합니다. 순서 변경은 `onChange` 또는 `onMove`로 받아 상태에 반영합니다. `WiniSortable` 하나가 하나의 정렬 영역이므로, 서로 섞이면 안 되는 목록은 `WiniSortable`을 따로 둡니다.',
    ],
    requiredItems: ['정렬할 배열 `items`', '항목을 그리는 children 함수', '`onChange` 또는 `onMove`'],
    optionalItems: [
      '`getItemId`로 id 필드 지정',
      '`direction="horizontal"`로 가로 배열',
      '`modifiers`로 이동 범위 변경',
      '`disabled`로 드래그 비활성',
    ],
    requiredProps: [SORTABLE_ITEMS_PROP, SORTABLE_CHILDREN_PROP, SORTABLE_ON_CHANGE_PROP],
    optionalProps: [
      SORTABLE_ON_MOVE_PROP,
      SORTABLE_GET_ITEM_ID_PROP,
      SORTABLE_DIRECTION_PROP,
      SORTABLE_MODIFIERS_PROP,
      SORTABLE_DISABLED_PROP,
    ],
  },
  {
    key: 'sortable-item',
    title: 'WiniSortableItem',
    description: [
      '역할: 정렬 목록의 row 하나입니다. 드래그 핸들과 드래그 중 표시(반투명)를 기본으로 제공합니다.',
      '사용 상황: 반드시 `WiniSortable`의 children 함수 안에서 사용합니다.',
      '사용 방법: `id`를 지정하고 row에 들어갈 내용을 children으로 넣습니다. 그 외 prop은 `WiniBox`로 전달됩니다.',
    ],
    requiredItems: ['항목 `id`'],
    optionalItems: [
      '`ui="line"`으로 라인박스 모양 지정',
      '`dragArea`로 드래그 시작 영역 지정 (아이콘만 / row 전체)',
      '`handle={false}`로 아이콘 없이 row 전체 드래그',
      '`handlePosition="right"`로 아이콘을 오른쪽에 배치',
      '`handleIcon`, `handleTitle`, `handleClassName`으로 핸들 변경',
      '`className`으로 row 스타일 지정',
      '`disabled`로 해당 항목 드래그 비활성',
    ],
    requiredProps: [ITEM_ID_PROP],
    optionalProps: [
      ITEM_UI_PROP,
      ITEM_DRAG_AREA_PROP,
      ITEM_HANDLE_PROP,
      ITEM_HANDLE_POSITION_PROP,
      ITEM_HANDLE_STYLE_PROP,
      ITEM_CLASS_NAME_PROP,
    ],
  },
];

export default function CompWiniSortable() {
  return (
    <GuidePage
      title="WiniSortable"
      subtitle="WiniSortable 가이드"
      description="WiniSortable은 목록 항목을 드래그해서 순서를 바꾸는 컴포넌트입니다. `WiniSortable`로 목록을 감싸고 항목마다 `WiniSortableItem`을 사용합니다. 내부적으로 `@dnd-kit`을 사용합니다."
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
