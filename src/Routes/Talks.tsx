import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled(motion.div)`
  max-width: 80%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 640px) {
    margin-top: 200px;
  }
`;

const H1 = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  @media screen and (min-width: 640px) {
    font-size: 36px;
    margin-bottom: 100px;
  }
`;

const SetComment = styled.form`
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 30px;
  @media screen and (min-width: 640px) {
    margin-top: 0px;
  }
`;

const Input = styled.input`
  height: 7vh;
  padding: 5px 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border: 1px solid ${(props) => props.theme.white.lighter};
  @media screen and (min-width: 640px) {
    width: 40vw;
    height: 7vh;
    padding: 5px 10px;
  }
`;

const GetComments = styled.div`
  margin-top: 30px;
`;
const CommentBox = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 9fr;
  gap: 15px;
  margin-bottom: 15px;
  border: 1px solid grey;
  border-radius: 20px;
`;
const CommentImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #141414;
  border-radius: 20px 0px 0px 20px;
`;
const CommentText = styled.div`
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  span {
    padding: 3px;
    border-radius: 5px;
    background-color: rebeccapurple;
  }
  p {
    margin-top: 10px;
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

interface IForm {
  comment: string;
}

interface IProps {
  selectedProfile: any[];
  isComment: any[];
}

function Talks({ selectedProfile, isComment }: IProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = async (data: IForm) => {
    const newData = {
      userId: selectedProfile[0].userId,
      createAt: Date.now(),
      name: selectedProfile[0].name,
      text: data.comment,
      attachmentUrl: selectedProfile[0].attachmentUrl,
    };
    await addDoc(collection(dbService, "comments"), newData);
    setValue("comment", "");
  };

  return (
    <AnimatePresence>
      <Container>
        <Content variants={useVariants} initial="init" animate="animate">
          <H1>의견을 남겨놓을 수 있습니다.</H1>
          <SetComment onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("comment", { required: true })}
              placeholder={`이곳에 작성하세요`}
            />
          </SetComment>
          <GetComments>
            {isComment.map((comment, i) => (
              <CommentBox key={i}>
                <CommentImgBox>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "25px",
                    }}
                    src={
                      comment.attachmentUrl !== ""
                        ? comment.attachmentUrl
                        : "https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"
                    }
                    alt={comment.name}
                  />
                </CommentImgBox>
                <CommentText>
                  <span>{comment.name}</span>
                  <p>{comment.text}</p>
                </CommentText>
              </CommentBox>
            ))}
          </GetComments>
        </Content>
      </Container>
    </AnimatePresence>
  );
}

export default Talks;
