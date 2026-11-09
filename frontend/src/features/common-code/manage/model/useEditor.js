import { useState, useRef } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  createCommonCode,
  updateCommonCode,
  deleteCommonCode,
} from '../api/api';

const CODE_EDITOR_MODE = {
  CREATE: '등록',
  UPDATE: '수정',
};

const defaultCodeData = {
  upperCode: '',
  upperCodeName: '',
  upperCodeId: '',
  codeId: '',
  code: '',
  codeName: '',
  codeDepthNo: '',
  codeOrderNo: '',
  codeUseStatus: '',
  codeDescription: '',
};

/**
 * 공통 코드 편집 관리 훅
 */
export const useEditor = (searchData, onRefresh) => {
  const { connector } = winiCom.getFormInfo();
  const codeFrmRef = useRef(null);

  const [selectedCodeData, setSelectedCodeData] = useState(defaultCodeData);
  const [formDisabled, setFormDisabled] = useState({
    inputCode: true,
    saveBtn: true,
    updateBtn: true,
    deleteBtn: true,
  });
  const [type, setType] = useState('');

  // 값 변경
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'code') {
      value = value.replace(/[^0-9]/g, '');
    }

    setSelectedCodeData({ ...selectedCodeData, [name]: value });
  };

  // 체크박스 변경
  const handleCheckboxChange = () => {
    setSelectedCodeData({
      ...selectedCodeData,
      codeUseStatus: selectedCodeData.codeUseStatus === 'USED' ? 'UNUSED' : 'USED',
    });
  };

  // 그리드 행 클릭 (공통)
  const handleRowClick = (e, depth) => {
    let data = { ...e.data };

    // depth2, depth3의 경우 상위 코드 정보 추가
    if (depth === 2) {
      data.upperCode = searchData.depth1Code;
      data.upperCodeName = searchData.depth1CodeName;
    } else if (depth === 3) {
      data.upperCode = searchData.depth2Code;
      data.upperCodeName = searchData.depth2CodeName;
    }

    // null/undefined 값을 빈 문자열로 변환
    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === undefined) {
        data[key] = '';
      }
    });

    setSelectedCodeData(data);
    setFormDisabled({
      inputCode: true,
      saveBtn: true,
      updateBtn: false,
      deleteBtn: false,
    });
    setType(CODE_EDITOR_MODE.UPDATE);
  };

  // 추가 버튼 (공통)
  const handleAdd = (depth, upperCodeId, upperCode, upperCodeName) => {
    let resetCodeData = { ...defaultCodeData };
    resetCodeData.codeDepthNo = String(depth);
    resetCodeData.codeUseStatus = 'USED';

    if (depth > 1) {
      resetCodeData.upperCodeId = upperCodeId;
      resetCodeData.upperCode = upperCode;
      resetCodeData.upperCodeName = upperCodeName;
    }

    setSelectedCodeData(resetCodeData);
    setFormDisabled({
      inputCode: false,
      saveBtn: false,
      updateBtn: true,
      deleteBtn: true,
    });
    setType(CODE_EDITOR_MODE.CREATE);
  };

  // 필수값 체크
  const checkRequired = () => {
    const ref = codeFrmRef.current.children;
    for (const item of ref) {
      let required = 0;
      let labelText = '';
      let checkValue = '';
      let focusItem;

      for (const item2 of [...item.querySelectorAll('*')].reverse()) {
        if (item2.tagName === 'LABEL') {
          labelText = item2.innerText.replaceAll('*', '');
        }
        if (item2.required) required++;

        if (required > 0 && item2.tagName === 'INPUT') {
          checkValue = item2.value;
          focusItem = item2;
        }
      }

      if (required > 0 && !checkValue) {
        winiMsg.showAlert(labelText + '은(는) 필수 입력입니다.').then(() => {
          focusItem?.focus();
        });
        return false;
      }
    }
    return true;
  };

  // 등록
  const handleSave = async () => {
    const result = await winiMsg.showConfirm('등록하시겠습니까?');
    if (result !== 'Y') return;

    if (!checkRequired()) return;

    try {
      await createCommonCode(connector, selectedCodeData);
      winiMsg.showSnackbar('코드가 성공적으로 저장되었습니다.');
      onRefresh(searchData.nowDepth);
    } catch (error) {
      winiMsg.showSnackbar('코드 저장 중 오류 발생');
    }
  };

  // 수정
  const handleUpdate = async () => {
    const result = await winiMsg.showConfirm('수정하시겠습니까?');
    if (result !== 'Y') return;

    if (!checkRequired()) return;

    try {
      await updateCommonCode(connector, selectedCodeData.codeId, selectedCodeData);
      winiMsg.showSnackbar('코드가 성공적으로 저장되었습니다.');
      onRefresh(searchData.nowDepth);
    } catch (error) {
      winiMsg.showSnackbar('코드 저장 중 오류 발생');
    }
  };

  // 삭제
  const handleDelete = async () => {
    const result = await winiMsg.showConfirm('삭제하시겠습니까?');
    if (result !== 'Y') return;

    try {
      await deleteCommonCode(connector, selectedCodeData.codeId);
      winiMsg.showSnackbar('코드가 성공적으로 삭제되었습니다.');
      onRefresh(searchData.nowDepth);
    } catch (error) {
      winiMsg.showSnackbar('코드 삭제 중 오류 발생');
    }
  };

  return {
    codeFrmRef,
    selectedCodeData,
    formDisabled,
    type,
    handleChange,
    handleCheckboxChange,
    handleRowClick,
    handleAdd,
    handleSave,
    handleUpdate,
    handleDelete,
    setSelectedCodeData,
    setFormDisabled,
    setType,
  };
};
