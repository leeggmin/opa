import React, { useState } from 'react';
import {
  WiniTreeCheckItem,
  WiniTreeItem,
  WiniTreeView,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

const BASE_TREE_DATA = [
  {
    id: '1',
    name: 'Applications',
    chk: false,
    children: [
      { id: '1-1', name: 'Calendar', menuType: 'MENU', chk: false },
      { id: '1-2', name: 'Mail', menuType: 'MENU', chk: true },
    ],
  },
  {
    id: '2',
    name: 'Documents',
    chk: false,
    children: [
      { id: '2-1', name: 'Projects', chk: false },
      { id: '2-2', name: 'Reports', chk: false },
    ],
  },
];

const SECTIONS = [
  {
    key: 'tree_item',
    title: 'WiniTreeView + WiniTreeItem',
    description: [
      '역할: 계층형 데이터를 드래그/펼침 가능한 기본 트리 구조로 렌더링합니다.',
      '사용 상황: 메뉴 구조, 조직도, 카테고리 트리처럼 부모-자식 관계가 있는 데이터를 표시할 때 사용합니다.',
      '사용 방법: `WiniTreeView`에 `winiData`, `onChange`, 높이를 주고 render prop으로 `WiniTreeItem`을 반환합니다.',
    ],
    requiredItems: [
      '`winiData` 트리 데이터',
      '`onChange`',
      'render prop 내부의 `WiniTreeItem`',
    ],
    optionalItems: [
      '`height`로 트리 높이 지정',
      '`disableDrag={false}`로 드래그 허용',
      '`leaf` 기준으로 리프 아이콘 분기',
    ],
    requiredProps: [
      {
        name: 'winiData',
        description:
          '트리에 표시할 원본 계층 데이터입니다. 각 노드는 최소 `id`, 표시용 이름 필드를 가져야 합니다.',
      },
      {
        name: 'render prop',
        description:
          '`WiniTreeView` 자식 함수에서 각 노드를 어떤 컴포넌트로 렌더링할지 지정합니다. 기본 트리에서는 `WiniTreeItem`을 반환합니다.',
      },
    ],
    optionalProps: [
      {
        name: 'onChange',
        description:
          '노드 이동이나 구조 변경 이후 최신 데이터를 상위 상태에 반영합니다.',
      },
      {
        name: 'height',
        description: '트리 영역의 높이를 지정합니다.',
      },
      {
        name: 'disableDrag',
        description: '`false`로 두면 노드 드래그 이동이 가능해집니다.',
      },
      {
        name: 'leaf',
        description:
          '특정 필드값을 기준으로 폴더/문서 아이콘 분기를 세부 제어합니다.',
      },
    ],
    code: `<WiniTreeView
  winiData={treeData}
  height={260}
  disableDrag={false}
  onChange={(newData) => setTreeData(newData)}
>
  {(props) => (
    <WiniTreeItem
      {...props}
      leaf={{ column: 'menuType', value: 'MENU' }}
    />
  )}
</WiniTreeView>`,
  },
  {
    key: 'tree_check_item',
    title: 'WiniTreeView + WiniTreeCheckItem',
    description: [
      '역할: 각 노드에 체크박스를 붙여 선택 상태를 함께 관리하는 트리를 구성합니다.',
      '사용 상황: 권한 메뉴 선택, 다중 카테고리 선택, 트리 구조 기반 일괄 선택 화면에 사용합니다.',
      '사용 방법: `WiniTreeCheckItem`에 체크 필드명과 체크 변경 핸들러를 연결합니다.',
    ],
    requiredItems: ['`winiData`', '`onChange`', '`field`', '`toggleCheck`'],
    optionalItems: [
      '`name`으로 노드 표시 필드 변경',
      '`disableDrag`로 드래그 허용/차단',
    ],
    requiredProps: [
      {
        name: 'winiData',
        description:
          '체크 상태를 포함한 트리 데이터입니다. 예시처럼 `chk` 필드를 함께 두는 방식이 일반적입니다.',
      },
      {
        name: 'field',
        description: '체크 상태를 읽고 쓸 데이터 필드명입니다.',
        example: '`field="chk"`',
      },
      {
        name: 'toggleCheck',
        description: '체크 변경 시 상위 상태를 갱신하는 함수입니다.',
      },
      {
        name: 'render prop',
        description:
          '`WiniTreeView` 자식 함수에서 `WiniTreeCheckItem`을 반환해 체크 UI를 붙입니다.',
      },
    ],
    optionalProps: [
      {
        name: 'name',
        description: '노드에 표시할 텍스트 필드명을 바꿀 때 사용합니다.',
        example: '`name="name"`',
      },
      {
        name: 'disableDrag',
        description:
          '권한 트리처럼 드래그가 필요 없는 경우 `true`로 막을 수 있습니다.',
      },
    ],
    code: `<WiniTreeView
  winiData={treeCheckData}
  height={260}
  disableDrag={false}
  onChange={(newData) => setTreeCheckData(newData)}
>
  {(props) => (
    <WiniTreeCheckItem
      {...props}
      name="name"
      field="chk"
      toggleCheck={toggleNodeCheck}
    />
  )}
</WiniTreeView>`,
  },
];

const updateCheckRecursive = (nodes, targetId, checked) =>
  nodes.map((node) => {
    if (node.id === targetId) {
      return { ...node, chk: checked };
    }
    if (node.children) {
      return {
        ...node,
        children: updateCheckRecursive(node.children, targetId, checked),
      };
    }
    return node;
  });

export default function CompWiniTreeView() {
  const [treeData, setTreeData] = useState(BASE_TREE_DATA);
  const [treeCheckData, setTreeCheckData] = useState(BASE_TREE_DATA);

  const toggleNodeCheck = (nodeId, checked) => {
    setTreeCheckData((prev) => updateCheckRecursive(prev, nodeId, checked));
  };

  const renderPreview = (key) => {
    if (key === 'tree_item') {
      return (
        <WiniTreeView
          winiData={treeData}
          height={260}
          disableDrag={false}
          onChange={(newData) => setTreeData(newData)}
        >
          {(props) => (
            <WiniTreeItem
              {...props}
              leaf={{ column: 'menuType', value: 'MENU' }}
            />
          )}
        </WiniTreeView>
      );
    }

    return (
      <WiniTreeView
        winiData={treeCheckData}
        height={260}
        disableDrag={false}
        onChange={(newData) => setTreeCheckData(newData)}
      >
        {(props) => (
          <WiniTreeCheckItem
            {...props}
            name="name"
            field="chk"
            toggleCheck={toggleNodeCheck}
          />
        )}
      </WiniTreeView>
    );
  };

  return (
    <GuidePage
      title="WiniTreeView"
      subtitle="WiniTreeView 가이드"
      description="이 페이지에서는 `WiniTreeView`, `WiniTreeItem`, `WiniTreeCheckItem`을 한 곳에서 함께 확인할 수 있습니다."
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
          preview={renderPreview(item.key)}
          code={item.code}
        />
      ))}
    </GuidePage>
  );
}
