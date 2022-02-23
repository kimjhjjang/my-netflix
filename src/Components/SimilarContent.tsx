import {  IGetMoviesResult } from "api";
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
          slidesToShow: 5,
          slidesToScroll: 5,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
const Container = styled.div`
  max-width  : 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled(Slider)`
    max-width: 500px;
`;

const H1 = styled.h1`
    align-self: flex-start;
    margin-left: 30px;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
`;

interface IProps {
    bigMovieMatch : any;
    similarData : IGetMoviesResult;
    similarLoading : boolean;
}

function SimilarContent ({bigMovieMatch, similarData, similarLoading} :IProps) {


 return (
     <>
     {similarLoading ? "loading" : 
     <Container>
         <H1>비슷한 프로그램</H1>
     <Poster {...settings}>
         {similarData?.results.map((item) => 
            <div key={item.id}>
                <img style={{width:"150px",height:"200px"}} src={makeImagePath(item?.poster_path || "", "w200")} alt={item.title} />
                <h3>{item.title}</h3>
            </div>
         )}
     </Poster>
     </Container>
    }
    </>
 )
}

export default SimilarContent;