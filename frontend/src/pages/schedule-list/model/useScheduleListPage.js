import { useRef, useCallback, useEffect } from 'react';
import { transformGridSelectionToJobGroup } from '@/features/schedule/manage-job-groups';
import { transformGridSelectionToJob } from '@/features/schedule/manage-jobs';

export const useScheduleListPage = (
  winiAut,
  jobGroupManage,
  jobManage,
  scheduleHistory,
) => {
  const refGroupGrid = useRef();
  const refJobGrid = useRef();
  const refRunGrid = useRef();

  const handleGroupGridSelection = useCallback(
    (e) => {
      const jobGroup = transformGridSelectionToJobGroup(e.api.getSelectedRows());
      if (jobGroup) {
        jobGroupManage.setSelectedJobGroup(jobGroup);
        jobManage.resetSelectedJob();
      }
    },
    [jobGroupManage, jobManage],
  );

  const handleJobGridSelection = useCallback(
    (e) => {
      const job = transformGridSelectionToJob(e.api.getSelectedRows());
      if (job) {
        jobManage.setSelectedJob(job);
      }
    },
    [jobManage],
  );

  // Initial data fetch
  useEffect(() => {
    if (winiAut.select === 'ALLOW') {
      jobGroupManage.fetchJobGroupList();
    }
  }, []);

  // Fetch job group list when selected job group changes
  useEffect(() => {
    if (winiAut.select === 'ALLOW') {
      if (jobGroupManage.selectedJobGroup.commonJobGroupId) {
        jobManage.fetchJobList();
      }
    }
  }, [jobGroupManage.selectedJobGroup.commonJobGroupId]);

  // Fetch job state and run list when selected job changes
  useEffect(() => {
    if (winiAut.select === 'ALLOW') {
      if (jobManage.selectedJob.id) {
        scheduleHistory.fetchJobState();
        scheduleHistory.fetchRunList();
      }
    }
  }, [winiAut.select, jobManage.selectedJob.id]);

  // Fetch run list when current page changes
  useEffect(() => {
    if (winiAut.select === 'ALLOW') {
      scheduleHistory.fetchRunList();
    }
  }, [winiAut.select, scheduleHistory.currentPage]);

  return {
    refGroupGrid,
    refJobGrid,
    refRunGrid,
    handleGroupGridSelection,
    handleJobGridSelection,
  };
};
