import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo/favicon.png";

//container
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  height: 100vh;
  // @media only screen and (min-width: 320px) and (max-width: 480px) {
  //   display: block;
  // }

  // // iPads, Tablets
  // @media only screen and (min-width: 481px) and (max-width: 768px) {
  // }

  // //   // Small screens, laptops
  // @media only screen and (min-width: 769px) and (max-width: 1024px) {
  // }

  // // Desktops, large screens
  // @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  // }

  // //   // Extra large screens, TV
  // @media only screen and (min-width: 1201px) {
  // }
`;

const StyledLeft = styled.div`
  flex: 0.3;
  box-sizing: border-box;
  bottom: 0;
  background-color: #f26600;
  height: 100%;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px),
    linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
  background-size: 130px 130px;
  background-position: 0 0, 0 0;
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

const StyledInnerLeft = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8701c;
  padding: 5rem 1.5rem 2rem 1.5rem;
  width: 15rem;
  margin: 10rem 3rem;
`;

const StyledInnerText = styled.h6`
  font-size: 1.7rem;
  letter-spacing: 0.01rem;
  line-height: 2.5rem;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  font-weight: 400;
`;

const StyledInnerText2 = styled.p`
  word-wrap: break-word;
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.3;
  font-weight: 100;
  margin: 0;
  padding: 0;
  padding: 2rem 1rem 0 0;
`;

//Right
const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0.7;
  padding-top: 3rem;
  padding-left: 8rem;
  font-weight: 700;
  overflow: auto;
  padding-bottom: 2rem;

  @media (max-width: 840px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;

const StyledWrapper = styled.div`
  max-width: 350px;

  @media only screen and (max-width: 640px) {
    max-width: 100%;
  }
`;
const StyledLogo = styled(NavLink)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
`;
const StyledImg = styled.img`
  height: 2rem;
  padding-right: 0.2rem;
`;

const StyledHeader = styled.h1`
  padding: 1rem 0 0 0;
  margin: 0;
  font-size: 2.5rem;

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 2rem;
  }
`;

const StyledSubHead = styled.p`
  letter-spacing: -0.05rem;
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0;
  margin-bottom: 3rem;
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    margin-bottom: 2rem;
  }
`;

const AuthBackground = ({
  children,
  headText = "Hey, hello",
  subText = "Enter the information you entered while registering",
  fontSize
}) => {
  return (
    <StyledContainer>
      <StyledLeft>
        <StyledInnerLeft>
          <StyledInnerText>
            Where trust meets seamless <br />
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #EAF7FF, #5BC2FF, #8E6CF9)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Transactions
            </span>
          </StyledInnerText>
          <StyledInnerText2>
            We won't have everyone but we guuarantee our clients will have the
            best e-commerce experience
          </StyledInnerText2>
        </StyledInnerLeft>
      </StyledLeft>
      <StyledRight>
        <StyledWrapper>
          <StyledLogo to="/">
            <StyledImg src={logo} alt="logo" />
            Sett<span style={{ color: "#4db6ac" }}>L</span>
          </StyledLogo>
          <div>
            <StyledHeader>
              {headText}
              <span style={{ fontSize: "1.5rem" }}> &#128075;</span>
            </StyledHeader>
            <StyledSubHead>{subText}</StyledSubHead>
          </div>
          {children}
        </StyledWrapper>
      </StyledRight>
    </StyledContainer>
  );
};

export default AuthBackground;
