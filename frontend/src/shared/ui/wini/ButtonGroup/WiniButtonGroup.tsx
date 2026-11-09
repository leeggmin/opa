import { ButtonGroupProps } from "@mui/material";

type WiniUiInput = string | string[];

export interface WiniButtonGroupProps extends ButtonGroupProps {
  ui?: WiniUiInput;
  itemMinWidth?: number | string;
}

declare function WiniButtonGroup(props: WiniButtonGroupProps): JSX.Element;;

export default WiniButtonGroup;
