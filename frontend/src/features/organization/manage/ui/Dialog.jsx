import * as React from 'react';

import {
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniDialog,
  WiniDialogActions,
  WiniDialogContent,
  WiniDialogTitle,
  WiniMenuItem,
  WiniNumber,
  WiniSelect,
  WiniText,
} from '@/shared/ui/wini';

export const Dialog = ({
  open,
  selectedData,
  onChange,
  onSave,
  onDelete,
  onClose,
}) => {

  return (
    <WiniDialog open={open} onClose={onClose} fullWidth={true} maxWidth={'xs'}>
      <WiniDialogTitle>조직 상세 정보</WiniDialogTitle>

      <WiniDialogContent>
        <WiniBox className='mt-2'>
          <WiniText
            ui='column'
            label="조직코드"
            variant="outlined"
            required
            name="organizationCode"
            // InputLabelProps={{ shrink: true, className: 'text-red-500' }}
            disabled={selectedData.id === '' ? false : true}
            placeholder="code"
            value={selectedData.organizationCode || ''}
            onChange={onChange}
          />
        </WiniBox>

        <WiniBox>
          <WiniText
            ui='column'
            required
            label="조직명"
            variant="outlined"
            name="organizationName"
            // InputLabelProps={{ shrink: true, className: 'text-red-500' }}
            placeholder="name"
            value={selectedData.organizationName || ''}
            onChange={onChange}
          />
        </WiniBox>


      </WiniDialogContent>

      <WiniDialogActions className="gap-2">
        <WiniButton onClick={onSave}>저장</WiniButton>
        <WiniButton ui='delete' onClick={onDelete} className={selectedData.id === '' ? 'hidden' : ''}>
          삭제
        </WiniButton>
        <WiniButton onClick={onClose}>닫기</WiniButton>
      </WiniDialogActions>
    </WiniDialog>
  );
};
