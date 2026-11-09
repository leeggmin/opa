const DEFAULT_PERMISSION_STATUS = 'NONE';
const MENU_PERMISSION_KEYS = [
	'selectStatus',
	'insertStatus',
	'updateStatus',
	'deleteStatus',
	'printStatus',
	'downStatus',
	'manageStatus',
	'custom1Status',
	'custom2Status',
	'custom3Status',
];

/**
 * @typedef {Object} MenuUpperContext
 * @property {string} id
 * @property {string[]} list
 * @property {string[]} listname
 */

/**
 * @typedef {Object} MenuOriginItem
 * @property {string} id
 * @property {string} name
 * @property {string} menuType
 * @property {string | undefined} [programMapping]
 * @property {string | undefined} [menuMapping]
 * @property {boolean | undefined} [isOpen]
 * @property {MenuOriginItem[] | undefined} [children]
 */

/**
 * @typedef {Object} MenuTreeItem
 * @property {string | undefined} id
 * @property {boolean} isOpen
 * @property {string} name
 * @property {number} depth
 * @property {string} _id
 * @property {string} type
 * @property {MenuUpperContext} upperId
 * @property {string[]} upperList
 * @property {string[]} upperListName
 * @property {boolean} childyn
 * @property {MenuOriginItem[] | undefined} children
 */

/**
 * @typedef {Object} MenuTreeData
 * @property {MenuTreeItem[]} menu
 * @property {Record<string, string | undefined>} all
 * @property {MenuTreeItem[]} info
 * @property {MenuOriginItem[]} origin
 */

/**
 * @typedef {Object} MenuTreeResult
 * @property {MenuTreeData} data
 * @property {unknown} raw
 */

/**
 * @typedef {Object} MenuPermissionResult
 * @property {'ALLOW' | 'NONE'} selectStatus
 * @property {'ALLOW' | 'NONE'} insertStatus
 * @property {'ALLOW' | 'NONE'} updateStatus
 * @property {'ALLOW' | 'NONE'} deleteStatus
 * @property {'ALLOW' | 'NONE'} printStatus
 * @property {'ALLOW' | 'NONE'} downStatus
 * @property {'ALLOW' | 'NONE'} manageStatus
 * @property {'ALLOW' | 'NONE'} custom1Status
 * @property {'ALLOW' | 'NONE'} custom2Status
 * @property {'ALLOW' | 'NONE'} custom3Status
 */

/**
 * @type {{
	 * 	toMenuTreeResult: (response: unknown, firstloadingOpen?: boolean) => MenuTreeResult,
	 * 	toMenuPermissionResult: (permission: unknown, menuId?: string | null) => MenuPermissionResult,
 * }}
 */
export const menuAdapter = {
	// 메뉴 구조 트리
	toMenuTreeResult(response, firstloadingOpen = true) {
		return {
			data: buildMenuTreeData(normalizeMenuTreeItems(response), firstloadingOpen),
			raw: response,
		};
	},

	// 메뉴 권한
	toMenuPermissionResult(permission, menuId = null) {
		return permission
			? normalizeMenuPermission(permission, menuId)
			: createDefaultMenuPermission(menuId);
	},
};

// Private helpers
// 메뉴 원본 응답을 화면에서 바로 쓰는 트리 데이터 구조로 변환함
/** @returns {MenuTreeData} */
const buildMenuTreeData = (list, firstloadingOpen = true) => {
	const levelOneMenus = [];
	const allMenus = {};
	const menuInfoList = [];
	let depth = 0;
	const upperContext = { id: '', list: [], listname: [] };

	const appendMenus = (items) => {
		items.forEach((item) => {
			item.isOpen = firstloadingOpen;

			const treeItem = {
				id: item.menuType === 'PROGRAM' ? item.programMapping : item.menuMapping,
				isOpen: firstloadingOpen,
				name: item.name,
				depth,
				_id: item.id,
				type: item.menuType,
				upperId: upperContext,
				upperList: JSON.parse(JSON.stringify(upperContext.list)),
				upperListName: JSON.parse(JSON.stringify(upperContext.listname)),
				childyn: !!(item.children && item.children.length > 0),
				children: item.children,
			};

			if (depth === 0) {
				levelOneMenus.push(treeItem);
			}

			allMenus[treeItem._id] = treeItem.id;
			menuInfoList.push(treeItem);

			if (item.children && item.children.length > 0) {
				depth += 1;
				upperContext.id = treeItem._id;
				upperContext.list.push(treeItem._id);
				upperContext.listname.push(treeItem.name);
				appendMenus(item.children);
				upperContext.list.pop();
				upperContext.listname.pop();
				depth -= 1;
			}
		});
	};

	appendMenus(list);

	return {
		menu: levelOneMenus,
		all: allMenus,
		info: menuInfoList,
		origin: list,
	};
};

// 응답이 비어 있거나 일부 status가 누락된 경우를 한 곳에서 보정함
/** @returns {MenuOriginItem[]} */
const normalizeMenuTreeItems = (response) => {
	if (Array.isArray(response?.data)) {
		return response.data;
	}

	if (Array.isArray(response)) {
		return response;
	}

	return [];
};

// 권한 응답이 없을 때도 화면에서 항상 같은 key를 읽을 수 있도록 기본값 묶음을 만듦
const createDefaultMenuPermission = () => ({
	...Object.fromEntries(
		MENU_PERMISSION_KEYS.map((key) => [key, DEFAULT_PERMISSION_STATUS]),
	),
});

// 실제 응답에 없는 권한은 NONE으로 보정해서 화면 분기 조건을 단순하게 유지함
const normalizeMenuPermission = (permission, menuId = null) => {
	const normalized = createDefaultMenuPermission(menuId);

	MENU_PERMISSION_KEYS.forEach((key) => {
		normalized[key] = permission?.[key] ?? DEFAULT_PERMISSION_STATUS;
	});

	return {
		...permission,
		...normalized,
	};
};
