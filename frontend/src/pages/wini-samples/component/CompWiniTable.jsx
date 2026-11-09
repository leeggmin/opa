import { useState } from 'react';
import {
  WiniDateTimePicker,
  WiniMenuItem,
  WiniNumber,
  WiniRadio,
  WiniRadioGroup,
  WiniSelect,
  WiniTable,
  WiniTableBody,
  WiniTableCell,
  WiniTableContainer,
  WiniTableFooter,
  WiniTableHead,
  WiniTableRow,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { GuidePage, GuideSection } from './CompGuideCommon';

/* ------------------------------------------------------------------ */
/* 1. 기본 구성 (Container / Table / Body / Row / Cell)                 */
/* ------------------------------------------------------------------ */

const TABLE_COMPOSITION_PROP = {
  name: 'WiniTable',
  description:
    '테이블은 `WiniTableContainer`, `WiniTable`, `WiniTableBody`, `WiniTableRow`, `WiniTableCell` 조합으로 사용합니다. 헤더/푸터가 필요할 때만 `WiniTableHead`, `WiniTableFooter`를 추가로 조합합니다.',
  values: [
    'WiniTableContainer',
    'WiniTable',
    'WiniTableBody',
    'WiniTableRow',
    'WiniTableCell',
  ],
};

const TABLE_CELL_PROP = {
  name: 'WiniTableCell',
  description:
    '헤더 셀과 데이터 셀 모두 `WiniTableCell`로 구성하고, `component`, `align`, `scope`, `rowSpan`, `colSpan` 같은 MUI TableCell 속성을 그대로 사용할 수 있습니다. `component="th"`일 때는 기본 헤더 스타일이 자동 적용되고, 읽기 전용 배경이 필요하면 `ui="gray"`를 사용할 수 있습니다.',
  values: ['component="th"', 'align', 'scope', 'rowSpan', 'colSpan', 'className', 'ui="gray"'],
};

const TABLE_UI_PROP = {
  name: 'className / ui',
  description:
    '현재 테이블 공통 컴포넌트는 MUI Table 계열을 감싼 래퍼이며, `WiniButton`처럼 `ui` 토큰을 해석합니다. `ui="gray"`를 주면 배경색으로 바뀝니다. 이후 `className`에 같은 Tailwind 유틸을 추가하면 그 값이 우선합니다.',
  values: ['Tailwind class 문자열', 'ui 토큰 문자열'],
};

const TABLE_COLUMN_LAYOUT_PROP = {
  name: 'labelColumnCount / labelColumnWidth / columnWidths',
  description:
    '`labelColumnCount={3}`을 주면 라벨(th) + 입력(td) 쌍 3개 기준으로 내부 `colgroup`을 자동 생성합니다. 기본 라벨 폭은 2개일 때 200px, 3개일 때 150px, 4개일 때 100px입니다. 입력 컬럼은 남는 폭을 균등하게 나누고, 더 세밀한 제어가 필요하면 `labelColumnWidth` 또는 `columnWidths` 배열로 직접 지정합니다.',
  values: ['labelColumnCount', 'labelColumnWidth', 'columnWidths'],
};

const TABLE_CODE = `<WiniTableContainer>
  <WiniTable>
    <caption className="sr-only">테이블 설명</caption>
    <WiniTableHead>
      <WiniTableRow>
        <WiniTableCell component="th" align="center">
          <WiniTypography variant="span">헤더</WiniTypography>
        </WiniTableCell>
        <WiniTableCell component="th" align="center">
          <WiniTypography variant="span">헤더</WiniTypography>
        </WiniTableCell>
      </WiniTableRow>
    </WiniTableHead>
    <WiniTableBody>
      <WiniTableRow>
        <WiniTableCell align="center">
          항목 값
        </WiniTableCell>
          <WiniTableCell align="center">
          항목 값
        </WiniTableCell>
      </WiniTableRow>
    </WiniTableBody>
  </WiniTable>
</WiniTableContainer>`;

const TABLE_PREVIEW = (
  <WiniTableContainer>
    <WiniTable>
      <caption className="sr-only">테이블 설명</caption>
      <WiniTableHead>
        <WiniTableRow>
          <WiniTableCell component="th" align="center">
            <WiniTypography variant="span">헤더</WiniTypography>
          </WiniTableCell>
          <WiniTableCell component="th" align="center">
            <WiniTypography variant="span">헤더</WiniTypography>
          </WiniTableCell>
        </WiniTableRow>
      </WiniTableHead>
      <WiniTableBody>
        <WiniTableRow>
          <WiniTableCell align="center">
            항목 값
          </WiniTableCell>
           <WiniTableCell align="center">
            항목 값
          </WiniTableCell>
        </WiniTableRow>
      </WiniTableBody>
    </WiniTable>
  </WiniTableContainer>
);

/* ------------------------------------------------------------------ */
/* 2. 헤더 / 푸터 구성 (WiniTableHead / WiniTableFooter)                 */
/* ------------------------------------------------------------------ */


function TableHeadFooterPreview() {

  return (
    <WiniTableContainer>
      <WiniTable>
        <caption className="sr-only">테이블 설명</caption>
        <WiniTableHead>
          <WiniTableRow>
            <WiniTableCell component="th" align="center">
              품목
            </WiniTableCell>
            <WiniTableCell component="th" align="center">
              수량
            </WiniTableCell>
            <WiniTableCell component="th" align="center">
              금액
            </WiniTableCell>
          </WiniTableRow>
        </WiniTableHead>
        <WiniTableBody>
            <WiniTableRow>
              <WiniTableCell align="center"></WiniTableCell>
              <WiniTableCell align="center"></WiniTableCell>
              <WiniTableCell align="right">
              </WiniTableCell>
            </WiniTableRow>
        </WiniTableBody>
        <WiniTableFooter>
          <WiniTableRow>
            <WiniTableCell component="th" colSpan={2} align="center" ui="gray">
              합계
            </WiniTableCell>
            <WiniTableCell align="right"></WiniTableCell>
          </WiniTableRow>
        </WiniTableFooter>
      </WiniTable>
    </WiniTableContainer>
  );
}

const TABLE_HEAD_PROP = {
  name: 'WiniTableHead',
  description:
    '표의 헤더 영역(`<thead>`)을 감쌉니다. 내부는 `WiniTableRow` + `WiniTableCell component="th"` 조합을 그대로 사용하며, 데이터 행과 분리된 고정 헤더가 필요할 때 사용합니다.',
  values: ['WiniTableRow', 'WiniTableCell component="th"'],
};

const TABLE_FOOTER_PROP = {
  name: 'WiniTableFooter',
  description:
    '표 하단 고정 영역(`<tfoot>`)을 감쌉니다. 합계/요약 행처럼 데이터 행과 별도로 항상 마지막에 노출되어야 하는 행을 배치할 때 사용합니다.',
  values: ['WiniTableRow', 'WiniTableCell colSpan'],
};

const TABLE_HEAD_FOOTER_CODE = `<WiniTableContainer>
  <WiniTable>
    <caption className="sr-only">테이블 설명</caption>
    <WiniTableHead>
      <WiniTableRow>
        <WiniTableCell component="th" align="center">품목</WiniTableCell>
        <WiniTableCell component="th" align="center">수량</WiniTableCell>
        <WiniTableCell component="th" align="center">금액</WiniTableCell>
      </WiniTableRow>
    </WiniTableHead>
    <WiniTableBody>
      <WiniTableRow>
        <WiniTableCell align="center"></WiniTableCell>
        <WiniTableCell align="center"></WiniTableCell>
        <WiniTableCell align="right"></WiniTableCell>
      </WiniTableRow>
    </WiniTableBody>
    <WiniTableFooter>
      <WiniTableRow>
        <WiniTableCell component="th" colSpan={2} align="center" ui="gray">합계</WiniTableCell>
        <WiniTableCell align="right"></WiniTableCell>
      </WiniTableRow>
    </WiniTableFooter>
  </WiniTable>
</WiniTableContainer>`;

/* ------------------------------------------------------------------ */
/* 3. 셀 병합 (rowSpan / colSpan)                                      */
/* ------------------------------------------------------------------ */

function TableSpanPreview() {

  return (
    <WiniTableContainer>
      <WiniTable>
        <caption className="sr-only">셀 병합 예시</caption>
        <WiniTableBody>
          <WiniTableRow>
            <WiniTableCell component="th" rowSpan={2} align="center" ui="gray">
              구분
            </WiniTableCell>
            <WiniTableCell component="th" align="center" ui="gray">
              항목
            </WiniTableCell>
            <WiniTableCell component="th" align="center" ui="gray">
              값
            </WiniTableCell>
          </WiniTableRow>
          <WiniTableRow>
            <WiniTableCell align="center">상세 항목</WiniTableCell>
            <WiniTableCell align="center">상세 값</WiniTableCell>
          </WiniTableRow>
          <WiniTableRow>
            <WiniTableCell component="th" colSpan={2} align="center" ui="gray">
              합계
            </WiniTableCell>
            <WiniTableCell align="center">100</WiniTableCell>
          </WiniTableRow>
        </WiniTableBody>
      </WiniTable>
    </WiniTableContainer>
  );
}

const TABLE_SPAN_PROP = {
  name: 'rowSpan / colSpan',
  description:
    '`rowSpan`은 셀을 세로 방향으로 여러 행에 걸쳐 병합하고, `colSpan`은 셀을 가로 방향으로 여러 열에 걸쳐 병합합니다. 두 속성 모두 `WiniTableCell`에 직접 지정합니다.',
  values: ['rowSpan={2}', 'colSpan={2}', 'component="th"', 'align="center"'],
};

const TABLE_SPAN_CODE = `<WiniTableContainer>
  <WiniTable>
    <caption className="sr-only">셀 병합 예시</caption>
    <WiniTableBody>
      <WiniTableRow>
        <WiniTableCell component="th" rowSpan={2} align="center" ui="gray">
          구분
        </WiniTableCell>
        <WiniTableCell component="th" align="center" ui="gray">
          항목
        </WiniTableCell>
        <WiniTableCell component="th" align="center" ui="gray">
          값
        </WiniTableCell>
      </WiniTableRow>
      <WiniTableRow>
        <WiniTableCell align="center">상세 항목</WiniTableCell>
        <WiniTableCell align="center">상세 값</WiniTableCell>
      </WiniTableRow>
      <WiniTableRow>
        <WiniTableCell component="th" colSpan={2} align="center" ui="gray">
          합계
        </WiniTableCell>
        <WiniTableCell align="center">100</WiniTableCell>
      </WiniTableRow>
    </WiniTableBody>
  </WiniTable>
</WiniTableContainer>`;

/* ------------------------------------------------------------------ */
/* 4. 입력폼 구성                                                       */
/* ------------------------------------------------------------------ */

function TableInputFormPreview() {

  return (
    <WiniTableContainer>
      <WiniTable labelColumnCount={3}>
        <caption className="sr-only">입력폼 예시</caption>
        <WiniTableBody>
          <WiniTableRow>
            <WiniTableCell component="th" align="center" scope="row">
              <WiniTypography variant="span" component="label" htmlFor="guide-sample1" required>입력</WiniTypography>
            </WiniTableCell>
            <WiniTableCell>
              <WiniText id="guide-sample1" ui="row" titleFix className="w-1/2"/>
            </WiniTableCell>
            <WiniTableCell component="th" align="center" scope="row">
              <WiniTypography variant="span" component="label" htmlFor="guide-date" required>날짜입력</WiniTypography>
            </WiniTableCell>
            <WiniTableCell>
              <WiniDateTimePicker id="guide-date" ui="row" format="YYYY.MM.DD HH:mm:ss" />
            </WiniTableCell>
            <WiniTableCell component="th" align="center" scope="row">
              <WiniTypography variant="span" required>체크박스</WiniTypography>
            </WiniTableCell>
            <WiniTableCell>
              <WiniRadioGroup row>
                <WiniRadio value="남" label="남성" />
                <WiniRadio value="여" label="여성" />
              </WiniRadioGroup>
            </WiniTableCell>
          </WiniTableRow>
          <WiniTableRow>
            <WiniTableCell component="th" align="center" scope="row">
              <WiniTypography variant="span" component="label" htmlFor="guide-select">select</WiniTypography>
            </WiniTableCell>
            <WiniTableCell colSpan={5}>
              <WiniSelect id="guide-select" ui="row" titleFix className="w-[160px] flex-none">
                <WiniMenuItem value="0">select01</WiniMenuItem>
                <WiniMenuItem value="1">select02</WiniMenuItem>
                <WiniMenuItem value="2">select03</WiniMenuItem>
              </WiniSelect>
            </WiniTableCell>
          </WiniTableRow>
        </WiniTableBody>
      </WiniTable>
    </WiniTableContainer>
  );
}

const TABLE_INPUT_FORM_PROP = {
  name: '테이블 입력폼 패턴',
  description:
    '라벨 셀과 입력 셀을 한 쌍으로 배치하는 테이블형 입력폼 패턴입니다. 라벨 셀은 `WiniTableCell component="th"`와 `WiniTypography component="label"`을 사용하고, 입력 컴포넌트에는 같은 `id`를 넣어 라벨 클릭 시 해당 입력으로 포커스가 이동하게 합니다.',
};

const TABLE_INPUT_FORM_CODE = `

<WiniTableContainer>
  <WiniTable labelColumnCount={3}>
    <caption className="sr-only">입력폼 설명</caption>
    <WiniTableBody>
      <WiniTableRow>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
          >
          <WiniTypography variant="span" component="label" htmlFor="sample1" required>입력1</WiniTypography>
        </WiniTableCell>
        <WiniTableCell>
          <WiniText id="sample1" ui="row" titleFix className="w-1/2" />
        </WiniTableCell>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
          >
          <WiniTypography variant="span" component="label" htmlFor="patient-age" required>입력2</WiniTypography>
        </WiniTableCell>
        <WiniTableCell>
          <WiniNumber id="patient-age" ui="row" titleFix className="w-1/3" />
        </WiniTableCell>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
          >
          <WiniTypography variant="span" required>환자성별</WiniTypography>
        </WiniTableCell>
        <WiniTableCell>
          <WiniRadioGroup row>
            <WiniRadio value="남" label="남성" />
            <WiniRadio value="여" label="여성" />
          </WiniRadioGroup>
        </WiniTableCell>
      </WiniTableRow>
      <WiniTableRow>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
        >
          <WiniTypography variant="span" component="label" htmlFor="patient-status">처리상태</WiniTypography>
        </WiniTableCell>
        <WiniTableCell className="p-1 w-50">
          <WiniSelect id="patient-status" ui="row" titleFix className="w-1/2 flex-none">
            <WiniMenuItem value="대기">대기</WiniMenuItem>
            <WiniMenuItem value="이송">이송</WiniMenuItem>
            <WiniMenuItem value="수용곤란">수용곤란</WiniMenuItem>
          </WiniSelect>
        </WiniTableCell>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
        >
          <WiniTypography variant="span" component="label" htmlFor="report-date">신고접수일시</WiniTypography>
        </WiniTableCell>
        <WiniTableCell className="p-1">
          <WiniDateTimePicker id="report-date" ui="row" format="YYYY.MM.DD HH:mm:ss" />
        </WiniTableCell>
        <WiniTableCell 
          component="th" 
          align="center" 
          scope="row"
        >
          <WiniTypography variant="span" component="label" htmlFor="dispatch-org">출동소속</WiniTypography>
        </WiniTableCell>
        <WiniTableCell className="p-1">
          <WiniText id="dispatch-org" ui="row" />
        </WiniTableCell>
      </WiniTableRow>
    </WiniTableBody>
  </WiniTable>
</WiniTableContainer>`;

/* ------------------------------------------------------------------ */

const SECTIONS = [
  {
    key: 'basic',
    title: '기본 구성',
    description: [
      '역할: 데이터 목록형 표를 구성하는 기본 요소를 제공합니다. 컨테이너, 테이블, 본문, 행, 셀을 순서대로 조합해 표를 구성합니다.',
      '사용 상황: 화면마다 MUI `Table*`를 직접 import하지 않고 Wini public API를 통해 통일된 테이블 구성 요소를 사용할 때 적합합니다.',
      '사용 방법: 컨테이너부터 셀까지 Wini 테이블 계열 컴포넌트를 순서대로 조합합니다. 헤더 셀은 `component="th"`만 지정해도 기본 스타일이 적용되고, 읽기 전용 헤더 셀은 `WiniTableCell ui="gray"`로 배경을 바꿀 수 있습니다. 세부 폭이나 배경을 바꾸고 싶으면 `className`을 추가해 기본값을 덮어씁니다.',
    ],
    requiredItems: [
      '`WiniTableContainer`',
      '`WiniTable`',
      '`WiniTableBody`',
      '`WiniTableRow`',
      '`WiniTableCell`',
    ],
    optionalItems: [
      '`component="th"`, `scope`, `align` 같은 셀 시맨틱 속성',
      'Tailwind `className` 기반 폭, 배경, 보더 스타일 override',
      '`ui="gray"`를 이용한 `bg-background-readonly` 배경 적용',
      '`colSpan`을 이용한 병합 셀',
    ],
    optionalProps: [TABLE_UI_PROP],
    preview: TABLE_PREVIEW,
    code: TABLE_CODE,
  },
  {
    key: 'head_footer',
    title: '헤더 / 푸터 구성',
    description: [
      '역할: 데이터 목록형 표에서 컬럼명을 고정으로 보여주는 헤더 영역과, 합계/요약처럼 항상 하단에 노출되는 푸터 영역을 분리해 제공합니다.',
      '사용 상황: 주문/재고처럼 행이 여러 개인 목록 표에서 컬럼명을 반복 표기하지 않고 상단에 고정하거나, 합계·평균 같은 요약 행을 본문과 구분해 강조할 때 사용합니다.',
      '사용 방법: `WiniTable` 안에 `WiniTableHead` → `WiniTableBody` → `WiniTableFooter` 순서로 배치합니다. 각 영역 내부는 동일하게 `WiniTableRow` + `WiniTableCell` 조합을 사용하며, 헤더/합계 셀은 `component="th"`, 병합이 필요하면 `colSpan`을 지정합니다.',
    ],
    requiredItems: [
      '`WiniTableHead`(컬럼명 행)',
      '`WiniTableBody`(데이터 행)',
      '헤더/푸터 셀의 `component="th"`',
    ],
    optionalItems: [
      '`WiniTableFooter`(합계/요약 행, 표에 요약이 필요할 때만 추가)',
      '`colSpan`을 이용한 라벨 셀 병합',
      '`ui="gray"`로 합계 라벨 셀 강조',
    ],
    requiredProps: [TABLE_HEAD_PROP],
    optionalProps: [TABLE_FOOTER_PROP],
    preview: <TableHeadFooterPreview />,
    code: TABLE_HEAD_FOOTER_CODE,
  },
  {
    key: 'span',
    title: '셀 병합(rowSpan / colSpan)',
    description: [
      '역할: 테이블에서 같은 분류가 여러 행에 반복되거나, 합계/비고처럼 여러 열을 하나로 묶어야 할 때 셀을 병합합니다.',
      '사용 상황: 좌측 구분 셀을 세로로 묶는 상세 표, 합계 라벨을 가로로 넓게 표시하는 요약 행, 입력폼에서 긴 텍스트 영역을 여러 칸에 걸쳐 배치할 때 사용합니다.',
      '`rowSpan`은 현재 셀을 아래 행까지 세로로 확장하고, `colSpan`은 현재 셀을 오른쪽 열까지 가로로 확장합니다. 병합된 만큼 같은 위치의 다른 셀은 작성하지 않아야 컬럼 개수가 맞습니다.',
    ],
    requiredItems: [
      '`WiniTableCell rowSpan={숫자}` 또는 `WiniTableCell colSpan={숫자}`',
      '병합 범위만큼 중복 셀을 제거한 `WiniTableRow` 구성',
    ],
    optionalItems: [
      '`component="th"`로 병합 라벨 셀 의미 지정',
      '`ui="gray"`로 병합 라벨 셀 배경 강조',
      '`align="center"`로 병합 셀 텍스트 정렬',
    ],
    requiredProps: [TABLE_SPAN_PROP],
    optionalProps: [TABLE_CELL_PROP],
    preview: <TableSpanPreview />,
    code: TABLE_SPAN_CODE,
  },
  {
    key: 'input_form',
    title: '입력폼',
    description: [
      '역할: 표 구조 안에 입력 컴포넌트를 배치해 라벨과 입력값을 일정한 행/열 간격으로 정렬합니다.',
      '사용 상황: 입력폼 레이아웃을 테이블 구조로 구성하고, 라벨과 입력값을 한 쌍으로 배치해 정렬할 때 사용합니다.',
      '사용 방법: `WiniTable labelColumnCount={3}`처럼 라벨/입력 쌍 개수를 지정하고, `WiniTableBody` 안에서 `WiniTableRow`를 만듭니다. 각 필드는 `WiniTableCell component="th"` 라벨 셀과 일반 `WiniTableCell` 입력 셀을 한 쌍으로 배치합니다. 라벨은 `WiniTypography component="label" htmlFor="..."`로 만들고 입력 컴포넌트에는 같은 `id`를 전달합니다.',
    ],
    requiredItems: [
      '`WiniTableContainer` + `WiniTable` + `WiniTableBody`',
      '`WiniTable labelColumnCount={3}` 같은 컬럼 폭 기준',
      '`WiniTableCell component="th"` 라벨 셀',
      '`WiniTypography component="label" htmlFor`와 입력 컴포넌트 `id` 매칭',
      '`value`, `onChange`로 화면 상태 연결',
    ],
    optionalItems: [
      '`WiniText`, `WiniSelect`, `WiniDateTimePicker`, `WiniRadioGroup` 조합',
      '`required`로 필수 라벨 표시',
      '`labelHidden`으로 입력 내부 라벨은 숨기고 외부 테이블 라벨만 노출',
      '`colSpan`으로 긴 입력 영역을 여러 칸에 걸쳐 확장',
      '`rowSpan`으로 같은 구분 라벨을 여러 행에 걸쳐 표시',
    ],
    optionalProps: [TABLE_COLUMN_LAYOUT_PROP, TABLE_CELL_PROP],
    preview: <TableInputFormPreview />,
    code: TABLE_INPUT_FORM_CODE,
  },
];

export default function CompWiniTable() {
  return (
    <GuidePage
      title="WiniTable"
      subtitle="WiniTable 계열 가이드"
      description="WiniTable, WiniTableHead, WiniTableBody, WiniTableRow, WiniTableCell, WiniTableFooter 조합으로 테이블과 테이블형 입력폼을 구성합니다. 이 가이드는 배치, 실제 사용 상황, 필수/선택 props를 초보자 기준으로 정리했습니다."
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
          preview={item.preview}
          code={item.code}
        />
      ))}
    </GuidePage>
  );
}
