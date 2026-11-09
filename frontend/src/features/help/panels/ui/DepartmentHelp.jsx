import { WiniBox, WiniTreeView, WiniTreeItem } from '@/shared/ui/wini';
import { SearchDialogLayout } from '@/shared/ui';
import { useHelpTreeSelection } from '../model/useHelpContext';
import { useDepartmentHelp } from '../model/useDepartmentHelp';

/**
 * DepartmentHelp - 부서 검색 도움말 패널 (TreeView)
 */
export function DepartmentHelp() {
  const { onTreeSelected, onTreeDoubleClicked } = useHelpTreeSelection();
  const { keyword, setKeyword, rowdata, searchData } = useDepartmentHelp();

  return (
    <SearchDialogLayout
      keyword={keyword}
      setKeyword={setKeyword}
      onSearch={searchData}
      width={500}
      height={450}
    >
      <WiniTreeView
        winiData={rowdata}
        width={'100%'}
        height={400}
        onSelect={onTreeSelected}
      >
        {(props) => {
          return (
            <WiniBox onDoubleClick={onTreeDoubleClicked}>
              <WiniTreeItem {...props} name={'wardName'} />
            </WiniBox>
          );
        }}
      </WiniTreeView>
    </SearchDialogLayout>
  );
}
