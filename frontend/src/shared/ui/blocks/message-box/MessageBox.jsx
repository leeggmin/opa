import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';
import { useSignal } from '@preact/signals-react';
import {
  _msgBox,
  addMsgBox,
  closeMsg,
  removeMsgBoxSignal,
  updateMsg,
} from '@/shared/model';
import { useSignals } from '@preact/signals-react/runtime';
import { WiniButton, WiniDialog, WiniDialogActions, WiniDialogContent, WiniDialogContentText } from '@/shared/ui/wini';

const MessageBox = (props) => {
  useSignals();
  const signalData = props.item;
  const [open, setOpen] = useState(null);
  const handleClickOpen = (response) => {
    props.item.callback(response);
    closeMsg(props.item);
    removeMsgBoxSignal(props.item.key);
    // modalCheck()
  };

  const alertButton = () => (
    <WiniDialogActions>
      <WiniButton onClick={() => handleClickOpen('Y')} autoFocus>
        확인
      </WiniButton>
    </WiniDialogActions>
  );

  const yesornoButton = () => (
    <WiniDialogActions>
      <WiniButton onClick={() => handleClickOpen('Y')}>예</WiniButton>
      <WiniButton onClick={() => handleClickOpen('N')} autoFocus>
        아니오
      </WiniButton>
    </WiniDialogActions>
  );

  const confirmButton = () => (
    <WiniDialogActions>
      <WiniButton onClick={() => handleClickOpen('Y')}>확인</WiniButton>
      <WiniButton onClick={() => handleClickOpen('N')} autoFocus>
        닫기
      </WiniButton>
    </WiniDialogActions>
  );

  return (
    <WiniDialog
      className="globalMsgBox"
      open={props.item.open || open}
      onClose={props.onClose}
      sx={{ minWidth: 100 }}
    >
      <WiniDialogContent>
        <WiniDialogContentText style={{ whiteSpace: 'pre-line' }}>
          {props.item.message}
        </WiniDialogContentText>
      </WiniDialogContent>
      {props.item.type === 'alert' ? (
        alertButton()
      ) : props.item.type === 'yn' ? (
        yesornoButton()
      ) : props.item.type === 'c' ? (
        confirmButton()
      ) : (
        <p>알 수 없는 타입</p>
      )}
    </WiniDialog>
  );
};

export default MessageBox;
