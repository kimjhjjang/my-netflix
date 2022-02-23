import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, IGetSearchResult } from "../api";
import { makeImagePath } from "../utils";

const Content = styled.div`
  width: 1500px;
  position: relative;
  margin: 0 auto;
  margin-top: 200px;
`;

const SearchResult = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 100px;
`;

const Row = styled(motion.div)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const MovieBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MovieInfo = styled.div``;

const MovieImg = styled(motion.img)`
  max-width: 290px;
  height: 180px;
`;

const MediaType = styled.span`
  position: absolute;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 0px 10px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500px;
  left: 5px;
  top: 5px;
`;

const rowVariants = {
  origin: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -40,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const H1 = styled.h1`
  margin: 40px 0 40px 30px;
  font-size: 36px;
`;

function Search() {
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
    <>
      {isLoading ? (
        "loading"
      ) : (
        <Content>
          <SearchResult>'{keyword}' 관련 콘텐츠</SearchResult>

          <AnimatePresence>
            {media_type.map((type,i) => (
              <div key={i}>
                <H1>{type.toLocaleUpperCase()}</H1>
                <Row>
                  {data?.results.length !== 0
                    ? data?.results.map((movie,index) => (
                        <div key={index+movie.id}>
                          {movie.media_type === type ? (
                            <MovieBox
                              variants={rowVariants}
                              initial="origin"
                              whileHover="hover"
                              transition={{ type: "tween" }}
                            >
                              <MediaType>{movie.media_type}</MediaType>
                              <MovieImg
                                src={
                                  makeImagePath(movie.poster_path, "w300") !==
                                  "https://image.tmdb.org/t/p/w300/null"
                                    ? makeImagePath(movie.poster_path, "w300")
                                    : "img/noimg.png"
                                }
                                alt={
                                  movie.media_type === "tv"
                                    ? movie.name
                                    : movie.title
                                }
                              />
                              <MovieInfo>
                                <h4>
                                  {movie.media_type === "tv"
                                    ? movie.name
                                    : movie.title}
                                </h4>
                              </MovieInfo>
                            </MovieBox>
                          ) : null}
                        </div>
                      ))
                    : "검색된 콘텐츠가 없습니다."}
                </Row>
              </div>
            ))}
          </AnimatePresence>
        </Content>
      )}
    </>
  );
}

export default Search;
