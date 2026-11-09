import { useState, useEffect, isValidElement, cloneElement } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from '@mui/material';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import {
  closeHelpForm,
  removeHelpFormSignal,
  helpFormSelectedContext,
} from '@/shared/model';

const ComHelpForm = (/*{children, ...props}*/ props) => {
  useSignals();
  const signalData = props.item;
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleClickOpen = (response) => {
    if (response == 'Y') {
      signalData.callback(selectedRow);
    } else {
      signalData.callback({});
    }
    closeHelpForm(signalData);
    removeHelpFormSignal(signalData.key);
    // modalCheck()
  };

  useEffect(() => {
    if (Object.keys(props.item._inner).length == 0) {
      setOpen(false);
      return;
    } else {
      setOpen(props.item.open);
    }
  }, [props.item.open]);

  const modifiedChild =
    props.item && isValidElement(props.item._inner.el)
      ? cloneElement(props.item._inner.el, props.item.params)
      : props.item?._inner?.el;

  return (
    <Dialog
      className="globalHelpForm"
      open={props.open && open}
      sx={{ minWidth: 100 }}
    >
      <DialogTitle>
        {!props.item._inner.title ? '' : props.item._inner.title}
      </DialogTitle>
      <DialogContent className={'comhelpform'}>
        <helpFormSelectedContext.Provider
          value={{
            service: signalData.service,
            params: signalData.params,
            setRow: setSelectedRow,
            helpClose: handleClickOpen,
          }}
        >
          {modifiedChild}
        </helpFormSelectedContext.Provider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickOpen('Y')}>선택</Button>
        <Button onClick={() => handleClickOpen('N')} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComHelpForm;
