import { useState, useCallback } from 'react';
import { winiCom, handleApiError } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../api/api';

/**
 * 부서 상태 상수
 */
export const DEPARTMENT_STATUS = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
};

const formDataInitVal = {
  id: '',
  departmentCode: '',
  departmentName: '',
  parentDepartmentId: '',
  sortSeq: '0',
  status: DEPARTMENT_STATUS.ENABLE,
};

/**
 * 부서 CRUD 작업
 */
export const useEditor = (onSuccess) => {
  const { connector } = winiCom.getFormInfo();
  const [formData, setFormData] = useState(formDataInitVal);

  /**
   * 부서 정보 로드
   */
  const setDeptInfo = useCallback(async (data) => {
    if (!data || !data.id) {
      setFormData(formDataInitVal);
      return;
    }

    try {
      const response = await getDepartment(connector, data.id);
      if (response.result === 'SUCCESS') {
        const deptData = {
          ...response.data,
          sortSeq: response.data.sortSeq !== null && response.data.sortSeq !== undefined 
            ? String(response.data.sortSeq) 
            : '0',
        };
        setFormData(deptData);
      }
    } catch (error) {
      await handleApiError(error);
    }
  }, [connector]);

  /**
   * 폼 데이터 변경 처리
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * 체크박스 변경 처리
   */
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setFormData({
      ...formData,
      status: checked ? DEPARTMENT_STATUS.ENABLE : DEPARTMENT_STATUS.DISABLE,
    });
  };

  /**
   * 중복 체크
   */
  const checkDuplicate = (deptList) => {
    const checkFields = [
      { key: 'departmentCode', name: '부서 CODE' },
      { key: 'departmentName', name: '부서명' },
    ];

    for (let i = 0; i < deptList.length; i++) {
      const rowData = deptList[i];

      for (let j = 0; j < checkFields.length; j++) {
        const { key, name } = checkFields[j];

        if (rowData[key] === formData[key]) {
          winiMsg.showAlert(`${name}은/는 중복될 수 없습니다.`);
          return false;
        }
      }
    }
    return true;
  };

  /**
   * 필수값 검증
   */
  const validateRequired = () => {
    if (!formData.departmentCode || formData.departmentCode.trim() === '') {
      winiMsg.showAlert('부서 CODE 은/는 필수입력값입니다.');
      return false;
    }
    if (!formData.departmentName || formData.departmentName.trim() === '') {
      winiMsg.showAlert('부서 명 은/는 필수입력값입니다.');
      return false;
    }
    if (formData.sortSeq === null || formData.sortSeq === undefined || 
        (typeof formData.sortSeq === 'string' && formData.sortSeq.trim() === '')) {
      winiMsg.showAlert('정렬순서 은/는 필수입력값입니다.');
      return false;
    }
    return true;
  };

  /**
   * 부서 생성
   */
  const handleCreate = async (deptList) => {
    if (formData.id) {
      await winiMsg.showAlert(
        '이미 부서가 선택되어 있습니다. \n초기화를 진행하고 추가해주세요'
      );
      return;
    }

    if (!validateRequired()) {
      return;
    }

    if (!checkDuplicate(deptList)) {
      return;
    }

    const answer = await winiMsg.showConfirm('등록 하시겠습니까?');
    if (answer === 'Y') {
      try {
        const saveParam = { ...formData };
        delete saveParam.id;

        const response = await createDepartment(connector, saveParam);
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('등록 되었습니다.');
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        await handleApiError(error);
      }
    }
  };

  /**
   * 부서 수정
   */
  const handleUpdate = async () => {
    if (!formData.id) {
      await winiMsg.showAlert('수정할 부서를 선택해주세요');
      return;
    }

    if (!validateRequired()) {
      return;
    }

    const answer = await winiMsg.showConfirm('수정 하시겠습니까?');
    if (answer === 'Y') {
      try {
        const response = await updateDepartment(
          connector,
          formData.id,
          formData
        );
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('수정 되었습니다.');
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        await handleApiError(error);
      }
    }
  };

  /**
   * 부서 삭제
   */
  const handleDelete = async () => {
    if (!formData.id) {
      await winiMsg.showAlert('삭제할 부서를 선택해주세요');
      return;
    }

    const answer = await winiMsg.showConfirm('삭제 하시겠습니까?');
    if (answer === 'Y') {
      try {
        const response = await deleteDepartment(connector, formData.id);
        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('삭제 되었습니다.');
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        await handleApiError(error);
      }
    }
  };

  /**
   * 폼 초기화
   */
  const reset = () => {
    setFormData(formDataInitVal);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleCheckboxChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    setDeptInfo,
    reset,
  };
};
