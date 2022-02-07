import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovies,
  getPopularMovies,
  getTopRateMovie,
  getUpcomingMovie,
  IGetMoviesResult,
  IPopularMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Top10 from "../Components/Top10";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  height: 200px;
  margin-bottom: 30px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  flex-grow: 1;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const H1 = styled.h1`
  margin: 0 0 50px 60px;
  font-size: 36px;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled(motion.h3)`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled(motion.p)`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
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

const infoVariants = {
  hover: {
    opacity: 1,
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
  height: 200px;
  z-index: 2;
  opacity: 0.2;
  &:hover {
    opacity: 0.8;
  }
`;

const offset: number = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
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
  const { data: topMovies, isLoading: topLoading } = useQuery<IGetMoviesResult>(
    ["movies", "topMovie"],
    getTopRateMovie
  );

  //개봉 영화
  const { data: comingMovies, isLoading: comingLoading } =
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

  const nowplaying_movie = data?.results;
  const pop_movie = popMovies?.results;
  const top_movie = topMovies?.results;
  const coming_movie = comingMovies?.results;

  const totalMovie = nowplaying_movie?.concat(
    pop_movie as any,
    top_movie as any,
    coming_movie as any
  );

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    totalMovie!.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  const onOverlayClick = () => history.push("/");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
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
                marginTop : "20px",
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
          <H1>상영중인 콘텐츠</H1>
          <Slider>
          <MoveBox>
                <MoveButton onClick={() => prevIndex(0)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(0)}>&rarr;</MoveButton>
              </MoveBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isBack}>
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
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      onClick={() => onBoxClicked(movie.id, "now")}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <H1>인기 콘텐츠</H1>
          <Slider>
          <MoveBox>
                <MoveButton onClick={() => prevIndex(1)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(1)}>&rarr;</MoveButton>
              </MoveBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isBack}>
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
                  .slice(1)
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      onClick={() => onBoxClicked(movie.id, "top")}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <H1>개봉 예정 콘텐츠</H1>
          <Slider>
          <MoveBox>
                <MoveButton onClick={() => prevIndex(2)}>&larr;</MoveButton>
                <MoveButton onClick={() => nextIndex(2)}>&rarr;</MoveButton>
              </MoveBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isBack}>
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
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {clickedMovie.title}
                      </BigTitle>
                      <BigOverview
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {clickedMovie.overview}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
