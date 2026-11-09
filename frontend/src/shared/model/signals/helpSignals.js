import { signal } from '@preact/signals-react';

/** 헬프창에서 사용하는 시그널 */
/** 시그널 리스트 ( 다중일때 사용) */
export const _helpformList = signal([]);

export const _helpForm = signal({
  key: '',
  open: false,
  _inner: {},
  params: {},
  type: '',
  service: '',
  callback: function () {},
});

//시그널 업데이트
export function updateHelpForm(newValues) {
  _helpForm.value = { ..._helpForm.value, ...newValues };
  return _helpForm;
}

export function closeHelpForm(helpForm, newValue) {
  helpForm.value = {
    ...helpForm.value,
    open: false,
  };
}

//열때 리스트에추가하는 함수
export function addHelpForm(newValues) {
  const _helpForm = signal(newValues);
  _helpformList.value = [..._helpformList.value, _helpForm];
}

//닫을때 쓰는 함수
export function removeHelpFormSignal(key) {
  //splice로는 값이 바뀌지않음.
  _helpformList.value = _helpformList.value.filter(
    (item) => item.value.key !== key,
  );
}
