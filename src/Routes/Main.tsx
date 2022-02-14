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
const Header = styled.header`
  width: 100%;
  height: 80vh;
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
`;
const Showcase = styled.div`
  position: relative;
  width: 65%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
  h1 {
    font-weight: 700;
    font-size: 4rem;
    line-height: 1.4;
    margin: 0 0 2rem;
  }
  p {
    text-transform: uppercase;
    color: #fff;
    font-weight: 400;
    font-size: 1.9rem;
    line-height: 1.25;
    margin: 0 0 2rem;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const TextBox = styled.div`
  max-width: 500px;
  h2 {
    font-size: 48px;
    margin-bottom: 25px;
    font-weight: 600;
  }
  p {
    font-size: 27px;
    font-weight: 500;
  }
`;

const ImgBox = styled.div``;

const Form = styled.form`
  display: flex;
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
    height: 70px;
    background-color: #e50914;
    border : none;
    width: 10vw;
    font-size: 24px;
    font-weight: 500;
    color: white;
`;

const ErrorText = styled.span`
    position: absolute;
    top:85px;
    color : #ffa00a;
    font-size: 18px;
    font-weight: 500;
`

const Footer = styled.div`
  max-width: 70%;
  margin: 1rem auto;
  overflow: auto;
  p {
    margin-bottom: 1.5rem;
  }
  li {
    line-height: 1.9;
  }
`;

const FooterBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;

interface IEmail {
    email : string;
}

function Main() {
    const {register, handleSubmit, formState:{errors}} = useForm<IEmail>();
    const history = useHistory();
    const onValid = ({email} : IEmail) => {
        history.push("/home");
    }
  return (
    <Container>
      <Header className="showcase">
        <Showcase className="showcase-content">
          <h1>
            영화와 시리즈를 <br /> 무제한으로.
          </h1>
          <p>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</p>
          <p>넷플릭스 클론 페이지이며 이메일 주소를 입력하시면 접속하실 수 있습니다.</p>
          <Form onSubmit={handleSubmit(onValid)}>
                    <input
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
                    <label className="input_label">이메일 주소</label>
                    <StartBtn>시작하기</StartBtn>
                    <ErrorText>{errors?.email?.message}</ErrorText>
                </Form>
        </Showcase>
      </Header>

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
          <img src="./img/kids.png" alt="" />
        </ImgBox>
        <TextBox>
          <h2>어린이 전용 프로필을 만들어 보세요.</h2>
          <p>
            자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이
            특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
          </p>
        </TextBox>
      </Section>

      <Footer className="footer">
        <p>Questions? Call 1-866-579-7172</p>
        <FooterBox className="footer-cols">
          <ul>
            <li>
              <span>FAQ</span>
            </li>
            <li>
              <span>Investor Relations</span>
            </li>
            <li>
              <span>Ways To Watch</span>
            </li>
            <li>
              <span>Corporate Information</span>
            </li>
            <li>
              <span>Netflix Originals</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Help Center</span>
            </li>
            <li>
              <span>Jobs</span>
            </li>
            <li>
              <span>Terms Of Use</span>
            </li>
            <li>
              <span>Contact Us</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Account</span>
            </li>
            <li>
              <span>Redeem Gift Cards</span>
            </li>
            <li>
              <span>Privacy</span>
            </li>
            <li>
              <span>Speed Test</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Media Center</span>
            </li>
            <li>
              <span>Buy Gift Cards</span>
            </li>
            <li>
              <span>Cookie Preferences</span>
            </li>
            <li>
              <span>Legal Notices</span>
            </li>
          </ul>
        </FooterBox>
      </Footer>
    </Container>
  );
}

export default Main;
