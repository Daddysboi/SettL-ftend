import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";
import ChatImg from "../../assets/images/message.png";

const StyledContainer = styled.div`
  display: flex;
  padding-left: 2rem;
  justify-content: center;
  align-items: center;
`;
const StyledHeader = styled.h1`
  font-size: 3.8rem;
  margin-bottom: 0;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    padding-top: 0;
    margin-top: 2rem;
    font-size: 2.5rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    /* margin-top: 2rem; */
    font-size: 3rem;
  }
`;
const StyledLeft = styled.div`
  width: 40%;
`;

const StyledTxt = styled.h4`
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 1rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const StyledBtn = styled.button`
  background-color: #f26600;
  color: #fff;
  border: none;
  width: 17rem;
  height: 5rem;
  font-size: 32px;
  font-weight: 700;
  border-radius: 1.3rem;
  &:hover {
    color: #f26600;
    background-color: #fff;
    border: 1px solid #f26600;
  }

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 10rem;
    font-size: 1.2rem;
    border-radius: 0.7rem;
    height: 3rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 15rem;
    height: 4rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
    /* height: 30rem; */
  }
`;

const StyledImg = styled.img`
  position: relative;
  width: 100%;
  background-size: cover;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
    height: 90%;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
    /* height: 30rem; */
  }
`;

const StyledChatImg = styled.img`
  position: absolute;
  bottom: -12rem;
  right: 5rem;
  height: 4rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    bottom: 6rem;
    right: 1rem;
    height: 3rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;
const Hero = () => {
  return (
    <StyledContainer id="home">
      <StyledLeft>
        <StyledHeader>
          Buy, Sell, Make payments <br />
          and Pay bills <br />
          with
          <span style={{ color: "#f26600" }}>
            {" "}
            Sett
            <span style={{ color: "#4db6ac" }}>L</span>
          </span>
        </StyledHeader>
        <StyledTxt>You click, We SettL</StyledTxt>
        <Link to="/signup">
          <StyledBtn>
            Get Started <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </StyledBtn>
        </Link>
      </StyledLeft>
      <div
        style={{
          padding: 0,
          margin: 0,
          width: "70%",
        }}
      >
        <StyledImg src={HeroImg} alt="" />
        <StyledChatImg src={ChatImg} alt="" />
      </div>
    </StyledContainer>
  );
};

export default Hero;
