import { create } from 'zustand';

const initialState = {
    currentMenuId: '',
    menuInfo: [],
    navigateHandler: null,
};

const menuStore = create((set, get) => ({
    ...initialState,

    setCurrentMenuId: (menuId) => set({ currentMenuId: menuId }),
    setMenuInfo: (menuInfo) => set({ menuInfo: Array.isArray(menuInfo) ? menuInfo : [] }),
    setNavigateHandler: (handler) => set({ navigateHandler: handler }),
    clearNavigateHandler: (handler) => {
        if (get().navigateHandler === handler) {
            set({ navigateHandler: null });
        }
    },
    navigateToProgram: (programMapping) => {
        const handler = get().navigateHandler;
        if (typeof handler !== 'function') {
            return false;
        }

        handler(programMapping);
        return true;
    },

    reset: () => set({ ...initialState }),
}));

/** ====== 읽기 유틸 ====== */
menuStore.getCurrentMenuId = () => menuStore.getState().currentMenuId?.toString();

export default menuStore;
