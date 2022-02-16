import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {  motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profileSelector } from "recoil/profiles";
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

const H1 = styled.h1`
  width: 100%;
  color: #fff;
  font-size: 3.5vw;
  font-weight: unset;
  margin-bottom: 30px;
  font-weight: 400;
`;

const Users = styled(motion.ul)`
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

const UserEdit = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditIcon = styled.svg`
  width: 30px;
  height: 30px;
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

const UserName = styled.p`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 30px;
  color: grey;
`;

const userVariants = {
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

const DeleteBox = styled.span`
  text-align: center;
  line-height: 3.5;
  font-size: 20px;
`;

const EditBoxForm = styled(motion.form)``;

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

const ProfileBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ModifyProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 20px 0px;
`;

const H2 = styled.h2`
  color: grey;
  font-size: 1.7vw;
  padding: 15px;
  margin-top: 1vh;
`;

const Bnt = styled.span`
  display: inline-block;
  margin-right: 20px;
  font-size: 1.2vw;
  border: 1px solid grey;
  padding: 0.5em 1.5em;
  letter-spacing: 2px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: 700;
  &:first-child {
    background-color: white;
    color: black;
  }
  &:hover {
    background-color: tomato;
  }
`;

const AddBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 10vw;
`;

const ChildInput = styled.input`
  border: 1px solid #333;
  border-radius: 0;
  display: inline-block;
  position: relative;
  margin-left: 30px;
  font-size: 0.8vw;
  width: 2.5em;
  height: 2.5em;
`;

const CHeckBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const EditInputBox = styled.div``;
const EditCheckBox = styled.div``;

interface IUserProps {
  name: string;
  child: boolean;
};

function ManageProfiles() {
   // Profile data
   const profiles = useRecoilValue(profileSelector);
  //const [admin, setAdmin] = useRecoilState(adminState);
  const [profileId, setProfileId] = useState("");
  
  const editUser = (profileId: string, name:string, child :boolean) => {
    setProfileId(profileId);
    setValue("name",name);
    setValue("child",child);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("프로필을 삭제 하시겠습니까?");
        //리터럴
        if (ok) {
            //삭제
            await deleteDoc(doc(dbService, "profile", profileId));
            setProfileId("");
            //await deleteObject(ref(storageService,nweetObj.attachmentUrl));
        }
    }
  
  const { register, handleSubmit, setValue } = useForm<IUserProps>();
  const onValids = async ({ name, child }: IUserProps) => {
    /* const data = {...admin};
    const newData = { [name] : [
          {id: Date.now(),
            child: child,}
        ] 
    }
    const result = Object.assign({}, data, newData);
    delete result[profile]; */
    const profileUpdateText = doc(dbService,"profile", profileId);
    await updateDoc(profileUpdateText, {name});

    //setAdmin(result);
    setProfileId("");
  };
  
  const onClicked = () => {
    setProfileId("");
  };

  return (
    <Container>
      {profileId === "" ? (
        <>
          <UserBox>
            <H1>프로필 관리</H1>
            <Users variants={userVariants} initial="init" animate="animate">
              {profiles.map((profile, i) => (
                <User key={i} onClick={() => editUser(profile.profileId,profile.name,profile.child)}>
                  <UserImg>
                    <UserEdit>
                      <EditIcon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <motion.path
                          fill="white"
                          d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"
                        />
                      </EditIcon>
                    </UserEdit>
                    <img
                      src="./img/admin.png"
                      alt="base_image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </UserImg>
                  <UserName>{profile.name}</UserName>
                </User>
              ))}
            </Users>
          </UserBox>
          <Link
            to="/browse"
            style={{
              marginTop: "100px",
              padding: "0px 50px",
              border: "1px solid white",
            }}
          >
            <DeleteBox>완료</DeleteBox>
          </Link>
        </>
      ) : (
            <EditBoxForm
              onSubmit={handleSubmit(onValids)}
              variants={userVariants}
              initial="init"
              animate="animate"
            >
              <H1>프로필 변경({profileId})</H1>
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
                    <EditInputBox>
                      <AddInput
                        {...register("name", { required: true })}
                        type="text"
                        id="add-profile-name"
                        placeholder="이름"
                      />
                    </EditInputBox>
                    <EditCheckBox>
                      <H2>옵션 설정</H2>
                      <CHeckBox>
                        <ChildInput
                          type="checkbox"
                          id="child"
                          {...register("child")}
                        />
                        <label htmlFor="child">&nbsp;어린이</label>
                      </CHeckBox>
                    </EditCheckBox>
                
                  </AddBox>
                </ModifyProfile>
              </ProfileBox>
              <div>
                <Bnt>저장</Bnt>
                <Bnt onClick={onClicked}>취소</Bnt>
                <Bnt onClick={onDeleteClick}>프로필 삭제</Bnt>
              </div>
            </EditBoxForm>
      )}
    </Container>
  );
}

export default ManageProfiles;
