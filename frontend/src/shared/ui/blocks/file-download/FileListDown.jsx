import { WiniIconButton, WiniList, WiniListItem, WiniStack, WiniTypography, WiniButton, WiniBox } from '@/shared/ui/wini';
import { DownloadIcon, DescriptionIcon } from '@/shared/lib';
import { Communicator, getTenantUrl, OpenCommunicator } from '@/shared/api';
import { winiCom } from '@/shared/lib';
import { useEffect, useState } from 'react';

export default function FileListDown(props) {
  const connector = new Communicator();
  const connector2 = new OpenCommunicator();
  const { fileList, serviceName, fileName } = props;
  const [maxHeight, setMaxHeight] = useState(
    !!props.maxHeight ? props.maxHeight : null,
  );
  const [zipDown, setAllDown] = useState(
    !!props.allDown ? props.allDown : false,
  );
  const downloadFile = async (serviceName, signedFileId) => {
    const response = await connector2.client.get(
      '/api/v1/' + serviceName + '/commonFile/download/' + signedFileId,
      {
        responseType: 'arraybuffer', // 한글 깨짐 방지
        withCredentials: false, // S3 서비스에서 발생하는 CORS 방지
      },
    );

    let fileName = '';
    if (response.headers['content-disposition']) {
      fileName = response.headers['content-disposition']
        .split('filename=')[1]
        .replace(/"/g, '');

      if (fileName.match(/(%[A-Z0-9]+)/)) {
        try {
          fileName = decodeURIComponent(fileName);
        } catch (_ignore) {
          // decodeURIComponent에서 에러가 발생할 경우 무시
        }
      }
    } else {
      fileName = 'download';
    }

    downloadResponseAsFile(response, fileName);
  };
  const downloadMulti = async (serviceName, fileList, fileName) => {
    const response = await connector.client.post(
      '/api/v1/' + serviceName + '/commonFile/downloadMulti',
      {
        signedFileIdList: fileList.map((file) => file.signedFileId),
        fileName: fileName,
      },
      {
        responseType: 'arraybuffer',
      },
    );

    downloadResponseAsFile(response, fileName);
  };

  const bytesToKB = (bytes) => {
    if (typeof bytes !== 'number' || isNaN(bytes)) {
      throw new Error('숫자 형식의 바이트 값을 입력해 주세요.');
    }

    const kb = bytes / 1024 + Number.EPSILON; // 부동소수점 보정
    return kb.toFixed(2) + ' KB';
  };
  function downloadResponseAsFile(response, fileName) {
    // TODO : 임시 구현임. 제대로 된 파일 다운로드 라이브러리를 사용하도록 변경

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/octet-stream' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.style.cssText = 'display:none';
    try {
      document.body.appendChild(link);
      link.click();
    } finally {
      link.remove();
    }
  }

  return (
    <WiniBox>
      {zipDown == true
        ? winiCom.checkMenuAut(
            'dw',
            <WiniButton
              variant={'outlined'}
              sx={{ mt: 1.2 }}
              onClick={() => {
                downloadMulti(serviceName, fileList, fileName);
              }}
            >
              <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
              전체 파일 다운
            </WiniButton>,
          )
        : // 't'
          null}
      <WiniList
        sx={{
          pt: 1,
          maxHeight: maxHeight,
          overflowY: 'auto' /*, border:'1px solid #dcdcdc',borderRadius:2*/,
        }}
      >
        {fileList.map((file, index) => (
          <WiniListItem key={file.fileId} sx={{ p: 0.5 }}>
            <WiniStack direction={'row'}>
              {file.mimeType && file.mimeType.startsWith('image/') ? (
                <img
                  src={`${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${file.signedFileId}`}
                  alt=""
                  style={{ maxWidth: '25px', marginRight: '5px' }}
                />
              ) : (
                <DescriptionIcon fontSize="small" />
              )}
              <WiniTypography fontSize={'1.28rem'}>
                {' '}
                {file.fileName} [{bytesToKB(file.fileSize)}]
              </WiniTypography>
              {winiCom.checkMenuAut(
                'dw',
                <WiniIconButton
                  sx={{ height: 25 }}
                  onClick={async () => {
                    downloadFile(serviceName, file.signedFileId);
                  }}
                >
                  <DownloadIcon fontSize="small" />
                </WiniIconButton>,
              )}
            </WiniStack>
          </WiniListItem>
        ))}
      </WiniList>
    </WiniBox>
  );
}
