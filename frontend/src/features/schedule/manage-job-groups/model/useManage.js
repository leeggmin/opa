import { useState, useRef, useCallback, useMemo } from 'react';
import { jobGroupApi } from '../api/api';
import { winiMsg } from '@/shared/model';

export const useManage = (connector, serviceName) => {
  const [jobGroupList, setJobGroupList] = useState([]);
  const [selectedJobGroup, setSelectedJobGroup] = useState({
    commonJobGroupId: '',
    name: '',
    remark: '',
    status: 'ENABLE',
  });
  const [searchParams, setSearchParams] = useState({
    name: '',
    status: 'ENABLE',
  });
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const fetchJobGroupList = useCallback(async () => {
    try {
      const params = {
        searchKeyword: searchParamsRef.current.name,
        searchStatus: searchParamsRef.current.status,
      };
      const response = await jobGroupApi.getList(
        connector,
        serviceName,
        params,
      );
      if (response.data !== null) {
        setJobGroupList(response.data.data);
      }
    } catch {
      winiMsg.showSnackbar('작업 그룹 목록 조회 중 오류가 발생했습니다.');
    }
  }, [connector, serviceName]);

  const createJobGroup = useCallback(
    async (data) => {
      try {
        const response = await jobGroupApi.create(
          connector,
          serviceName,
          data,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchJobGroupList();
          return response.data.data.commonJobGroupId;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, fetchJobGroupList],
  );

  const updateJobGroup = useCallback(
    async (id, data) => {
      try {
        const response = await jobGroupApi.update(
          connector,
          serviceName,
          id,
          data,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchJobGroupList();
          return response.data.data.commonJobGroupId;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, fetchJobGroupList],
  );

  const deleteJobGroup = useCallback(
    async (id) => {
      try {
        const ans = await winiMsg.showConfirm(
          '삭제시 하위 모든 데이터가 삭제됩니다. \n해당 데이터를 정말로 삭제하시겠습니까? ',
        );
        if (ans === 'N') return false;

        const response = await jobGroupApi.delete(
          connector,
          serviceName,
          id,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('정상적으로 삭제되었습니다.');
          await fetchJobGroupList();
          return true;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, fetchJobGroupList],
  );

  const resetSelectedJobGroup = useCallback(() => {
    setSelectedJobGroup({
      commonJobGroupId: '',
      name: '',
      remark: '',
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
      setSelectedJobGroup((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const buttonDisabledStates = useMemo(
    () => ({
      insert: selectedJobGroup.commonJobGroupId !== '',
      update: selectedJobGroup.commonJobGroupId === '',
      delete: selectedJobGroup.commonJobGroupId === '',
    }),
    [selectedJobGroup.commonJobGroupId],
  );

  return {
    jobGroupList,
    selectedJobGroup,
    setSelectedJobGroup,
    searchParams,
    setSearchParams,
    fetchJobGroupList,
    createJobGroup,
    updateJobGroup,
    deleteJobGroup,
    resetSelectedJobGroup,
    handleSearchFieldChange,
    handleSelectedFieldChange,
    buttonDisabledStates,
  };
};
