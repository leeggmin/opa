import { useState, useRef, useEffect, useCallback } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { fetchCommonCodeList } from '../api/api';

/**
 * 공통 코드 목록 관리 훅 (3단계 depth)
 */
export const useList = () => {
  const { connector } = winiCom.getFormInfo();

  // 그리드 ref
  const codeGridRef1 = useRef(null);
  const codeGridRef2 = useRef(null);
  const codeGridRef3 = useRef(null);

  // 검색 조건
  const [searchData, setSearchData] = useState({
    depth1CodeName: '',
    depth1Code: '',
    depth1CodeId: '',
    depth1Keyword: '',
    depth2CodeName: '',
    depth2Code: '',
    depth2CodeId: '',
    depth2Keyword: '',
    depth3CodeName: '',
    depth3Code: '',
    depth3CodeId: '',
    depth3Keyword: '',
    nowDepth: '1',
  });
  const searchDataRef = useRef(searchData);
  searchDataRef.current = searchData;

  // 각 depth별 목록
  const [codeListDepth1, setCodeListDepth1] = useState([]);
  const [codeListDepth2, setCodeListDepth2] = useState([]);
  const [codeListDepth3, setCodeListDepth3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // depth1 목록 조회
  const loadCodeListDepth1 = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchDataRef.current.depth1Keyword) {
        params.keyword = searchDataRef.current.depth1Keyword;
      }

      const data = await fetchCommonCodeList(connector, params);
      setCodeListDepth1(data || []);
      codeGridRef1.current?.api.deselectAll();
    } catch (err) {
      setError(err);
      winiMsg.showSnackbar('코드 조회 중 오류 발생');
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  // depth2 목록 조회
  const loadCodeListDepth2 = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchDataRef.current.depth2Keyword) {
        params.keyword = searchDataRef.current.depth2Keyword;
      }
      if (searchDataRef.current.depth1CodeId) {
        params.upperCodeId = searchDataRef.current.depth1CodeId;
      }

      const data = await fetchCommonCodeList(connector, params);
      setCodeListDepth2(data || []);
      codeGridRef2.current?.api.deselectAll();
    } catch (err) {
      setError(err);
      winiMsg.showSnackbar('코드 조회 중 오류 발생');
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  // depth3 목록 조회
  const loadCodeListDepth3 = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchDataRef.current.depth3Keyword) {
        params.keyword = searchDataRef.current.depth3Keyword;
      }
      if (searchDataRef.current.depth2CodeId) {
        params.upperCodeId = searchDataRef.current.depth2CodeId;
      }

      const data = await fetchCommonCodeList(connector, params);
      setCodeListDepth3(data || []);
      codeGridRef3.current?.api.deselectAll();
    } catch (err) {
      setError(err);
      winiMsg.showSnackbar('코드 조회 중 오류 발생');
    } finally {
      setIsLoading(false);
    }
  }, [connector]);

  // 검색어 변경
  const handleKeywordChange = (depth, value) => {
    setSearchData({ ...searchData, [`depth${depth}Keyword`]: value });
  };

  // depth1 검색 및 초기화
  const handleSearchDepth1 = () => {
    setSearchData({
      ...searchData,
      depth1Code: '',
      depth1CodeId: '',
      depth1CodeName: '',
      depth2Code: '',
      depth2CodeId: '',
      depth2CodeName: '',
      depth3Code: '',
      depth3CodeId: '',
      depth3CodeName: '',
      nowDepth: '1',
    });
    loadCodeListDepth1();
  };

  // depth2 검색 및 초기화
  const handleSearchDepth2 = () => {
    setSearchData({
      ...searchData,
      depth2Code: '',
      depth2CodeId: '',
      depth2CodeName: '',
      depth3Code: '',
      depth3CodeId: '',
      depth3CodeName: '',
      nowDepth: '2',
    });
    loadCodeListDepth2();
  };

  // depth3 검색 및 초기화
  const handleSearchDepth3 = () => {
    setSearchData({
      ...searchData,
      depth3Code: '',
      depth3CodeId: '',
      depth3CodeName: '',
      nowDepth: '3',
    });
    loadCodeListDepth3();
  };

  // 초기 로드
  useEffect(() => {
    loadCodeListDepth1();
  }, []);

  // depth1 선택 시 depth2 로드
  useEffect(() => {
    if (searchData.depth1CodeId) {
      loadCodeListDepth2();
    } else {
      setCodeListDepth2([]);
      setCodeListDepth3([]);
    }
  }, [searchData.depth1CodeId]);

  // depth2 선택 시 depth3 로드
  useEffect(() => {
    if (searchData.depth2CodeId) {
      loadCodeListDepth3();
    } else {
      setCodeListDepth3([]);
    }
  }, [searchData.depth2CodeId]);

  return {
    codeGridRef1,
    codeGridRef2,
    codeGridRef3,
    searchData,
    setSearchData,
    codeListDepth1,
    codeListDepth2,
    codeListDepth3,
    isLoading,
    error,
    handleKeywordChange,
    handleSearchDepth1,
    handleSearchDepth2,
    handleSearchDepth3,
    loadCodeListDepth1,
    loadCodeListDepth2,
    loadCodeListDepth3,
  };
};
