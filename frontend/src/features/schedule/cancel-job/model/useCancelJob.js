import { useState, useCallback } from 'react';
import { winiMsg } from '@/shared/model';
import { cancelJobApi } from '../api/api';

export const useCancelJob = (connector, serviceName, jobId) => {
  const [isLoading, setIsLoading] = useState(false);

  const cancelJob = useCallback(async () => {
    if (!jobId) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await cancelJobApi.cancel(connector, serviceName, jobId);
      if (response.data !== null) {
        winiMsg.showAlert('실행 중지가 요청되었습니다.');
      }
    } catch (e) {
      winiMsg.showAlert('실행 중지 요청 실패 : ' + e);
    } finally {
      setIsLoading(false);
    }
  }, [connector, serviceName, jobId]);

  return {
    cancelJob,
    isLoading,
  };
};
