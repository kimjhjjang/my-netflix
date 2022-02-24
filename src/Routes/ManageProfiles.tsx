import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen} from "@fortawesome/free-solid-svg-icons"
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  margin-bottom: 10px;
  @media screen and (min-width: 640px) {
    margin-bottom: 100px;
  }
`;

const H1 = styled.h1`
  width: 100%;
  color: #fff;
  font-weight: unset;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  @media screen and (min-width: 640px) {
    font-size: 3.5vw;
  }
`;

const Users = styled(motion.ul)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const User = styled(motion.li)`
  width: 10vw;
  max-width: 200px;
  min-width: 84px;
  display: inline-block;
  margin: 0 2vw 0 0;
  cursor: pointer;
  margin-bottom: 20px;
  @media screen and (min-width: 640px) {
    margin-bottom: 0px;
  }
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
 font-size: 20px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  color: grey;
  @media screen and (min-width: 640px) {
    font-size: 24px;
    margin-top: 30px;
  }
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
  font-size: 16px;
  padding: 10px 30px;
  border: 1px solid white;
  @media screen and (min-width: 640px) {
    font-size: 20px;
    padding: 20px 50px;
  }
`;

const EditBoxForm = styled(motion.form)``;

const AddInput = styled.input`
  width: 90%;
  height: 2em;
  background: #666;
  border: 1px solid transparent;
  margin: 0;
  padding: 0px 20px;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  text-indent: 0.1vw;
  margin-left:15px;
  @media screen and (min-width: 640px) {
    width: 18em;
    margin-top: 30px;
    font-size: 1.3vw;
    margin: 0 0.8em 0 0.8em;
    padding: 0.2em 0.6em;
  }
`;

const ProfileBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ModifyProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px 0px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 20px 0px;
`;

const SaveBnt = styled.button`
  display: inline-block;
  margin-right: 10px;
  font-size: 15px;
  border: 1px solid grey;
  padding: 0.5em 1.5em;
  letter-spacing: 2px;
  cursor: pointer;
  background-color: white;
  color: black;
  font-weight: 700;
  @media screen and (min-width: 640px) {
    font-size: 1.2vw;
    margin-right: 20px;
  }
  &:hover {
    background-color: tomato;
  }
`;

const Bnt = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-size: 15px;
  border: 1px solid grey;
  padding: 0.5em 1.5em;
  letter-spacing: 2px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: 700;
  @media screen and (min-width: 640px) {
    font-size: 1.2vw;
    margin-right: 20px;
  }
  &:hover {
    background-color: tomato;
  }
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const ChildInput = styled.input`
  border: 1px solid #333;
  border-radius: 0;
  display: inline-block;
  position: relative;
  margin-right: 0.5em;
  font-size: 12px;
  width: 2.5em;
  height: 2.5em;
  @media screen and (min-width: 640px) {
    font-size: 0.8vw;
  }
`;

const CHeckBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 10px;
`;

const InputFile = styled.input`
  display: none;
`;
const LabelFile = styled.label`
  position: absolute;
  bottom : 30px;
  left : 10px;
  padding: 10px;
  background-color:#686868;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  z-index: 2;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 1);
`;

const EditInputBox = styled.div``;
const EditCheckBox = styled.div`
display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

interface IUserProps {
  name: string;
  child: boolean;
}

interface IProps {
  currentUser: any;
  isProfiles: any[];
  selectedProfile : any[];
}

function ManageProfiles({ currentUser, isProfiles, selectedProfile }: IProps) {
  
  // Profile data
  const [profileId, setProfileId] = useState("");
  const [attachment, setAttachment] = useState("");
  const [attachUrl, setAttachUrl] = useState("");

  const editUser = (
    userId: string,
    name: string,
    child: boolean,
    attachmentUrl: string,
    profileId: string
  ) => {
    setAttachUrl(attachmentUrl);
    setProfileId(profileId);
    setValue("name", name);
    setValue("child", child);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("프로필을 삭제 하시겠습니까?");
    //리터럴
    if (ok) {
      //삭제
      await deleteDoc(doc(dbService, "profile", profileId));
      if (attachUrl !== "") {
        await deleteObject(ref(storageService, attachUrl));
      }
      setProfileId("");
    }
  };

  const { register, handleSubmit, setValue } = useForm<IUserProps>();
  //  프로필 수정하기
  const onValids = async ({ name }: IUserProps) => {
    let attachmentUrl = "";
    if (attachment !== "") {
      try {
        //파일 경로 참조 만들기
        const attachmenRef = ref(
          storageService,
          `${currentUser.uid}/${uuidv4()}`
        );
        //storage 참조 경로로 파일 업로드 하기
        const uploadFile = await uploadString(
          attachmenRef,
          attachment,
          "data_url"
        );
        //storage에 있는 파일 다운로드 URL받기
        attachmentUrl = await getDownloadURL(uploadFile.ref);
        const profileUpdateText = doc(dbService, "profile", profileId);
        await updateDoc(profileUpdateText, { name, attachmentUrl });
        //setProfiles(resetProfile as any);
        setProfileId("");
      } catch (error) {
        console.log(error);
      }
    }
    const profileUpdateText = doc(dbService, "profile", profileId);
    await updateDoc(profileUpdateText, { name, attachmentUrl });
    setProfileId("");
  };

  const onClicked = () => {
    setProfileId("");
    setAttachment("");
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const thefile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(thefile);
  };

  return (
    <Container>
      {profileId === "" ? (
        <>
          <UserBox>
            <H1>프로필 관리</H1>
            <Users variants={userVariants} initial="init" animate="animate">
              {isProfiles.map((profile, i) => (
                <User
                  key={i}
                  onClick={() =>
                    editUser(
                      profile.userId,
                      profile.name,
                      profile.child,
                      profile.attachmentUrl,
                      profile.id
                    )
                  }
                >
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
                    {profile.attachmentUrl !== "" ? (
                      <img
                        src={profile.attachmentUrl}
                        alt="base_image"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"
                        alt="base_image"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </UserImg>
                  <UserName>{profile.name}</UserName>
                </User>
              ))}
            </Users>
          </UserBox>
          <Link
            to="/browse"
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
          <H1>프로필 변경</H1>
          <ProfileBox>
            <ModifyProfile>
              <div>
              <LabelFile className="input-file-button" htmlFor="input-file">
                <FontAwesomeIcon icon={faUserPen} />
                </LabelFile>
                <InputFile type="file" accept="image/*" onChange={onFileChange} id="input-file" />
                {attachment !== "" ? (
                  <UserImg>
                    <img
                      src={attachment}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </UserImg>
                ) : (
                  
                  <UserImg>
                    <img
                      src=
                      { attachUrl !== "" ? attachUrl : "https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"}
                      alt="base_image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </UserImg>
                )}
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
            <SaveBnt>저장</SaveBnt>
            <Bnt onClick={onClicked}>취소</Bnt>
            {selectedProfile[0].id !== profileId && <Bnt onClick={onDeleteClick}>프로필 삭제</Bnt>}
          </div>
        </EditBoxForm>
      )}
    </Container>
  );
}

export default ManageProfiles;
