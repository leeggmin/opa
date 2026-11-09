import { useState } from 'react';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniTypography, WiniGridItem } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import {
  useJobGroupManage,
  JobGroupGrid,
  JobGroupSearchBar,
  JobGroupForm,
} from '@/features/schedule/manage-job-groups';
import {
  useJobManage,
  JobGrid,
  JobSearchBar,
  JobForm,
  createApplyStatusCellRenderer as createJobApplyStatusCellRenderer,
} from '@/features/schedule/manage-jobs';
import {
  useJobTriggerManage,
  JobTriggerGrid,
  JobTriggerForm,
  createApplyStatusCellRenderer,
} from '@/features/schedule/manage-job-triggers';
import { useScheduleManagementPage } from '../model/useScheduleManagementPage';

export function ScheduleManagementPage() {
  const { connector } = winiCom.getFormInfo();
  const [serviceName, setServiceName] = useState('system');

  const jobGroupManage = useJobGroupManage(connector, serviceName);
  const jobManage = useJobManage(
    connector,
    serviceName,
    jobGroupManage.selectedJobGroup.commonJobGroupId,
    jobGroupManage.selectedJobGroup.status,
  );
  const jobTriggerManage = useJobTriggerManage(
    connector,
    serviceName,
    jobManage.selectedJob.id,
    jobGroupManage.selectedJobGroup.commonJobGroupId,
    jobGroupManage.selectedJobGroup.status,
  );

  const {
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
  } = useScheduleManagementPage(
    jobGroupManage,
    jobManage,
    jobTriggerManage,
    serviceName,
  );

  return (
    <WiniFormNormal>
      <WiniGridLayout container columnSpacing={1}>
        <WiniGridItem size={{ md: 3, xs: 12 }}>
          <JobGroupSearchBar
            serviceName={serviceName}
            onServiceNameChange={(e) => setServiceName(e.target.value)}
            searchParams={jobGroupManage.searchParams}
            onFieldChange={jobGroupManage.handleSearchFieldChange}
            onSearch={jobGroupManage.fetchJobGroupList}
          />

          <JobGroupGrid
            ref={refGroupGrid}
            height={530}
            jobGroupList={jobGroupManage.jobGroupList}
            onSelectionChanged={handleGroupGridSelection}
          />

          <JobGroupForm
            ref={refGroupForm}
            selectedJobGroup={jobGroupManage.selectedJobGroup}
            onFieldChange={jobGroupManage.handleSelectedFieldChange}
            onInsert={handleGroupInsert}
            onUpdate={handleGroupUpdate}
            onDelete={handleGroupDelete}
            onReset={jobGroupManage.resetSelectedJobGroup}
            isInsertDisabled={jobGroupManage.buttonDisabledStates.insert}
            isUpdateDisabled={jobGroupManage.buttonDisabledStates.update}
            isDeleteDisabled={jobGroupManage.buttonDisabledStates.delete}
          />
        </WiniGridItem>

        <WiniGridItem size={{ md: 9, xs: 12 }}>
          <JobSearchBar
            searchParams={jobManage.searchParams}
            onFieldChange={jobManage.handleSearchFieldChange}
            onSearch={jobManage.fetchJobList}
            onSync={jobManage.syncJobs}
            disabled={jobGroupManage.selectedJobGroup.commonJobGroupId === ''}
          />

          <WiniGridLayout container columnSpacing={1}>
            <WiniGridItem size={{ md: 4, xs: 12 }}>
              <JobGrid
                ref={refJobGrid}
                jobList={jobManage.jobList}
                applyStatusCellRenderer={createJobApplyStatusCellRenderer(
                  jobManage.selectedGroupStatus,
                )}
                onSelectionChanged={handleJobGridSelection}
              />
            </WiniGridItem>

            <WiniGridItem size={{ md: 8, xs: 12 }}>
              <JobForm
                ref={refJobForm}
                selectedJob={jobManage.selectedJob}
                onFieldChange={jobManage.handleSelectedFieldChange}
                onInsert={handleJobInsert}
                onUpdate={handleJobUpdate}
                onDelete={handleJobDelete}
                onReset={jobManage.resetSelectedJob}
                isInsertDisabled={jobManage.buttonDisabledStates.insert}
                isUpdateDisabled={jobManage.buttonDisabledStates.update}
                isDeleteDisabled={jobManage.buttonDisabledStates.delete}
              />

              <WiniGridLayout container columnSpacing={1}>
                <WiniGridItem size={{ md: 5, xs: 12 }}>
                  <JobTriggerGrid
                    ref={refTriggerGrid}
                    triggerList={jobTriggerManage.triggerList}
                    applyStatusCellRenderer={createApplyStatusCellRenderer(
                      jobTriggerManage.selectedGroupStatus,
                    )}
                    onSelectionChanged={handleTriggerGridSelection}
                  />
                </WiniGridItem>
                <WiniGridItem size={{ md: 7, xs: 12 }}>
                  <JobTriggerForm
                    ref={refTriggerForm}
                    selectedTrigger={jobTriggerManage.selectedTrigger}
                    cronExampleData={jobTriggerManage.cronExampleData}
                    onFieldChange={jobTriggerManage.handleSelectedFieldChange}
                    onInsert={handleTriggerInsert}
                    onUpdate={handleTriggerUpdate}
                    onDelete={handleTriggerDelete}
                    onReset={jobTriggerManage.resetSelectedTrigger}
                    isScheduleAddDisabled={
                      jobTriggerManage.buttonDisabledStates.scheduleAdd
                    }
                    isInsertDisabled={
                      jobTriggerManage.buttonDisabledStates.insert
                    }
                    isUpdateDisabled={
                      jobTriggerManage.buttonDisabledStates.update
                    }
                    isDeleteDisabled={
                      jobTriggerManage.buttonDisabledStates.delete
                    }
                  />
                </WiniGridItem>
              </WiniGridLayout>
            </WiniGridItem>
          </WiniGridLayout>

          <WiniTypography className="m-2 text-[#999] text-[1.2rem] text-right w-full">
            ※ 작업을 등록/수정하거나 스케줄을 등록/수정한 경우 "작업목록
            동기화"를 클릭하여 실제 스케쥴러에 적용해야 합니다.
            <br />
            &nbsp;&nbsp;&nbsp;마지막 수정이후 1~2분이내에 자동 적용됩니다.
          </WiniTypography>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
}

export default ScheduleManagementPage;
