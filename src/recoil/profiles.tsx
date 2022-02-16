import { authService } from "fbase";
import { atom, selector } from "recoil";


export interface IProfiles {
    profileId : string;
    userId: string;
    name : string;
    child : boolean;
    createAt : number
}

export const profileState = atom<IProfiles[]>({
    key: "profiles",
    default: [] as IProfiles[]
 });

export const profileSelector = selector({
    key: "profilesSelector",
    get: ({get}) => {
        const profiles = get(profileState);
        return profiles.filter((profile) => profile.userId === authService.currentUser?.uid )
    }
})
