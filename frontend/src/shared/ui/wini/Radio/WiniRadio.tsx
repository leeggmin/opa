import { RadioProps } from "@mui/material";

interface CustomProps {
  ui?: string | string[];
  labelProps?: any;
}

type WiniRadioProps = RadioProps & CustomProps;

declare function WiniRadio(props: WiniRadioProps): JSX.Element;

export default WiniRadio;

