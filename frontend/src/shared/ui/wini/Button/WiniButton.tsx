import { ButtonProps } from "@mui/material";

type WiniUiInput = string | string[];

export interface WiniButtonProps extends ButtonProps {
  ui?: WiniUiInput;
  loadingIndicatorColor?: string;
}

declare function WiniButton(props: WiniButtonProps): JSX.Element;

export default WiniButton;
