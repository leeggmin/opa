import { forwardRef, useContext } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { cn } from '@/shared/lib/cn';
import { color, size } from '@/shared/config/theme';
import { WiniListTypeContext } from '@/shared/ui/wini/List/WiniList';

const TEXT_SX = {
  color: color.text.default,
  fontSize: size.text.sm,
  lineHeight: '1.4',

  '& .MuiTypography-root': {
    color: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },

  '.MuiListItem-root &.MuiListItemText-root + .MuiListItemText-root': {
    marginTop: size.margin.md,
  },
};

const WiniListItemText = forwardRef(
  ({ children, className, listType, sx: sxProp = {}, ...props }, ref) => {
    const inheritedListType = useContext(WiniListTypeContext);
    const resolvedListType = listType ?? inheritedListType ?? 'menu';
    const isTextType = resolvedListType === 'text';

    const mergedClassName = cn('winicomponent winilistitemtext', className);
    const typeSx = isTextType ? TEXT_SX : {};

    return (
      <ListItemText
        {...props}
        className={mergedClassName}
        ref={ref}
        sx={(theme) => ({
          ...typeSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </ListItemText>
    );
  },
);

export default WiniListItemText;
