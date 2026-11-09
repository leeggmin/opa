import { IconButtonProps } from "@mui/material";

type WiniUiInput = string | string[];

export interface WiniIconButtonProps extends IconButtonProps {
  icon?: string;
  iconOnly?: boolean;
  ui?: WiniUiInput;
}

declare function WiniIconButton(props: WiniIconButtonProps): JSX.Element;

export default WiniIconButton;
