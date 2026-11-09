import { signal } from '@preact/signals-react';

/** 메세지 창에서 사용 하는 시그널들  */
/** 시그널 리스트 ( 다중일때 사용) */
export const _msgList = signal([]);

// 메세지창에서 주로 쓰는 파라메터들
export const _msgBox = signal({
  key: '',
  open: false,
  message: 'This is an alert',
  type: 'alert',
  callback: function () {},
});

//시그널 업데이트
export function updateMsg(newValues) {
  _msgBox.value = { ..._msgBox.value, ...newValues };
  return _msgBox;
}

//메세지창 닫는 시그널 업데이트
export function closeMsg(msgBox, newValue) {
  msgBox.value = {
    ...msgBox.value,
    open: false,
  };
}

//열때 리스트에추가하는 함수
export function addMsgBox(newValues) {
  const _msgBox = signal(newValues);
  _msgList.value = [..._msgList.value, _msgBox];
}

//닫을때 쓰는 함수
export function removeMsgBoxSignal(key) {
  //splice로는 값이 바뀌지않음.
  _msgList.value = _msgList.value.filter((item) => item.value.key !== key);
}
