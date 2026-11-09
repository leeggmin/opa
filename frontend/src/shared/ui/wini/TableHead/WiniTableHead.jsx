import { forwardRef } from 'react';
import TableHead from '@mui/material/TableHead';
import { cn } from '@/shared/lib/cn';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableHead = forwardRef(({ children, ui, className, sx: sxProp = {}, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablehead',
    uiTokens.map((token) => `winitablehead--${token}`),
    className,
  );

  return (
    <TableHead
      {...props}
      ref={ref}
      className={mergedClassName}
      sx={(theme) => ({
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {children}
    </TableHead>
  );
});

export default WiniTableHead;
