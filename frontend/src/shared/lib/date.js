import dayjs from "dayjs"
import { toEmpty } from './com'

class _winiDate {

  constructor(param) {
    this.standardFormat = 'YYYY-MM-DD';//바뀌면 바꿔주기
    this.standardFullFormat = 'YYYY-MM-DD HH:mm:ss'
    this.date = dayjs(param);
    return this.date; // dayjs 객체를 반환
  }

  /**
   * 현재날짜와 시간간
   * @returns 현재날짜
   */
  static now() {
    return dayjs();
  }

  /*
  * 날짜포멧맞추기
  * @param paramDate 날짜형식의 데이터 ex)winiDate('날짜')
  * @param format YYYY년 MM월 DD일 HH시간 mm분 ss초 ex) yyyy-mm-dd
  *               파라메터 누락시 standard 형식
  * @returns string 형식 format에 맞춘값 ex)2022-12-30
  */
  static dateFormat = function (paramDate, format) {
    if (typeof paramDate !== 'object') {
      return '';
    }
    //yyyymmddhhmiss
    let date = ''
    //빈포멧은 yyyymmdd
    if (toEmpty(format) == '') {
      date = dayjs(paramDate).format(this.standardFormat)
    } else {
      try {
        date = dayjs(paramDate).format(format);
      } catch {
        // 날짜 변환 실패 시 빈 문자열 반환
      }
    }
    return date;
  }

  /**1
   * 날짜계산하기
   * @param date 날짜형식의 값 (new Date())
   * @param day  더할일수
   * @param opt 옵션 빈값은 "d" d:날짜, m:달, y:년
   * @returns
   */
  static addDate = function (date, day, opt = "d") {
    let curDate = null;
    date = new Date(date)
    curDate = date;
    if (opt == "d") {
      curDate.setDate(date.getDate() + day);
    } else if (opt == "m") {
      curDate.setMonth(date.getMonth() + day);
    } else if (opt == "y") {
      curDate.setFullYear(date.getFullYear() + day);
    } else {
      return null;
    }
    return dayjs(curDate);
  }
  /**
   * 사이값 일자로 계산하기
   * @param fromdate 시작일자
   * @param toDate 끝일자
   * @returns 일로 표시
   */
  static getBetweenDay = function (fromdate, toDate) {
    let between_date = null;
    fromdate = new Date(fromdate)
    toDate = new Date(toDate)
    between_date = Math.round((toDate.valueOf() - fromdate.valueOf()) / 1000 / 60 / 60 / 24);
    return between_date;
  }
  /**
   * 해당월의 마지막 날 가져오기
   * @param date 일자
   * @returns 해당월의 마지막일
   */
  static getLastDateofMonth = function (date) {
    date = new Date(date);
    return dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }
  /**
   * 해당월의 1일 가져오기
   * @param date 일자
   * @returns 해당월의 1일
   */
  static getFirstDateofMonth = function (date) {
    date = new Date(date);
    return dayjs(new Date(date.getFullYear(), date.getMonth(), 1));
  }
  /**
   * dayjs로 세팅한 로케이션으로 파싱하기
   * @param date 일자
   * @returns dayjs 형식으로 리턴
   */
  static dateParse = function (date) {
    return dayjs(date).tz()
  }
  /**
   * dayjs로 해당일자의 0시0분0초 로 세팅하기
   * @param date 일자
   * @returns 해당일자의 0시 0분 0초
   */
  static dateParseStartOf = function (date) {
    return dayjs(date).tz().startOf('day')
  }
  /**
   * dayjs로 해당일자의 23시59분59초 로 세팅하기
   * @param date 일자
   * @returns 해당일자의 23시 59분 59초
   */
  static dateParseEndOf = function (date) {
    return dayjs(date).tz().endOf('day')
  }
}


//-----------------------------------------------------------------  날짜함수 종료 --//

// 래퍼 함수 정의
function winiDate(param) {
  return new _winiDate(param);
}
// 클래스의 정적 메서드를 래퍼 함수에 추가
winiDate.now = _winiDate.now;
/*
* 날짜포멧맞추기
* @param paramDate 날짜형식의 데이터 ex)new Date()
* @param format yyyy년도 mm월 dd일 hh시간 mi분 ss초 ex) yyyy-mm-dd
*               파라메터 누락시 yyyymmdd 형식
* @returns string 형식 format에 맞춘값 ex)2022-12-30
*/
winiDate.dateFormat = _winiDate.dateFormat;
/**
 * 날짜계산하기
 * @param date 날짜형식의 값 (new Date())
 * @param day  더할일수
 * @param opt 옵션 빈값은 "d" d:날짜, m:달, y:년
 * @returns
 */
winiDate.addDate = _winiDate.addDate
/**
 * 사이값 일자로 계산하기
 * @param fromdate 시작일자
 * @param toDate 끝일자
 * @returns 일로 표시
 */
winiDate.getBetweenDay = _winiDate.getBetweenDay
/**
 * 해당월의 마지막 날 가져오기
 * @param date 일자
 * @returns 해당월의 마지막일
 */
winiDate.getLastDateofMonth = _winiDate.getLastDateofMonth
/**
 * 해당월의 1일 가져오기
 * @param date 일자
 * @returns 해당월의 1일
 */
winiDate.getFirstDateofMonth = _winiDate.getFirstDateofMonth
/**
 * dayjs로 세팅한 로케이션으로 파싱하기
 * @param date 일자
 * @returns dayjs 형식으로 리턴
 */
winiDate.dateParse = _winiDate.dateParse
/**
 * dayjs로 해당일자의 0시0분0초 로 세팅하기
 * @param date 일자
 * @returns 해당일자의 0시 0분 0초
 */
winiDate.dateParseStartOf = _winiDate.dateParseStartOf
/**
 * dayjs로 해당일자의 23시59분59초 로 세팅하기
 * @param date 일자
 * @returns 해당일자의 23시 59분 59초
 */
winiDate.dateParseEndOf = _winiDate.dateParseEndOf
export default winiDate;
