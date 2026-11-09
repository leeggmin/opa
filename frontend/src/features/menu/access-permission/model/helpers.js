/**
 * 메뉴 접근 권한 트리/체크 순수 로직
 * useMenuAccessPermission에서 사용
 */

/**
 * depth 계산
 */
export function calDepths(bfSetDpthObj) {
  const depthObj = {};

  if (bfSetDpthObj.length > 0) {
    const getDepth = (menuId) => {
      if (!depthObj[menuId]) {
        const menu = bfSetDpthObj.find((m) => m.menuId === menuId);
        if (!menu) return 0;

        if (menu.parentMenuId) {
          const pDepth = getDepth(menu.parentMenuId);
          depthObj[menuId] = pDepth + 1;
        } else {
          depthObj[menuId] = 1;
        }
      }
      return depthObj[menuId];
    };

    bfSetDpthObj.forEach((menu) => {
      menu.depth = getDepth(menu.menuId);
    });
  }
  return bfSetDpthObj;
}

/**
 * 전체 체크 여부 확인
 */
export function fnConfChkAll(rowData) {
  const rowKeys = Object.keys(rowData);
  let ynCnt = 0;

  rowKeys.forEach((key) => {
    if (
      key.toLowerCase().slice(-6, key.length) === 'status' &&
      key.length > 6
    ) {
      if (rowData[key] === 'ALLOW') {
        ynCnt++;
      }
    }
  });

  return ynCnt === 10 ? 'ALLOW' : 'NONE';
}

/**
 * 자식 노드 설정
 */
export function setChild(tree, mainObjArr) {
  tree.forEach((item) => {
    const childArr = item.children;

    if (childArr && childArr.length > 0) {
      childArr.forEach((child) => {
        mainObjArr.forEach((item2) => {
          if (child.parentMenuId === item2.menuId) {
            item2.children = childArr;
            setChild(childArr, mainObjArr);
          }
        });
      });
    }
  });
}

/**
 * 상위 전체선택 시 하위 자식들 전체선택/해제 (row 기준)
 */
export function fnSetChildAllChk(list, childArr, keys, chkYn) {
  childArr.forEach((each) => {
    list.forEach((each2) => {
      if (each2.menuId === each.menuId) {
        keys.forEach((key) => {
          if (chkYn === true) {
            each2.chkAll = 'ALLOW';
            each2[key] = 'ALLOW';
          } else {
            each2.chkAll = 'NONE';
            each2[key] = 'NONE';
          }
        });
      }
    });

    if (Object.prototype.hasOwnProperty.call(each, 'children')) {
      fnSetChildAllChk(list, each.children, keys, chkYn);
    }
  });
}

/**
 * 상위 권한 선택 시 하위 권한 설정 (col 기준)
 */
export function fnSetChildColChk(list, childArr, field, chkYn) {
  childArr.forEach((each) => {
    list.forEach((each2) => {
      if (each2.menuId === each.menuId) {
        if (chkYn === true) {
          each2[field] = 'ALLOW';
        } else {
          each2[field] = 'NONE';
        }
        each2.chkAll = fnConfChkAll(each2);
      }
    });

    if (Object.prototype.hasOwnProperty.call(each, 'children')) {
      fnSetChildColChk(list, each.children, field, chkYn);
    }
  });
}
