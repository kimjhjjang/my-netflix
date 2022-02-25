import styled from "styled-components";

const Wrapper = styled.footer`
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 640px) {
    height: 200px;
  }
`;

const Foot = styled.div`
  max-width: 90%;
  margin: 0 auto;
  @media screen and (min-width: 640px) {
    max-width: 70%;
  }
  p {
    margin-bottom: 1.5rem;
  }
  li {
    line-height: 1.9;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Foot>
          &copy;2022 <strong>my Netflex Clone</strong>, All Rights Reserved
      </Foot>
    </Wrapper>
  );
}

export default Footer;
