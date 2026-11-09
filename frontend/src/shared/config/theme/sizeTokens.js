const v = (token) => `var(--${token})`;

export const size = {
  text: {
    xxs: v('size-xxs'),
    xs: v('size-xs'),
    sm: v('size-sm'),
    md: v('size-md'),
    lg: v('size-lg'),
    xl: v('size-xl'),
    xxl: v('size-xxl'),
  },
  lh: {
    none: v('lh-none'),
    tight: v('lh-tight'),
    normal: v('lh-normal'),
    loose: v('lh-loose'),
  },
  margin: {
    xsm: v('margin-xsm'),
    sm: v('margin-sm'),
    md: v('margin-md'),
    lg: v('margin-lg'),
    xl: v('margin-xl'),
    xxl: v('margin-xxl'),
    xxxl: v('margin-xxxl'),
  },
  radius: {
    xsm: v('radius-xsm'),
    sm: v('radius-sm'),
    md: v('radius-md'),
    lg: v('radius-lg'),
    xl: v('radius-xl'),
  },
  objH: {
    sm: v('obj-h-sm'),
    md: v('obj-h-md'),
    lg: v('obj-h-lg'),
  },
  icon: {
    sm: v('icon-h-sm'),
    md: v('icon-h-md'),
    lg: v('icon-h-lg'),
  },
};

export { xsm, sm, md, lg, xl, xxl, xxxl } from './tokenKeys';
