import { createTheme } from "@mui/material/styles";
import { color } from './colorTokens';
const typography = {
  fontFamily:
    '"Pretendard GOV", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  htmlFontSize: 10,
  fontSize: 14,
  h1: { fontSize: 28, fontWeight: 700 },
  h2: { fontSize: 22, fontWeight: 700 },
};

export const appTheme = createTheme({
  typography,
  palette: {
    primary: {
      main: color.primary.main,
      light: color.primary.hover,
    },
    brand: {
      main: color.brand.main,
      sub1: color.brand.sub1,
      sub2: color.brand.sub2,
      point: color.brand.point,
    },
    gray: {
      light: color.gray.light,
      eee: color.gray.c_eee,
      ddd: color.gray.c_ddd,
      ccc: color.gray.c_ccc,
      bbb: color.gray.c_bbb,
      aaa: color.gray.c_aaa,
      999: color.gray.c_999,
      666: color.gray.c_666,
      333: color.gray.c_333,
      dark: color.gray.dark,
    },
    text: {
      main: color.text.main,
      sub: color.text.sub,
      white: color.text.white,
      light: color.text.light,
      default: color.text.default,
      dark: color.text.dark,
      darken: color.text.darken,
      black: color.text.black,
      point: color.text.point,
      disabledDark: color.text.disabledDark,
      disabled: color.text.disabled,
    },
    border: {
      default: color.border.default,
      main: color.border.main,
      point: color.border.point,
      dark: color.border.dark,
      white: color.border.white,
      black: color.border.black,
      disabled: color.border.disabled,
      disabledDark: color.border.disabledDark,
    },
    background: {
      main: color.background.main,
      mainLight: color.background.mainLight,
      white: color.background.white,
      offwhite: color.background.offwhite,
      divider: color.background.divider,
      disabled: color.background.disabled,
      readonly: color.background.readonly,
      disabledDark: color.background.disabledDark,
    },
    state: {
      error: color.state.error,
    },
    delete: {
      main: color.delete,
    },
  },
});
