// import { TreeViewProps } from './WiniTreeView';
import { TreeProps } from 'react-arborist/dist/module/types/tree-props';

interface CustomProps {
    /**필수값 데이터 data에 넣지말고 winiData에 넣어주세요*/
    winiData: any[];
}

type WiniTreeViewProps<T = unknown> = TreeProps<T> & CustomProps;


declare function WiniTreeView(props: WiniTreeViewProps<any>): JSX.Element;

export default WiniTreeView;
