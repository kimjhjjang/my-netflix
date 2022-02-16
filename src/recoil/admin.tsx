import { atom } from "recoil";
import { loadUsers } from "utils";


// 


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

