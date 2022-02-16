import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileSelector, profileState } from "recoil/profiles";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserBox = styled(motion.div)`
  max-width: 80%;
`;

const ProfileBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  width: 100%;
  color: #fff;
  font-size: 3.5vw;
  font-weight: unset;
  margin-bottom: 30px;
  font-weight: 400;
`;
const H2 = styled.h2`
  color: grey;
  font-size: 24px;
`;

const Users = styled.ul`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const User = styled(motion.li)`
  width: 10vw;
  max-width: 200px;
  min-width: 84px;
  display: inline-block;
  margin: 0 2vw 0 0;
  cursor: pointer;
  &:hover {
    div {
      border: 2px solid white;
    }
    p {
      color: white;
    }
  }
`;

const UserImg = styled.div`
  height: 10vw;
  width: 10vw;
  max-height: 200px;
  max-width: 200px;
  min-height: 84px;
  min-width: 84px;
  box-sizing: border-box;
  position: relative;
  text-decoration: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #333;
  border-radius: 4px;
  border: none;
`;

const PlusIcon = styled.div`
  height: 10vw;
  width: 10vw;
  max-height: 200px;
  max-width: 200px;
  min-height: 84px;
  min-width: 84px;
  box-sizing: border-box;
  position: relative;
  background-color: #333;
  border-radius: 4px;
  padding: 0 20px;
  display: flex;
`;

const UserName = styled.p`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 30px;
  color: grey;
`;

const ModifyProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 20px 0px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
`;

const AddBoxForm = styled(motion.form)``;

const AddInput = styled.input`
  width: 18em;
  height: 2em;
  background: #666;
  border: 1px solid transparent;
  margin: 0 0.8em 0 0.8em;
  padding: 0.2em 0.6em;
  color: #fff;
  font-size: 1.3vw;
  box-sizing: border-box;
  text-indent: 0.1vw;
`;

const useVariants = {
  init: {
    scale: 1.2,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const ChildInput = styled.input`
  border: 1px solid #333;
  border-radius: 0;
  display: inline-block;
  position: relative;
  margin-right: 0.5em;
  font-size: 0.8vw;
  width: 2.5em;
  height: 2.5em;
`;

const Bnt = styled.button`
  padding: 20px 40px;
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
`;

const Sbnt = styled.span`
  padding: 20px 40px;
  background-color: grey;
  color: black;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    background-color: tomato;
  }
`;

const DeleteBox = styled.span`
  text-align: center;
  line-height: 3.5;
  font-size: 20px;
`;

interface IUserProps {
  name: string;
  child: boolean;
}

function Browse({currentUser}:any) {
  

  const setProfiles = useSetRecoilState(profileState);
    const profiles = useRecoilValue(profileSelector);
  
  const [addProfile, setAddProfile] = useState(true);
  const { register, handleSubmit, setValue } = useForm<IUserProps>();

  // 프로필
  const onValid = async ({ name, child }: IUserProps) => {
    const currentUserId = currentUser.uid;
    const newData = {
      userId: currentUserId,
      createAt: Date.now(),
      name,
      child,
    };
    await addDoc(collection(dbService, "profile"), newData);

    setProfiles((prev)=> [
      ...prev,
      newData as any
    ]);
    setAddProfile(true);
    setValue("name", "");
  };

  const onClicked = () => {
    setAddProfile((props) => !props);
  };
  

  return (
    <Container>
      {addProfile ? (
        <>
          <UserBox variants={useVariants} initial="init" animate="animate">
            <H1>넷플릭스를 시청할 프로필을 선택하세요.</H1>
            {profiles.length >= 5 ? (
              <H2 style={{ textAlign: "center", marginBottom: "30px" }}>
                아이디는 5개까지 생성하실 수 있습니다.
              </H2>
            ) : null}
            <Users>
              {profiles.map((profile, i) => (
                <User key={i}>
                  <UserImg>
                    <img
                      src="./img/admin.png"
                      alt="base_image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </UserImg>
                  <UserName>{profile.name}</UserName>
                </User>
              ))}
              
              {profiles.length < 5 ? (
                <User onClick={onClicked}>
                  <PlusIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
                      />
                    </svg>
                  </PlusIcon>
                  <UserName>프로필 추가</UserName>
                </User>
              ) : null}
            </Users>
          </UserBox>
          <Link
            to="/manageProfiles"
            style={{
              marginTop: "100px",
              padding: "0px 50px",
              border: "1px solid white",
            }}
          >
            <DeleteBox>프로필 관리</DeleteBox>
          </Link>
        </>
      ) : (
        <AddBoxForm
          onSubmit={handleSubmit(onValid)}
          variants={useVariants}
          initial="init"
          animate="animate"
        >
          <H1>프로필 추가</H1>
          <H2>
            넷플릭스를 시청할 다른 사용자를 등록하시려면 프로필을 추가하세요.
          </H2>
          <ProfileBox>
            <ModifyProfile>
              <div>
                <UserImg>
                  <img
                    src="./img/admin.png"
                    alt="base_image"
                    style={{ width: "100%", height: "100%" }}
                  />
                </UserImg>
              </div>
              <AddBox>
                <AddInput
                  {...register("name", { required: true })}
                  type="text"
                  id="add-profile-name"
                  placeholder="이름"
                />
                <label htmlFor="add-profile-name" aria-label="이름"></label>
                <ChildInput type="checkbox" {...register("child")} />
                <label htmlFor="add-kids-profile"></label>
                <span>어린이인가요?</span>
                {/* <span className="kids-profile-tooltip">
                  이 옵션을 선택하시면 이 프로필에 만 12세 이하 등급의 시리즈와
                  영화만 표시됩니다.
                </span> */}
              </AddBox>
            </ModifyProfile>
          </ProfileBox>
          <div>
            <Bnt>저장</Bnt>
            <Sbnt onClick={onClicked}>취소</Sbnt>
          </div>
        </AddBoxForm>
      )}
    </Container>
  );
}

export default Browse;
