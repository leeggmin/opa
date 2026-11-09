import { useState, useEffect, useCallback, useRef } from 'react';
import { jobApi, jobRunApi } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiDate } from '@/shared/lib';

export const useScheduleHistory = (connector, serviceName, jobId) => {
  const pageSize = 15;
  const [runList, setRunList] = useState([]);
  const [jobState, setJobState] = useState({
    commonJobStateId: '',
    commonJobId: '',
    lastStartedAt: '',
    lastEndedAt: '',
    lastSuccessAt: '',
    lastFailedAt: '',
    updateAt: '',
    currentRunId: '',
    lastRunId: '',
    errCnt: '',
    lastMessage: '',
  });
  const [searchParams, setSearchParams] = useState({
    from: winiDate.addDate(winiDate(), -7),
    to: winiDate(),
    status: '',
  });
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;
  const [pagesInfo, setPagesInfo] = useState({
    totalCnt: 1,
    pageSize: pageSize,
  });
  const [isLiveUpdate, setIsLiveUpdate] = useState(false);

  const fetchJobState = useCallback(async () => {
    if (!jobId) {
      setJobState({
        commonJobStateId: '',
        commonJobId: '',
        lastStartedAt: '',
        lastEndedAt: '',
        lastSuccessAt: '',
        lastFailedAt: '',
        updateAt: '',
        currentRunId: '',
        lastRunId: '',
        errCnt: '',
        lastMessage: '',
      });
      return;
    }

    try {
      const response = await jobApi.getState(
        connector,
        serviceName,
        jobId,
      );
      if (response.data !== null) {
        setJobState(response.data.data);
      }
    } catch {
      winiMsg.showSnackbar('작업 상태 조회 중 오류가 발생했습니다.');
    }
  }, [connector, serviceName, jobId]);

  const fetchRunList = useCallback(async () => {
    if (!jobId) {
      setRunList([]);
      return;
    }

    try {
      const params = {
        searchStartDateTime: winiDate
          .dateParseStartOf(searchParamsRef.current.from)
          .toISOString(),
        searchEndDateTime: winiDate
          .dateParseEndOf(searchParamsRef.current.to)
          .toISOString(),
        searchJobStatus: searchParamsRef.current.status,
        page: currentPageRef.current - 1,
        pageSize: pageSize,
      };
      const response = await jobRunApi.getList(
        connector,
        serviceName,
        jobId,
        params,
      );
      if (response.data !== null) {
        setRunList(response.data.data);
        setPagesInfo((prev) => ({
          ...prev,
          totalCnt: response.data.metadata.totalRecords,
        }));
      }
    } catch {
      winiMsg.showSnackbar('실행 이력 조회 중 오류가 발생했습니다.');
    }
  }, [
    connector,
    serviceName,
    jobId,
    pageSize,
  ]);

  const fireJob = useCallback(async () => {
    try {
      const response = await jobApi.fire(connector, serviceName, jobId);
      if (response.data !== null) {
        winiMsg.showAlert('즉시실행이 요청되었습니다.');
      }
    } catch (e) {
      winiMsg.showAlert('즉시실행요청 실패 : ' + e);
    }
  }, [connector, serviceName, jobId]);

  const cancelJob = useCallback(async () => {
    try {
      const response = await jobApi.cancel(
        connector,
        serviceName,
        jobId,
      );
      if (response.data !== null) {
        winiMsg.showAlert('실행 중지가 요청되었습니다.');
      }
    } catch (e) {
      winiMsg.showAlert('실행 중지 요청 실패 : ' + e);
    }
  }, [connector, serviceName, jobId]);

  const toggleLiveUpdate = useCallback(() => {
    setIsLiveUpdate((prev) => !prev);
  }, []);

  const resetRunList = useCallback(() => {
    setCurrentPage(1);
    setPagesInfo({ totalCnt: 1, pageSize: pageSize });
  }, []);

  const handleSearchFieldChange = useCallback(
    (field, value) => {
      setSearchParams((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Live update polling effect
  useEffect(() => {
    let intervalId = 0;
    let isSearching = false;

    if (isLiveUpdate) {
      intervalId = setInterval(async () => {
        try {
          if (isSearching) {
            return;
          }

          isSearching = true;
          await fetchJobState();
        } finally {
          isSearching = false;
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLiveUpdate, fetchJobState]);

  // Refetch run list when job state updates during live update
  useEffect(() => {
    if (isLiveUpdate && jobId) {
      fetchRunList();
    }
  }, [isLiveUpdate, jobState.updateAt, jobId, fetchRunList]);

  return {
    runList,
    jobState,
    searchParams,
    setSearchParams,
    currentPage,
    setCurrentPage,
    pagesInfo,
    isLiveUpdate,
    fetchJobState,
    fetchRunList,
    fireJob,
    cancelJob,
    toggleLiveUpdate,
    resetRunList,
    handleSearchFieldChange,
  };
};
