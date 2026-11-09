import { toEmpty } from './com';

/**
 * Data Dictionary
 * 데이터 보관 (Map)
 * 사용법 :let dic = new dictionary();
 * dic.setData('key','value')
 * dic.getData('key') -> return 'value';
 * -------------------------------------
 * 20221228 차현진 최초 작성 - javascript Map 을 사용해도 관계없으나 편의기능을 조금 추가함.
 */
class Dictionary {
  keys: string[];
  values: any[];
  size: number = 0;
  constructor() {
    this.keys = [];
    this.values = [];
    this.size = 0;
  }
  /**
   * dictionary 값 저장하기
   * @param key string 키값
   * @param value anytype 저장할 값
   * @returns Dictionary
   */
  setData(key: string, value: any): Dictionary | undefined {
    if (toEmpty(key) === '') {
      return this;
    } else {
      if (this.keys.indexOf(key) > -1) {
        const index = this.keys.indexOf(key);
        this.values[index] = value;
      } else {
        this.keys.push(key);
        this.values.push(value);
        this.size = this.size + 1;
      }
      return this;
    }
  }
  /**
   * dictionary 값 가져오기
   * @param key string 키값
   * @returns anytype 해당 키값의 저장값
   */
  getData(key: string): any {
    const index = this.keys.indexOf(key);
    if (index == -1) {
      return undefined;
    } else {
      return this.values[index];
    }
  }
  /**
   * 해당 키의 데이터 삭제 하기
   * @param key string 키값
   * @returns Dictionary
   */
  delete(key: string): Dictionary {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
      this.values.splice(index, 1);
      this.size = this.size - 1;
    }
    return this;
  }
  /**
   * 키값 리스트 가져오기
   * @returns Array 키값
   */
  getKeys(): string[] {
    return this.keys;
  }
}

export default Dictionary;
