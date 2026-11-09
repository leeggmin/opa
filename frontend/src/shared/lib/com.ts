import winiDate from './date';
import { getFormContext, menuStore, winiMsg } from '@/shared/model';
import { Communicator } from '@/shared/api';

/**
 * 공통 형변환, 검증, 유틸리티 함수
 */

type enumsAut =
  | 'select'
  | 'insert'
  | 'update'
  | 'delete'
  | 'print'
  | 'down'
  | 'manage';

//-----------------------------------------------------------------  형변환,형 체크 시작 --//
/**
 * 해당데이터 undefined 면 null로 변경  undifined -> null
 * @param letiable any
 * @returns any null 또는 값이 있으면 그대로 값 리턴
 */
export function toNull(letiable: any): any {
  return letiable == undefined ? null : letiable;
}

/**
 * null 또는 undefined 값 ''(빈값) 으로 치환하기
 * @param letiable any
 * @returns string '' 또는 값이 존재하면 그대로 값 리턴
 */
export function toEmpty(letiable: any): any {
  return letiable == undefined ? '' : letiable == null ? '' : letiable;
}

/**
 * 데이터 숫자인지 아닌지 판단
 * @param letiable
 * @returns boolean 숫자면 true 아니면 false
 */
export function isNumber(letiable: any): boolean {
  const result = isNaN(letiable);
  return !result;
}
//-----------------------------------------------------------------  형변환,형 체크 종료 --//

//-----------------------------------------------------------------  디바이스체크 시작 --//
/**
 * 모바일 체크
 * @returns string null:확인불가
 */
export function isMobile(): boolean | null {
  const filter = 'win16|win32|win64|mac';
  if (navigator.platform) {
    if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
      return true; // Mobile
    } else {
      return false; // PC
    }
  }
  return null;
}
//-----------------------------------------------------------------  디바이스체크 종료 --//

//-----------------------------------------------------------------  체크함수 시작 --//
/**
 * 일반 전화번호 형식체크
 * @param phone '
 * @returns boolean
 */

export function phoneCheck(phone: string): boolean {
  phone = phone.replace(/-/gi, '');
  let regExp =
    /^(070|02|0[3-9]{1}[0-9]{1}|00[5-6]{1}[0-9]{1,2})([0-9]{3,4})([0-9]{4})$/;
  if (regExp.test(phone)) {
    return true;
  } else {
    regExp = /(0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
    if (regExp.test(phone)) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * 휴대폰 번호 형식 체크
 * @param phone '01011111111' or '010-1111-1111'
 * @returns boolean
 */
export function mobileCheck(phone: string): boolean {
  phone = phone.replace(/-/gi, '');
  const regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
  if (regExp.test(phone)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 이메일 형식 체크
 * @param email
 * @returns boolean
 */
export function emailCheck(email: string): boolean {
  const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (exptext.test(email) == false) {
    return false;
  }
  return true;
}
//-----------------------------------------------------------------  체크함수 종료 --//

//-----------------------------------------------------------------  데이터 가져오기/리셋하기 시작 --//
/**
 *
 * @param dom
 * @param type 'set : reset '
 * @returns 'set' 일경우  data-reset-value="값" 에 값이 있는경우 세팅된다
 */
function __tableData_bind(dom: Element, type?: string): object {
  let obj: any = {};

  const elemList = dom.querySelectorAll('[name]');
  obj = {};
  elemList.forEach((elem: any) => {
    let resetValue: any = '';
    let nowValue = '';
    let classList: any = [];
    let control: any = elem;

    if (!control.classList.contains('winicomponent')) {
      for (let i = 0; i < 5; i++) {
        control = control.parentElement;
        if (control.classList.contains('winicomponent')) {
          break;
        }
      }
    }

    classList = control.classList;

    if (elem.dataset && elem.dataset.resetValue) {
      resetValue = elem.dataset.resetValue;
    }
    if (elem.parentElement && elem.parentElement.dataset.resetValue) {
      resetValue = elem.parentElement.dataset.resetValue;
    }

    if (
      elem.parentElement &&
      elem.parentElement.parentElement &&
      elem.parentElement.parentElement.dataset.resetValue
    ) {
      resetValue = elem.parentElement.parentElement.dataset.resetValue;
    }

    if (classList.contains('winidatetimepicker')) {
      const dateFormat = elem?.dataset?.dateFormat;
      const parsedBaseValue =
        resetValue === '' || resetValue === null || resetValue === undefined
          ? null
          : typeof resetValue === 'number'
            ? winiDate(resetValue)
            : typeof resetValue === 'string' && /^\d+$/.test(resetValue)
              ? winiDate(Number(resetValue))
              : winiDate(resetValue);

      resetValue =
        parsedBaseValue && dateFormat
          ? winiDate.dateFormat(parsedBaseValue, dateFormat)
          : parsedBaseValue ?? '';
    }
    if (
      classList.contains('winicheckbox') ||
      classList.contains('winiswitch')
    ) {
      resetValue = resetValue == '' ? false : true;
      /** react에서 바로 .value 나 .checked 는 안먹혀서 이런식으로 해줘야함 옛날엔 됐따고함...ㅠ
       * checkbox 는 checked와 click 조합으로 이벤트를 일으킬수있음..
       */
      const valueDescriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'checked',
      );
      if (valueDescriptor && valueDescriptor.set && type == 'set') {
        const nativeInputValueSetter = valueDescriptor.set;
        nativeInputValueSetter.call(elem, resetValue);
      }
      if (valueDescriptor && valueDescriptor.get) {
        const nativeInputValueGetter = valueDescriptor.get;
        nowValue = nativeInputValueGetter.call(elem);
      }
      elem.dispatchEvent(new Event('click', { bubbles: true }));
    } else {
      const valueDescriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      );
      if (valueDescriptor && valueDescriptor.set && type == 'set') {
        const nativeInputValueSetter = valueDescriptor.set;
        nativeInputValueSetter.call(elem, resetValue);
      }
      if (valueDescriptor && valueDescriptor.get) {
        const nativeInputValueGetter = valueDescriptor.get;
        nowValue = nativeInputValueGetter.call(elem);
      }

      elem.dispatchEvent(new Event('input', { bubbles: true }));
      if (type == 'set') {
        elem.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    const nameValue = elem.getAttribute('name');
    if (nameValue !== null && nameValue !== '') {
      if (type == 'set') {
        obj[nameValue] = resetValue;
      } else {
        if (
          classList.length > 0 &&
          classList.contains('winidatetimepicker')
        ) {
          obj[nameValue] = winiDate(nowValue);
        } else {
          obj[nameValue] = nowValue;
        }
      }
    }
  });
  return obj;
}

/**
 * table 안에 데이터 Object 형식으로 반환
 * @param ref (ref.current 값으로 해야함 elment가 없는경우 error)
 * @returns name 이 존재하지않으면 가져오지 않음.
 */
export function get(ref: Element): object {
  let obj = {};
  if (!ref) return obj;
  try {
    const list = [
      'winibox',
      'winigridlayout',
      'winipaper',
      'winitabpanel',
      'winistack',
      'winicard',
    ];
    let chk = false;
    for (let _i = 0; _i < ref.classList.length; _i++) {
      if (list.indexOf(ref.classList[_i]) >= 0) {
        chk = true;
        break;
      }
    }
    if (chk == true) {
      obj = __tableData_bind(ref);
    } else {
      return {};
    }
  } catch {}
  return obj;
}

/**
 * table 안에 데이터 초기화
 * @param ref (ref.current 값으로 해야함 elment가 없는경우 error)
 * @returns name 이 존재하지않으면 세팅을 하지않음
 *          data-reset-value = 값 하면 해당값으로 초기화!
 */
export function reset(ref: Element): boolean | object {
  if (!ref) return false;
  let obj = {};
  try {
    const list = [
      'winibox',
      'winigridlayout',
      'winipaper',
      'winitabpanel',
      'winistack',
      'winicard',
    ];
    let chk = false;
    for (let _i = 0; _i < ref.classList.length; _i++) {
      if (list.indexOf(ref.classList[_i]) >= 0) {
        chk = true;
        break;
      }
    }
    if (chk == true) {
      obj = __tableData_bind(ref, 'set');
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return obj;
}

/**
 * required 체크! 필수 체크 함수 select,date,text 만 적용됨!
 * @param dom form element
 * @returns boalean true:정상 false:필수값 누락
 */
export function isValidCheck(dom: Element): boolean {
  const classname = [
    'winitext',
    'winiselect',
    'wininumber',
    'winidatetimepicker',
  ];
  const elemLists = dom.querySelectorAll('.winicomponent');
  const elemList: any = [];
  elemLists.forEach((item: any) => {
    classname.forEach((name) => {
      if (item.classList.contains(name)) {
        elemList.push(item);
      }
    });
  });
  for (let i = 0; i < elemList.length; i++) {
    const elem = elemList[i] as HTMLInputElement;
    const input = elem.querySelector('input') as HTMLInputElement;
    let labeltext: any = '';
    if (elem.classList.contains('winiselect')) {
      labeltext = input.getAttribute('label');
    } else {
      const label = elem.querySelector('label') as HTMLLabelElement;
      labeltext = label?.innerText.toString().replace('*', '');
    }

    let error = false;
    if (input) {
      if (input.required && (input.value == '' || input.value == null)) {
        error = true;
      }
    }

    if (error == true) {
      // Import winiMsg dynamically to avoid circular dependency
      import('@/shared/model').then(({ winiMsg }) => {
        if (labeltext) {
          winiMsg
            .showAlert(`${labeltext} 은(는) 필수 입력 값 입니다.`)
            .then(() => {
              input.focus();
            });
        } else {
          winiMsg.showAlert(`필수 입력값이 누락되었습니다.`).then(() => {
            input.focus();
          });
        }
      });
      return false;
    }
  }
  return true;
}
//-----------------------------------------------------------------  데이터 가져오기/리셋하기 종료 --//

//-----------------------------------------------------------------  form 권한 관련 시작 --//
/**
 * 각폼에서 공통함수, 공통 권한등을 가져다 쓸수있도록 함수추가
 * 2025-02-18 차현진
 */

/**
 * context로 넘겨진 현재 활성화 중인 메뉴 기준 값전달
 * id: 현재 활성화 중인(선택된)메뉴의 ID (ProgoramID가 아니고 메뉴의 아이디!!)
 * winiEvent : WiniFormCommon에서 제공하는 공통 버튼에 연결된 이벤트들.
 * info: 선택된 메뉴의 정보들
 * winiAut : 해당 메뉴의 권한정보! (등록,추가,저장,삭제..등)
 * @returns constext value
 */
export function getFormInfo(option?: string) {
  const contextValue = getFormContext() as {
    id: string;
    title: string;
    winiEvent: {
      select: () => void;
      insert: () => void;
      update: () => void;
      delete: () => void;
      print: () => void;
      down: () => void;
      manage: () => void;
      noop: () => void;
    };
    info: object;
    winiAut: {
      select: string;
      insert: string;
      update: string;
      delete: string;
      print: string;
      down: string;
      manage: string;
    };
    connector: Communicator;
  };
  if (option) {
    return contextValue;
  } else {
    contextValue.winiEvent = {
      ...contextValue.winiEvent,
      select: contextValue.winiEvent.noop,
      insert: contextValue.winiEvent.noop,
      update: contextValue.winiEvent.noop,
      delete: contextValue.winiEvent.noop,
      print: contextValue.winiEvent.noop,
      down: contextValue.winiEvent.noop,
      manage: contextValue.winiEvent.noop,
    };
    return contextValue;
  }
}

/**
 * 권한정보만 가져오기
 * @return 현재 선택된 메뉴의 상세권한정보들
 */
export function getFormAut(): {
  winiAut: {
    search: string;
    insert: string;
    update: string;
    delete: string;
    print: string;
    down: string;
    manage: string;
  };
} {
  const { winiAut } = getFormContext();
  return winiAut;
}

/**
 * 통신 connector 만가져오기기 가져오기
 * @return 현재 선택된 메뉴의 상세권한정보들
 */
export function getConnector(): Communicator {
  const { connector } = getFormContext();
  return connector;
}

/**
 * 권한 체크하여 dom 생성 또는 미생성 체크 함수
 * @param aut 권한 enums 정보 ['select','insert','update','delete','print','down','manage','s','i','u','d','p','dw','m']
 * @param dom 버튼또는 권한에따라 존재해야하는 jsx 형태의 tag
 * @returns null 또는 dom
 */
export function checkMenuAut(aut: enumsAut | enumsAut[], dom: Element): any {
  const chklist = [
    'select',
    'insert',
    'update',
    'delete',
    'print',
    'down',
    'manage',
    's',
    'i',
    'u',
    'd',
    'p',
    'dw',
    'm',
  ];
  const autShortname = {
    s: 'select',
    i: 'insert',
    u: 'update',
    d: 'delete',
    p: 'print',
    dw: 'down',
    m: 'manage',
  } as const;
  const isarry = Array.isArray(aut);
  const { winiAut } = getFormContext();
  if (isarry) {
    const autlist: any[] = [];
    for (let i = 0; i < aut.length; i++) {
      if (chklist.indexOf(aut[i].toLowerCase()) === -1) {
        return undefined;
      }
      const autname =
        aut[i].length == 1 || aut[i].length == 2
          ? autShortname[aut[i].toString() as keyof typeof autShortname]
          : aut[i];
      autlist.push(winiAut[autname]);
    }
    let elem = null;
    if (autlist.indexOf('ALLOW') > -1) {
      elem = dom;
    }
    return elem;
  } else {
    const auth = aut.toLowerCase();
    if (chklist.indexOf(auth) === -1) {
      return undefined;
    }
    const autname =
      auth.length == 1 || auth.length == 2
        ? autShortname[auth.toString() as keyof typeof autShortname]
        : auth;
    const userAut = winiAut[autname];
    const elem = userAut == 'ALLOW' ? dom : null;
    return elem;
  }
}
//-----------------------------------------------------------------  form 권한 관련 종료 --//

//-----------------------------------------------------------------  tree 관련 시작 --//
/**
 * 부모찾기
 * @param nodes 전체노드
 * @param childNode 하위노드
 * @param col 레벨기준이 되는 컬럼명명
 * @returns null 또는 boolean
 */
function _findParentAndAddChild(
  nodes: any,
  childNode: any,
  col: string = 'lev',
  visited = new Set(),
): boolean {
  const level = col;
  for (const node of nodes.slice().reverse()) {
    if (visited.has(node)) continue; // 이미 방문한 노드는 건너뛰기
    visited.add(node); // 방문 표시

    if (node.children) {
      // 재귀적으로 하위 노드 탐색
      if (
        _findParentAndAddChild(node.children, childNode, col, visited)
      ) {
        return true;
      }
    }

    // 부모 노드가 맞을 경우 자식으로 추가
    if (node[level] === childNode[level] - 1) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push(childNode);
      return true;
    }
  }

  return false;
}

/**
 * 기존 데이터 현재 트리데이터셋으로 바꾸기
 * @param data 기존데이터 구조 배열필수
 * @param col 레벨 기준이 되는 컬럼명 없으면 'lev'
 * @returns null 또는 배열
 */
export function createTreeSet(data: any[], col: string = 'lev'): any {
  // 각 아이템에 children 속성을 기본적으로 null로 설정
  data.forEach((item) => {
    item.children = null;
  });

  // 루트 노드를 저장할 배열
  const root: any[] = [];

  // 각 데이터를 처리하며 트리 구조를 생성
  data.forEach((item) => {
    // 현재 노드
    const currentNode: any = item;

    // 루트 레벨인 경우
    if (currentNode[col] === 1) {
      // 루트에 추가
      root.push(currentNode);
    } else {
      // 부모 노드를 찾기 위해 루트부터 탐색
      _findParentAndAddChild(root, currentNode, col);
    }
  });

  return root;
}

//-----------------------------------------------------------------  tree 관련 종료 --//

/**
 * 에러메세지 리턴
 * @param error 에러메세지
 * @returns 에러메세지
 */
export function getErrorMessage(error: any): string {
  if (error == null) {
    return '';
  }
  if (Array.isArray(error)) {
    return `오류가 발생 했습니다.`;
  } else {
    return error?.message || '오류가 발생했습니다.';
  }
}

/**
 * API 에러 처리 공통 함수
 * @param error 에러 객체
 */
export async function handleApiError(error: any): Promise<void> {
  if (error.response) {
    await winiMsg.showAlert(
      getErrorMessage(error.response.data.message)
    );
  }
}

/**
 * 메뉴에 등록된 프로그램으로 이동합니다.
 * 탭 모드에서는 탭을 열거나 활성화하고, 일반 모드에서는 해당 URL로 이동합니다.
 * @param programMapping 메뉴에 등록된 프로그램 매핑
 */
export function navigateToProgram(programMapping: string): void {
  const isReady = menuStore.getState().navigateToProgram(programMapping);
  if (!isReady) {
    winiMsg.showSnackbar('메뉴가 준비되지 않았습니다.');
  }
}

// Backward compatibility: class-based API
class winiCom {
  static toNull = toNull;
  static toEmpty = toEmpty;
  static isNumber = isNumber;
  static isMobile = isMobile;
  static phoneCheck = phoneCheck;
  static mobileCheck = mobileCheck;
  static emailCheck = emailCheck;
  static get = get;
  static reset = reset;
  static isValidCheck = isValidCheck;
  static getFormInfo = getFormInfo;
  static getFormAut = getFormAut;
  static getConnector = getConnector;
  static checkMenuAut = checkMenuAut;
  static createTreeSet = createTreeSet;
  static getErrorMessage = getErrorMessage;
  static handleApiError = handleApiError;
  static navigateToProgram = navigateToProgram;
}

export default winiCom;
