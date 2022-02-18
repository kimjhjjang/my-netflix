import { IAdminState } from "recoil/admin";

export function makeImagePath(id: string, format?: string) {
  const url = `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${id}`;
  return url;
}

// 로컬 스토리지 get:set
export const LOCALSTORAGE = "ADMIN";

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


