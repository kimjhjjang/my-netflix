import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen} from "@fortawesome/free-solid-svg-icons"
import { dbService, storageService } from "fbase";
import { addDoc, collection, doc, updateDoc  } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
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

const ProfileBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
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
const H2 = styled.h2`
  color: grey;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  @media screen and (min-width: 640px) {
    font-size: 24px;
  }
`;

const Users = styled.ul`
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

const ModifyProfile = styled.div`
position: relative;
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
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const AddBoxForm = styled(motion.form)``;

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
  @media screen and (min-width: 640px) {
    width: 18em;
    margin-top: 30px;
    font-size: 1.3vw;
    margin: 0 0.8em 0 0.8em;
    padding: 0.2em 0.6em;
  }
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

const ChildBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 10px;
`

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

const Bnt = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  @media screen and (min-width: 640px) {
    padding: 20px 40px;
  }
  &:hover {
    background-color: tomato;
  }
`;

const Sbnt = styled.span`
  padding: 10px 20px;
  background-color: grey;
  color: black;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
  @media screen and (min-width: 640px) {
    padding: 20px 40px;
  }
  &:hover {
    background-color: tomato;
  }
`;

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

const InputFile = styled.input`
  display: none;
`;
const LabelFile = styled.label`
  position: absolute;
  bottom : 30px;
  left : 10px;
  padding: 5px;
  background-color:#686868;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  z-index: 2;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 1);
  @media screen and (min-width: 640px) {
    padding: 10px;
    border-radius: 20px;
  }
`;

interface IUserProps {
  name: string;
  child: boolean;
}

interface IProps {
  currentUser : any;
  isProfiles : any[];
  selectedProfile : any[];
}

function Browse({ currentUser , isProfiles , selectedProfile}: IProps) {
  const [attachment, setAttachment] = useState("");
  const [addProfile, setAddProfile] = useState(true);
  const { register, handleSubmit, setValue } = useForm<IUserProps>();
  const history = useHistory();
  // 프로필 추가
  const onValid = async ({ name, child }: IUserProps) => {
    const currentUserId = currentUser.uid;
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
        //storage에 있는 파일 URL로 다운로드 받기
        attachmentUrl = await getDownloadURL(uploadFile.ref);
      } catch (error) {
        console.log(error);
      }
    }
    const newData = {
      userId: currentUserId,
      createAt: Date.now(),
      name,
      child,
      attachmentUrl,
    };

    await addDoc(collection(dbService, "profile"), newData);
    //setProfiles((prev) => [...prev, newData as any]);
    setAddProfile(true);
    setValue("name", "");
  };

  const onSelectProfile = async (profile:any) => {
    if(selectedProfile.length === 0){
      await addDoc(collection(dbService, "selectedProfile"), profile);
      history.push("/home");
    }else{
      const profileUpdateText = doc(dbService, "selectedProfile", selectedProfile[0].cid);
      await updateDoc(profileUpdateText, profile);
      history.push("/home"); 
    }
  }

  const onClicked = () => {
    setAddProfile((props) => !props);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const thefile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(thefile);
  };

  return (
    <Container>
      {addProfile ? (
        <>
          <UserBox variants={useVariants} initial="init" animate="animate">
            <H1>넷플릭스를 시청할 프로필을 선택하세요.</H1>
            {isProfiles.length >= 5 ? (
              <H2 style={{ textAlign: "center", marginBottom: "30px" }}>
                아이디는 5개까지 생성하실 수 있습니다.
              </H2>
            ) : null}
            <Users>
              {isProfiles.map((profile, i) => (
                <User key={i} onClick={() => onSelectProfile(profile)}>
                  {profile.attachmentUrl !== "" ? (
                    <UserImg>
                      <img
                        src={profile.attachmentUrl}
                        alt="base_image"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </UserImg>
                  ) : (
                    <UserImg>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"
                        alt="base_image"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </UserImg>
                  )}
                  <UserName>{profile.name}</UserName>
                </User>
              ))}

              {isProfiles.length < 5 ? (
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
                      src="./img/admin.png"
                      alt="base_image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </UserImg>
                )}
              </div>
              <AddBox>
                <AddInput
                  {...register("name", { required: true })}
                  type="text"
                  id="add-profile-name"
                  placeholder="이름"
                />
                <label htmlFor="add-profile-name" aria-label="이름"></label>
                <ChildBox>
                <ChildInput type="checkbox" {...register("child")} />
                <label htmlFor="add-kids-profile"></label>
                <span>어린이인가요?</span>
                </ChildBox>
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
