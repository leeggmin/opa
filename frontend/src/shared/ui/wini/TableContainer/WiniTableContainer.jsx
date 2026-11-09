import { forwardRef } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { cn } from '@/shared/lib/cn';
import { color } from '@/shared/config/theme';
import { getUiTokens } from '@/shared/config/theme/uiTokens';

const WiniTableContainer = forwardRef(({ children, ui, className, sx: sxProp = {}, ...props }, ref) => {
  const uiTokens = getUiTokens(ui);
  const mergedClassName = cn(
    'winicomponent winitablecontainer',
    uiTokens.map((token) => `winitablecontainer--${token}`),
    className,
  );

  return (
    <TableContainer
      {...props}
      ref={ref}
      className={mergedClassName}
      sx={(theme) => ({
        borderTop: `1px solid ${color.brand.main}`,
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {children}
    </TableContainer>
  );
});

export default WiniTableContainer;