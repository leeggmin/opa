import { useState, useRef, useCallback, useMemo } from 'react';
import { jobApi } from '../api/api';
import { winiMsg } from '@/shared/model';

export const useManage = (connector, serviceName, groupId, selectedGroupStatus) => {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState({
    id: '',
    name: '',
    className: '',
    sql: '',
    remark: '',
    commonJobGroupId: '',
    jobType: '',
    status: 'ENABLE',
  });
  const [searchParams, setSearchParams] = useState({
    jobType: '',
    name: '',
    status: 'ENABLE',
  });
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const fetchJobList = useCallback(async () => {
    if (!groupId) {
      setJobList([]);
      return;
    }

    try {
      const params = {
        searchKeyword: searchParamsRef.current.name,
        searchJobType: searchParamsRef.current.jobType,
        searchStatus: searchParamsRef.current.status,
      };
      const response = await jobApi.getList(
        connector,
        serviceName,
        groupId,
        params,
      );
      if (response.data !== null) {
        setJobList(response.data.data);
      }
    } catch {
      winiMsg.showSnackbar('작업 목록 조회 중 오류가 발생했습니다.');
    }
  }, [connector, serviceName, groupId]);

  const syncJobs = useCallback(async () => {
    try {
      const ans = await winiMsg.showConfirm(
        '작업목록을 동기화 하시겠습니까?\n※ 적용상태가 대기인것을 실제 스케쥴러에 반영합니다.',
      );
      if (ans === 'N') return false;

      const response = await jobApi.sync(connector, serviceName);
      if (response.data !== null) {
        winiMsg.showSnackbar('작업목록이 동기화 되었습니다.');
        await fetchJobList();
        return true;
      }
    } catch (e) {
      winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
      throw e;
    }
  }, [connector, serviceName, fetchJobList]);

  const createJob = useCallback(
    async (data) => {
      try {
        const params = { ...data, commonJobGroupId: groupId };
        const response = await jobApi.create(
          connector,
          serviceName,
          params,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchJobList();
          return response.data.data.id;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, groupId, fetchJobList],
  );

  const updateJob = useCallback(
    async (id, data) => {
      try {
        const response = await jobApi.update(
          connector,
          serviceName,
          id,
          data,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchJobList();
          return response.data.data.id;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, fetchJobList],
  );

  const deleteJob = useCallback(
    async (id) => {
      try {
        const ans = await winiMsg.showConfirm(
          '삭제시 하위 모든 데이터가 삭제됩니다. 해당 데이터를 정말로 삭제하시겠습니까?',
        );
        if (ans === 'N') return false;

        const response = await jobApi.delete(connector, serviceName, id);
        if (response.data !== null) {
          winiMsg.showSnackbar('정상적으로 삭제되었습니다.');
          await fetchJobList();
          return true;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, fetchJobList],
  );

  const resetSelectedJob = useCallback(() => {
    setSelectedJob({
      id: '',
      name: '',
      className: '',
      sql: '',
      remark: '',
      commonJobGroupId: '',
      jobType: '',
      status: 'ENABLE',
    });
  }, []);

  const handleSearchFieldChange = useCallback(
    (field, value) => {
      setSearchParams((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSelectedFieldChange = useCallback(
    (field, value) => {
      setSelectedJob((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const buttonDisabledStates = useMemo(
    () => ({
      insert: groupId === '' || selectedJob.id !== '',
      update: groupId === '' || selectedJob.id === '',
      delete: groupId === '' || selectedJob.id === '',
    }),
    [groupId, selectedJob.id],
  );

  return {
    jobList,
    selectedJob,
    setSelectedJob,
    searchParams,
    setSearchParams,
    fetchJobList,
    syncJobs,
    createJob,
    updateJob,
    deleteJob,
    resetSelectedJob,
    handleSearchFieldChange,
    handleSelectedFieldChange,
    buttonDisabledStates,
    selectedGroupStatus,
  };
};
