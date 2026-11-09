import * as React from 'react';

import {
  WiniGridLayout,
  WiniGridItem,
  WiniFormControl,
  WiniText,
  WiniEditor,
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniDateTimePicker,
} from '@/shared/ui/wini';
import { FileUpload } from '@/shared/ui/blocks/file-upload';
import { winiDate } from '@/shared/lib';

export const NoticeWrite = (props) => {
  const n = props.notice;

  return (
    <>  
      <WiniBox ui="form">
        <WiniGridLayout container columnSpacing={4}>
          <WiniGridItem>
            <WiniText
              ui="row"
              label="등록자"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              disabled={true}
              placeholder={'자동입력'}
              value={n.creatorName}
            />
          </WiniGridItem>

          <WiniGridItem>
            <WiniText
              ui="row"
              label="등록일시"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              disabled={true}
              placeholder={'자동입력'}
              value={n.createAt ? winiDate.dateFormat(winiDate(n.createAt), 'YYYY-MM-DD HH:mm:ss') : ''}
            />
          </WiniGridItem>

          <WiniGridItem>
            <WiniText
              ui="row"
              label="수정자"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              disabled={true}
              placeholder={'자동입력'}
              value={n.updaterName}
            />
          </WiniGridItem>

          <WiniGridItem>
            <WiniText
              ui="row"
              label="수정일시"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              disabled={true}
              placeholder={'자동입력'}
              value={n.updateAt ? winiDate.dateFormat(winiDate(n.updateAt), 'YYYY-MM-DD HH:mm:ss') : ''}
            />
          </WiniGridItem>
        </WiniGridLayout>

        <WiniGridLayout container columnSpacing={4} rowSpacing={2} ui='form'>
          <WiniText
            ui="row"
            label="제목"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            required={true}
            value={n.title}
            name="title"
            onChange={props.onFieldChange}
          />
        </WiniGridLayout>
      </WiniBox>

      <WiniFormControl className="w-full pt-2">
        <WiniEditor
          ref={props.editorRef}
          previewStyle="tab"
          height="500px"
          width="100%"
          initialEditType="wysiwyg"
          serviceName="system"
          value={n.content}
        />
      </WiniFormControl>

      <WiniBox ui="form" className="mt-2">
        <WiniGridLayout container>
          <WiniCheckbox
            label="사용여부"
            className="text-gray-300 m-1"
            checked={n.useStatus === 'USED'}
            onClick={props.onToggleUse}
            />
        </WiniGridLayout>

        <WiniGridLayout container ui='form' columnSpacing={3}>
          <WiniGridItem xs={2}>
            <WiniCheckbox
              label="공지여부"
              className="text-gray-300 m-1"
              checked={n.noticeStatus === 'NOTICE'}
              onClick={props.onToggleNotice}
              />
          </WiniGridItem>

          <WiniGridItem xs={2}>
            <WiniDateTimePicker
              className="w-full"
              format="YYYY-MM-DD"
              label="공지시작일자"
              required={n.noticeStatus === 'NOTICE'}
              disabled={n.noticeStatus !== 'NOTICE'}
              value={
                n.noticeStatus === 'NOTICE' ? props.startDateValue : null
              }
              name="startDate"
              onChange={props.onFieldChange}
              />
          </WiniGridItem>

          <WiniGridItem xs={2}>
            <WiniDateTimePicker
              className="w-full"
              format="YYYY-MM-DD"
              label="공지종료일자"
              required={n.noticeStatus === 'NOTICE'}
              disabled={n.noticeStatus !== 'NOTICE'}
              value={
                n.noticeStatus === 'NOTICE' ? props.endDateValue : null
              }
              name="endDate"
              onChange={props.onFieldChange}
              />
          </WiniGridItem>
        </WiniGridLayout>

        <WiniGridLayout container className='items-center'>
          <WiniGridItem xs={2}>
            <WiniCheckbox
              label="비밀글여부"
              className="text-gray-300 m-1"
              checked={n.visibilityStatus === 'SECRET'}
              onClick={props.onToggleSecret}
            />
          </WiniGridItem>

          <WiniGridItem xs={2}>
            <WiniButton
              className="w-[120px]"
              disabled={n.visibilityStatus !== 'SECRET'}
              onClick={props.onOpenPwDialog}
            >
              비밀번호 입력
            </WiniButton>
          </WiniGridItem>

          <WiniGridItem>
            <WiniText
              label="비밀번호"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              className="invisible"
              required={n.visibilityStatus === 'SECRET'}
              disabled={n.visibilityStatus !== 'SECRET'}
              value={n.visibilityStatus === 'SECRET' ? n.pw : ''}
              type="password"
              name="pw"
              onChange={props.onFieldChange}
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      <WiniBox className="flex justify-between mt-2">
        <FileUpload
          serviceName={'system'}
          uploadedFileList={props.uploadedFileList}
          onChange={props.onChangeFiles}
          maxHeight={100}
        />
        <WiniBox ui="btnitem">
        <WiniButton ui="line"onClick={() => props.showCancel ? props.onCancel() : props.onList()}>
            {/* 목록 */}
            {props.showCancel ? '취소' : '목록'}
          </WiniButton>
        {/* {props.showCancel ? (
            <WiniButton ui="default" onClick={props.onCancel}>
              취소
            </WiniButton>
        ) : null} */}
        </WiniBox>
      </WiniBox>
    </>
  );
};
