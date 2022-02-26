import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled(motion.div)`
  max-width: 80%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 640px) {
    margin-top: 200px;
  }
`;

const SearchResult = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  @media screen and (min-width: 640px) {
    font-size: 36px;
    margin-bottom: 100px;
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 30px;
  @media screen and (min-width: 640px) {
    margin-top: 0px;
  }
`;

const Input = styled.input`
  height: 7vh;
  padding: 5px 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border: 1px solid ${(props) => props.theme.white.lighter};
  @media screen and (min-width: 640px) {
    width: 40vw;
    height: 7vh;
    padding: 5px 10px;
  }
`;

const useVariants = {
  init: {
    scale: 1.2,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

interface IForm {
  keyword: string;
}

function GoSearch() {
  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
  };
  return (
    <AnimatePresence>
      <Container>
        <Content variants={useVariants} initial="init" animate="animate">
          <SearchResult>영화 TV 프로그램을 검색해보세요.</SearchResult>
          <Search onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("keyword", { required: true })}
              placeholder="영화 TV 드라마를 검색할 수 있습니다."
            />
          </Search>
        </Content>
      </Container>
    </AnimatePresence>
  );
}

export default GoSearch;
