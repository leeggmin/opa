const createPaletteItem = (item, groupId) => ({
    templateId: `component:${item.type}`,
    source: 'component',
    type: item.type,
    label: item.label,
    category: groupId,
    isGrid: item.type === 'WiniAgGridReact',
});

const COMP_MENU_GROUPS = [
    {
        id: 'layout',
        title: '레이아웃/구조',
        items: [
            { type: 'WiniBox', label: 'WiniBox' },
            { type: 'WiniGridLayout', label: 'WiniGridLayout' },
            { type: 'WiniTab', label: 'WiniTab' },
            { type: 'WiniDialog', label: 'WiniDialog' },
        ],
    },
    {
        id: 'form',
        title: '입력폼',
        items: [
            { type: 'WiniText', label: 'WiniText' },
            { type: 'WiniSelect', label: 'WiniSelect' },
            { type: 'WiniRadio', label: 'WiniRadio' },
            { type: 'WiniCheckbox', label: 'WiniCheckbox' },
            { type: 'WiniInputLabel', label: 'WiniInputLabel' },
            { type: 'WiniSwitch', label: 'WiniSwitch' },
            { type: 'WiniDateTimePicker', label: 'WiniDateTimePicker' },
            { type: 'WiniCodeEditor', label: 'WiniCodeEditor' },
        ],
    },
    {
        id: 'action',
        title: '액션/버튼',
        items: [
            { type: 'WiniButton', label: 'WiniButton' },
            { type: 'WiniButtonGroup', label: 'WiniButtonGroup' },
            { type: 'WiniIconButton', label: 'WiniIconButton' },
            { type: 'WiniToggleButton', label: 'WiniToggleButton' },
        ],
    },
    {
        id: 'etc',
        title: '기타',
        items: [
            { type: 'WiniAgGridReact', label: 'WiniAgGridReact' },
            { type: 'WiniTable', label: 'WiniTable' },
            { type: 'WiniPagination', label: 'WiniPagination' },
            { type: 'WiniValue', label: 'WiniValue' },
            { type: 'WiniIcon', label: 'WiniIcon' },
            { type: 'WiniTypography', label: 'WiniTypography' },
            { type: 'WiniList', label: 'WiniList' },
            { type: 'WiniTreeView', label: 'WiniTreeView' },
            { type: 'WiniAccordion', label: 'WiniAccordion' },
        ],
    },
];

export const CATEGORY_ORDER = ['layout', 'form', 'action', 'etc'];

export const GROUPED_COMPONENTS = COMP_MENU_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => createPaletteItem(item, group.id)),
}));