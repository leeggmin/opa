import { forwardRef } from 'react';
import TableBody from '@mui/material/TableBody';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableBody = forwardRef(({ children, ui, className, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablebody',
    uiTokens.map((token) => `winitablebody--${token}`),
    className,
  );

  return (
    <TableBody {...props} ref={ref} className={mergedClassName}>
      {children}
    </TableBody>
  );
});

export default WiniTableBody;