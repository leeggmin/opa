import { forwardRef } from 'react';
import TableRow from '@mui/material/TableRow';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableRow = forwardRef(({ children, ui, className, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablerow',
    uiTokens.map((token) => `winitablerow--${token}`),
    className,
  );

  return (
    <TableRow {...props} ref={ref} className={mergedClassName}>
      {children}
    </TableRow>
  );
});

export default WiniTableRow;