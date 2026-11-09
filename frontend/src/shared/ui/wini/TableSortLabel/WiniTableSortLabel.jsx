import { forwardRef } from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableSortLabel = forwardRef(({ children, ui, className, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablesortlabel',
    uiTokens.map((token) => `winitablesortlabel--${token}`),
    className,
  );

  return (
    <TableSortLabel {...props} ref={ref} className={mergedClassName}>
      {children}
    </TableSortLabel>
  );
});

export default WiniTableSortLabel;
