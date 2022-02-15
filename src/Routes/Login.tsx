import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
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
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset 120px 100px 250px #000000,
      inset -120px -100px 250px #000000;
  }
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  max-width: 450px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 60px;
`;
const H1 = styled.h1`
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  input {
    width: 100%;
    padding: 10px;
    height: 60px;
    font-size: 15px;
    color: white;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: #333;
    &:not(:placeholder-shown) ~ label {
        top: -6px;
      left: 0;
      color: tomato;
      font-size: 12px;
    }
    &:focus ~ label {
      top: -6px;
      left: 0;
      color: tomato;
      font-size: 12px;
    }
    
  }
  label {
    position: absolute;
    top: 10px;
    left: 0;
    padding: 10px;
    font-size: 15px;
    color: #8c8c8c;
    pointer-events: none;
    transition: 0.1s;
  }
`;

const LoginButton = styled.button`
  border: none;
  background-color: #e50914;
  color: white;
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const LoginCheck = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: grey;
  margin-top: 10px;
`;

const LoginType = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  i {
    width: 30px;
    height: 30px;
    margin: 30px 0px;
    cursor: pointer;
    &:first-child {
      margin-right: 20px;
    }
  }
`;

const EmailBox = styled.div`
  height: 100px;
  position: relative;
`;

const PasswordBox = styled.div`
  height: 100px;
  position: relative;
`;

const SignIn = styled.div``;

const ErrorText = styled.span`
  color: #ffa00a;
  font-size: 14px;
  font-weight: 500;
`;

interface ILogin {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const onValid = ({ email, password }: ILogin) => {
    console.log("이메일 : ", email, " // 비밀번호 :", password);
  };

  return (
    <Container>
      <Content>
        <LoginBox>
          <H1>로그인</H1>
          <Form onSubmit={handleSubmit(onValid)}>
            <EmailBox>
              <input
                {...register("email", {
                  required: "이메일 주소를 입력해 주세요.",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식이 맞지 않습니다.",
                  },
                  minLength: {
                    value: 5,
                    message: "이메일 주소를 입력해 주세요.",
                  },
                })}
                type="email"
              />
              <label>이메일 주소 또는 전화번호</label>
              <ErrorText>{errors?.email?.message}</ErrorText>
            </EmailBox>
            <PasswordBox>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 5,
                    message: "비밀번호가 짧습니다.",
                  },
                })}
                type="password"
              />
              <label>비밀번호</label>
              <ErrorText>{errors?.password?.message}</ErrorText>
            </PasswordBox>
            <LoginButton>로그인</LoginButton>
          </Form>
          <LoginCheck>
            <div>
              <input type="checkbox" id="loginSave" />
              <label htmlFor="loginSave" aria-label="로그인 정보 저장">
                로그인 저장
              </label>
            </div>
            <p>도움이 필요하신가요?</p>
          </LoginCheck>
          <LoginType>
            <i>
              <FontAwesomeIcon icon={faGoogle} size="2x" />
            </i>
            <i>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </i>
          </LoginType>
          <SignIn>
            <p>Netflix 회원이 아닌가요? 지금 가입하세요</p>
          </SignIn>
        </LoginBox>
      </Content>
    </Container>
  );
}

export default Login;
