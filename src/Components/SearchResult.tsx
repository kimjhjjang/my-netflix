import { getSearchMovies, IGetSearchResult } from "api";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import { makeImagePath } from "utils";

const Row = styled(motion.div)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

/* 박스 추가 */
const Box = styled(motion.div)`
  background-color: rgb(35, 35, 35);
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  width: 45vw;
  height: 250px;
  margin-bottom: 10px;
  @media screen and (min-width: 640px) {
    width: 280px;
    height: 400px;
    margin-bottom: 0px;
  }
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

const H1 = styled.h1`
  margin: 40px 0 40px 30px;
  font-size: 36px;
`;

function SearchResult() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearchResult>(
    ["keyword", keyword],
    () => getSearchMovies(keyword + "")
  );

  const media_type = [
    ...Array.from(new Set(data?.results.map((item) => item.media_type))),
  ];

  return (
    <AnimatePresence>
      {isLoading
        ? "loading..."
        : media_type.map((type, i) => (
            <div key={i}>
              <H1>{type.toLocaleUpperCase()}</H1>
              <Row>
                {data?.results.length !== 0
                  ? data?.results.map((movie, index) =>
                      movie.media_type === type ? (
                        <Box key={movie.id}>
                          <Item
                            className="thumb"
                            bgphoto={makeImagePath(movie.poster_path, "w500")}
                          ></Item>
                          <Info>
                            <TvTitle>
                              {movie.media_type === "movie"
                                ? movie.title
                                : movie.name}
                            </TvTitle>
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
                      ) : null
                    )
                  : "검색된 콘텐츠가 없습니다."}
              </Row>
            </div>
          ))}
    </AnimatePresence>
  );
}

export default SearchResult;
