import {
  _msgList,
  addMsgBox,
} from '../signals/messageSignals';
import {
  _comSnackbarList,
  addcomSnackbar,
} from '../signals/snackbarSignals';

class winiMsg {
  //-----------------------------------------------------------------  메세지창 열기 시작--//
  /**
   * @param {string} msg
   * @returns {Promise<string>}
   */
  static async showAlert(msg) {
    return await this._show(msg, 'alert');
  }

  /**
   * @param {string} msg
   * @returns {Promise<string>}
   */
  static async showConfirm(msg) {
    return await this._show(msg, 'yn');
  }

  /**
   * @param {string} msg
   * @param {string} type
   * @returns {Promise<any>}
   */
  static async _show(msg, type) {
    return new Promise((resolve) => {
      const callbackfn = function (data) {
        resolve(data);
      };
      addMsgBox({
        key: 'msg_' + Number(_msgList.value.length + 1),
        open: true,
        type: type,
        message: msg,
        callback: callbackfn,
      });
    })
      .then((data) => {
        return data;
      })
      .catch(() => {
        return 'error';
      });
  }

  /**
   * 일시적으로 띄워주는 snackbar
   * 커스텀이 필요한경우 각자만들어 사용.
   * @param {string} msg 표시할 메세지
   * @param {object} [anchor]  위치 { vertical: 'top' 또는 'bottom', horizontal: 'center' 또는 'left' 또는 'right' }
   * @param {number} [duration] 떠있는 시간 number 기본값 2000
   */
  static async showSnackbar(msg, anchor, duration) {
    new Promise(() => {
      addcomSnackbar({
        key: 'comSnackbar_' + Number(_comSnackbarList.value.length + 1),
        open: true,
        message: msg,
        anchorOrigin: anchor
          ? anchor
          : { vertical: 'top', horizontal: 'right' },
        duration: duration ? duration : 2000,
      });
    });
  }
  //-----------------------------------------------------------------  메세지창 열기 종료 --//
}

export default winiMsg;
export { winiMsg };
