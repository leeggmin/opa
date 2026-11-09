import { WiniTreeView, WiniTreeItem, WiniBox } from '@/shared/ui/wini';

/**
 * 부서 관리 트리 뷰
 */
export const TreeView = ({
  treeRef,
  deptTreeList,
  onSelect,
  onMove,
}) => {
  return (
    <WiniBox className="border border-[#c6c3c3] rounded p-2">
      <WiniTreeView
        ref={treeRef}
        winiData={deptTreeList}
        openByDefault={false}
        disableDrag={false}
        onSelect={onSelect}
        onMove={onMove}
      >
        {(props) => <WiniTreeItem {...props} name={'departmentName'} />}
      </WiniTreeView>
    </WiniBox>
  );
};
