import winiDate from './date';

/**
 * 결제/구독 관련 공통 포맷터 함수들
 */
/**
 * 날짜 포맷 (YYYY-MM-DD)
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return winiDate.dateFormat(winiDate(dateString), 'YYYY-MM-DD');
};

/**
 * 날짜시간 포맷 (YYYY-MM-DD HH:mm)
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return winiDate.dateFormat(winiDate(dateString), 'YYYY-MM-DD HH:mm');
};

/**
 * 금액 포맷 (₩ 천단위 구분)
 */
export const formatAmount = (amount) => {
  if (!amount) return '₩0';
  return '₩' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 결제 수단 타입 변환
 */
export const getPaymentTypeLabel = (paymentType) => {
  if (!paymentType) return '';
  const paymentTypes = {
    CARD: '카드',
    VIRTUAL_ACCOUNT: '가상계좌',
    EASY_PAY: '간편결제',
    MOBILE: '휴대폰',
    BANK_TRANSFER: '계좌이체',
  };
  return paymentTypes[paymentType] || paymentType;
};

/**
 * 결제 수단 타입 변환 (영수증용)
 */
export const getPaymentMethodLabel = (paymentMethod) => {
  if (!paymentMethod) return '';
  const paymentMethods = {
    CARD: '신용카드',
    VIRTUAL_ACCOUNT: '가상계좌',
    EASY_PAY: '간편결제',
    MOBILE: '휴대폰',
    BANK_TRANSFER: '계좌이체',
  };
  return paymentMethods[paymentMethod] || paymentMethod;
};

/**
 * 서비스 기간 계산 (고정 30일)
 */
export const getServicePeriodFixed = () => {
  return '결제 후 30일';
};

/**
 * 서비스 기간 계산 (시작일 기준)
 */
export const getServicePeriodFromDate = (startDate) => {
  if (!startDate) return '';
  const start = winiDate(startDate);
  const end = winiDate(start).add(30, 'day');
  return `${winiDate.dateFormat(start, 'YYYY-MM-DD')} ~ ${winiDate.dateFormat(end, 'YYYY-MM-DD')}`;
};

/**
 * 공급가액 계산 (부가세 포함 금액에서 역산)
 */
export const calculateSupplyAmount = (totalAmount) => {
  return Math.round(totalAmount / 1.1);
};

/**
 * 부가세 계산
 */
export const calculateVatAmount = (totalAmount, supplyAmount) => {
  return totalAmount - supplyAmount;
};
