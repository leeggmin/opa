// 메뉴 관련 유틸리티 함수

/**
 * 메뉴 ID로 메뉴 정보 검색
 */
const findMenuById = (info, id) => {
  const menuInfo = info.filter((item) => item._id == id);
  return menuInfo.length > 0 ? menuInfo[0] : null;
};

/**
 * 브레드크럼 생성
 */
export const buildBreadcrumb = (info, id) => {
  const menuInfo = findMenuById(info, id);
  if (menuInfo) {
    let arr = menuInfo.upperListName ? menuInfo.upperListName : [];
    arr = [...arr, menuInfo.name];
    return {
      breadcrumb: arr.join(' > '),
      title: menuInfo.name,
    };
  }
  return { breadcrumb: '', title: '' };
};

/**
 * Program Mapping으로 메뉴 ID 찾기
 */
export const findMenuIdByProgramMapping = (allMenus, programMapping) => {
  let menuId = '';
  Object.values(allMenus).forEach((item, idx) => {
    if (item.toLowerCase() === programMapping.toLowerCase()) {
      menuId = Object.keys(allMenus)[idx];
    }
  });
  return menuId;
};

/**
 * 원본 메뉴 데이터에서 특정 메뉴 검색 (재귀)
 
export const searchOriginMenu = (origin, id) => {
  let data;

  const getdata = (list) => {
    list.map((item) => {
      if (item.id == id) {
        data = item;
      }
      if (item.children && item.children.length > 0) {
        getdata(item.children);
      }
    });
  };
  getdata(origin);

  return data;
};
*/
/**
 * 메뉴 트리를 1차원 배열로 평탄화
 */
export const flattenMenuTree = (tree, depth = 0) => {
  let result = [];
  tree.forEach((node) => {
    result.push({ ...node, depth });
    if (node.children) {
      result = result.concat(flattenMenuTree(node.children, depth + 1));
    }
  });
  return result;
};

/**
 * 메뉴 트리에서 검색어로 필터링 (이름으로 검색)
 */
export const filterMenuTree = (nodes, searchTerm) => {
  return nodes
    .map((node) => {
      if (node.children) {
        const filteredChildren = filterMenuTree(node.children, searchTerm);
        if (
          filteredChildren.length > 0 ||
          node.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return { ...node, children: filteredChildren };
        }
      } else if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return node;
      }
      return null;
    })
    .filter(Boolean);
};

/**
 * 메뉴 트리에서 ID로 필터링 (특정 메뉴와 그 하위만 표시)
 */
export const filterMenuTreeById = (nodes, menuId) => {
  const result = [];
  nodes.forEach((node) => {
    if (node.id === menuId) {
      result.push(node);
    }
  });
  return result;
};

/**
 * 특정 depth의 메뉴만 추출
 */
export const getMenusByDepth = (tree, targetDepth = 0) => {
  const flattened = flattenMenuTree(tree);
  return flattened.filter((item) => item.depth === targetDepth);
};

/**
 * 메뉴만 추출 (PROGRAM 타입 제외)
 */
export const getMenuOnly = (tree) => {
  let depth = 0;
  let menu = [];

  const makeName = (cnt) => {
    if (cnt === 0) return '';
    let name = '';
    for (let i = 0; i < cnt; i++) {
      name += '　';
    }
    return name + '└';
  };

  const extractMenu = (data) => {
    data.forEach((item) => {
      if (item.menuType === 'MENU') {
        menu.push({
          id: item.id,
          name: item.name,
          type: item.menuType,
          title: makeName(depth) + item.name,
          depth: depth,
        });
      }
      if (item.children) {
        depth++;
        extractMenu(item.children);
        depth--;
      }
    });
  };

  extractMenu(tree);
  return menu;
};

/**
 * 메뉴 트리를 순서 업데이트용 배열로 변환
 */
export const convertTreeToOrderList = (tree) => {
  let array = [];
  let beforeId = [];
  let parentId = '';

  const processNode = (nodes) => {
    return nodes.map((node) => {
      if (node.id === parentId) parentId = '';
      array.push({
        menuId: node.id,
        parentMenuId: parentId || null,
      });
      if (node.children) {
        beforeId.push(parentId);
        parentId = node.id;
        processNode(node.children);
        parentId = beforeId.pop();
      }
    });
  };

  processNode(tree);
  return array;
};

/**
 * 트리 노드의 체크 상태 업데이트
 */
export const updateNodeCheckStatus = (tree, id, isChecked) => {
  const updateCheckStatus = (nodes) =>
    nodes.map((node) => {
      if (node.id === id) {
        node.chk = isChecked;
      }
      if (node.children) {
        node.children = updateCheckStatus(node.children);
      }
      return node;
    });

  return updateCheckStatus(tree);
};

/**
 * Program Mapping을 URL 경로로 변환
 * @param {string} programMapping - 예: "notice/ui/NoticePage" 또는 "../pages/notice/ui/NoticePage"
 * @returns {string} URL 경로 - 예: "/notice"
 */
export const convertProgramMappingToPath = (programMapping) => {
  if (!programMapping) return '/';

  // 경로 정규화
  let normalized = programMapping
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\.\.\/pages\//, '')
    .replace(/\.jsx$/, '');

  // 첫 번째 세그먼트 추출 (notice/ui/NoticePage -> notice)
  const segments = normalized.split('/');
  const mainSegment = segments[0].toLowerCase();

  // kebab-case로 변환 (camelCase, PascalCase 등을 처리)
  const kebabCase = mainSegment
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `/${kebabCase}`;
};

/**
 * URL 경로를 통해 메뉴 ID 찾기
 * @param {Object} menulist - 메뉴 리스트 객체 { all: {}, info: [] }
 * @param {string} urlPath - 예: "/notice"
 * @returns {Object|null} { menuId, programMapping } 또는 null
 */
export const findMenuByUrlPath = (menulist, urlPath) => {
  if (!urlPath || !menulist?.all) return null;

  // 모든 메뉴에서 경로가 일치하는 것 찾기
  for (const [menuId, programMapping] of Object.entries(menulist.all)) {
    const convertedPath = convertProgramMappingToPath(programMapping);
    if (convertedPath === urlPath) {
      return { menuId, programMapping };
    }
  }

  return null;
};

/**
 * 사용자가 특정 메뉴에 접근 권한이 있는지 체크
 * @param {Object} menulist - 메뉴 리스트 객체 { all: {} }
 * @param {string} menuId - 체크할 메뉴 ID
 * @returns {boolean} 권한 여부
 */
export const hasMenuPermission = (menulist, menuId) => {
  if (!menulist?.all || !menuId) return false;
  return menuId in menulist.all;
};
