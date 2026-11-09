import { LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProviderComponent } from '@mui/x-date-pickers/LocalizationProvider';

// export type { LocalizationProviderProps }

// declare function WiniLocalizationProvider <TDate, TLocal>(props: LocalizationProviderProps<TDate, TLocal>):  JSX.Element;

// export default WiniLocalizationProvider;

type WiniLocalizationProviderProps = LocalizationProviderProps<Date, string>;

declare function WiniLocalizationProvider(props: WiniLocalizationProviderProps): JSX.Element;