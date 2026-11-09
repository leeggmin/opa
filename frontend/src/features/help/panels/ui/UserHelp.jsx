import { WiniAgGridReact } from '@/shared/ui/wini';
import { SearchDialogLayout } from '@/shared/ui';
import { useHelpContext, useHelpGridSelection } from '../model/useHelpContext';
import { useUserHelp } from '../model/useUserHelp';

/**
 * UserHelp - 사용자 검색 도움말 패널
 */
export function UserHelp() {
  const { service, params } = useHelpContext();
  const { onRowSelected, onRowDoubleClicked } = useHelpGridSelection();
  const { keyword, setKeyword, rowdata, colDefs, searchData } = useUserHelp(
    service,
    params,
  );

  return (
    <SearchDialogLayout
      keyword={keyword}
      setKeyword={setKeyword}
      onSearch={searchData}
      searchLabel="이름"
      width={500}
      height={450}
    >
      <WiniAgGridReact
        rowData={rowdata}
        columnDefs={colDefs}
        onRowSelected={onRowSelected}
        onRowDoubleClicked={onRowDoubleClicked}
      />
    </SearchDialogLayout>
  );
}
