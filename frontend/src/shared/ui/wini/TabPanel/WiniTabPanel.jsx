import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { size } from '@/shared/config/theme';

const baseSx = {
  '&': {
    fontSize: size.text.sm,
    marginTop: size.margin.xl,
  },
};

const WiniTabPanel = forwardRef(({ children, ...props }, ref) => {
  const {
    value,
    index,
    className: classNameProp,
    sx: sxProp = {},
    ...other
  } = props;

  const isActive = String(value) === String(index);
  let className = 'winicomponent winitabpanel ';

  if (classNameProp !== undefined && classNameProp !== null) {
    className += classNameProp;
  }

  return (
    <div
      className={className}
      ref={ref}
      role="tabpanel"
      hidden={!isActive}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isActive && (
        <Box
          sx={(theme) => ({
            ...baseSx,
            ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
          })}
        >
          {children}
        </Box>
      )}
    </div>
  );
});

WiniTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default WiniTabPanel;
