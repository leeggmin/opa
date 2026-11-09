import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniDialog,
  WiniDialogActions,
  WiniDialogContent,
  WiniDialogTitle,
  WiniText,
} from '@/shared/ui/wini';
import { useRelationDialog } from '../model/useRelationDialog';
import { RELATION_DIALOG_COLUMNS } from '../model/constants';

/**
 * 프로그램 관계 선택 다이얼로그
 */
export const RelationDialog = ({ open, onClose, onSelect }) => {
  const { programs, search, setSearch, handleSearch, handleGridSelection } =
    useRelationDialog(open, onSelect, onClose);

  return (
    <WiniDialog open={open} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
      <WiniDialogTitle>화면 경로 등록</WiniDialogTitle>
      <WiniDialogContent className="p-1">
        <WiniBox ui="search">
          <WiniText
            label="화면명"
            ui="column"
            value={search}
            className="w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <WiniButton ui="default" className="w-20" onClick={handleSearch}>
            검색
          </WiniButton>
        </WiniBox>
        <WiniBox className='h-[300px]'>
          <WiniAgGridReact
            rowData={programs}
            columnDefs={RELATION_DIALOG_COLUMNS}
            onSelectionChanged={handleGridSelection}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20]}
          />
        </WiniBox>
      </WiniDialogContent>
      <WiniDialogActions>
        <WiniButton onClick={onClose}>닫기</WiniButton>
      </WiniDialogActions>
    </WiniDialog>
  );
};
