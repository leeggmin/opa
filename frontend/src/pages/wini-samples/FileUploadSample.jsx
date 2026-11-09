import { WiniBox } from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { FileUpload } from '@/shared/ui/blocks/file-upload';
import { useState, useEffect } from 'react';
import { FileListDown } from '@/shared/ui/blocks/file-download';

export default function FileUploadSample() {
  const fileUploadService = 'system'; // 파일 업로드 서비스 이름
  // 첨부파일
  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [fileList, setFileList] = useState([]);

  return (
    <WiniFormEmpty>
      <WiniBox
        display={'flex'}
        justifyContent={'start'}
        gap={'1%'}
        margin="1% 0"
      >
        <FileUpload
          serviceName={fileUploadService}
          uploadedFileList={uploadedFileList}
          onChange={(fileList) => {
            setUploadedFileList(fileList);
          }}
          maxHeight={100}
        />
      </WiniBox>
      <WiniBox>
        {fileList && fileList.length > 0 ? (
          <WiniBox sx={{ minHeight: 25 }}>
            첨부파일
            <FileListDown
              fileList={fileList}
              serviceName={fileUploadService}
              fileName={'All_Files.zip'}
              allDown={true}
              maxHeight={100}
            />
          </WiniBox>
        ) : null}
      </WiniBox>
    </WiniFormEmpty>
  );
}
