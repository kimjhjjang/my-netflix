import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfiles, setIsProfiles] = useState([]);
  const [isComment, setIsComments] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState([]);

  const getProfile = async () => {
    const dbProfile = await getDocs(collection(dbService, "profile"));
    dbProfile.forEach((doc) => {
      setIsProfiles((prev) => [...prev]);
    });
  };

  const getSelectedProfile = async () => {
    const dbSelectedProfile = await getDocs(
      collection(dbService, "selectedProfile")
    );
    dbSelectedProfile.forEach((doc) => {
      setSelectedProfile((prev) => [...prev]);
    });
  };

  const getComments = async () => {
    const dbComment = await getDocs(collection(dbService, "comments"));
    dbComment.forEach((doc) => {
      setIsComments((prev) => [...prev]);
    });
  };

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        // 프로필 리얼타임 로그인시 적용 시작
        const q = query(
          collection(dbService, "profile"),
          orderBy("createAt", "asc")
        );

        onSnapshot(q, (snapshot) => {
          const profilesArr = snapshot.docs
            .filter((doc) => doc.data().userId === authService.currentUser?.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          setIsProfiles(profilesArr as any);
        });
        getProfile();
        //
        const selectedProfileQ = query(
          collection(dbService, "selectedProfile"),
          orderBy("createAt", "asc")
        );
        onSnapshot(selectedProfileQ, (snapshot) => {
          const selectedProfilesArr = snapshot.docs
            .filter((doc) => doc.data().userId === authService.currentUser?.uid)
            .map((document) => ({
              cid: document.id,
              ...document.data(),
            }));
          setSelectedProfile(selectedProfilesArr as any);
        });
        getSelectedProfile();
        // 프로필 리얼타임 로그인시 적용 끝

        // 의견 적용
        authService.onAuthStateChanged((comment) => {
          if (comment) {
            const q = query(
              collection(dbService, "comments"),
              orderBy("createAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
              const commentArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setIsComments(commentArr as any);
            });
            getComments();
          }
        });
        // 의견 적용 끝
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(isLoggedIn)}
          currentUser={currentUser}
          isProfiles={isProfiles}
          selectedProfile={selectedProfile}
          isComment={isComment}
        />
      ) : (
        <Loading>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </Loading>
      )}
    </>
  );
}

export default App;
