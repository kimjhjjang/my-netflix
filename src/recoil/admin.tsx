import { atom } from "recoil";

// 로컬 스토리지 저장
export const LOCALSTORAGE = 'ADMIN';

export const loadUsers = () => {
    const localUsers = localStorage.getItem(LOCALSTORAGE);
    if (localUsers) {
        return JSON.parse(localUsers);
    }
    return null;
};

export const saveUsers = (users: IAdminState) => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(users));
};


export interface IAdmin {
  id: number;
  isUse: boolean;
  child: boolean;
}

export interface IAdminState {
  [key: string]: IAdmin[];
}

// 나중에 디폴트 사용자는 로그인 정보중 NAME으로 변경해 줄 것.
export const defaultAdmin: IAdminState = {
  Admin: [{ id: 1, isUse: true, child: false }],
};

export const adminState = atom<IAdminState>({
  key: "admin",
  default: loadUsers() ?? defaultAdmin,
});

