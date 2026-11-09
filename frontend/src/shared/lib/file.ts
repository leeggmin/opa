import { Communicator, getTenantUrl } from '@/shared/api';
import { winiMsg } from '@/shared/model';

/**
 * 파일업로드
 *
 */
export async function upload(
  serviceName: string,
  files: FileList | null,
  subkey?: string | null,
): Promise<any> {
  const connector = new Communicator();
  const uploadInfoList: any[] = [];
  if (files == null) throw '파일이 없습니다';

  try {
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let fileInfo = {
          fileName: file.name,
          fileSize: file.size,
          subKey: subkey,
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
      return await Promise.all(
        uploadInfoList.map(async (uploadInfo) => {
          if (files == null) throw '파일이 없습니다';
          // if(uploadInfo.uploadUrl == undefined) throw '업로드 실패 2'
          // S3 호환 Rest API로 파일 업로드
          await connector.client({
            method: 'put',
            url: uploadInfo.uploadUrl, // S3 URL
            data: files[uploadInfoList.indexOf(uploadInfo)],
            headers: {
              'Content-Type': 'application/octet-stream',
              Authorization: null, // S3는 별도의 인증이 필요 없고, 있을 경우 400오류가 발생하므로 헤더에서 삭제함
              'X-Org-Id': null,
            },
          });

          return uploadInfo;
        }),
      );
    } catch {
      winiMsg.showAlert('파일 업로드에 실패했습니다.');
    }
  } finally {
    files = null;
  }
}

/**
 * File download
 * @param signedFileId
 */
export async function dowloadFile(serviceName: string, signedFileId: string) {
  if (signedFileId == undefined || signedFileId == null)
    throw '다운로드 실패';
  // signedFileId ='0193f286-bfc7-7ffd-822c-8705cd50f8ae_1735027137_117f53b473'
  const url = `${getTenantUrl()}/api/v1/${serviceName}/commonFile/download/${signedFileId}?download=1`;
  // 다운로드를 트리거할 a 요소 생성
  const tag_a = document.createElement('a');
  tag_a.href = url;
  tag_a.click();
  // 다운로드가 완료되면 URL 해제 및 a 요소 제거
  window.URL.revokeObjectURL(url);
  tag_a.remove();
}

/**
 * File preview 주소 리턴 img tag에 src에 넣을 수 있음.
 * @param signedFileId
 */
export async function getPreviewFileUrl(serviceName: string, signedFileId: string) {
  if (signedFileId == undefined || signedFileId == null)
    throw '미리보기 주소 가져오기 실패';
  // signedFileId ='0193f286-bfc7-7ffd-822c-8705cd50f8ae_1735027137_117f53b473'
  const url = `${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${signedFileId}`;
  return url;
}

// Backward compatibility: class-based API
class winiFile {
  static upload = upload;
  static dowloadFile = dowloadFile;
  static getPreviewFileUrl = getPreviewFileUrl;
}

export default winiFile;
