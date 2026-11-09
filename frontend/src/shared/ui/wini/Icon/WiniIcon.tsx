import { SvgIconProps } from '@mui/material';

export interface WiniIconProps extends SvgIconProps {
  name?: string;
}

declare function WiniIcon(props: WiniIconProps): JSX.Element | null;

export default WiniIcon;
