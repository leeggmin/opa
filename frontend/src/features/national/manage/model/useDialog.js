import { useCallback, useMemo, useState } from 'react';
import { winiMsg } from '@/shared/model';

export const DIALOG_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const useNationalManageDialog = (params) => {
  const { fetchList, create, update, remove } = params;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(DIALOG_MODE.EDIT);
  const isCreate = useMemo(() => mode === DIALOG_MODE.CREATE, [mode]);

  const [selectedData, setSelectedData] = useState({
    nationalCode: '',
    nationalName: '',
  });

  const openCreate = useCallback(() => {
    setSelectedData({ nationalCode: '', nationalName: '' });
    setMode(DIALOG_MODE.CREATE);
    setOpen(true);
  }, []);

  const openEdit = useCallback((row) => {
    setSelectedData({
      nationalCode: row?.nationalCode || '',
      nationalName: row?.nationalName || '',
    });
    setMode(DIALOG_MODE.EDIT);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const onSelectedChange = useCallback((e) => {
    const { name, value } = e.target;
    setSelectedData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = useCallback(() => {
    if (!selectedData.nationalCode) {
      winiMsg.showSnackbar('NationalCode is required.');
      return false;
    }
    if (String(selectedData.nationalCode).length > 2) {
      winiMsg.showSnackbar('The maximum number of codes is two characters.');
      return false;
    }
    if (!selectedData.nationalName) {
      winiMsg.showSnackbar('NationalName is required.');
      return false;
    }
    return true;
  }, [selectedData]);

  const save = useCallback(async () => {
    if (!validate()) return;

    const payload = {
      nationalCode: selectedData.nationalCode,
      nationalName: selectedData.nationalName,
    };

    try {
      const data =
        mode === DIALOG_MODE.CREATE
          ? await create(payload)
          : await update(selectedData.nationalCode, payload);

      if (data?.result === 'SUCCESS') {
        close();
        winiMsg.showSnackbar('success');
        await fetchList();
      } else {
        winiMsg.showSnackbar(data?.message || 'Save error.');
      }
    } catch (e) {
      winiMsg.showSnackbar('Save error.');
    }
  }, [validate, selectedData, mode, create, update, close, fetchList]);

  const del = useCallback(async () => {
    try {
      const data = await remove(selectedData.nationalCode);

      if (data?.result === 'SUCCESS') {
        close();
        winiMsg.showSnackbar('success');
        await fetchList();
      } else {
        winiMsg.showSnackbar(data?.message || 'Delete error.');
      }
    } catch (e) {
      winiMsg.showSnackbar('Delete error.');
    }
  }, [remove, selectedData.nationalCode, close, fetchList]);

  return {
    open,
    mode,
    MODE: DIALOG_MODE,
    selectedData,

    isCreate,
    nationalCodeDisabled: !isCreate,

    onSelectedChange,
    openCreate,
    openEdit,
    close,

    onSave: save,
    onDelete: del,
  };
};
