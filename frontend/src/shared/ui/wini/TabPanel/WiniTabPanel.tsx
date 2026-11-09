import { ReactNode } from 'react';

interface TabPanelProps {
  // define your props here
  // WiniTabPanel.propTypes
  children?: ReactNode;
  index: number | string;
  value: number | string;
}

declare function WiniTabPanel(props: TabPanelProps): JSX.Element;

export default WiniTabPanel;
