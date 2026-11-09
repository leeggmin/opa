import * as React from 'react';

import {
  WiniGridLayout,
  WiniGridItem,
  WiniFormControl,
  WiniText,
  WiniBox,
  WiniButton,
  WiniEditorViewer,
} from '@/shared/ui/wini';
import { FileListDown } from '@/shared/ui/blocks/file-download';
import { winiDate } from '@/shared/lib';

export const NoticeDetail = (props) => {
  const n = props.notice;

  if (!n) return null;

  return (
    <>
      <WiniBox>
        <WiniGridLayout container columnSpacing={3} rowSpacing={2}>
          <WiniGridItem xs={12} md={6} lg={6}>
            <WiniText
              ui="column"
              label="제목"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              readOnly={true}
              value={n.title}
            />
          </WiniGridItem>

          <WiniGridItem xs={12} md={6} lg={6}>
            <WiniText
              ui="column"
              label="작성자"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              readOnly={true}
              value={n.creatorName}
            />
          </WiniGridItem>

          <WiniGridItem xs={12} md={6} lg={6}>
            <WiniText
              ui="column"
              label="등록일시"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              readOnly={true}
              value={n.createAt ? winiDate.dateFormat(winiDate(n.createAt), 'YYYY-MM-DD HH:mm:ss') : ''}
            />
          </WiniGridItem>

          <WiniGridItem xs={12} md={6} lg={6}>
            <WiniText
              ui="column"
              label="조회수"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              readOnly={true}
              value={n.viewCount}
            />
          </WiniGridItem>

          <WiniGridItem xs={12}>
            <WiniFormControl className="min-h-[500px] w-full border border-gray-300">
              <WiniBox className="px-4 py-2">
                <WiniEditorViewer
                  previewStyle="vertical"
                  width="100%"
                  initialEditType="wysiwyg"
                  value={n.content}
                />
              </WiniBox>
            </WiniFormControl>
          </WiniGridItem>

          {n.fileList && n.fileList.length > 0 ? (
            <WiniGridItem xs={12}>
              <WiniBox className="min-h-[25px]">
                첨부파일
                <FileListDown
                  fileList={n.fileList}
                  serviceName={'system'}
                  fileName={`${n.title}.zip`}
                  allDown={true}
                  maxHeight={100}
                />
              </WiniBox>
            </WiniGridItem>
          ) : null}

          <WiniGridItem xs={12} className="flex justify-end">
            <WiniButton ui="line" onClick={props.onBack}>
              목록
            </WiniButton>
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>
    </>
  );
};
