import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authService, dbService } from "fbase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 10px 15px;
  color: white;
  z-index: 3;
  @media screen and (min-width: 640px) {
    padding: 20px 60px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 20px;
  width: 60px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  @media screen and (min-width: 640px) {
    margin-right: 50px;
    width: 95px;
    height: 25px;
  }
  path {
    stroke-width: 6px;
    /* stroke: white; */
  }
`;

const Admin = styled(motion.svg)``;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const MobileSearch = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  @media screen and (min-width: 640px) {
    display: none;
  }
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  @media screen and (min-width: 640px) {
    font-size: 24px;
  }
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;

  svg {
    height: 25px;
    display: none;
    @media screen and (min-width: 640px) {
      display: inherit;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 32px;
  height: 3px;
  border-radius: 5px;
  bottom: -12px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
  @media screen and (min-width: 640px) {
    width: 50px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 125px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border: 1px solid ${(props) => props.theme.white.lighter};
  display: none;
  @media screen and (min-width: 640px) {
    display: inherit;
  }
`;

const MobileSearchForm = styled.form`
  position: absolute;
  width: 100%;
  left:0;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const MobileInput = styled.input`
  width: 95%;
  font-size: 16px;
  padding: 10px;
`;

const Account = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const SubMenu = styled.div`
  position: absolute;
  background-color: black;
  top: 30px;
  right: -20px;
  padding: 20px;
  min-width: 180px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  p {
    margin-left: 10px;
  }
`;

const Arrow = styled(motion.div)`
  border: solid transparent;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 5px;
`;

const Login = styled.span`
  background-color: #e50914;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  @media screen and (min-width: 640px) {
    padding: 10px 20px;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
    },
  },
};

const LogOut = styled.span`
  width: 100%;
  padding: 10px;
  background-color: tomato;
  margin-left: 0px;
  text-align: center;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  font-weight: 600;
`;

const SelectProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
  img {
    margin-right: 10px;
    border-radius: 20px;
  }
`;

const adminVariants = {
  normal: {
    fill: "white",
  },
  active: {
    fill: "tomato",
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

const subMenuAnimate = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const arrowAnimate = {
  init: {
    rotate: 0,
  },
  action: {
    rotate: 180,
  },
};

interface IForm {
  keyword: string;
}

interface IProp {
  isLoggedIn: boolean;
  isProfiles: any[];
  selectedProfile: any[];
}

function Header({ isLoggedIn, isProfiles, selectedProfile }: IProp) {
  const [mobileSearchView, setMobileSearchView] = useState(false);
  const onMobileSearchView = () => {
    setMobileSearchView((prev) => !prev);
  };
  const useLogin = useRouteMatch<{ movieId: string }>("/login");
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch("/home");
  const tvMatch = useRouteMatch("/tv");
  const searchMatch = useRouteMatch("/search");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
    setMobileSearchView(false);
  };

  const [isHover, toggleHover] = useState(false);

  const onLogOut = () => {
    authService.signOut();
    toggleHover(false);
  };

  const onSelectProfile = async (profile: any) => {
    if (selectedProfile.length === 0) {
      await addDoc(collection(dbService, "selectedProfile"), profile);
      history.push("/home");
    } else {
      const profileUpdateText = doc(
        dbService,
        "selectedProfile",
        selectedProfile[0].cid
      );
      await updateDoc(profileUpdateText, profile);
      history.push("/home");
    }
  };

  return (
    <>
      <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
        {mobileSearchView ? (
          <>
            <MobileSearchForm onSubmit={handleSubmit(onValid)}>
              <MobileInput
                {...register("keyword", { required: true })}
                placeholder="영화, TV 프로그램을 검색하세요"
              />
            </MobileSearchForm>
            <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <Col>
              <Link to="/">
                <Logo
                  variants={logoVariants}
                  whileHover="active"
                  animate="normal"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1024"
                  height="276.742"
                  viewBox="0 0 1024 276.742"
                >
                  <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </Logo>
              </Link>
              <Items>
                <Item>
                  <Link to="/home">
                    영화 {homeMatch && <Circle layoutId="circle" />}
                  </Link>
                </Item>
                <Item>
                  <Link to="/tv">
                    티비 {tvMatch && <Circle layoutId="circle" />}
                  </Link>
                </Item>
                <MobileSearch onClick={onMobileSearchView}>
                  검색 {searchMatch && <Circle layoutId="circle" />}
                </MobileSearch>
              </Items>
            </Col>
            <Col>
              <Search onSubmit={handleSubmit(onValid)}>
                <motion.svg
                  onClick={toggleSearch}
                  animate={{ x: searchOpen ? -265 : 0 }}
                  transition={{ type: "linear" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </motion.svg>
                <Input
                  {...register("keyword", { required: true })}
                  animate={inputAnimation}
                  initial={{ scaleX: 0 }}
                  transition={{ type: "linear" }}
                  placeholder="검색해 보세요"
                />
                <Account
                  onHoverStart={() => toggleHover(true)}
                  onHoverEnd={() => toggleHover(false)}
                  onClick={() => toggleHover((prev) => !prev)}
                >
                  {selectedProfile.length !== 0 ? (
                    selectedProfile.map((profile) => (
                      <SelectProfile key={profile.createAt}>
                        <>
                          <img
                            src={
                              profile.attachmentUrl !== ""
                                ? profile.attachmentUrl
                                : "https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"
                            }
                            style={{ width: "30px", height: "30px" }}
                            alt={profile.name}
                          />
                          <p>{profile.name}</p>
                        </>
                      </SelectProfile>
                    ))
                  ) : (
                    <span style={{ margin: "0px 10px" }}>
                      사용자를 설정하세요.
                    </span>
                  )}

                  <Arrow
                    variants={arrowAnimate}
                    initial="init"
                    animate={isHover ? "action" : "init"}
                  />

                  <motion.div
                    initial="exit"
                    animate={isHover ? "enter" : "exit"}
                    variants={subMenuAnimate}
                  >
                    <SubMenu>
                      {isProfiles.map((profile) => (
                        <User
                          key={profile.createAt}
                          onClick={() => onSelectProfile(profile)}
                          style={{ cursor: "pointer" }}
                        >
                          {profile.attachmentUrl !== "" ? (
                            <img
                              src={profile.attachmentUrl}
                              style={{ width: "30px", height: "30px" }}
                              alt={profile.name}
                            />
                          ) : (
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/myflix-af163.appspot.com/o/img%2Fadmin.png?alt=media&token=86abaefd-d6df-485a-a821-504bc6f522fb"
                              style={{ width: "30px", height: "30px" }}
                              alt={profile.name}
                            />
                          )}
                          <p>{profile.name}</p>
                        </User>
                      ))}
                      <User>
                        <Admin
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          variants={adminVariants}
                          whileHover="active"
                          animate="normal"
                        >
                          <motion.path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" />
                        </Admin>
                        <Link to="/browse">
                          <p>계정 관리</p>
                        </Link>
                      </User>
                      <User style={{ borderTop: "1px solid white" }}>
                        <LogOut onClick={onLogOut}>로그 아웃</LogOut>
                      </User>
                    </SubMenu>
                  </motion.div>
                </Account>
              </Search>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <Link to="/">
                <Logo
                  variants={logoVariants}
                  whileHover="active"
                  animate="normal"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1024"
                  height="276.742"
                  viewBox="0 0 1024 276.742"
                >
                  <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </Logo>
              </Link>
            </Col>
            {!useLogin?.isExact && (
              <Col>
                <Link to="/login">
                  <Login>로그인</Login>
                </Link>
              </Col>
            )}
          </>
        )}
      </Nav>
    </>
  );
}

export default Header;
