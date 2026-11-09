import { useState, useRef, useCallback } from 'react';
import { winiMsg } from '@/shared/model';
import { winiDate } from '@/shared/lib';
import { winiCom } from '@/shared/lib';
import { createNotice, updateNotice } from '../api/api';
import { NOTICE_STATUS, USE_STATUS, VISIBILITY_STATUS } from '@/entities/notice';

export const useNoticeWrite = (params) => {
  const { onBackToList, onBackToDetailWithData } = params;

  const editorRef = useRef(null);
  const { connector } = winiCom.getFormInfo('Y');

  const [notice, setNotice] = useState({
    noticeId: '',
    title: '',
    content: '',
    useStatus: USE_STATUS.USED,
    noticeStatus: NOTICE_STATUS.NOT_NOTICE,
    visibilityStatus: VISIBILITY_STATUS.PUBLIC,
    startDate: null,
    endDate: null,
    pw: '',
    creatorName: '',
    createAt: '',
    updaterName: '',
    updateAt: '',
    fileList: [],
  });

  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [mode, setMode] = useState('등록'); // 등록/수정

  const startCreate = useCallback(() => {
    setMode('등록');
    setUploadedFileList([]);
    setNotice((prev) => ({
      ...prev,
      noticeId: '',
      title: '',
      content: '',
      useStatus: USE_STATUS.USED,
      noticeStatus: NOTICE_STATUS.NOT_NOTICE,
      visibilityStatus: VISIBILITY_STATUS.PUBLIC,
      startDate: null,
      endDate: null,
      pw: '',
      fileList: [],
    }));
  }, []);

  const startEdit = useCallback((detail) => {
    setMode('수정');
    setNotice(detail);
    setUploadedFileList(Array.isArray(detail?.fileList) ? detail.fileList : []);
  }, []);

  const onFieldChange = useCallback(
    (e) => {
      const nm = e?.target?.name;
      const value = e?.target?.value;

      if (!nm) return;

      if (nm === 'endDate') {
        if (value && notice.startDate && value < notice.startDate) {
          winiMsg.showAlert('종료일은 시작일 이후로 설정해주세요.');
          setNotice((prev) => ({ ...prev, endDate: null }));
          return;
        }
      }

      setNotice((prev) => ({ ...prev, [nm]: value }));
    },
    [notice.startDate],
  );

  const toggleUse = useCallback(() => {
    setNotice((prev) => ({
      ...prev,
      useStatus: prev.useStatus === USE_STATUS.USED ? USE_STATUS.UNUSED : USE_STATUS.USED,
    }));
  }, []);

  const toggleNotice = useCallback(() => {
    setNotice((prev) => {
      if (prev.noticeStatus === NOTICE_STATUS.NOT_NOTICE) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 7);

        return {
          ...prev,
          noticeStatus: NOTICE_STATUS.NOTICE,
          startDate,
          endDate,
        };
      }
      return {
        ...prev,
        noticeStatus: NOTICE_STATUS.NOT_NOTICE,
        startDate: null,
        endDate: null,
      };
    });
  }, []);

  const toggleSecret = useCallback(() => {
    setNotice((prev) => ({
      ...prev,
      visibilityStatus:
        prev.visibilityStatus === VISIBILITY_STATUS.SECRET
          ? VISIBILITY_STATUS.PUBLIC
          : VISIBILITY_STATUS.SECRET,
    }));
  }, []);

  // 비밀번호는 UI에서 Dialog로 받아 model에 주입
  const setPassword = useCallback((pw) => {
    setNotice((prev) => ({ ...prev, pw }));
  }, []);

  const list = useCallback(() => {
    onBackToList();
  }, [onBackToList]);

  const cancel = useCallback(() => {
    // 수정 중이면 detail로, 아니면 list로
    if (mode === '수정') {
      onBackToDetailWithData(notice);
      return;
    }
    onBackToList();
  }, [mode, notice, onBackToDetailWithData, onBackToList]);

  const validate = useCallback(() => {
    if (!notice.title) {
      winiMsg.showAlert('제목은 필수입력 항목입니다.');
      return false;
    }

    const content = editorRef.current?.getValue?.() || '';
    if (!content) {
      winiMsg.showAlert('내용은 필수입력 항목입니다.');
      return false;
    }

    if (notice.noticeStatus === NOTICE_STATUS.NOTICE) {
      if (!notice.startDate) {
        winiMsg.showAlert('공지시작일자는 필수입력 항목입니다.');
        return false;
      }
      if (!notice.endDate) {
        winiMsg.showAlert('공지종료일자는 필수입력 항목입니다.');
        return false;
      }
    }

    if (notice.visibilityStatus === VISIBILITY_STATUS.SECRET && !notice.pw) {
      winiMsg.showAlert('비밀번호는 필수입력 항목입니다.');
      return false;
    }

    return true;
  }, [notice]);

  const save = useCallback(async () => {
    if (!validate()) return;

    const confirm = await winiMsg.showConfirm(`${mode}하시겠습니까?`);
    if (confirm !== 'Y') return;

    try {
      const content = editorRef.current?.getValue?.() || '';

      const payload = {
        ...notice,
        content,
        startDate:
          notice.noticeStatus === NOTICE_STATUS.NOTICE
            ? winiDate.dateFormat(winiDate(notice.startDate), 'YYYY-MM-DD')
            : null,
        endDate:
          notice.noticeStatus === NOTICE_STATUS.NOTICE
            ? winiDate.dateFormat(winiDate(notice.endDate), 'YYYY-MM-DD')
            : null,
        pw: notice.visibilityStatus === VISIBILITY_STATUS.SECRET ? notice.pw : '',
        fileIds: uploadedFileList.map((f) => f.fileId),
        fileList: uploadedFileList,
      };

      const data =
        mode === '등록'
          ? await createNotice(connector, payload)
          : await updateNotice(connector, payload.noticeId, payload);

      if (data?.result === 'SUCCESS') {
        winiMsg.showSnackbar(`공지사항이 성공적으로 ${mode === '등록' ? '저장' : '수정'}되었습니다.`);

        if (mode === '등록') {
          onBackToList();
        } else {
          onBackToDetailWithData?.(payload);
        }
      }
    } catch (e) {
      winiMsg.showSnackbar(`공지사항 ${mode} 중 오류 발생`);
    }
  }, [validate, mode, connector, notice, uploadedFileList, onBackToList, onBackToDetailWithData]);

  return {
    // state
    mode,
    notice,
    uploadedFileList,
    editorRef,

    // init
    startCreate,
    startEdit,

    // handlers
    onFieldChange,
    toggleUse,
    toggleNotice,
    toggleSecret,
    setPassword,
    setUploadedFileList,

    // nav/actions
    list,
    cancel,
    save,
  };
};
