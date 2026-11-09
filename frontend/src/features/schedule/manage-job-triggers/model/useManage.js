import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jobTriggerApi } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiDate } from '@/shared/lib';
import debounce from 'debounce';

export const useManage = (connector, serviceName, jobId, groupId, selectedGroupStatus) => {
  const [triggerList, setTriggerList] = useState([]);
  const [selectedTrigger, setSelectedTrigger] = useState({
    commonJobId: '',
    commonJobTriggerId: '',
    name: '',
    status: 'ENABLE',
    triggerCron: '',
    triggerSeconds: null,
    triggerType: '',
  });
  const [cronExampleData, setCronExampleData] = useState({
    errorMessage: '',
    exampleList: [],
  });
  const [hasCronError, setHasCronError] = useState(false);

  // debounced 함수와 최신 dependency 값을 위한 ref
  const checkCronExpressionRef = useRef(null);
  const latestDepsRef = useRef({ connector, serviceName, jobId });

  // 최신 dependency 값 업데이트
  useEffect(() => {
    latestDepsRef.current = { connector, serviceName, jobId };
  }, [connector, serviceName, jobId]);

  const fetchTriggerList = useCallback(async () => {
    if (!jobId) {
      setTriggerList([]);
      return;
    }

    try {
      const response = await jobTriggerApi.getList(
        connector,
        serviceName,
        jobId,
      );
      if (response.data !== null) {
        setTriggerList(response.data.data);
      }
    } catch {
      winiMsg.showSnackbar('트리거 목록 조회 중 오류가 발생했습니다.');
    }
  }, [connector, serviceName, jobId]);

  const createTrigger = useCallback(
    async (data) => {
      try {
        const params = { ...data, commonJobId: jobId };
        const response = await jobTriggerApi.create(
          connector,
          serviceName,
          jobId,
          params,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchTriggerList();
          return response.data.data.commonJobTriggerId;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, jobId, fetchTriggerList],
  );

  const updateTrigger = useCallback(
    async (triggerId, data) => {
      try {
        const response = await jobTriggerApi.update(
          connector,
          serviceName,
          jobId,
          triggerId,
          data,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('저장되었습니다.');
          await fetchTriggerList();
          return response.data.data.commonJobTriggerId;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, jobId, fetchTriggerList],
  );

  const deleteTrigger = useCallback(
    async (triggerId) => {
      try {
        const ans = await winiMsg.showConfirm(
          '해당 데이터를 정말로 삭제하시겠습니까?',
        );
        if (ans === 'N') return false;

        const response = await jobTriggerApi.delete(
          connector,
          serviceName,
          jobId,
          triggerId,
        );
        if (response.data !== null) {
          winiMsg.showSnackbar('정상적으로 삭제되었습니다.');
          await fetchTriggerList();
          return true;
        }
      } catch (e) {
        winiMsg.showSnackbar(e.response?.data?.message || '오류가 발생했습니다.');
        throw e;
      }
    },
    [connector, serviceName, jobId, fetchTriggerList],
  );

  // debounced 함수 초기화 (한 번만 생성, ref를 통해 최신 값 참조)
  if (!checkCronExpressionRef.current) {
    checkCronExpressionRef.current = debounce(async (cronExpression) => {
      const { connector, serviceName, jobId } = latestDepsRef.current;
      let cronErrorMsg = '';
      let cronExampleList = [];

      const params = {
        cronExpression: cronExpression,
      };

      try {
        if (serviceName && jobId) {
          const response = await jobTriggerApi.checkCronExpression(
            connector,
            serviceName,
            jobId,
            params,
          );

          if (response.data !== null) {
            const { isValid, errMsg, exampleList } = response.data.data;
            cronExampleList = (exampleList || []).map((item) => {
              return winiDate.dateFormat(
                winiDate(item),
                'YYYY-MM-DD (ddd) HH:mm:ss',
              );
            });

            if (isValid) {
              setHasCronError(false);
              cronErrorMsg = '';
            } else {
              setHasCronError(true);
              cronErrorMsg = errMsg || '알수없는 오류가 발생하였습니다.';
            }
          }
        } else {
          setHasCronError(true);
          cronErrorMsg = '작업을 선택해주세요.';
        }
      } catch (e) {
        setHasCronError(true);
        cronErrorMsg = '오류가 발생하였습니다. (' + e + ')';
      }

      setCronExampleData({
        errorMessage: cronErrorMsg,
        exampleList: cronExampleList,
      });
    }, 500);
  }

  const checkCronExpression = useCallback(
    (cronExpression) => {
      if (checkCronExpressionRef.current) {
        checkCronExpressionRef.current(cronExpression);
      }
    },
    [],
  );

  const resetSelectedTrigger = useCallback(() => {
    setSelectedTrigger({
      commonJobId: '',
      commonJobTriggerId: '',
      name: '',
      status: 'ENABLE',
      triggerCron: '',
      triggerSeconds: null,
      triggerType: '',
    });
  }, []);

  const handleSelectedFieldChange = useCallback(
    (field, value) => {
      setSelectedTrigger((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const buttonDisabledStates = useMemo(
    () => ({
      scheduleAdd: groupId === '' || jobId === '',
      insert: groupId === '' || jobId === '' || selectedTrigger.commonJobTriggerId !== '',
      update: groupId === '' || jobId === '' || selectedTrigger.commonJobTriggerId === '',
      delete: groupId === '' || jobId === '' || selectedTrigger.commonJobTriggerId === '',
    }),
    [groupId, jobId, selectedTrigger.commonJobTriggerId],
  );

  return {
    triggerList,
    selectedTrigger,
    setSelectedTrigger,
    cronExampleData,
    hasCronError,
    fetchTriggerList,
    createTrigger,
    updateTrigger,
    deleteTrigger,
    checkCronExpression,
    resetSelectedTrigger,
    handleSelectedFieldChange,
    buttonDisabledStates,
    selectedGroupStatus,
  };
};
