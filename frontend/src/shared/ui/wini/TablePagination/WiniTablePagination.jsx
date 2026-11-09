import { forwardRef } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTablePagination = forwardRef(({ ui, className, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablepagination',
    uiTokens.map((token) => `winitablepagination--${token}`),
    className,
  );

  return <TablePagination {...props} ref={ref} className={mergedClassName} />;
});

export default WiniTablePagination;
