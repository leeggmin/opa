import { forwardRef } from 'react';
import TableCell from '@mui/material/TableCell';
import { cn } from '@/shared/lib/cn';
import { color, size } from '@/shared/config/theme';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';

const UI_SX = {
  gray: {
    backgroundColor: color.background.readonly,
  },
};

const CELL_BASE_SX = {
  padding: '4px',
  height: '40px',
  border: `1px solid ${color.border.default}`,
  fontWeight: 600,
  fontSize: size.text.sm,
  color: color.text.dark,
};

const HEADER_BASE_SX = {
  width: '150px',
  minWidth: '150px',
  maxWidth: '150px',
  backgroundColor: color.brand.light,
  padding: 0,
  ' .winitypography ': {
    fontSize: size.text.sm,
    fontWeight: '600',
  },
};


const WiniTableCell = forwardRef(({ children, ui, className, sx: sxProp = {}, ...props }, ref) => {
  const isHeaderCell = props.component === 'th';
  const uiTokens = getUiTokens(ui);
  const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
  const mergedClassName = cn(
    'winicomponent winitablecell',
    uiTokens.map((token) => `winitablecell--${token}`),
    className,
  );
  const baseSx = {
    ...CELL_BASE_SX,
    ...(isHeaderCell ? HEADER_BASE_SX : {}),
    ...(uiSx ?? {}),
  };

  return (
    <TableCell
      {...props}
      ref={ref}
      className={mergedClassName}
      sx={(theme) => ({
        ...baseSx,
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {children}
    </TableCell>
  );
});

export default WiniTableCell;