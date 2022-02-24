import styled from "styled-components";
import "../Common/footer.css"

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
      <footer>
      <div className="wrapper">
        <small>&copy;2022 <strong>my Netflex Clone</strong>, All Rights Reserved</small>
      </div>
    </footer>
    )
}

export default Footer;