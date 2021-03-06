import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "fbase";

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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
  @media screen and (min-width: 640px) {
    font-size: 32px;
  }
`;

const HH1 = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  @media screen and (min-width: 640px) {
    font-size: 40px;
    margin-bottom: 30px;
  }
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
  }

  label {
    position: absolute;
    top: 2px;
    left: 5px;
    color: tomato;
    font-size: 12px;
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


const EmailBox = styled.div`
  height: 100px;
  position: relative;
`;

const PasswordBox = styled.div`
  height: 100px;
  position: relative;
`;

const ErrorText = styled.span`
  color: #ffa00a;
  font-size: 14px;
  font-weight: 500;
`;
const SignIn = styled.div`
  max-width: 480px;
  text-align: center;
  margin-top: 30px;
`;

const CompleteSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 60px;
`;


interface ILogin {
  email: string;
  password: string;
}

interface IProps {
  isLoggedIn : boolean
}

function Signup({isLoggedIn}: IProps) {
  const history = useHistory();
  const { register, handleSubmit,formState: { errors },} = useForm<ILogin>();
  const [error, setError] = useState("");
  const onValid = async ({ email, password }: ILogin) => {
      const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setTimeout(() => {
              history.push("/home");
            }, 5000)
        } catch (error) {
            setError(error+"");
        }
  };

  return (
    <Container>
      <Content>
      {isLoggedIn ? 
      <CompleteSignUp>
        <HH1>
          ???????????????!
        </HH1>
          <HH1>
            <span style={{color:"tomato"}}>{authService.currentUser?.email}</span> ??? ?????? ????????? ?????????????????????.
          </HH1>
          <H1 style={{textAlign:"center", marginTop:"50px"}}>
            ????????? my-netfilx ??????????????? ???????????????.
          </H1>
      </CompleteSignUp>
      :
      <LoginBox>
          <H1>?????? ??????</H1>
          <Form onSubmit={handleSubmit(onValid)}>
            <EmailBox>
              <input
                {...register("email", {
                  required: "????????? ????????? ????????? ?????????.",
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "????????? ????????? ?????? ????????????.",
                  },
                  minLength: {
                    value: 5,
                    message: "????????? ????????? ????????? ?????????.",
                  },
                })}
                type="email"
              />
              <label>????????? ?????? ?????? ????????????</label>
              <ErrorText>{errors?.email?.message}</ErrorText>
            </EmailBox>
            <PasswordBox>
              <input
                {...register("password", {
                  required: "??????????????? ????????? ?????????.",
                  minLength: {
                    value: 5,
                    message: "??????????????? ????????????.",
                  },
                })}
                type="password"
              />
              <label>????????????</label>
              <ErrorText>{errors?.password?.message}</ErrorText>
            </PasswordBox>
            <LoginButton>?????? ??????</LoginButton>
          </Form>
          
          {error && <span className="authError">{error}</span>}

          <SignIn>
            <p>?????? ??????????????? ?????? ???????????? ???????????? ????????? ????????? ???????????????.</p>
         </SignIn>

        </LoginBox>
      }
        
        
      </Content>
    </Container>
  );
}

export default Signup;
