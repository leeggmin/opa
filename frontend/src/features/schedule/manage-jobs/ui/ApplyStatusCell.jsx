import { applyStatusEnums } from '@/shared/config';

// Cell renderer for apply status in AG Grid
export const createApplyStatusCellRenderer =
  (selectedGroupStatus) => (params) => {
    if (params.data && params.data.status !== 'ENABLE') {
      return '미사용';
    }

    if (selectedGroupStatus !== 'ENABLE') {
      return '미사용';
    }

    const applyStatus = applyStatusEnums[params.value];
    if (!applyStatus) {
      return params.value;
    }
    return (
      <span
        style={{
          backgroundColor: applyStatus.color,
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {applyStatus.description}
      </span>
    );
  };
