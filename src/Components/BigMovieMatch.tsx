import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons"
import { getContentDetails, getContentSimilars, IGetDetails, IGetMoviesResult } from "api";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import { makeImagePath } from "utils";
import SimilarContent from "./SimilarContent";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  max-width: 600px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  overflow-y: auto;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #4d4d4d;
  }
`;

const BigCover = styled(motion.div)<{ bgphoto: string }>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Xclose = styled.div`
  position: absolute;
  right:10px;
  top:10px;
  cursor: pointer;
`;
const BigTitle = styled(motion.p)`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 22px;
  position: relative;
  font-weight: 600;
  span {
    background-color: tomato;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
  }
`;

const BigSubTitle = styled.p`
  font-size: 22px;
  font-weight: 600;
  line-height: 2;
`;

const BigDetailBox = styled.div`
  padding: 0px 20px;
  p {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
    color: white;
  }
`;

const Keyword = styled.span`
  padding: 2px 5px;
  background-color: tomato;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 15px;
  color: white;
`;

const BigOverview = styled(motion.p)`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.darker};
  line-height: 1.8;
`;

function BigMovieMatch({bigMovieMatch} : any) {
  const history = useHistory();
  const onOverlayClick = () => history.push("/home");
  // Content detail 가져오기
  const { data, isLoading } = useQuery<IGetDetails>(
    ["getMovie", bigMovieMatch?.params.movieId],
    () => getContentDetails(bigMovieMatch?.params.movieId + "", "movie") 
  );

    // similar content 가져오기
    const { data: similarData, isLoading:similarLoading } = useQuery<IGetMoviesResult>(
        ["getContentSimilars", bigMovieMatch?.params.movieId],
        () => getContentSimilars(bigMovieMatch?.params.movieId + "", "movie")
      );

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          {isLoading ? (
            "loading"
          ) : (
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
                style={{ top: 100 }}
                layoutId={bigMovieMatch.params.movieId}
              >
                <BigCover
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  bgphoto={makeImagePath(data?.backdrop_path || "")}
                >
                  <Xclose onClick={onOverlayClick}>
                    <FontAwesomeIcon icon={faCircleXmark} size="2x" color="white"/>
                  </Xclose>
                </BigCover>

                <BigTitle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {data?.title}
                  <a href={data?.homepage + ""} target="_blank">
                    <span>Homepage</span>
                  </a>
                </BigTitle>
                <BigDetailBox>
                  <p>개봉 {data?.release_date}</p>
                  <p>런타임 {data?.runtime} 분</p>
                  <p>
                    장르
                    {data?.genres.map((keyword, i) => (
                      <Keyword key={i}>{keyword.name}</Keyword>
                    ))}
                  </p>
                  <p style={{ marginBottom: "15px" }}>
                    추천수 :
                    {data?.vote_count
                      ?.toFixed(0)
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <StarRatings
                    rating={data?.vote_average && data?.vote_average / 2}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="tomato"
                    numberOfStars={5}
                  />
                  ({data?.vote_average} /10)
                  <BigSubTitle>{data?.tagline}</BigSubTitle>
                </BigDetailBox>
                <BigOverview
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {data?.overview}
                </BigOverview>
                <SimilarContent bigMovieMatch={bigMovieMatch} similarData={similarData!} similarLoading={similarLoading}/>
              </BigMovie>
            </>
          )}
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default BigMovieMatch;
