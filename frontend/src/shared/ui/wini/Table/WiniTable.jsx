import { forwardRef } from 'react';
import Table from '@mui/material/Table';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';

const UI_SX = {};

const baseSx = {
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  width: '100%',
};

const DEFAULT_LABEL_COLUMN_WIDTH_BY_COUNT = {
  2: '200px',
  3: '150px',
  4: '100px',
};

const getLabelColumnWidth = (labelColumnCount, labelColumnWidth) =>
  labelColumnWidth ?? DEFAULT_LABEL_COLUMN_WIDTH_BY_COUNT[labelColumnCount] ?? '150px';

const getColumnWidths = ({ columnWidths, labelColumnCount, labelColumnWidth }) => {
  if (Array.isArray(columnWidths) && columnWidths.length > 0) {
    return columnWidths;
  }

  if (!labelColumnCount) {
    return [];
  }

  const resolvedLabelColumnWidth = getLabelColumnWidth(labelColumnCount, labelColumnWidth);

  return Array.from({ length: labelColumnCount * 2 }, (_item, index) =>
    index % 2 === 0 ? resolvedLabelColumnWidth : undefined,
  );
};

const WiniTable = forwardRef(({
  children,
  ui,
  className,
  sx: sxProp = {},
  columnWidths,
  labelColumnCount,
  labelColumnWidth,
  ...props
}, ref) => {
  const uiTokens = getUiTokens(ui);
  const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
  const colWidths = getColumnWidths({ columnWidths, labelColumnCount, labelColumnWidth });
  const mergedClassName = cn(
    'winicomponent winitable',
    uiTokens.map((token) => `winitable--${token}`),
    className,
  );

  return (
    <Table
      {...props}
      ref={ref}
      className={mergedClassName}
      sx={(theme) => ({
        ...baseSx,
        ...(uiSx ?? {}),
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {colWidths.length > 0 ? (
        <colgroup>
          {colWidths.map((width, index) => (
            <col key={`${width ?? 'auto'}-${index}`} style={width ? { width } : undefined} />
          ))}
        </colgroup>
      ) : null}
      {children}
    </Table>
  );
});

export default WiniTable;