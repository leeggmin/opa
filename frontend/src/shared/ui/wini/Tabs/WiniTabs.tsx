import { TabsProps } from "@mui/material";

type WiniUiInput = string | string[];

interface WiniTabsProps extends TabsProps {
  ui?: WiniUiInput;
}

declare function WiniTabs(props: WiniTabsProps): JSX.Element;;

export default WiniTabs;
