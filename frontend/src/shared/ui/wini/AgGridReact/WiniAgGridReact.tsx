import { AgGridReactProps } from 'ag-grid-react';
import { CSSProperties } from 'react';

type WiniUiInput = string | string[];

export interface WiniAgGridReactProps extends AgGridReactProps {
  ui?: WiniUiInput;
  paginationUi?: 'default' | 'number' | 'fraction';
  copyRows?: boolean;
  style?: CSSProperties;
}

declare function WiniAgGridReact(props: WiniAgGridReactProps): JSX.Element;

export default WiniAgGridReact;
