import { StaticDatePickerProps } from "@mui/x-date-pickers";

interface CustomProps {
  adapterLocale?: string;
  required?: boolean;
  ui?: string | string[];
}

interface WiniDatePickerProps
  extends StaticDatePickerProps<any>,
    CustomProps {}

declare function WiniDatePicker(props: WiniDatePickerProps): JSX.Element;

export default WiniDatePicker;
