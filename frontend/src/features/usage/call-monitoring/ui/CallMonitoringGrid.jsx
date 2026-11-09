import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';
import { winiFormat } from '@/shared/lib';

const CALL_MONITORING_COLUMN_DEFS = [
    {
        field: 'organizationName',
        headerName: '기관명',
        width: 250,
        cellStyle: { textAlign: 'center' },
    },
    {
        field: 'subscriptionPlanName',
        headerName: '플랜명',
        width: 150,
        cellStyle: { textAlign: 'center' },
    },
    {
        field: 'subscriptionStartDate',
        headerName: '구독시작일',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => (p.value ? String(p.value).substr(0, 10) : ''),
    },
    {
        field: 'subscriptionEndDate',
        headerName: '구독종료일',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => (p.value ? String(p.value).substr(0, 10) : ''),
    },
    {
        field: 'subscriptionPlanCallTime',
        headerName: '잔여 통화시간',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 분`,
    },
    {
        field: 'pastCallTime',
        headerName: '사용한 통화시간',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 분`,
    },
    {
        field: 'subscriptionPlanFee',
        headerName: '요금',
        width: 200,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 원`,
    },
    {
        field: 'pastDailyCallCount',
        headerName: '통화건수',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 건`,
    },
    {
        field: 'overdueFee',
        headerName: '초과요금',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 원`,
    },
    {
        field: 'overdueTime',
        headerName: '초과시간',
        width: 150,
        cellStyle: { textAlign: 'center' },
        valueFormatter: (p) => `${winiFormat.formatThousands(p.value)} 분`,
    },
];

export const CallMonitoringGrid = ({ rowData }) => {
    return (
        <WiniBox sx={{ mt: 1, width: '100%', height: 800 }}>
            <WiniAgGridReact rowData={rowData} columnDefs={CALL_MONITORING_COLUMN_DEFS} />
        </WiniBox>
    );
};
