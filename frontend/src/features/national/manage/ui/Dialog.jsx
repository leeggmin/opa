import { WiniBox, WiniButton, WiniDialog, WiniDialogActions, WiniDialogContent, WiniDialogTitle, WiniText } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

export const Dialog = (props) => {
  const data = props.selectedData ?? { nationalCode: '', nationalName: '' };
  const saveAction = winiCom.checkMenuAut('update', <WiniButton onClick={props.onSave}>Save</WiniButton>);
  const deleteAction = props.mode === props.MODE?.EDIT
    ? winiCom.checkMenuAut('delete', <WiniButton onClick={props.onDelete}>Delete</WiniButton>)
    : null;
  const closeAction = <WiniButton onClick={props.onClose}>Close</WiniButton>;

  return (
    <WiniDialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="xs"
    >
      <WiniDialogTitle>Detail Info</WiniDialogTitle>

      <WiniDialogContent className="pt-4 pb-4">
        <WiniBox className="flex flex-col gap-4">
          <WiniText
            ui="column"
            label="*National Code"
            variant="outlined"
            className="w-full"
            name="nationalCode"
            slotProps={{
              inputLabel: { shrink: true, className: 'text-red-500' },
            }}
            disabled={props.nationalCodeDisabled}
            value={data.nationalCode}
            onChange={props.onSelectedChange}
          />

          <WiniText
            ui="column"
            label="*National Name"
            variant="outlined"
            className="w-full"
            name="nationalName"
            slotProps={{
              inputLabel: { shrink: true, className: 'text-red-500' },
            }}
            value={data.nationalName}
            onChange={props.onSelectedChange}
          />
        </WiniBox>
      </WiniDialogContent>

      <WiniDialogActions>
        {saveAction}
        {deleteAction}
        {closeAction}
      </WiniDialogActions>
    </WiniDialog>
  );
};
