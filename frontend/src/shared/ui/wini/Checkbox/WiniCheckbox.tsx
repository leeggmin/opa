import { CheckboxProps } from "@mui/material";

type WiniUiInput = string | string[];

interface WiniCheckboxProps extends CheckboxProps {
  ui?: WiniUiInput;
}

declare function WiniCheckbox(props: WiniCheckboxProps): JSX.Element;

export default WiniCheckbox;
