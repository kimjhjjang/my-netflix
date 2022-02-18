import { authService, dbService } from "fbase";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfiles , setIsProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const getProfile = async () => {
    const dbProfile = await getDocs(collection(dbService, "profile"));
      dbProfile.forEach((doc) => {
        setIsProfiles(prev => [...prev]);
      });
  };
  
  const getSelectedProfile = async () => {
    const dbSelectedProfile = await getDocs(collection(dbService, "selectedProfile"));
    dbSelectedProfile.forEach((doc) => {
      setSelectedProfile(prev => [...prev]);
    });
  };

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        // 프로필 리얼타임 로그인시 적용 시작 
        const q = query(collection(dbService, "profile"), orderBy("createAt", "asc"));
        
        onSnapshot(q, (snapshot) => {
            const profilesArr = snapshot
                .docs
                .filter((doc) => doc.data().userId === authService.currentUser?.uid )
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
              setIsProfiles(profilesArr as any);
          });
        getProfile();
        // 
        const selectedProfileQ = query(collection(dbService, "selectedProfile"), orderBy("createAt", "asc"));
        onSnapshot(selectedProfileQ, (snapshot) => {
            const selectedProfilesArr = snapshot
                .docs
                .filter((doc) => doc.data().userId === authService.currentUser?.uid )
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                  setSelectedProfile(selectedProfilesArr as any);
              });
        getSelectedProfile();
        // 프로필 리얼타임 로그인시 적용 끝 
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(isLoggedIn)} currentUser={currentUser} isProfiles={isProfiles} selectedProfile={selectedProfile} />
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default App;
