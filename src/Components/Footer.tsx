import styled from "styled-components";

const Wrapper = styled.footer`
    height: 200px;
    position: relative;
    display:flex;
    justify-content : center;
`;

const FooterBox = styled.div`
    width: 60%;
    margin-top: 80px;
    height: 80px;
    border-top: 1px solid white;
    padding:15px;
    display : flex;
    justify-content : Space-between;
`;

const Copyright = styled.span`
    line-height: 3;
`;


function Footer () {
    return (
    <Wrapper>
        <FooterBox>
            <Copyright>
                Copyright © 2022 All Rights Reserved by Clone-Netflix
            </Copyright>
        </FooterBox>
    </Wrapper>
    )
}

export default Footer;