/**
 * 범용 sessionStorage 유틸리티 팩토리
 * - 키 기반으로 타입 안전한 storage 객체 생성
 *
 * @param {string} key - sessionStorage 키
 * @returns {Object} storage 유틸리티 객체
 *
 * @example
 * const userStorage = createSessionStorage('user');
 * userStorage.set({ name: 'John' });
 * const user = userStorage.get(); // { name: 'John' }
 * userStorage.remove();
 */
export const createSessionStorage = (key) => ({
  set: (value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: () => {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch {
      return null;
    }
  },
  remove: () => {
    sessionStorage.removeItem(key);
  },
});
