import { _helpformList, addHelpForm } from '../signals/helpSignals';
import { toEmpty } from '@/shared/lib';

/**
 * @typedef {Object} HelpItem
 * @property {string} title
 * @property {JSX.Element} el
 */

export default class winiHelp {
  /**
   * 헬프공통 call 함수
   * @param {HelpItem} helpItem HelpItem 객체 (title, el 포함)
   * @param {string} service 서비스 이름(필수)
   * @param {object} [params={}]  헬프팝업에 전달할 파라미터 여기에 keyword : '값' 을 넣으면 키워드 검색에 바로 입력
   * @returns {Promise<any>}  헬프에서 선택한 데이터 반환
   */
  static async show(helpItem, service, params = {}) {
    if (toEmpty(helpItem) == '') {
      return;
    }
    if (toEmpty(service) == '') {
      return;
    }

    return new Promise((resolve) => {
      const callbackfn = function (data) {
        resolve(JSON.parse(JSON.stringify(data))); // react element 가지고 오는 문제가 있어서 json으로 변환
      };
      addHelpForm({
        key: 'help_' + Number(_helpformList.value.length + 1),
        _inner: helpItem,
        open: true,
        params: params,
        service: service,
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
}

export { winiHelp };
