import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import instagram from "../../assets/Icon/InstagramFilled.png";
import facebook from "../../assets/Icon/FacebookFilled.png";
import twitter from "../../assets/Icon/TwitterCircleFilled.png";
import Linkedin from "../../assets/Icon/LinkedinFilled.png";

const StyledContainer = styled.div``;
const StyledContainerTop = styled.div`
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50vh;
  flex-shrink: 0;
`;

const StyledHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ffff;
`;

const StyledInput = styled.input`
  border: 2px solid #fff;
  border-radius: 1rem;
  background-color: transparent;
  margin-right: 2rem;
  outline: none;
  width: 50rem;
  height: 4rem;
  font-size: 1.5rem;
  color: #ffffff;
  padding-left: 1rem;
  &::placeholder {
    color: #ffffff;
  }
`;

const StyledBtn = styled.button`
  width: 12rem;
  height: 2.8rem;
  border-radius: 1rem;
  background: #d9d9d9;
  border: none;
  &:hover {
    color: #ffff;
    background-color: transparent;
    border: 2px solid #d9d9d9;
  }
`;

const StyledContainerMid = styled.div`
  display: flex;
  padding: 3rem;
`;
const StyledMidLeft = styled.div`
  flex: 2;
`;

const StyledHeaderMid = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  padding: 0;
  margin: 0;
`;

const StyledTxtMid = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;
const StyledMidRight = styled.div`
  flex: 1;
`;

const StyledImg = styled.img`
  height: 3rem;
`;
const StyledContainerBtm = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0 1rem;
  color: inherit;
  &:hover {
    color: #f26600;
  }
`;
const Footer = () => {
  return (
    <StyledContainer>
      <StyledContainerTop>
        <div>
          <StyledHeader>
            Join our mailing list to get exclusive updates
          </StyledHeader>
        </div>
        <div>
          <StyledInput
            type="text"
            placeholder="Enter your email here (e.g tkz@settl.com)"
          />
          <StyledBtn>Subscribe</StyledBtn>
        </div>
      </StyledContainerTop>
      <StyledContainerMid>
        <StyledMidLeft>
          <StyledHeaderMid>CONTACT US</StyledHeaderMid>
          <StyledTxtMid>Address: 42, Wuse 2, Abuja, FCT, Nigeria</StyledTxtMid>
          <StyledTxtMid>
            Support: +2349080424841, +2348123904856 | support@settl.com
          </StyledTxtMid>
        </StyledMidLeft>
        <StyledMidRight>
          <StyledHeaderMid style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Connect with us on <br />
            Social Media
          </StyledHeaderMid>
          <div style={{ textAlign: "center" }}>
            <StyledImg src={instagram} alt="" />
            <StyledImg src={twitter} alt="" />
            <StyledImg src={facebook} alt="" />
            <StyledImg src={Linkedin} alt="" />
          </div>
        </StyledMidRight>
      </StyledContainerMid>
      <StyledContainerBtm>
        <p style={{ display: "inline", paddingRight: "1rem" }}>
          2024. ALL RIGHTS RESERVED
        </p>
        |<StyledLink to="/privacy-policy">PRIVACY POLICY </StyledLink>|
        <StyledLink to="/terms-and-conditions">TERMS AND CONDITIONS</StyledLink>
      </StyledContainerBtm>
    </StyledContainer>
  );
};

export default Footer;
