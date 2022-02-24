import { authService } from "fbase";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  width: 100%;
  height: 65vh;
  position: relative;
  background: url("https://i.ibb.co/vXqDmnh/background.jpg") no-repeat center
    center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: inset 120px 100px 250px #000000,
      inset -120px -100px 250px #000000;
  }
  @media screen and (min-width: 640px) {
    height: 80vh;
    }
`;
const Showcase = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
  @media screen and (min-width: 640px) {
    width: 65%;
    }
  h1 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 1.4;
    margin: 0 0 2rem;
    @media screen and (min-width: 640px) {
      font-size: 4rem;
    }
  }
  p {
    text-transform: uppercase;
    color: #fff;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    margin: 0 0 2rem;
    @media screen and (min-width: 640px) {
      font-size: 1.9rem;
      margin: 0 0 2rem;
    }
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  flex-direction: column;
  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

const TextBox = styled.div`
  max-width: 400px;
  margin-bottom: 30px;
  @media screen and (min-width: 640px) {
    max-width: 500px;
    margin-bottom: 0px;
  }
  h2 {
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
    @media screen and (min-width: 640px) {
      font-size: 48px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    @media screen and (min-width: 640px) {
      font-size: 27px;
    }
  }
`;

const ImgBox = styled.div`
  max-width: 400px;
  img {
    width:100%;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
  width: 38vw;
  input {
    width: 100%;
    padding: 10px;
    height: 70px;
    font-size: 18px;
    color: black;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: white;
    &:focus ~ label{
        top: -5px;
        left: 0;
        color: tomato;
        font-size: 14px;
    }
  }
  label {
    position: absolute;
    top:10px;
    left: 0;
    padding: 10px;
    font-size: 18px;
    color: black;
    pointer-events: none;
    transition: .1s;
  }
`;

const StartBtn = styled.button`
    height: 50px;
    background-color: #e50914;
    border : none;
    width: 100px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    @media screen and (min-width: 640px) {
      font-size: 27px;
      width: 10vw;
      height: 70px;
    }
`;

/* const ErrorText = styled.span`
    position: absolute;
    top:85px;
    color : #ffa00a;
    font-size: 18px;
    font-weight: 500;
`; */

interface IEmail {
  email : string;
};

interface IProps {
  isLoggedIn : Boolean;
}

function Main({isLoggedIn}:IProps) {
    const { handleSubmit} = useForm<IEmail>();
    const history = useHistory();
    const onValid = ({email} : IEmail) => {
        history.push("/login");
    }
  return (
    <Container>
      <Content>
        <Showcase>
          <h1>
            영화와 시리즈를 <br /> 무제한으로.
          </h1>
          <p>해당 페이지는 React로 제작되었습니다.</p>
          <p>넷플릭스 클론 사이트이며 회원가입 및 로그인 후 접속하실 수 있습니다.</p>
          {isLoggedIn ?
            <p> <span style={{fontWeight:"600", color:"tomato"}}>{authService.currentUser?.email}</span> 님 반갑습니다.</p>
          :
            <Form onSubmit={handleSubmit(onValid)}>
            {/* <input
            {...register("email",{
                required : "이메일 주소를 입력해 주세요." ,
                pattern:{
                    value:  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식이 맞지 않습니다."
                },
                minLength: {
                    value : 5,
                    message : "이메일 주소를 입력해 주세요."
                }
            }) } type="text" />
            <label>이메일 주소</label> */}
            <StartBtn>시작하기</StartBtn>
            {/* <ErrorText>{errors?.email?.message}</ErrorText> */}
        </Form>
          
          }
          
        </Showcase>
      </Content>

      <Section>
        <TextBox>
          <h2>TV로 즐기세요.</h2>
          <p>
            스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
            플레이어 등 다양한 디바이스에서 시청하세요.
          </p>
        </TextBox>
        <ImgBox>
          <img src="https://i.ibb.co/DpdN7Gn/tab-content-2-1.png" alt="" />
        </ImgBox>
      </Section>
      <Section>
        <ImgBox>
          <img src="https://i.ibb.co/R3r1SPX/tab-content-2-2.png" alt="" />
        </ImgBox>
        <TextBox>
          <h2>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</h2>
          <p>간편하게 저장하고 빈틈없이 즐겨보세요.</p>
        </TextBox>
      </Section>
      <Section>
        <TextBox>
          <h2>다양한 디바이스에서 시청하세요.</h2>
          <p>
            각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로
            스트리밍하세요. 추가 요금이 전혀 없습니다.
          </p>
        </TextBox>
        <ImgBox>
          <img src="https://i.ibb.co/gDhnwWn/tab-content-2-3.png" alt="" />
        </ImgBox>
      </Section>
      <Section>
        <ImgBox>
          <img src="https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fkids.png?alt=media&token=8c30014c-d540-4e50-aa85-aa8cce120090" alt="" />
        </ImgBox>
        <TextBox>
          <h2>어린이 전용 프로필을 만들어 보세요.</h2>
          <p>
            자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이
            특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
          </p>
        </TextBox>
      </Section>

    </Container>
  );
}

export default Main;
