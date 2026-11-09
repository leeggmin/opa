import { create } from 'zustand';

const initialState = {
    userId: '',
    userName: '',
    organizationId: '',
    organizationCode: '',
    userGroupCode: '',
    userGroupId: '',
    department: '',
    duty: '',
};

const userStore = create((set) => ({
    ...initialState,

    // 개별 setter
    setUserId: (id) => set({ userId: id }),
    setUserName: (name) => set({ userName: name }),
    setOrganizationId: (id) => set({ organizationId: id }),
    setOrganizationCode: (code) => set({ organizationCode: code }),
    setGroupCode: (code) => set({ userGroupCode: code }),
    setGroupId: (id) => set({ userGroupId: id }),
    setDept: (dept) => set({ department: dept }),
    setDuty: (duty) => set({ duty }),

    // 한 번에 세팅(편의)
    setUser: (user) =>
        set({
            userId: user.userId ?? '',
            userName: user.userName ?? '',
            organizationId: user.organizationId ?? '',
            organizationCode: user.organizationCode ?? '',
            userGroupCode: user.userGroupCode ?? '',
            userGroupId: user.userGroupId ?? '',
            department: user.department ?? '',
            duty: user.duty ?? '',
        }),

    reset: () => set({ ...initialState }),
}));

/** ====== 읽기 유틸 ====== */
userStore.getUserId = () => userStore.getState().userId?.toString();                        // 현재 로그인된 사용자 고유아이디 가져오기 (로그인아이디 아님)
userStore.getUserName = () => userStore.getState().userName?.toString();                    // 로그인 유저 이름 가져오기
userStore.getOrganizationId = () => userStore.getState().organizationId?.toString();        // 로그인된 사용자 조직(Organization) 고유아이디 가져오기
userStore.getOrganizationCode = () => userStore.getState().organizationCode?.toString();    // 로그인된 사용자 조직(Organization) 코드 가져오기
userStore.getGroupId = () => userStore.getState().userGroupId?.toString();                  // 로그인된 사용자 그룹(Group) 고유아이디 가져오기
userStore.getGroupCode = () => userStore.getState().userGroupCode?.toString();              // 로그인된 사용자 그룹(Group) 코드 가져오기
userStore.getDept = () => userStore.getState().department?.toString();                      // 로그인 유저 부서 가져오기
userStore.getDuty = () => userStore.getState().duty?.toString();                            // 로그인 유저 직급 가져오기

// Backward compatibility
export default userStore;
