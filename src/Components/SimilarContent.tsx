import { IGetMoviesResult } from "api";
import Slider from "react-slick";
import styled from "styled-components";
import { makeImagePath } from "utils";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const Container = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled(Slider)`
  width: 80%;
  @media screen and (min-width: 640px) {
    width: 500px;
  }
`;

const H1 = styled.h1`
  align-self: flex-start;
  margin-left: 30px;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
`;

const PosterImg = styled.img`
  width: 100px;
  height: 130px;
  @media screen and (min-width: 640px) {
    width: 150px;
    height: 200px;
  }
`;

const Title = styled.h3`
  font-size: 14px;
  @media screen and (min-width: 640px) {
    font-size: 16px;
  }
`

interface IProps {
  bigMovieMatch: any;
  similarData: IGetMoviesResult;
  similarLoading: boolean;
}

function SimilarContent({
  bigMovieMatch,
  similarData,
  similarLoading,
}: IProps) {
  return (
    <>
      {similarLoading ? (
        "loading"
      ) : (
        <Container>
          <H1>비슷한 프로그램</H1>
          <Poster {...settings}>
            {similarData?.results.map((item) => (
              <div key={item.id}>
                <PosterImg
                  src={makeImagePath(item?.poster_path || "", "w200")}
                  alt={item.title}
                />
                <Title>{item.title}</Title>
              </div>
            ))}
          </Poster>
        </Container>
      )}
    </>
  );
}

export default SimilarContent;
