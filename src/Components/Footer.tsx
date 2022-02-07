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
const Icon = styled.div`
    backgorund-color: yellow;
    ul {
        display: flex;
        li {
            margin-right: 30px;
        }
    }
`;


function Footer () {
    return (
    <Wrapper>
        <FooterBox>
            <Copyright>
                Copyright © 2022 All Rights Reserved by Clone-Netflix
            </Copyright>
            <Icon>
                <ul>
                    <li>
                        <i>1</i>
                    </li>
                    <li>
                        <i>2</i>
                    </li>
                    <li>
                        <i>3</i>
                    </li>
                    <li>
                        <i>4</i>
                    </li>
                </ul>
            </Icon>
        </FooterBox>
    </Wrapper>
    )
}

export default Footer;