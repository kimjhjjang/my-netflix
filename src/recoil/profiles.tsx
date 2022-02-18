import { authService } from "fbase";
import { atom } from "recoil";

export interface ISelectedProfile {
    selectedProfile : string;
}

export const defaultProfile:ISelectedProfile = {
    selectedProfile : authService.currentUser?.displayName+""
}

export const selectProfile = atom<ISelectedProfile>({
    key: "selectProfile",
    default : defaultProfile
})
