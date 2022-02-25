import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  getMovies,
  getPopularMovies,
  getTopRateMovie,
  getUpcomingMovie,
  IGetMoviesResult,
  IPopularMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Top10 from "../Components/Top10";
import BackgroundMovie from "../Components/BackgroundMovie";
import "../Common/main.css";
import StarRatings from "react-star-ratings";
import { TailSpin } from "react-loader-spinner";
import BigMovieMatch from "Components/BigMovieMatch";

const Container = styled.div`
  overflow: hidden;
  //background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
`;

const TvList = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StyleBox = styled.div`
  position: relative;
  height: 320px;
  margin-bottom: 30px;
  @media screen and (min-width: 640px) {
    height: 400px;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 5px;
  margin-bottom: 30px;
  min-height: 300px;
  position: absolute;
  width: 100%;
  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(6, 1fr);
    min-height: 320px;
  }
`;

const Box = styled(motion.div)`
  background-color: rgb(35, 35, 35);
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
`;

const Item = styled.div<{ bgphoto: string }>`
  padding-bottom: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgphoto});
`;

const H1 = styled.h1`
  margin: 0 0 10px 10px;
  font-size: 18px;
  font-weight: 600;
  @media screen and (min-width: 640px) {
    font-size: 36px;
    margin: 0 0 20px 30px;
  }
`;

const Loader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center; 
  @media screen and (min-width: 640px) {
    height: 70vh;
    padding: 60px;
    background-image: none;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
  @media screen and (min-width: 640px) {
    font-size: 68px;
  }
`;

const Overview = styled.p`
  font-size: 16px;
  width: 90%;
  line-height: 1.5;
  @media screen and (min-width: 640px) {
    font-size: 30px;
    width: 50%;
  }
`;

const TvTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px;
`;

const TvContent = styled.div`
  font-weight: 400;
  color: grey;
  font-size: 16px;
  @media screen and (min-width: 640px) {
    font-size: 20px;
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const MoveBox = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

const MoveButton = styled.button`
  margin-top: 185px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  z-index: 2;
  border: none;
  @media screen and (min-width: 640px) {
    margin-top: 200px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function Home() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let offset: number = 6;
  if (windowDimensions.width < 640) {
    offset = 2;
  }
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  // 오늘 TOP 10
  const { data: popMovies, isLoading: popLoading } =
    useQuery<IPopularMoviesResult>(
      ["movies", "popularMovie"],
      getPopularMovies
    );

  //상영중인 영화
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // 인기 콘텐츠
  const { data: topMovies /* , isLoading: topLoading */ } =
    useQuery<IGetMoviesResult>(["movies", "topMovie"], getTopRateMovie);

  //개봉 영화
  const { data: comingMovies /* , isLoading: comingLoading */ } =
    useQuery<IGetMoviesResult>(["movies", "upcomingMovie"], getUpcomingMovie);

  const [isBack, setIsBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const [index, setIndex] = useState(0); //상영중
  const [topIndex, setTopIndex] = useState(0); // 인기 콘텐츠
  const [comingIndex, setComingIndex] = useState(0); // 개봉예정

  const nextIndex = (type: number) => {
    switch (type) {
      case 0:
        if (data) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = data?.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
      case 1:
        if (topMovies) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = topMovies.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setTopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
      case 2:
        if (comingMovies) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = comingMovies.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setComingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
    }
  };

  const prevIndex = (type: number) => {
    switch (type) {
      case 0:
        if (data) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = data?.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
      case 1:
        if (topMovies) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = topMovies.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setTopIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
      case 2:
        if (comingMovies) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = comingMovies.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setComingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number, movieType?: string): void => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </Loader>
      ) : (
        <Container>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <BackgroundMovie id={data?.results[0].id+""}  /> 
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
            <button
              onClick={() => onBoxClicked(data?.results[0].id!, "now")}
              style={{
                width: "100px",
                height: "50px",
                padding: "10px",
                fontSize: "15px",
                fontWeight: 600,
                marginTop: "20px",
              }}
            >
              상세 정보
            </button>
          </Banner>
          <H1>오늘 TOP 10 콘텐츠</H1>
          <Top10
            onBoxClicked={onBoxClicked}
            popMovies={popMovies!}
            popLoading={popLoading}
          />
          <TvList>
            <H1>상영중인 콘텐츠</H1>
            <StyleBox>
              <MoveBox>
                <MoveButton onClick={() => prevIndex(0)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(0)}>&rarr;</MoveButton>
              </MoveBox>
              <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={isBack}
              >
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                  custom={isBack}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        key={movie.id}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id, "now")}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(movie.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{movie.title}</TvTitle>
                          <TvContent>
                            <StarRatings
                              rating={movie.vote_average / 2}
                              starDimension="15px"
                              starSpacing="1px"
                              starRatedColor="tomato"
                              numberOfStars={5}
                            />{" "}
                            ({movie.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>
            <H1>인기 콘텐츠</H1>
            <StyleBox>
              <MoveBox>
                <MoveButton onClick={() => prevIndex(1)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(1)}>&rarr;</MoveButton>
              </MoveBox>
              <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={isBack}
              >
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={topIndex}
                  custom={isBack}
                >
                  {topMovies?.results
                    .slice(offset * topIndex, offset * topIndex + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        onClick={() => onBoxClicked(movie.id, "top")}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(movie.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{movie.title}</TvTitle>
                          <TvContent>
                            <StarRatings
                              rating={movie.vote_average / 2}
                              starDimension="15px"
                              starSpacing="1px"
                              starRatedColor="tomato"
                              numberOfStars={5}
                            />{" "}
                            ({movie.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>

            <H1>개봉 예정 콘텐츠</H1>
            <StyleBox>
              <MoveBox>
                <MoveButton onClick={() => prevIndex(2)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(2)}>&rarr;</MoveButton>
              </MoveBox>
              <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={isBack}
              >
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={comingIndex}
                  custom={isBack}
                >
                  {comingMovies?.results
                    .slice(1)
                    .slice(offset * comingIndex, offset * comingIndex + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        onClick={() => onBoxClicked(movie.id, "coming")}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(movie.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{movie.title}</TvTitle>
                          <TvContent>
                            <StarRatings
                              rating={movie.vote_average / 2}
                              starDimension="15px"
                              starSpacing="1px"
                              starRatedColor="tomato"
                              numberOfStars={5}
                            />{" "}
                            ({movie.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>
          </TvList>
          {bigMovieMatch?.isExact === true ? (
            <BigMovieMatch bigMovieMatch={bigMovieMatch} />
          ) : null}
        </Container>
      )}
    </>
  );
}
export default Home;
