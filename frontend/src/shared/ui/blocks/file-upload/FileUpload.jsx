import { useCallback, useEffect, useState } from 'react';
import {
  WiniPagination,
  WiniBox,
  WiniList,
  WiniListItem,
  WiniStack,
  WiniTypography,
  WiniIconButton,
} from '@/shared/ui/wini';
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { CloudUploadIcon, DescriptionIcon } from '@/shared/lib';
import { Communicator, getTenantUrl, OpenCommunicator } from '@/shared/api';
import { CloseIcon } from '@/shared/lib';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload(props) {
  const [isUploading, setIsUploading] = useState(false);
  const [maxHeight, setMaxHeight] = useState(
    !!props.maxHeight ? props.maxHeight : null,
  );
  const { serviceName, onChange, uploadedFileList } = props;

  const onFileUpload = useCallback(async (event) => {
    const connector = new Communicator();
    const connector2 = new OpenCommunicator();
    const uploadInfoList = [];

    if (!serviceName) {
      winiMsg.showAlert(
        '파일 업로드 기능을 사용하려면 서비스명을 지정해주세요.',
      );
      return;
    }

    setIsUploading(true);

    try {
      try {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          let fileInfo = {
            entityId: null,
            entityName: null,
            extraInfo: null,
            fileName: file.name,
            fileSize: file.size,
            subKey: null,
            fileOrigin: 'FILE_UPLOAD',
          };
          const response = await connector.client.post(
            `/api/v1/${serviceName}/commonFile/prepareUpload`,
            fileInfo,
          );

          fileInfo = { ...fileInfo, ...response.data.data };

          uploadInfoList.push(fileInfo);
        }
      } catch {
        winiMsg.showAlert('파일 업로드 준비에 실패했습니다.');
        return;
      }

      try {
        await Promise.all(
          uploadInfoList.map(async (uploadInfo, index) => {
            // S3 호환 Rest API로 파일 업로드
            await connector2.client({
              method: 'put',
              url: uploadInfo.uploadUrl, // S3 URL
              data: event.target.files[uploadInfoList.indexOf(uploadInfo)],
              headers: {
                'Content-Type': 'application/octet-stream',
                Authorization: null, // S3는 별도의 인증이 필요 없고, 있을 경우 400오류가 발생하므로 헤더에서 삭제함
                'X-Org-Id': null,
              },
            });

            if (typeof onChange === 'function') {
              const fileList = [...uploadedFileList, uploadInfo];
              onChange((prev) => [...prev, uploadInfo]);
            }

            return uploadInfo;
          }),
        );
      } catch {
        winiMsg.showAlert('파일 업로드에 실패했습니다.');
      }
    } finally {
      setIsUploading(false);

      event.target.files = null;
    }
  });

  const bytesToKB = (bytes) => {
    if (typeof bytes !== 'number' || isNaN(bytes)) {
      throw new Error('숫자 형식의 바이트 값을 입력해 주세요.');
    }

    const kb = bytes / 1024 + Number.EPSILON; // 부동소수점 보정
    return kb.toFixed(2) + ' KB';
  };

  return (
    <WiniBox className="w-full">
      {isUploading && (
        <WiniBox
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#333',
            opacity: 0.75,
            textAlign: 'center',
          }}
        >
          <CircularProgress color="success" />
          <WiniTypography>업로드 중 입니다.</WiniTypography>
        </WiniBox>
      )}
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={onFileUpload} multiple />
      </Button>
      {/* 업로드 할 파일을 선택해주세요. */}
      <WiniList
        sx={{
          maxHeight: maxHeight,
          overflowY: 'auto',
          margin: "1rem 1rem 0 0",
        }}
        className='border border-gray-300 rounded-md'
      >
        {uploadedFileList.map((file, index) => (
          <WiniListItem key={file.fileId} sx={{ p: 0.5 }}>
            <WiniStack direction={'row'} className='flex items-center'>
              {file.mimeType && file.mimeType.startsWith('image/') ? (
                <WiniBox
                  component="img"
                  src={`${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${file.signedFileId}`}
                  alt=""
                  sx={{
                    maxWidth: '3.5rem',
                    maxHeight: '3.5rem',
                    mr: 0.5,
                  }}
                />
              ) : (
                <DescriptionIcon />
              )}
              <WiniTypography>
                {' '}
                {file.fileName} [{bytesToKB(file.fileSize)}]
              </WiniTypography>
              <WiniIconButton
                sx={{ height: 25 }}
                onClick={async () => {
                  const ans =
                    await winiMsg.showConfirm('해당파일을 삭제하시겠습니까?');
                  if (ans == 'N') return;
                  const filtered = uploadedFileList.filter(
                    (it, idx) => idx !== index,
                  );
                  if (typeof onChange === 'function') {
                    onChange(filtered);
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </WiniIconButton>
            </WiniStack>
          </WiniListItem>
        ))}
      </WiniList>
    </WiniBox>
  );
}
