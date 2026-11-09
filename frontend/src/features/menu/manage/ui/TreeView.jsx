import { WiniBox, WiniTreeView, WiniTreeCheckItem, WiniTreeItem } from '@/shared/ui/wini';
import styles from './TreeView.module.css';

/**
 * 메뉴 트리 뷰
 */
export const TreeView = ({
  treeRef,
  menu,
  onSelect,
  onChange,
  onToggleCheck,
  height = 450,
  className,
}) => {
  return (
    <WiniBox className="border border-[#c6c3c3] mt-4 mb-2 rounded p-2">
      <WiniTreeView
        ref={treeRef}
        className={className}
        winiData={menu}
        height={height}
        disableDrag={false}
        onSelect={onSelect}
        onChange={onChange}
      >
        {(props) => (
          props.node?.data?.menuType === 'MENU' ? (
            <WiniTreeItem {...props} name="name" />
          ) : (
            <WiniTreeCheckItem
              {...props}
              branch={{ column: 'menuType', value: 'MENU' }}
              className={styles.programTreeItem}
              field={'chk'}
              toggleCheck={onToggleCheck}
            />
          )
        )}
      </WiniTreeView>
    </WiniBox>
  );
};
