import { useState, createContext } from 'react';
import { Snackbar } from '@mui/material';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import {
  closecomSnackbar,
  removecomSnackbarSignal,
} from '@/shared/model';
// import { closeHelpForm, removeHelpFormSignal } from '@/shared/model';
export const selectedContext = createContext();

const ComSnackbar = (props) => {
  useSignals();
  const signalData = props.item;
  // const [open,setOpen] =useState(false);
  const [snackbarOpen, setsnackbarOpen] = useState(signalData.open);
  const [snackbarMessage, setSnackbarMessage] = useState(
    signalData.message,
  );
  const [anchorOrigin, setAnchorOrigin] = useState(
    signalData.anchorOrigin,
  );
  const [duration, setDuration] = useState(signalData.duration);
  const handleClose = (response) => {
    closecomSnackbar(signalData);
    removecomSnackbarSignal(signalData.key);
  };
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={snackbarOpen}
      autoHideDuration={duration}
      onClose={handleClose}
      message={snackbarMessage}
    />
  );
};

export default ComSnackbar;
