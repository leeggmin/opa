import { WiniAgGridReact } from '@/shared/ui/wini';
import { SearchDialogLayout } from '@/shared/ui';
import { useHelpContext, useHelpGridSelection } from '../model/useHelpContext';
import { useCustomerHelp } from '../model/useCustomerHelp';

/**
 * CustomerHelp - 거래처 검색 도움말 패널
 */
export function CustomerHelp() {
  const { params } = useHelpContext();
  const { onRowSelected, onRowDoubleClicked } = useHelpGridSelection();
  const { keyword, setKeyword, rowdata, colDefs, searchData } =
    useCustomerHelp(params);

  return (
    <SearchDialogLayout
      keyword={keyword}
      setKeyword={setKeyword}
      onSearch={searchData}
      width={500}
      height={450}
    >
      <WiniAgGridReact
        rowData={rowdata}
        columnDefs={colDefs}
        rowSelection="single"
        onRowSelected={onRowSelected}
        onRowDoubleClicked={onRowDoubleClicked}
      />
    </SearchDialogLayout>
  );
}
