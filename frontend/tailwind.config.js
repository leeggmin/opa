/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          white: "rgb(var(--c-base-white) / <alpha-value>)",
          black: "rgb(var(--c-base-black) / <alpha-value>)",
          transparent: "rgb(var(--c-base-transparent) / <alpha-value>)",
        },
        primary: {
          main: "rgb(var(--c-primary-main) / <alpha-value>)",
          hover: "rgb(var(--c-primary-hover) / <alpha-value>)",
        },
        gray: {
          light: "rgb(var(--c-gray-light) / <alpha-value>)",
          eee: "rgb(var(--c-gray-eee) / <alpha-value>)",
          ddd: "rgb(var(--c-gray-ddd) / <alpha-value>)",
          ccc: "rgb(var(--c-gray-ccc) / <alpha-value>)",
          bbb: "rgb(var(--c-gray-bbb) / <alpha-value>)",
          aaa: "rgb(var(--c-gray-aaa) / <alpha-value>)",
          999: "rgb(var(--c-gray-999) / <alpha-value>)",
          666: "rgb(var(--c-gray-666) / <alpha-value>)",
          333: "rgb(var(--c-gray-333) / <alpha-value>)",
          dark: "rgb(var(--c-gray-dark) / <alpha-value>)",
        },
        brand: {
          main: "rgb(var(--c-brand-main) / <alpha-value>)",
          sub1: "rgb(var(--c-brand-sub1) / <alpha-value>)",
          sub2: "rgb(var(--c-brand-sub2) / <alpha-value>)",
          point: "rgb(var(--c-brand-point) / <alpha-value>)",
        },
        text: {
          main: "rgb(var(--c-text-main) / <alpha-value>)",
          sub: "rgb(var(--c-text-sub) / <alpha-value>)",
          white: "rgb(var(--c-text-white) / <alpha-value>)",
          light: "rgb(var(--c-text-light) / <alpha-value>)",
          default: "rgb(var(--c-text-default) / <alpha-value>)",
          dark: "rgb(var(--c-text-dark) / <alpha-value>)",
          darken: "rgb(var(--c-text-darken) / <alpha-value>)",
          black: "rgb(var(--c-text-black) / <alpha-value>)",
          point: "rgb(var(--c-text-point) / <alpha-value>)",
          disabled: "rgb(var(--c-text-disabled) / <alpha-value>)",
          delete: "rgb(var(--c-state-error) / <alpha-value>)",
        },
        border: {
          default: "rgb(var(--c-border-default) / <alpha-value>)",
          main: "rgb(var(--c-border-main) / <alpha-value>)",
          point: "rgb(var(--c-border-point) / <alpha-value>)",
          dark: "rgb(var(--c-border-dark) / <alpha-value>)",
          white: "rgb(var(--c-border-white) / <alpha-value>)",
          black: "rgb(var(--c-border-black) / <alpha-value>)",
          disabled: "rgb(var(--c-border-disabled) / <alpha-value>)",
          disabledDark: "rgb(var(--c-border-disabled-dark) / <alpha-value>)",
          delete: "rgb(var(--c-state-error) / <alpha-value>)",
        },
        background: {
          main: "rgb(var(--c-background-main) / <alpha-value>)",
          mainLight: "rgb(var(--c-background-main-light) / <alpha-value>)",
          white: "rgb(var(--c-background-white) / <alpha-value>)",
          offwhite: "rgb(var(--c-background-offwhite) / <alpha-value>)",
          divider: "rgb(var(--c-background-divider) / <alpha-value>)",
          disabled: "rgb(var(--c-background-disabled) / <alpha-value>)",
          readonly: "rgb(var(--c-background-readonly) / <alpha-value>)",
          disabledDark: "rgb(var(--c-background-disabled-dark) / <alpha-value>)",
          delete: "rgb(var(--c-state-error) / <alpha-value>)",
        },
        state: {
          error: "rgb(var(--c-state-error) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          'Pretendard GOV',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        xxs: "var(--size-xxs)",
        xs: "var(--size-xs)",
        sm: "var(--size-sm)",
        md: "var(--size-md)",
        lg: "var(--size-lg)",
        xl: "var(--size-xl)",
      },


      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },

      spacing: {
        xsm: "var(--margin-xsm)",
        sm: "var(--margin-sm)",
        md: "var(--margin-md)",
        lg: "var(--margin-lg)",
        xl: "var(--margin-xl)",
        1: "var(--margin-sm)",
        2: "var(--margin-md)",
        3: "var(--margin-lg)",
        4: "var(--margin-xl)",
        5: "var(--margin-xxl)",
        6: "var(--margin-xxxl)",
      },

      // ... 추가 커스텀 설정들 
    },
  },
  plugins: [],
};
