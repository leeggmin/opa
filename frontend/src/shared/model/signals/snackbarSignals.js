import { signal } from '@preact/signals-react';

/** comSnackbar에서 사용하는 시그널 */
/** 시그널 리스트 ( 다중일때 사용) */
export const _comSnackbarList = signal([]);

export const _comSnackbar = signal({
  key: '',
  open: false,
  message: '',
  duration: 2000,
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  callback: function () {},
});

//시그널 업데이트
export function updatecomSnackbar(newValues) {
  _comSnackbar.value = { ..._comSnackbar.value, ...newValues };
  return _comSnackbar;
}

export function closecomSnackbar(comSnackbar, newValue) {
  comSnackbar.value = {
    ...comSnackbar.value,
    open: false,
  };
}

//열때 리스트에추가하는 함수
export function addcomSnackbar(newValues) {
  const _comSnackbar = signal(newValues);
  _comSnackbarList.value = [..._comSnackbarList.value, _comSnackbar];
}

//닫을때 쓰는 함수
export function removecomSnackbarSignal(key) {
  //splice로는 값이 바뀌지않음.
  _comSnackbarList.value = _comSnackbarList.value.filter(
    (item) => item.value.key !== key,
  );
}
