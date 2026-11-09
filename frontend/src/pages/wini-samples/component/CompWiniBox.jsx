import React from 'react';
import {
  WiniBox,
  WiniButton,
  WiniGridItem,
  WiniGridLayout,
  WiniMenuItem,
  WiniSelect,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from '@/pages/wini-samples/component/CompGuideCommon';

const SECTIONS = [
  {
    key: 'info',
    title: 'ui="info" 안내 박스',
    description: [
      '역할: 사용자에게 안내/주의/검증 메시지를 강조해서 보여주는 박스입니다.',
      '사용 상황: 저장 전 확인 문구, 필수 입력 안내, 공지/정책 문구에 사용합니다.',
      '사용 방법: `ui="info"`를 지정하고 내부에 텍스트 또는 컴포넌트를 배치합니다.',
    ],
    requiredItems: ['`ui="info"`', '메시지 콘텐츠(텍스트/노드)'],
    optionalItems: [
      '`className`/`sx`로 여백 및 색상 보정',
      '아이콘/링크와 함께 배치',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '안내/알림 박스 스타일을 적용하는 속성입니다.',
        values: ['info'],
      },
      {
        name: 'className / sx',
        description: '여백, 배경, 색상 등을 화면에 맞게 보정합니다.',
      },
    ],
    code: `<WiniBox ui="info">
  <WiniTypography variant="span">
    저장 전에 입력값을 다시 확인해 주세요.
  </WiniTypography>
</WiniBox>`,
  },
  {
    key: 'form',
    title: 'ui="form" 폼 컨테이너',
    description: [
      '역할: 입력 필드 묶음을 하나의 폼 영역으로 감싸고 공통 여백/배경을 제공합니다.',
      '사용 상황: 등록/수정 화면, 상세 정보 입력 섹션, 팝업 입력 폼에 사용합니다.',
      '사용 방법: 내부에 `WiniGridLayout` + 입력 컴포넌트를 배치합니다.',
    ],
    requiredItems: ['`ui="form"`', '내부 입력 필드 컴포넌트'],
    optionalItems: [
      '`WiniGridLayout`의 `rowSpacing`, `columnSpacing`',
      '`rowItem`으로 기본 분할 개수 제어',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '입력 필드 묶음을 감싸는 폼 컨테이너 스타일을 적용합니다.',
        values: ['form'],
      },
      {
        name: 'WiniGridLayout rowSpacing',
        description:
          '행 간격을 조절합니다. `ui="form"`과 함께 가장 자주 쓰는 보조 속성입니다.',
      },
      {
        name: 'WiniGridLayout columnSpacing',
        description:
          '열 간격을 조절합니다. 입력 필드 간 좌우 간격을 맞출 때 사용합니다.',
      },
      {
        name: 'WiniGridLayout rowItem',
        description: '한 줄에 배치할 기본 열 개수를 제어합니다.',
      },
    ],
    code: `<WiniBox ui="form">
  <WiniGridLayout container ui="form" rowSpacing={1} columnSpacing={1} rowItem={2}>
    <WiniGridItem>
      <WiniText ui="column" label="이름" placeholder="이름 입력" />
    </WiniGridItem>
    <WiniGridItem>
      <WiniSelect ui="column" label="권한" defaultValue="user">
        <WiniMenuItem value="user">User</WiniMenuItem>
        <WiniMenuItem value="admin">Admin</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>
  </WiniGridLayout>
</WiniBox>`,
  },
  {
    key: 'search',
    title: 'ui="search" 검색 영역',
    description: [
      '역할: 검색 조건 폼과 액션 버튼(조회/초기화)을 한 영역으로 구성합니다.',
      '사용 상황: 목록 상단 검색 바, 필터 섹션, 조건 검색 패널에 사용합니다.',
      '사용 방법: 좌측 조건 폼(`WiniGridLayout`) + 우측 버튼 그룹(`btnitem`) 구조로 배치합니다.',
    ],
    requiredItems: ['`ui="search"`', '검색 조건 입력 필드', '조회 액션 버튼'],
    optionalItems: [
      '초기화/엑셀 다운로드 등 추가 버튼',
      '`className`으로 폭 비율(`flex-1`) 조정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description:
          '검색 조건 폼과 버튼 영역을 한 줄로 묶는 검색 영역 전용 스타일입니다.',
        values: ['search'],
      },
      {
        name: 'WiniGridLayout rowSpacing',
        description: '검색 조건 폼 내부 행 간격을 조절합니다.',
      },
      {
        name: 'WiniGridLayout columnSpacing',
        description: '검색 조건 폼 내부 열 간격을 조절합니다.',
      },
      {
        name: 'WiniGridLayout rowItem',
        description: '검색 조건을 한 줄에 몇 개씩 배치할지 정합니다.',
      },
      {
        name: 'WiniGridLayout className',
        description:
          '예시처럼 `flex-1`을 줘서 검색 조건 폼이 남는 폭을 채우게 할 수 있습니다.',
      },
    ],
    code: `<WiniBox ui="search">
  <WiniGridLayout container ui="form" rowSpacing={1} columnSpacing={1} rowItem={2} className="flex-1">
    <WiniGridItem>
      <WiniText ui="column" label="검색어" placeholder="검색어 입력" />
    </WiniGridItem>
    <WiniGridItem>
      <WiniSelect ui="column" label="상태" defaultValue="all">
        <WiniMenuItem value="all">전체</WiniMenuItem>
        <WiniMenuItem value="Y">사용</WiniMenuItem>
        <WiniMenuItem value="N">미사용</WiniMenuItem>
      </WiniSelect>
    </WiniGridItem>
  </WiniGridLayout>
  <WiniBox ui="btnitem">
    <WiniButton ui="line">초기화</WiniButton>
    <WiniButton ui="default">조회</WiniButton>
  </WiniBox>
</WiniBox>`,
  },
  {
    key: 'line',
    title: 'ui="line" 구분 박스',
    description: [
      '역할: 콘텐츠 섹션을 테두리로 구분해 시각적인 영역 분리를 제공합니다.',
      '사용 상황: 상세 정보 그룹, 단계별 설정 블록, 가이드 단락 구분에 사용합니다.',
      '사용 방법: `ui="line"` 박스 내부에 텍스트/폼/리스트를 배치합니다.',
    ],
    requiredItems: ['`ui="line"`', '구분할 콘텐츠'],
    optionalItems: [
      '섹션 제목(`WiniTypography`) 추가',
      '`className`으로 패딩/간격 조정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '테두리 기반 구분 박스 스타일을 적용합니다.',
        values: ['line'],
      },
      {
        name: 'className / sx',
        description: '패딩, 마진, 높이 등을 세부 조정합니다.',
      },
    ],
    code: `<WiniBox ui="line">
  <WiniTypography variant="span">
    line ui는 섹션을 구분할 때 사용합니다.
  </WiniTypography>
</WiniBox>`,
  },
  {
    key: 'btnbox',
    title: 'ui="btnbox" 버튼 그룹 컨테이너',
    description: [
      '역할: 좌/우 정렬된 버튼 그룹을 한 줄에서 관리합니다.',
      '사용 상황: 하단 액션 바(삭제/취소/저장), 목록/폼 공통 액션 영역에 사용합니다.',
      '사용 방법: 내부를 다시 `ui="btnitem"` 그룹으로 나눠 버튼 묶음을 배치합니다.',
    ],
    requiredItems: ['`ui="btnbox"`', '내부 버튼 그룹(`ui="btnitem"`)'],
    optionalItems: [
      '좌측 위험 액션(삭제) + 우측 일반 액션 조합',
      '버튼 수가 많을 때 wrap 자동 처리',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '좌우 그룹 분리가 가능한 버튼 바 레이아웃을 적용합니다.',
        values: ['btnbox'],
      },
      {
        name: '내부 WiniBox ui',
        description:
          '보통 내부에 `ui="btnitem"` 박스를 두어 좌측/우측 버튼 묶음을 나눕니다.',
      },
    ],
    code: `<WiniBox ui="btnbox">
  <WiniBox ui="btnitem">
    <WiniButton ui="delete">삭제</WiniButton>
  </WiniBox>
  <WiniBox ui="btnitem">
    <WiniButton ui="line">취소</WiniButton>
    <WiniButton ui="default">저장</WiniButton>
  </WiniBox>
</WiniBox>`,
  },
  {
    key: 'btnitem',
    title: 'ui="btnitem" 버튼 묶음',
    description: [
      '역할: 관련 있는 버튼들을 같은 간격으로 정렬합니다.',
      '사용 상황: 확인/취소, 추가/삭제, 열기/닫기 같이 짝을 이루는 액션에 사용합니다.',
      '사용 방법: `WiniButton` 또는 버튼 계열 컴포넌트를 내부에 나란히 배치합니다.',
    ],
    requiredItems: ['`ui="btnitem"`', '버튼 컴포넌트 자식'],
    optionalItems: [
      '`WiniIconButton`, `WiniToggleButton` 혼합 사용',
      '`className`으로 정렬 방향/간격 보정',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description:
          '관련 버튼들을 같은 간격으로 정렬하는 버튼 묶음 스타일입니다.',
        values: ['btnitem'],
      },
      {
        name: 'className',
        description: '정렬 방향이나 간격을 화면별로 조정합니다.',
      },
    ],
    code: `<WiniBox ui="btnitem">
  <WiniButton ui="line">취소</WiniButton>
  <WiniButton ui="default">확인</WiniButton>
</WiniBox>`,
  },
  {
    key: 'input_button',
    title: 'ui="inputButton" 입력 + 버튼 조합',
    description: [
      '역할: 입력 필드와 단일 액션 버튼을 한 줄에 맞춰 배치합니다.',
      '사용 상황: 아이디 중복확인, 코드 조회, 파일 선택 + 버튼 조합에 사용합니다.',
      '사용 방법: 입력 영역을 `flex-1`로 확장하고 우측 버튼을 고정 배치합니다.',
    ],
    requiredItems: [
      '`ui="inputButton"`',
      '입력 컴포넌트 1개 이상',
      '액션 버튼 1개 이상',
    ],
    optionalItems: [
      '입력 박스에 `mt-0` 적용해 상단 마진 제거',
      '버튼 `ui` 변경으로 액션 의미 강조',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '입력 필드와 버튼을 한 줄에 묶는 레이아웃 속성입니다.',
        values: ['inputButton'],
      },
      {
        name: '내부 래퍼 className="flex-1"',
        description: '입력 영역이 남는 폭을 채우도록 확장할 때 사용합니다.',
      },
      {
        name: '내부 래퍼 className="mt-0"',
        description:
          '내부 입력 컴포넌트의 기본 상단 마진을 제거해 버튼 높이와 정렬을 맞춥니다.',
      },
    ],
    code: `<WiniBox ui="inputButton">
  <WiniBox className="flex-1 mt-0">
    <WiniText ui="column" label="아이디" placeholder="아이디 입력" />
  </WiniBox>
  <WiniButton ui="line">중복 확인</WiniButton>
</WiniBox>`,
  },
  {
    key: 'file_box',
    title: 'ui="fileBox" 파일 아이템',
    description: [
      '역할: 파일명/첨부 항목을 표시하는 단일 박스입니다.',
      '사용 상황: 첨부파일 목록, 업로드 결과 목록, 문서 링크 영역에 사용합니다.',
      '사용 방법: 파일명 텍스트 또는 아이콘+파일명 조합을 내부에 배치합니다.',
    ],
    requiredItems: ['`ui="fileBox"`', '파일명 또는 파일 관련 콘텐츠'],
    optionalItems: [
      '삭제 버튼/다운로드 버튼 추가',
      '여러 개일 경우 상위 리스트에서 반복 렌더링',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '파일 항목 한 줄을 감싸는 박스 스타일입니다.',
        values: ['fileBox'],
      },
      {
        name: 'className / sx',
        description:
          '파일 아이템 높이, 여백, 배치를 화면에 맞게 보정할 수 있습니다.',
      },
    ],
    code: `<WiniBox ui="fileBox">
  <WiniTypography variant="span">report_2026.pdf</WiniTypography>
</WiniBox>`,
  },
  {
    key: 'file_box_wrap',
    title: 'ui="fileBoxWrap" 파일 업로드 래퍼',
    description: [
      '역할: 파일 업로드 드롭존 전체 영역을 감싸는 외곽 컨테이너입니다.',
      '사용 상황: 드래그 앤 드롭 업로드, 다중 파일 첨부 화면에 사용합니다.',
      '사용 방법: 내부에 `fileBox`를 넣어 안내 문구 또는 파일 목록을 구성합니다.',
    ],
    requiredItems: [
      '`ui="fileBoxWrap"`',
      '내부 콘텐츠(`fileBox` 또는 업로드 안내)',
    ],
    optionalItems: [
      '드래그 상태 클래스 추가',
      '업로드 진행률/파일 개수 표시 컴포넌트 확장',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: '파일 업로드 영역 전체를 감싸는 외곽 래퍼 스타일입니다.',
        values: ['fileBoxWrap'],
      },
      {
        name: 'className / sx',
        description:
          '드롭존 높이, 배경, 활성 상태 표현을 별도로 보정할 수 있습니다.',
      },
    ],
    code: `<WiniBox ui="fileBoxWrap">
  <WiniBox ui="fileBox" className="mt-0">
    <WiniTypography variant="span">파일을 드래그해 놓아 주세요.</WiniTypography>
  </WiniBox>
</WiniBox>`,
  },
  {
    key: 'noAutoGap',
    title: 'ui="noAutoGap" 간격 제거 래퍼',
    description: [
      '역할: WiniBox 요소 간의 기본 간격을 제거하는 래퍼입니다.',
      '사용 상황: 요소 간의 간격을 직접 조정하고자 할 때 사용합니다.',
      '사용 방법: WiniBox에 `noAutoGap`을 적용할 요소를 배치합니다.',
    ],
    requiredItems: [
      '`ui="noAutoGap"`',
      '내부 콘텐츠(`noAutoGap`을 적용할 요소들)',
    ],
    requiredProps: [],
    optionalProps: [
      {
        name: 'ui',
        description: 'WiniBox 요소 간의 기본 간격을 제거하는 래퍼 스타일입니다.',
        values: ['noAutoGap'],
      },
      {
        name: 'className / sx',
        description:
          'WiniBox 요소 간의 간격을 별도로 보정할 수 있습니다.',
      },
    ],
    code: `<WiniBox>
  <WiniBox ui="noAutoGap">
  test
  </WiniBox>
  <WiniBox ui="noAutoGap">
  test
  </WiniBox>
</WiniBox>`,
  },
];

const renderPreview = (key) => {
  if (key === 'info') {
    return (
      <WiniBox ui="info">
        <WiniTypography variant="span">
          저장 전에 입력값을 다시 확인해 주세요.
        </WiniTypography>
      </WiniBox>
    );
  }

  if (key === 'form') {
    return (
      <WiniBox ui="form">
        <WiniGridLayout
          container
          ui="form"
          rowSpacing={1}
          columnSpacing={1}
          rowItem={2}
        >
          <WiniGridItem>
            <WiniText ui="column" label="이름" placeholder="이름 입력" />
          </WiniGridItem>
          <WiniGridItem>
            <WiniSelect ui="column" label="권한" defaultValue="user">
              <WiniMenuItem value="user">User</WiniMenuItem>
              <WiniMenuItem value="admin">Admin</WiniMenuItem>
            </WiniSelect>
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>
    );
  }

  if (key === 'search') {
    return (
      <WiniBox ui="search">
        <WiniGridLayout
          container
          ui="form"
          rowSpacing={1}
          columnSpacing={1}
          rowItem={2}
          className="flex-1"
        >
          <WiniGridItem>
            <WiniText ui="column" label="검색어" placeholder="검색어 입력" />
          </WiniGridItem>
          <WiniGridItem>
            <WiniSelect ui="column" label="상태" defaultValue="all">
              <WiniMenuItem value="all">전체</WiniMenuItem>
              <WiniMenuItem value="Y">사용</WiniMenuItem>
              <WiniMenuItem value="N">미사용</WiniMenuItem>
            </WiniSelect>
          </WiniGridItem>
        </WiniGridLayout>
        <WiniBox ui="btnitem">
          <WiniButton ui="line">초기화</WiniButton>
          <WiniButton ui="default">조회</WiniButton>
        </WiniBox>
      </WiniBox>
    );
  }

  if (key === 'line') {
    return (
      <WiniBox ui="line">
        <WiniTypography variant="span">
          line ui는 섹션을 구분할 때 사용합니다.
        </WiniTypography>
      </WiniBox>
    );
  }

  if (key === 'btnbox') {
    return (
      <WiniBox ui="btnbox">
        <WiniBox ui="btnitem">
          <WiniButton ui="delete">삭제</WiniButton>
        </WiniBox>
        <WiniBox ui="btnitem">
          <WiniButton ui="line">취소</WiniButton>
          <WiniButton ui="default">저장</WiniButton>
        </WiniBox>
      </WiniBox>
    );
  }

  if (key === 'btnitem') {
    return (
      <WiniBox ui="btnitem">
        <WiniButton ui="line">취소</WiniButton>
        <WiniButton ui="default">확인</WiniButton>
      </WiniBox>
    );
  }

  if (key === 'input_button') {
    return (
      <WiniBox ui="inputButton">
        <WiniBox className="flex-1 mt-0">
          <WiniText ui="column" label="아이디" placeholder="아이디 입력" />
        </WiniBox>
        <WiniButton ui="line">중복 확인</WiniButton>
      </WiniBox>
    );
  }

  if (key === 'file_box') {
    return (
      <WiniBox ui="fileBox">
        <WiniTypography variant="span">report_2026.pdf</WiniTypography>
      </WiniBox>
    );
  }

  if (key === 'noAutoGap'){
    return (
      <WiniBox>
        <WiniBox ui="noAutoGap">
          test
        </WiniBox>
        <WiniBox ui="noAutoGap">
          test
        </WiniBox>
      </WiniBox>
    );
  }

  return (
    <WiniBox ui="fileBoxWrap">
      <WiniBox ui="fileBox" className="mt-0">
        <WiniTypography variant="span">
          파일을 드래그해 놓아 주세요.
        </WiniTypography>
      </WiniBox>
    </WiniBox>
  );
};

export default function CompWiniBox() {
  return (
    <GuidePage
      title="WiniBox"
      subtitle="WiniBox 가이드"
      description="WiniBox는 화면 영역을 목적별로 빠르게 구성하기 위한 공통 컨테이너입니다. 이 가이드는 각 `ui`가 어떤 역할인지, 언제 쓰는지, 필수/선택 옵션이 무엇인지 초보자 기준으로 정리했습니다."
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
