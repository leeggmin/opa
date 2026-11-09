import { StaticDateTimePickerProps } from "@mui/x-date-pickers";

interface CustomProps {
  adapterLocale?: string;
  required?: boolean;
  ui?: string | string[];
}

interface WiniDateTimePickerProps
  extends StaticDateTimePickerProps<any>,
    CustomProps {}

declare function WiniDateTimePicker(props: WiniDateTimePickerProps): JSX.Element;

export default WiniDateTimePicker;
