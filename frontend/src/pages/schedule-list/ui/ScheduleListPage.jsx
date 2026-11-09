import { useCallback, useEffect, useState } from 'react';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import {
  useJobGroupManage,
  JobGroupGrid,
  JobGroupSearchBar,
} from '@/features/schedule/manage-job-groups';
import {
  useJobManage,
  JobGrid,
  JobSearchBar,
  createApplyStatusCellRenderer,
} from '@/features/schedule/manage-jobs';
import {
  useScheduleHistory,
  ScheduleHistoryStateInfo,
  ScheduleHistorySearchBar,
  ScheduleHistoryGrid,
} from '@/features/schedule/view-history';
import { useFireJob } from '@/features/schedule/fire-job';
import { useCancelJob } from '@/features/schedule/cancel-job';
import { useScheduleListPage } from '../model/useScheduleListPage';

export function ScheduleListPage() {
  const { winiAut, connector } = winiCom.getFormInfo();
  const [serviceName, setServiceName] = useState('system');

  const jobGroupManage = useJobGroupManage(connector, serviceName);
  const jobManage = useJobManage(
    connector,
    serviceName,
    jobGroupManage.selectedJobGroup.commonJobGroupId,
    jobGroupManage.selectedJobGroup.status,
  );
  const scheduleHistory = useScheduleHistory(
    connector,
    serviceName,
    jobManage.selectedJob.id,
  );
  const { fireJob } = useFireJob(
    connector,
    serviceName,
    jobManage.selectedJob.id,
  );
  const { cancelJob } = useCancelJob(
    connector,
    serviceName,
    jobManage.selectedJob.id,
  );

  const {
    refGroupGrid,
    refJobGrid,
    refRunGrid,
    handleGroupGridSelection,
    handleJobGridSelection,
  } = useScheduleListPage(winiAut, jobGroupManage, jobManage, scheduleHistory);

  const handleRunPageChange = useCallback(
    (e, newPage) => {
      scheduleHistory.setCurrentPage(newPage);
    },
    [scheduleHistory.setCurrentPage],
  );

  useEffect(() => {
    if (winiAut.select === 'ALLOW') {
      jobGroupManage.fetchJobGroupList();
    }
  }, [serviceName, winiAut.select]);

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
            jobGroupList={jobGroupManage.jobGroupList}
            onSelectionChanged={handleGroupGridSelection}
          />
        </WiniGridItem>

        <WiniGridItem size={{ md: 9, xs: 12 }}>
          <JobSearchBar
            searchParams={jobManage.searchParams}
            onFieldChange={jobManage.handleSearchFieldChange}
            onSearch={jobManage.fetchJobList}
            disabled={jobGroupManage.selectedJobGroup.commonJobGroupId === ''}
            showSync={false}
          />

          <WiniGridLayout container className="mt-4" columnSpacing={1}>
            <WiniGridLayout size={{ md: 4, xs: 12 }}>
              <JobGrid
                ref={refJobGrid}
                jobList={jobManage.jobList}
                applyStatusCellRenderer={createApplyStatusCellRenderer(
                  jobManage.selectedGroupStatus,
                )}
                onSelectionChanged={handleJobGridSelection}
              />
            </WiniGridLayout>

            <WiniGridItem size={{ md: 8, xs: 12 }}>
              <ScheduleHistoryStateInfo
                jobName={jobManage.selectedJob.name}
                jobState={scheduleHistory.jobState}
              />

              <ScheduleHistorySearchBar
                searchParams={scheduleHistory.searchParams}
                onFieldChange={scheduleHistory.handleSearchFieldChange}
                onSearch={scheduleHistory.fetchRunList}
                onFire={fireJob}
                onCancel={cancelJob}
                onToggleLiveUpdate={scheduleHistory.toggleLiveUpdate}
                isLiveUpdate={scheduleHistory.isLiveUpdate}
                disabled={jobManage.selectedJob.id === ''}
              />

              <ScheduleHistoryGrid
                ref={refRunGrid}
                runList={scheduleHistory.runList}
                pagesInfo={scheduleHistory.pagesInfo}
                onPageChange={handleRunPageChange}
              />
            </WiniGridItem>
          </WiniGridLayout>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
}

export default ScheduleListPage;
