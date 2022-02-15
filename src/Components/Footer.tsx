import styled from "styled-components";

const Wrapper = styled.footer`
    height: 200px;
    position: relative;
    display:flex;
    justify-content : center;
`;


const Foot = styled.div`
  max-width: 70%;
  margin: 1rem auto;
  overflow: auto;
  p {
    margin-bottom: 1.5rem;
  }
  li {
    line-height: 1.9;
  }
`;

const FooterBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  width: 50vw;
`;




function Footer () {
    return (
    <Wrapper>
         <Foot className="footer">
        <p>고객 센터 1-866-579-7172</p>
        <FooterBox className="footer-cols">
          <ul>
            <li>
              <span>자주 묻는 질문</span>
            </li>
            <li>
              <span>쿠키 설정</span>
            </li>
            
          </ul>
          <ul>
            <li>
              <span>고객 센터</span>
            </li>
            <li>
              <span>회사 정보</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>이용 약관</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>개인정보</span>
            </li>
          </ul>
        </FooterBox>
      </Foot>
    </Wrapper>
    )
}

export default Footer;