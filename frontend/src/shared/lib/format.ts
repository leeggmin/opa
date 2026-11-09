/**
 * 숫자(또는 숫자로 변환 가능한 값)를 3자리마다 콤마(,)로 구분해 문자열로 반환하는 함수
 *
 * - value가 undefined / null / ''(빈 문자열)인 경우 '0'을 반환
 * - 그 외에는 value를 문자열로 변환한 뒤 정규식을 이용해 천 단위 구분자(,)를 삽입
 *
 * @param value 포맷팅할 값
 * @returns 천 단위 구분자가 적용된 문자열 (예: 1234567 -> "1,234,567")
 *
 * @example
 * thousandSeparator(0);          // "0"
 * thousandSeparator(1234);       // "1,234"
 * thousandSeparator("9876543");  // "9,876,543"
 * thousandSeparator(null);       // "0"
 */
export const formatThousands = (
  value: number | string | null | undefined,
): string => {
  if (value === undefined || value === null || value === '') return '0';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 전화번호 숫자만 받아 한국 형식으로 포맷
 * - 02: 서울/경기 02-XXXX-XXXX (9~10자리)
 * - 010/011/지역번호: XXX-XXXX-XXXX (10~11자리)
 * @param digits 숫자만 포함한 문자열
 * @returns 포맷된 전화번호
 */
export function formatPhoneNumber(digits: string | number | null | undefined): string {
    const s = String(digits ?? "").replace(/\D/g, "");
    if (!s) return "";

    const isSeoul = s.length >= 2 && s.slice(0, 2) === "02";

    if (isSeoul) {
        if (s.length <= 2) return s;
        if (s.length <= 5) return `${s.slice(0, 2)}-${s.slice(2)}`;
        if (s.length <= 9) return `${s.slice(0, 2)}-${s.slice(2, 5)}-${s.slice(5)}`;
        return `${s.slice(0, 2)}-${s.slice(2, 6)}-${s.slice(6, 10)}`;
    } else {
        if (s.length <= 3) return s;
        if (s.length <= 7) return `${s.slice(0, 3)}-${s.slice(3)}`;
        if (s.length <= 10) return `${s.slice(0, 3)}-${s.slice(3, 6)}-${s.slice(6)}`;
        return `${s.slice(0, 3)}-${s.slice(3, 7)}-${s.slice(7, 11)}`;
    }
}

/**
 * 초를 시/분/초로 변환 (범용)
 * @param seconds 초 단위 시간
 * @returns { hours, minutes, seconds }
 */
export const formatTime = (seconds: number,): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
};

/**
 * 성과 이름을 붙여 전체 이름 문자열로 반환
 * @param lastName 성
 * @param firstName 이름
 * @returns 전체 이름
 */
export const formatFullName = (lastName: string, firstName: string): string => {
  return `${lastName}${firstName}`;
}

class winiFormat {
  static formatThousands = formatThousands;
  static formatPhoneNumber = formatPhoneNumber;
  static formatTime = formatTime;
  static formatFullName = formatFullName;
}
export default winiFormat;
