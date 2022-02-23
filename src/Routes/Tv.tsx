import BigTvMatch from "Components/BitTvMatch";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import {
  getAiringTv,
  getLatestTv,
  getPopularTv,
  getTopRateTv,
  IGetSearchResult,
} from "../api";
import { makeImagePath } from "../utils";

const Container = styled.div`
  overflow: hidden;
`;

const TvList = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StyleBox = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 30px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-gap: 5px;
  margin-bottom: 30px;
  min-height: 400px;
  position: absolute;
  width: 100%;
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
  margin: 0 0 50px 30px;
  font-size: 36px;
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
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const TvTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const TvContent = styled.div`
  font-weight: 400;
  color: grey;
`;


const MoveBox = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

const MoveButton = styled.button`
  height: 400px;
  z-index: 2;
  opacity: 0.2;
  &:hover {
    opacity: 0.8;
  }
`;

function Tv() {
  const { data: toprate, isLoading: topLoading } = useQuery<IGetSearchResult>(
    ["tv", "top_rated"],
    getTopRateTv
  );
  const { data: latest, isLoading: latestLoading } = useQuery<IGetSearchResult>(
    ["tv", "Latest"],
    getLatestTv
  );
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetSearchResult>(["tv", "Popular"], getPopularTv);

  const { data: airing, isLoading: airingLoading } = useQuery<IGetSearchResult>(
    ["tv", "AiringTv"],
    getAiringTv
  );

  const [tIndex, settIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [lIndex, setlIndex] = useState(0);
  const [pIndex, setpIndex] = useState(0);
  const [aIndex, setaIndex] = useState(0);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [isBack, setIsBack] = useState(false);
  const nextIndex = (type: number) => {
    switch (type) {
      case 0:
        if (toprate) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = toprate.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          settIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
      case 1:
        if (popular) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = popular.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setpIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
      case 2:
        if (airing) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = airing.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setaIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
        break;
      default:
        if (latest) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(false);
          const totalMovies = latest.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setlIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    }
  };

  const prevIndex = (type: number) => {
    switch (type) {
      case 0:
        if (toprate) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = toprate.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          settIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
      case 1:
        if (popular) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = popular.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setpIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
      case 2:
        if (airing) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = airing.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setaIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
        break;
      default:
        if (latest) {
          if (leaving) return;
          toggleLeaving();
          setIsBack(true);
          const totalMovies = latest.results.length - 1;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          setlIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        }
    }
  };

  const offset = 6;
  const loading =
    topLoading || latestLoading || popularLoading || airingLoading;

  const history = useHistory();
  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };
  const bigTvMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
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

  return (
    <>
      {loading ? (
        <Loader>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </Loader>
      ) : (
        <Container>
          <Banner
            bgphoto={makeImagePath(popular?.results[0].backdrop_path || "")}
          >
            <Title>{popular?.results[0].name}</Title>
            <Overview>{popular?.results[0].overview}</Overview>
            <button
              onClick={() => onBoxClicked(popular?.results[0].id!)}
              style={{
                width: "100px",
                height: "50px",
                padding: "10px",
                fontSize: "15px",
                fontWeight: 600,
                marginTop:"20px"
              }}
            >
              상세 정보
            </button>
          </Banner>
          <TvList>
            <H1>TV POPULAR</H1>
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
                  custom={isBack}
                  transition={{ type: "tween", duration: 1 }}
                  key={tIndex}
                >
                  {popular?.results
                    .slice(1)
                    .slice(offset * tIndex, offset * tIndex + offset)
                    .map((tv, i) => (
                      <Box
                        key={i}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id)}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(tv.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{tv.name}</TvTitle>
                          <TvContent>
                          <StarRatings
                            rating={tv.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          /> ({tv.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>

            <H1>TV 평점 높은 프로그램</H1>
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
                  custom={isBack}
                  transition={{ type: "tween", duration: 1 }}
                  key={pIndex}
                >
                  {toprate?.results
                    .slice(offset * pIndex, offset * pIndex + offset)
                    .map((tv, i) => (
                      <Box
                        key={i}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id)}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(tv.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{tv.name}</TvTitle>
                          <TvContent>
                          <StarRatings
                            rating={tv.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          /> ({tv.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>

            <H1>TV AIRING</H1>
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
                  custom={isBack}
                  transition={{ type: "tween", duration: 1 }}
                  key={aIndex}
                >
                  {airing?.results
                    .slice(offset * aIndex, offset * aIndex + offset)
                    .map((tv, i) => (
                      <Box
                        key={i}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id)}
                      >
                        <Item
                          className="thumb"
                          bgphoto={makeImagePath(tv.poster_path, "w500")}
                        ></Item>
                        <Info>
                          <TvTitle>{tv.name}</TvTitle>
                          <TvContent>
                          <StarRatings
                            rating={tv.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          /> ({tv.vote_average} / 10)
                          </TvContent>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </StyleBox>

            <H1>TV LATEST</H1>
            <StyleBox>
              {latest?.results ? (
                <MoveBox>
                  <MoveButton onClick={() => prevIndex(3)}>&larr;</MoveButton>
                  <MoveButton onClick={() => nextIndex(3)}>&rarr;</MoveButton>
                </MoveBox>
              ) : null}
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
                  custom={isBack}
                  transition={{ type: "tween", duration: 1 }}
                  key={lIndex}
                >
                  {latest?.results ? (
                    latest?.results
                      .slice(offset * lIndex, offset * lIndex + offset)
                      .map((tv, i) => (
                        <Box
                          key={i}
                          variants={boxVariants}
                          whileHover="hover"
                          initial="normal"
                          transition={{ type: "tween" }}
                          onClick={() => onBoxClicked(tv.id)}
                        >
                          <Item
                            className="thumb"
                            bgphoto={makeImagePath(tv.poster_path, "w500")}
                          ></Item>
                          <Info>
                            <TvTitle>{tv.name}</TvTitle>
                            <TvContent>
                            <StarRatings
                            rating={tv.vote_average / 2}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="tomato"
                            numberOfStars={5}
                          /> ({tv.vote_average} / 10)
                            </TvContent>
                          </Info>
                        </Box>
                      ))
                  ) : (
                    <p style={{ gridColumn: "1/7", textAlign: "center" }}>
                      "현재 업데이트된 최신 프로그램이 존재하지 않습니다."
                    </p>
                  )}
                </Row>
              </AnimatePresence>
            </StyleBox>
          </TvList>

          {bigTvMatch?.isExact === true ? <BigTvMatch bigTvMatch={bigTvMatch}/>: null}

          {/* <AnimatePresence>
            {bigTvMatch ? (
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
                  layoutId={bigTvMatch.params.tvId}
                >
                  {clickedTv && (
                    <>
                      <BigCover
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {clickedTv.name}
                      </BigTitle>
                      <BigOverview
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {clickedTv.overview}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence> */}
        </Container>
      )}
    </>
  );
}

export default Tv;
