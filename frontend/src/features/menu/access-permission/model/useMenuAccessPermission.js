import { useState, useEffect } from 'react';
import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import {
  fetchMenuAccessPermissions,
  batchCreateMenuAccessPermissions,
} from '../api/api';
import {
  calDepths,
  fnConfChkAll,
  setChild,
  fnSetChildAllChk,
  fnSetChildColChk,
} from './helpers';

/**
 * 메뉴 접근 권한 관리 로직
 */
export const useMenuAccessPermission = (authorizationGroupId) => {
  const { connector } = winiCom.getFormInfo();

  const [menuGridDataList, setMenuGridDataList] = useState([]);

  /**
   * 메뉴별 권한 조회
   */
  const loadMenuPermissions = async (id) => {
    if (!id) {
      setMenuGridDataList([]);
      return;
    }

    try {
      const data = await fetchMenuAccessPermissions(connector, id);

      if (data.result === 'SUCCESS') {
        const menuAuthList = data.data;

        if (menuAuthList.length > 0) {
          const cpMenuAuthList = menuAuthList.map((obj) => ({ ...obj }));

          let afSetDepthObj = calDepths(cpMenuAuthList);

          afSetDepthObj.forEach((obj) => {
            obj.chkAll = fnConfChkAll(obj);
          });

          let map = {};
          let tree = [];

          afSetDepthObj.forEach((item) => {
            if (!item.parentAuthorizationGroupId) {
              item.parentAuthorizationGroupId = '';
            }
            map[item.id] = { ...item, children: [] };
          });

          afSetDepthObj.forEach((item) => {
            if (
              item.parentMenuId === null ||
              !item.parentMenuId ||
              item.parentMenuId === ''
            ) {
              tree.push(map[item.menuId]);
            } else {
              map[item.parentMenuId]?.children.push(map[item.menuId]);
            }
          });

          setChild(tree, afSetDepthObj);
          setMenuGridDataList(afSetDepthObj);
        }
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response.data.message));
    }
  };

  /**
   * 체크박스 변경 핸들러
   */
  const handleCheckboxChange = (params) => {
    const field = params.colDef.field;
    const allChkVal = params.newValue;
    const rowIndex = params.node.rowIndex;
    const newMenuGridDataList = [...menuGridDataList];

    newMenuGridDataList[rowIndex][field] = params.newValue ? 'ALLOW' : 'NONE';

    const rowData = params.data;
    const allChkYn = fnConfChkAll(rowData);
    rowData.chkAll = allChkYn;

    if (field === 'chkAll') {
      const rowKeys = Object.keys(rowData);
      const ynKeys = rowKeys.filter(
        (key) =>
          key.toLowerCase().slice(-6, key.length) === 'status' &&
          key.length > 6
      );

      ynKeys.forEach((item) => {
        if (allChkVal === true) {
          rowData.chkAll = 'ALLOW';
          rowData[item] = 'ALLOW';
        } else {
          rowData.chkAll = 'NONE';
          rowData[item] = 'NONE';
        }
      });

      if (rowData.hasOwnProperty('children') && rowData.children != null) {
        const childArr = rowData.children;
        fnSetChildAllChk(newMenuGridDataList, childArr, ynKeys, allChkVal);
      }
    } else {
      if (rowData.hasOwnProperty('children') && rowData.children != null) {
        fnSetChildColChk(
          newMenuGridDataList,
          rowData.children,
          field,
          allChkVal
        );
      }
    }

    setMenuGridDataList(newMenuGridDataList);
  };

  /**
   * 메뉴 권한 저장
   */
  const handleSave = async (authId) => {
    if (!authId) {
      await winiMsg.showAlert('권한을 선택해주세요');
      return;
    }

    const saveParams = [];
    const keys = Object.keys(menuGridDataList[0]);
    const saveKeys = keys.filter(
      (key) =>
        key.toLowerCase().slice(-6, key.length) === 'status' &&
        key.length > 6 &&
        key !== 'menuStatus'
    );

    menuGridDataList.forEach((each) => {
      const saveItem = {};
      saveKeys.forEach((item) => {
        saveItem[item] = each[item] || 'NONE';
        saveItem.menuId = each.menuId;
      });

      if (JSON.stringify(saveItem) !== '{}') {
        saveParams.push(saveItem);
      }
    });

    try {
      const data = await batchCreateMenuAccessPermissions(
        connector,
        authId,
        saveParams
      );
      if (data.result === 'SUCCESS') {
        winiMsg.showSnackbar('권한이 등록 되었습니다.');
      }
    } catch (error) {
      winiMsg.showAlert(winiCom.getErrorMessage(error.response.data.message));
    }
  };

  /**
   * authorizationGroupId 변경 시 메뉴 권한 조회
   */
  useEffect(() => {
    loadMenuPermissions(authorizationGroupId);
  }, [authorizationGroupId]);

  return {
    menuGridDataList,
    handleCheckboxChange,
    handleSave,
  };
};
