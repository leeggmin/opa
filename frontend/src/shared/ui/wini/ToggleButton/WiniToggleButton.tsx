import { ToggleButtonProps } from "@mui/material";

type WiniUiInput = string | string[];

interface WiniToggleButtonProps extends ToggleButtonProps {
  ui?: WiniUiInput;
}

declare function WiniToggleButton(props: WiniToggleButtonProps): JSX.Element;;

export default WiniToggleButton;
