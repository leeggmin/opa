import React, { Fragment } from 'react';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { NationalListSearch, NationalListGrid } from '@/features/national/list';
import { NationalManageDialog } from '@/features/national/manage';

import { useNationalManagementPage } from '../model/useNationalManagementPage';

export const NationalManagementPage = () => {
  const ctl = useNationalManagementPage();

  return (
    <Fragment>
      <WiniFormNormal>
        <NationalListSearch
          searchData={ctl.searchData}
          onSearchChange={ctl.onSearchChange}
          onSearch={ctl.onSelect}
          onInsert={ctl.dialog.openCreate}
        />

        <NationalListGrid
          rowData={ctl.dataListView}
          onRowDoubleClick={ctl.dialog.openEdit}
        />
      </WiniFormNormal>

      <NationalManageDialog
        open={ctl.dialog.open}
        mode={ctl.dialog.mode}
        MODE={ctl.dialog.MODE}
        selectedData={ctl.dialog.selectedData}
        onSelectedChange={ctl.dialog.onSelectedChange}
        onClose={ctl.dialog.close}
        onSave={ctl.dialog.onSave}
        onDelete={ctl.dialog.onDelete}
        nationalCodeDisabled={ctl.dialog.nationalCodeDisabled}
      />
    </Fragment>
  );
};

export default NationalManagementPage;
