import { menuStore } from '@/shared/model';
import { ENV } from '../config';

/**
 * 전역 초기화 설정
 * FSD 규칙: 전역 부작용은 shared/lib로 분리
 */

/**
 * 개발용 전역 헬퍼 함수 설정
 */
export const setupGlobalHelpers = () => {
  if (ENV.IS_DEV === true) {
    // 개발용 현재 폼 아이디 조회 함수
    window._getCurId = function () {
      return menuStore.getCurrentMenuId();
    };
  }
};

/**
 * 애플리케이션 전역 초기화
 */
export const initializeApp = () => {
  setupGlobalHelpers();
};
