/**
 * 공통코드 관리 API
 */

/**
 * 공통코드 목록 조회
 */
export { fetchCodes as fetchCommonCodeList } from '@/entities/code';

/**
 * 공통코드 등록
 */
export { createCode as createCommonCode } from '@/entities/code';

/**
 * 공통코드 수정
 */
export { updateCode as updateCommonCode } from '@/entities/code';

/**
 * 공통코드 삭제
 */
export { deleteCode as deleteCommonCode } from '@/entities/code';
