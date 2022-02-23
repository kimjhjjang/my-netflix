import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, } from "framer-motion";
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
import "../Common/main.css";
import StarRatings from "react-star-ratings";
import { TailSpin } from "react-loader-spinner";
import BigMovieMatch from "Components/BigMovieMatch";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #4d4d4d;
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
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 72px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  font-weight: 500;
`;

const Slider = styled.div`
  position: relative;
  height: 300px;
  margin-bottom: 30px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgphoto?: string }>`
  display: flex;
  flex-direction: column;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  display: none;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 1;
`;

const InfoTitle = styled.div`
margin-bottom: 20px;
  h4{
    font-size: 20px;
    font-weight: 600;
  }
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfoDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const INfoMainTitle = styled.span`
font-size: 20px;
  font-weight: 600;
`

const InfoSubTitle = styled.span`
    font-size: 12px;
    margin-top: 10px;
`;

const H1 = styled.h1`
  margin: 0 0 50px 60px;
  font-size: 36px;
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
    display:"flex",
    opacity:1,
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
  height: 180px;
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


  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </Loader>
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
          <H1>상영중인 콘텐츠</H1>
          <Slider>
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
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id, "now")}
                    >
                      <img
                        src={makeImagePath(movie.backdrop_path, "w300")}
                        alt={movie.title}
                      />

                      <Info variants={infoVariants}>
                        <InfoTitle>
                          <h4>{movie.title}</h4>
                          <h5>{movie.original_title}</h5>
                        </InfoTitle>
                        <InfoBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.vote_count}</INfoMainTitle>
                            <InfoSubTitle>좋아요 수</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <StarRatings
                            rating={movie.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          />
                            <InfoSubTitle>({movie.vote_average})</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.release_date.substring(0, 4)}년</INfoMainTitle>
                            <InfoSubTitle>{movie.release_date.substring(5, 7)}월 {movie.release_date.substring(8, 10)}일</InfoSubTitle>
                          </InfoDetailBox>
                        </InfoBox>
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
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <img
                        src={makeImagePath(movie.backdrop_path, "w300")}
                        alt={movie.title}
                      />
                      <Info variants={infoVariants}>
                        <InfoTitle>
                          <h4>{movie.title}</h4>
                          <h5>{movie.original_title}</h5>
                        </InfoTitle>
                        <InfoBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.vote_count}</INfoMainTitle>
                            <InfoSubTitle>좋아요 수</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <StarRatings
                            rating={movie.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          />
                            <InfoSubTitle>({movie.vote_average})</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.release_date.substring(0, 4)}년</INfoMainTitle>
                            <InfoSubTitle>{movie.release_date.substring(5, 7)}월 {movie.release_date.substring(8, 10)}일</InfoSubTitle>
                          </InfoDetailBox>
                        </InfoBox>
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
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <img
                        src={makeImagePath(movie.backdrop_path, "w300")}
                        alt={movie.title}
                      />
                      <Info variants={infoVariants}>
                        <InfoTitle>
                          <h4>{movie.title}</h4>
                          <h5>{movie.original_title}</h5>
                        </InfoTitle>
                        <InfoBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.vote_count}</INfoMainTitle>
                            <InfoSubTitle>좋아요 수</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <StarRatings
                            rating={movie.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          />
                            <InfoSubTitle>({movie.vote_average})</InfoSubTitle>
                          </InfoDetailBox>
                          <InfoDetailBox>
                            <INfoMainTitle>{movie.release_date.substring(0, 4)}년</INfoMainTitle>
                            <InfoSubTitle>{movie.release_date.substring(5, 7)}월 {movie.release_date.substring(8, 10)}일</InfoSubTitle>
                          </InfoDetailBox>
                        </InfoBox>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          {bigMovieMatch?.isExact === true ? <BigMovieMatch bigMovieMatch={bigMovieMatch}/>: null}
          
        </>
      )}
    </Wrapper>
  );
}
export default Home;
