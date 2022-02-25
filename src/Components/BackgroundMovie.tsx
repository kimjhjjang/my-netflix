import { getYoutubeContents, IGetYoutube } from "api";
import Iframe from "react-iframe";
import { useQuery } from "react-query";
import styled from "styled-components";

const Container = styled.div`
  display: none;
  @media screen and (min-width: 640px) {
    display: block;
    position: fixed;
    top: -150px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
`;

const BackGradient = styled.div`
    position: fixed;
    left: 0;
    top:0;
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
`

interface IProps {
  id: string;
}

function BackgroundMovie({ id }: IProps) {
  // youtube key 가져오기
  const { data, isLoading } = useQuery<IGetYoutube>(
    ["getYoutubeContents", id],
    () => getYoutubeContents(id + "", "movie")
  );

  return (
    <Container>
      {isLoading ? (
        "loading..."
      ) : (
          <>
          <BackGradient></BackGradient>
        <Iframe
          url={`http://www.youtube.com/embed/${data?.results[0].key}?controls=0&autoplay=1&mute=1&showinfo=0&rel=0`}
          width="1920"
          height="1080"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder={0}
        />
          </>
      )}
    </Container>
  );
}

export default BackgroundMovie;
