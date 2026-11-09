import { forwardRef } from 'react';
import TableFooter from '@mui/material/TableFooter';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableFooter = forwardRef(({ children, ui, className, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablefooter',
    uiTokens.map((token) => `winitablefooter--${token}`),
    className,
  );

  return (
    <TableFooter {...props} ref={ref} className={mergedClassName}>
      {children}
    </TableFooter>
  );
});

export default WiniTableFooter;
