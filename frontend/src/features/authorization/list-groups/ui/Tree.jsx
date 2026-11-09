import { WiniBox, WiniTreeView, WiniTreeItem } from '@/shared/ui';
import { useTree } from '../model/useTree';

/**
 * 권한 그룹 트리 컴포넌트
 */
export const Tree = ({ authTreeDataList, onSelect, onReset }) => {
  const { treeRef } = useTree(authTreeDataList, onReset);

  return (
    <WiniBox
      className="w-full border border-gray-300 rounded-lg mb-4 mt-2"
    >
      <WiniTreeView
        winiData={authTreeDataList}
        openByDefault={false}
        padding={25}
        onSelect={onSelect}
        ref={treeRef}
        height={500}
      >
        {(props) => <WiniTreeItem {...props} name={'groupName'} />}
      </WiniTreeView>
    </WiniBox>
  );
};
