import { useEffect, useRef, useState } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  transformGridSelectionToJobGroup,
} from '@/features/schedule/manage-job-groups';
import {
  transformGridSelectionToJob,
} from '@/features/schedule/manage-jobs';
import {
  transformGridSelectionToTrigger,
} from '@/features/schedule/manage-job-triggers';

export const useScheduleManagementPage = (
  jobGroupManage,
  jobManage,
  jobTriggerManage,
  serviceName,
) => {
  const [findGroupId, setFindGroupId] = useState('');

  const refGroupGrid = useRef();
  const refJobGrid = useRef();
  const refTriggerGrid = useRef();
  const refGroupForm = useRef();
  const refJobForm = useRef();
  const refTriggerForm = useRef();

  // Grid selection handlers
  const handleGroupGridSelection = (e) => {
    const rowData = e.api.getSelectedRows();
    const jobGroup = transformGridSelectionToJobGroup(rowData);
    if (jobGroup) {
      jobGroupManage.setSelectedJobGroup(jobGroup);
      jobManage.resetSelectedJob();
      jobTriggerManage.resetSelectedTrigger();
    }
  };

  const handleJobGridSelection = (e) => {
    const rowData = e.api.getSelectedRows();
    const job = transformGridSelectionToJob(rowData);
    if (job) {
      jobManage.setSelectedJob(job);
    }
  };

  const handleTriggerGridSelection = (e) => {
    const rowData = e.api.getSelectedRows();
    const trigger = transformGridSelectionToTrigger(rowData);
    if (trigger) {
      jobTriggerManage.setSelectedTrigger(trigger);
    }
  };

  // Job Group CRUD handlers
  const handleGroupInsert = async () => {
    const chk = winiCom.isValidCheck(refGroupForm.current);
    if (!chk) return;

    const params = { ...jobGroupManage.selectedJobGroup };
    const id = await jobGroupManage.createJobGroup(params);
    if (id) setFindGroupId(id);
  };

  const handleGroupUpdate = async () => {
    const chk = winiCom.isValidCheck(refGroupForm.current);
    if (!chk) return;

    const params = { ...jobGroupManage.selectedJobGroup };
    const id = await jobGroupManage.updateJobGroup(
      jobGroupManage.selectedJobGroup.commonJobGroupId,
      params,
    );
    if (id) setFindGroupId(id);
  };

  const handleGroupDelete = async () => {
    const result = await jobGroupManage.deleteJobGroup(
      jobGroupManage.selectedJobGroup.commonJobGroupId,
    );
    if (result) {
      jobManage.resetSelectedJob();
      jobTriggerManage.resetSelectedTrigger();
      jobGroupManage.resetSelectedJobGroup();
    }
  };

  // Job CRUD handlers
  const handleJobInsert = async () => {
    const chk = winiCom.isValidCheck(refJobForm.current);
    if (!chk) return;

    const params = { ...jobManage.selectedJob };
    const id = await jobManage.createJob(params);
    if (id) setFindGroupId(id);
  };

  const handleJobUpdate = async () => {
    const chk = winiCom.isValidCheck(refJobForm.current);
    if (!chk) return;

    const params = { ...jobManage.selectedJob };
    const id = await jobManage.updateJob(jobManage.selectedJob.id, params);
    if (id) setFindGroupId(id);
  };

  const handleJobDelete = async () => {
    const result = await jobManage.deleteJob(jobManage.selectedJob.id);
    if (result) {
      jobManage.resetSelectedJob();
      jobTriggerManage.resetSelectedTrigger();
    }
  };

  // Trigger CRUD handlers
  const handleTriggerInsert = async () => {
    if (
      jobTriggerManage.selectedTrigger.triggerType === 'CRON' &&
      jobTriggerManage.hasCronError
    ) {
      await winiMsg.showAlert(
        'CRON 문법 오류가 있습니다. 수정 후 다시 시도해 주세요.',
      );
      return;
    }

    const chk = winiCom.isValidCheck(refTriggerForm.current);
    if (!chk) return;

    const params = { ...jobTriggerManage.selectedTrigger };
    const id = await jobTriggerManage.createTrigger(params);
    if (id) setFindGroupId(id);
  };

  const handleTriggerUpdate = async () => {
    if (
      jobTriggerManage.selectedTrigger.triggerType === 'CRON' &&
      jobTriggerManage.hasCronError
    ) {
      await winiMsg.showAlert(
        'CRON 문법 오류가 있습니다. 수정 후 다시 시도해 주세요.',
      );
      return;
    }

    const chk = winiCom.isValidCheck(refTriggerForm.current);
    if (!chk) return;

    const params = { ...jobTriggerManage.selectedTrigger };
    const id = await jobTriggerManage.updateTrigger(
      jobTriggerManage.selectedTrigger.commonJobTriggerId,
      params,
    );
    if (id) setFindGroupId(id);
  };

  const handleTriggerDelete = async () => {
    const result = await jobTriggerManage.deleteTrigger(
      jobTriggerManage.selectedTrigger.commonJobTriggerId,
    );
    if (result) {
      jobTriggerManage.resetSelectedTrigger();
    }
  };

  // Grid row selection utility
  const selectedRowGrid = (grid, id, idname) => {
    grid.current.api.forEachNode((item) => {
      if (id === item.data[idname]) {
        item.setSelected(true);
      }
    });
    setFindGroupId('');
  };

  // Effects for data fetching and synchronization
  useEffect(() => {
    // serviceName 변경 시 모든 데이터 초기화
    jobGroupManage.resetSelectedJobGroup();
    jobManage.resetSelectedJob();
    jobTriggerManage.resetSelectedTrigger();
    jobGroupManage.fetchJobGroupList();
  }, [serviceName]);

  useEffect(() => {
    jobGroupManage.fetchJobGroupList();
  }, []);

  useEffect(() => {
    if (jobGroupManage.selectedJobGroup.commonJobGroupId) {
      jobManage.fetchJobList();
    }
  }, [jobGroupManage.selectedJobGroup.commonJobGroupId]);

  useEffect(() => {
    if (jobManage.selectedJob.id) {
      jobTriggerManage.fetchTriggerList();
    }
  }, [jobManage.selectedJob.id]);

  useEffect(() => {
    if (findGroupId !== '') {
      selectedRowGrid(refGroupGrid, findGroupId, 'commonJobGroupId');
    }
  }, [jobGroupManage.jobGroupList]);

  useEffect(() => {
    if (findGroupId !== '') {
      selectedRowGrid(refJobGrid, findGroupId, 'id');
    }
  }, [jobManage.jobList]);

  useEffect(() => {
    if (findGroupId !== '') {
      selectedRowGrid(refTriggerGrid, findGroupId, 'commonJobTriggerId');
    }
  }, [jobTriggerManage.triggerList]);

  useEffect(() => {
    jobTriggerManage.checkCronExpression(
      jobTriggerManage.selectedTrigger.triggerCron,
    );
  }, [jobTriggerManage.selectedTrigger.triggerCron]);

  return {
    refGroupGrid,
    refJobGrid,
    refTriggerGrid,
    refGroupForm,
    refJobForm,
    refTriggerForm,
    handleGroupGridSelection,
    handleJobGridSelection,
    handleTriggerGridSelection,
    handleGroupInsert,
    handleGroupUpdate,
    handleGroupDelete,
    handleJobInsert,
    handleJobUpdate,
    handleJobDelete,
    handleTriggerInsert,
    handleTriggerUpdate,
    handleTriggerDelete,
  };
};
