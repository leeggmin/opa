import { useState, useCallback } from 'react';
import { winiMsg } from '@/shared/model';
import { fireJobApi } from '../api/api';

export const useFireJob = (connector, serviceName, jobId) => {
  const [isLoading, setIsLoading] = useState(false);

  const fireJob = useCallback(async () => {
    if (!jobId) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fireJobApi.fire(connector, serviceName, jobId);
      if (response.data !== null) {
        winiMsg.showAlert('즉시실행이 요청되었습니다.');
      }
    } catch (e) {
      winiMsg.showAlert('즉시실행요청 실패 : ' + e);
    } finally {
      setIsLoading(false);
    }
  }, [connector, serviceName, jobId]);

  return {
    fireJob,
    isLoading,
  };
};
