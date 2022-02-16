import { authService, dbService } from "fbase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { profileState } from "recoil/profiles";
import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setProfile = useSetRecoilState(profileState);
  const getProfile = async () => {
    let profileData: any[] = [];
    const dbProfile = await getDocs(collection(dbService, "profile"));
    dbProfile.forEach((doc) => {
      profileData.push({
        profileId : doc.id,
        ...doc.data()
      });
    });
    setProfile(profileData);
  };
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        getProfile();
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
        setProfile([]);
      }
      setInit(true);
    });
  });

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(isLoggedIn)} currentUser={currentUser} />
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default App;
