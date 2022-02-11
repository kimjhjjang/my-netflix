import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { adminState } from "../recoil/admin";

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

const Users = styled.ul`
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
`

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

const DeleteBox = styled.span`
  text-align: center;
  line-height: 3.5;
  font-size: 20px;
`;

function ManageProfiles() {
  const [admin, setAdmin] = useRecoilState(adminState);

  return (
    <Container>
      <UserBox variants={useVariants} initial="init" animate="animate">
        <H1>프로필 관리</H1>
        <Users>
          {Object.keys(admin).map((user, i) => (
            <User key={i}>
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
              <UserName>{user}</UserName>
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
    </Container>
  );
}

export default ManageProfiles;
