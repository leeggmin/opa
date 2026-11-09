import React from 'react';
import {
  WiniBox,
  WiniList,
  WiniListItem,
  WiniListItemIcon,
  WiniListItemText,
  WiniListSubheader,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

const SECTIONS = [
  {
    key: 'list_type',
    title: 'WiniList - listType',
    description: [
      '역할: 리스트 목적에 맞게 메뉴형, 텍스트형, 파일형 스타일을 선택합니다.',
      '사용 상황: 좌측 메뉴, 안내 문구 목록, 첨부파일 목록처럼 같은 리스트라도 표현 방식이 다른 화면에 사용합니다.',
      '사용 방법: `WiniList`에 `listType`을 지정하고 내부에 `WiniListItem`과 `WiniListItemText`를 배치합니다.',
    ],
    requiredItems: [
      '`listType`',
      '`WiniListItem` 자식',
      '아이템 텍스트용 `WiniListItemText`',
    ],
    optionalItems: ['`ui`로 depth 스타일 추가', '`className`/`sx`로 여백 보정'],
    requiredProps: [
      {
        name: 'WiniListItem',
        description: '`WiniList` 안에 배치되는 실제 리스트 행 컴포넌트입니다.',
      },
      {
        name: 'WiniListItemText primary',
        description: '각 아이템에 보여줄 기본 텍스트입니다.',
      },
    ],
    optionalProps: [
      {
        name: 'listType',
        description:
          '리스트 성격을 결정합니다. `menu`, `text`, `file` 중 하나를 사용합니다.',
      },
      {
        name: 'ui',
        description:
          '텍스트 리스트에서 `dep_02`, `dep_03` 같은 depth 스타일을 추가할 때 사용합니다.',
      },
      {
        name: 'className / sx',
        description:
          '리스트 전체 여백, 폭, 배경을 페이지 맥락에 맞게 조정합니다.',
      },
    ],
    code: `<WiniList listType="menu">
  <WiniListItem><WiniListItemText primary="Menu Item" /></WiniListItem>
</WiniList>

<WiniList listType="text">
  <WiniListItem ui="dot"><WiniListItemText primary="Text Item" /></WiniListItem>
</WiniList>

<WiniList listType="file">
  <WiniListItem><WiniListItemText primary="report.pdf" /></WiniListItem>
</WiniList>`,
  },
  {
    key: 'menu_composition',
    title: '메뉴 구성 가이드 (권장)',
    description: [
      '역할: 메뉴 구조를 JSX 하드코딩 대신 데이터 기반으로 관리해 확장성과 유지보수성을 높입니다.',
      '사용 상황: 2뎁스/3뎁스 메뉴가 계속 추가되는 샘플 페이지나 관리자 메뉴 화면에서 특히 유용합니다.',
      '사용 방법: 메뉴 데이터를 배열로 선언하고, `id`, `label`, `items`를 기준으로 `WiniList`를 반복 렌더링합니다.',
    ],
    requiredItems: [
      '상위/하위 메뉴를 구분하는 고유 `id`',
      '화면 표시용 `label` 또는 `title`',
      '하위 아이템 배열 `items`',
    ],
    optionalItems: [
      'open 상태 관리용 `openDepth1`, `openDepth2`',
      '신규 메뉴 추가 시 데이터 배열만 수정',
    ],
    requiredProps: [
      {
        name: 'section.id / group.id',
        description:
          '메뉴 depth를 식별하고 open 상태를 관리하기 위한 고유 키입니다.',
      },
      {
        name: 'label / title',
        description: '화면에 표시할 메뉴명입니다.',
      },
      {
        name: 'items',
        description:
          '마지막 depth 메뉴 항목 배열입니다. 각 항목은 최소 `key`, `label`을 가집니다.',
      },
    ],
    optionalProps: [
      {
        name: 'openDepth1 / openDepth2',
        description: '펼침 상태를 depth별로 저장하는 객체 상태입니다.',
      },
      {
        name: 'handleDepth1Toggle / handleDepth2Toggle',
        description: '각 뎁스 메뉴의 열림/닫힘을 제어하는 핸들러입니다.',
      },
      {
        name: 'changeView',
        description: '최종 메뉴 클릭 시 실제 화면 전환을 연결하는 함수입니다.',
      },
    ],
    code: `// 1) 메뉴 데이터 선언 (신규 메뉴 추가 시 이 배열만 수정)
const snippetMenuGroups = [
  {
    id: 'search',
    title: '검색폼',
    items: [
      { key: 'SnippetSearch', label: '검색폼' },
      { key: 'SearchGrid', label: '검색폼 + 그리드' },
    ],
  },
];

const collapsibleMenuSections = [
  { id: 'menu-1', label: '스니펫', groups: snippetMenuGroups },
  // { id: 'menu-2', label: '개별 컴포넌트', groups: compMenuGroups },
];

// 2) 공통 렌더 함수 (openDepth/id/key 자동 계산)
const renderDepthGroupMenu = (parentId, groups) => (
  <WiniList id={parentId} ui="dep_02">
    {groups.map((group) => {
      const depth2Id = \`\${parentId}-\${group.id}\`;
      const isDepth2Open =
        !!openDepth1?.[parentId] && !!openDepth2?.[parentId]?.[depth2Id];

      return (
        <WiniListItem key={depth2Id}>
          <WiniListItemText>
            <WiniButton onClick={() => handleDepth2Toggle(parentId, depth2Id)}>
              {group.title}
            </WiniButton>
            <WiniCollapse in={isDepth2Open} mountOnEnter unmountOnExit>
              <WiniList id={depth2Id} ui="dep_03">
                {group.items.map((item) => (
                  <WiniListItem key={item.key}>
                    <WiniButton onClick={(e) => changeView(e, item.key)}>
                      {item.label}
                    </WiniButton>
                  </WiniListItem>
                ))}
              </WiniList>
            </WiniCollapse>
          </WiniListItemText>
        </WiniListItem>
      );
    })}
  </WiniList>
);

// 3) 1차 메뉴 렌더
{collapsibleMenuSections.map((section) => (
  <WiniListItem key={section.id}>
    <WiniListItemText>
      <WiniButton onClick={() => handleDepth1Toggle(section.id)}>
        {section.label}
      </WiniButton>
      <WiniCollapse in={!!openDepth1?.[section.id]} mountOnEnter unmountOnExit>
        {renderDepthGroupMenu(section.id, section.groups)}
      </WiniCollapse>
    </WiniListItemText>
  </WiniListItem>
))}

// 참고: 기존 수동 JSX 메뉴도 그대로 유지/병행 가능합니다.`,
  },
  {
    key: 'list_subheader',
    title: 'WiniListSubheader',
    description: [
      '역할: 리스트 그룹 제목을 depth에 맞는 스타일로 표시합니다.',
      '사용 상황: 안내 리스트를 장/절 구조로 나누거나 메뉴 그룹 제목을 보여줄 때 사용합니다.',
      '사용 방법: `WiniListSubheader`에 제목 텍스트를 넣고 필요하면 `ui`로 depth 스타일을 바꿉니다.',
    ],
    requiredItems: ['제목 텍스트(`children`)'],
    optionalItems: ['`ui="dep_02" | "dep_03"`로 뎁스 강조 변경'],
    requiredProps: [
      {
        name: 'WiniListSubheader 텍스트',
        description: '서브헤더에 표시할 제목 문자열입니다.',
      },
    ],
    optionalProps: [
      {
        name: 'ui',
        description:
          '기본, `dep_02`, `dep_03` 중 하나를 사용해 depth 스타일을 맞춥니다.',
      },
      {
        name: 'sx',
        description: '제목 여백이나 색상을 화면별로 보정할 때 사용합니다.',
      },
    ],
    code: `<WiniList listType="text">
  <WiniListSubheader ui="">Depth 1</WiniListSubheader>
</WiniList>
<WiniList listType="text" ui="dep_02">
  <WiniListSubheader ui="dep_02">Depth 2</WiniListSubheader>
</WiniList>
<WiniList listType="text" ui="dep_03">
  <WiniListSubheader ui="dep_03">Depth 3</WiniListSubheader>
</WiniList>`,
  },
  {
    key: 'list_item_ui',
    title: 'WiniListItem 마커 ui',
    description: [
      '역할: 텍스트 리스트 항목 앞의 마커 모양을 목적에 맞게 바꿉니다.',
      '사용 상황: 일반 안내 문구, 단계형 설명, 번호형 약관 목록처럼 리스트 의미를 마커로 구분할 때 사용합니다.',
      '사용 방법: `WiniList listType="text"` 안에서 `WiniListItem`의 `ui`에 마커 토큰을 지정합니다.',
    ],
    requiredItems: [
      '`WiniList listType="text"`',
      '`WiniListItem ui`',
      '`WiniListItemText primary`',
    ],
    optionalItems: [
      '상위 `WiniList ui="dep_02" | "dep_03"`와 조합',
      '마커별 depth 스타일 혼용',
    ],
    requiredProps: [
      {
        name: 'WiniListItemText primary',
        description: '리스트 항목 본문 텍스트입니다.',
      },
    ],
    optionalProps: [
      {
        name: 'listType="text"',
        description:
          '마커형 텍스트 리스트 스타일을 사용하기 위한 전제 조건입니다.',
      },
      {
        name: 'WiniListItem ui',
        description:
          '`dot`, `bar`, `demical`, `lower_alpha` 중 하나를 지정해 마커 형태를 결정합니다.',
      },
      {
        name: 'WiniList ui',
        description:
          '`dep_02`, `dep_03`와 같이 상위 리스트 depth를 함께 지정해 계층감을 줄 수 있습니다.',
      },
    ],
    code: `<WiniTypography variant="span" className="block mb-2">기본</WiniTypography>
<WiniList listType="text">
  <WiniListItem ui="dot"><WiniListItemText primary="기본 depth - dot" /></WiniListItem>
  <WiniListItem ui="bar"><WiniListItemText primary="기본 depth - bar" /></WiniListItem>
</WiniList>

<WiniTypography variant="span" className="block mb-2 mt-4">dep_02</WiniTypography>
<WiniList listType="text" ui="dep_02">
  <WiniListItem ui="demical"><WiniListItemText primary="dep_02 - demical" /></WiniListItem>
  <WiniListItem ui="lower_alpha"><WiniListItemText primary="dep_02 - lower_alpha" /></WiniListItem>
</WiniList>

<WiniTypography variant="span" className="block mb-2 mt-4">dep_03</WiniTypography>
<WiniList listType="text" ui="dep_03">
  <WiniListItem ui="demical"><WiniListItemText primary="dep_03 - demical" /></WiniListItem>
  <WiniListItem ui="lower_alpha"><WiniListItemText primary="dep_03 - lower_alpha" /></WiniListItem>
</WiniList>`,
  },
  {
    key: 'list_item_icon_text',
    title: 'WiniListItemIcon / WiniListItemText',
    description: [
      '역할: 리스트 아이템 안에서 아이콘 슬롯과 텍스트 슬롯을 분리해 조합합니다.',
      '사용 상황: 첨부파일, 다운로드 목록, 강조 안내처럼 아이콘과 텍스트를 함께 보여줘야 하는 항목에 사용합니다.',
      '사용 방법: `WiniListItem` 안에 `WiniListItemIcon`과 `WiniListItemText`를 순서대로 배치합니다.',
    ],
    requiredItems: [
      '`WiniListItemText`',
      '텍스트 또는 아이콘 슬롯을 담을 `WiniListItem`',
    ],
    optionalItems: [
      '`WiniListItemIcon`으로 아이콘 영역 추가',
      '`ui` 마커와 함께 혼합 사용 가능',
    ],
    requiredProps: [
      {
        name: 'WiniListItemText primary',
        description: '아이템 본문 텍스트를 지정합니다.',
      },
      {
        name: 'WiniListItem',
        description:
          '`WiniListItemIcon`과 `WiniListItemText`를 감싸는 기본 행 컴포넌트입니다.',
      },
    ],
    optionalProps: [
      {
        name: 'WiniListItemIcon',
        description: '실제 아이콘 노드나 커스텀 슬롯을 넣는 선택 영역입니다.',
      },
      {
        name: 'WiniListItem ui',
        description:
          '텍스트 리스트에서는 `bar` 같은 마커 ui와 같이 사용할 수 있습니다.',
      },
    ],
    code: `<WiniList listType="text">
  <WiniListItem ui="bar">
    <WiniListItemIcon />
    <WiniListItemText primary="Item with icon slot" />
  </WiniListItem>
</WiniList>`,
  },
];

const renderPreview = (key) => {
  if (key === 'list_type') {
    return (
      <>
        <WiniTypography variant="span" className="block mb-2">
          menu
        </WiniTypography>
        <WiniList listType="menu">
          <WiniListItem>
            <WiniListItemText primary="Menu Item" />
          </WiniListItem>
        </WiniList>
        <WiniTypography variant="span" className="block mb-2 mt-4">
          text
        </WiniTypography>
        <WiniList listType="text">
          <WiniListItem ui="dot">
            <WiniListItemText primary="Text Item" />
          </WiniListItem>
        </WiniList>
        <WiniTypography variant="span" className="block mb-2 mt-4">
          file
        </WiniTypography>
        <WiniList listType="file">
          <WiniListItem>
            <WiniListItemText primary="report.pdf" />
          </WiniListItem>
        </WiniList>
      </>
    );
  }

  if (key === 'list_subheader') {
    return (
      <>
        <WiniList listType="text">
          <WiniListSubheader ui="">Depth 1</WiniListSubheader>
        </WiniList>
        <WiniList listType="text" ui="dep_02">
          <WiniListSubheader ui="dep_02">Depth 2</WiniListSubheader>
        </WiniList>
        <WiniList listType="text" ui="dep_03">
          <WiniListSubheader ui="dep_03">Depth 3</WiniListSubheader>
        </WiniList>
      </>
    );
  }

  if (key === 'menu_composition') {
    return (
      <WiniBox ui="info">
        <WiniTypography variant="span" className="text-md">
          기존 수동 JSX 메뉴 코드는 그대로 유지할 수 있습니다. 신규 메뉴부터는
          `collapsibleMenuSections` / `...MenuGroups` 데이터만 추가하는 방식을
          권장합니다.
        </WiniTypography>
      </WiniBox>
    );
  }

  if (key === 'list_item_ui') {
    return (
      <>
        <WiniTypography variant="span" className="block mb-2">
          기본
        </WiniTypography>
        <WiniList listType="text">
          <WiniListItem ui="dot">
            <WiniListItemText primary="기본 depth - dot" />
          </WiniListItem>
          <WiniListItem ui="bar">
            <WiniListItemText primary="기본 depth - bar" />
          </WiniListItem>
        </WiniList>

        <WiniTypography variant="span" className="block mb-2 mt-4">
          dep_02
        </WiniTypography>
        <WiniList listType="text" ui="dep_02">
          <WiniListItem ui="demical">
            <WiniListItemText primary="dep_02 - demical" />
          </WiniListItem>
          <WiniListItem ui="lower_alpha">
            <WiniListItemText primary="dep_02 - lower_alpha" />
          </WiniListItem>
        </WiniList>

        <WiniTypography variant="span" className="block mb-2 mt-4">
          dep_03
        </WiniTypography>
        <WiniList listType="text" ui="dep_03">
          <WiniListItem ui="demical">
            <WiniListItemText primary="dep_03 - demical" />
          </WiniListItem>
          <WiniListItem ui="lower_alpha">
            <WiniListItemText primary="dep_03 - lower_alpha" />
          </WiniListItem>
        </WiniList>
      </>
    );
  }

  return (
    <WiniList listType="text">
      <WiniListItem ui="bar">
        <WiniListItemIcon />
        <WiniListItemText primary="Item with icon slot" />
      </WiniListItem>
    </WiniList>
  );
};

export default function CompWiniList() {
  return (
    <GuidePage
      title="WiniList"
      subtitle="WiniList 가이드"
      description="이 페이지에서는 `WiniList`, `WiniListItem`, `WiniListItemIcon`, `WiniListItemText`, `WiniListSubheader`를 한 카테고리로 묶어 안내합니다."
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
