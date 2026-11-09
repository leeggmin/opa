// import { LocalizationProviderTPProps } from "@mui/x-date-pickers";

// declare function WiniLocalizationProviderTP(props: LocalizationProviderTPProps): JSX.Element;;



import { LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProviderComponent } from '@mui/x-date-pickers/LocalizationProvider';

type WiniLocalizationProviderProps = LocalizationProviderProps<Date, string>;

declare function WiniLocalizationProviderTP(props: WiniLocalizationProviderProps): JSX.Element;
export default WiniLocalizationProviderTP;