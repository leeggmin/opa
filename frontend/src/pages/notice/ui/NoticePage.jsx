import * as React from 'react';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniBox, WiniButton } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

import { NoticeList } from '@/features/notice/list';
import { NOTICE_PAGE } from '../model/constants';
import { NoticeDetail } from '@/features/notice/detail';
import { NoticeWrite } from '@/features/notice/write';
import { NoticePasswordDialog } from '@/features/notice/password-dialog';
import { useNoticePage } from '../model/useNoticePage';

export const NoticePage = (props) => {
  const ctl = useNoticePage();
  const isWriteModeEdit = ctl.write.mode === '수정';
  const isListPage = ctl.pageType === NOTICE_PAGE.LIST;
  const isDetailPage = ctl.pageType === NOTICE_PAGE.DETAIL;
  const isWritePage = ctl.pageType === NOTICE_PAGE.WRITE;

  let isInsertDisabled = true;
  if (isListPage) {
    isInsertDisabled = false;
  }
  if (isWritePage && !isWriteModeEdit) {
    isInsertDisabled = false;
  }

  let isUpdateDisabled = true;
  if (isDetailPage) {
    isUpdateDisabled = false;
  }
  if (isWritePage && isWriteModeEdit) {
    isUpdateDisabled = false;
  }

  let isDeleteDisabled = true;
  if (isDetailPage && ctl.detail.notice?.noticeId) {
    isDeleteDisabled = false;
  }

  const onBtnWrite = React.useCallback(() => {
    if (isListPage) {
      ctl.list.openWrite();
      return;
    }

    if (isWritePage && !isWriteModeEdit) {
      ctl.write.save();
    }
  }, [isListPage, isWritePage, ctl.list, ctl.write, isWriteModeEdit]);

  const onBtnSave = React.useCallback(() => {
    if (isDetailPage) {
      ctl.detail.edit();
      return;
    }

    if (isWritePage && isWriteModeEdit) {
      ctl.write.save();
    }
  }, [isDetailPage, isWritePage, ctl.detail, ctl.write, isWriteModeEdit]);

  const onBtnDelete = React.useCallback(() => {
    if (isDetailPage) {
      ctl.detail.remove();
    }
  }, [isDetailPage, ctl.detail]);

  return (
    <WiniFormNormal>
      <WiniBox>
        {ctl.pageType === NOTICE_PAGE.LIST ? (
          <NoticeList
            rows={ctl.list.rows}
            page={ctl.list.page}
            totalPage={ctl.list.totalPage}
            searchData={ctl.list.searchData}
            onSearch={ctl.list.onSelect}
            onSearchChange={ctl.list.onSearchChange}
            onEnter={ctl.list.onEnter}
            onChangePage={ctl.list.onChangePage}
            onOpenDetail={ctl.list.openDetail}
          />
        ) : null}

        {ctl.pageType === NOTICE_PAGE.DETAIL ? (
          <NoticeDetail notice={ctl.detail.notice} onBack={ctl.detail.back} />
        ) : null}

        {ctl.pageType === NOTICE_PAGE.WRITE ? (
          <NoticeWrite
            notice={ctl.write.notice}
            showCancel={ctl.write.mode === '수정'}
            editorRef={ctl.write.editorRef}
            uploadedFileList={ctl.write.uploadedFileList}
            onChangeFiles={ctl.write.setUploadedFileList}
            onFieldChange={ctl.write.onFieldChange}
            onToggleUse={ctl.write.toggleUse}
            onToggleNotice={ctl.write.toggleNotice}
            onToggleSecret={ctl.write.toggleSecret}
            onList={ctl.write.list}
            onCancel={ctl.write.cancel}
            onOpenPwDialog={ctl.openPwDialog}
            startDateValue={ctl.startDateValue}
            endDateValue={ctl.endDateValue}
          />
        ) : null}

        <WiniBox ui="btnbox" className="mt-2">
          <WiniBox ui="btnitem" >
          {winiCom.checkMenuAut(
              'delete',
              <WiniButton ui="delete" className="w-20" onClick={onBtnDelete} disabled={isDeleteDisabled}>
                삭제
              </WiniButton>,
            )}
          </WiniBox>
          <WiniBox ui="btnitem">
            {winiCom.checkMenuAut(
              'update',
              <WiniButton ui="line" className="w-20" onClick={onBtnSave} disabled={isUpdateDisabled}>
                수정
              </WiniButton>,
            )}
            {winiCom.checkMenuAut(
              'insert',
              <WiniButton ui="default" className="w-20" onClick={onBtnWrite} disabled={isInsertDisabled}>
                등록
              </WiniButton>,
            )}
          </WiniBox>
        </WiniBox>

        {/* Password Dialog for list -> detail navigation */}
        <NoticePasswordDialog
          open={ctl.passwordDialog.open}
          pw={ctl.passwordDialog.pw}
          onChangePw={ctl.passwordDialog.setPw}
          onConfirm={ctl.passwordDialog.confirm}
          onClose={ctl.passwordDialog.close}
        />

        {/* Password Dialog for write form */}
        <NoticePasswordDialog
          open={ctl.pwDialog.open}
          pw={ctl.pwDialog.pw}
          onChangePw={ctl.pwDialog.setPw}
          onConfirm={ctl.pwDialog.onConfirm}
          onClose={ctl.pwDialog.close}
        />
      </WiniBox>
    </WiniFormNormal>
  );
};

export default NoticePage;
