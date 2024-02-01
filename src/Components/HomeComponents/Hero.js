import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";
import ChatImg from "../../assets/images/message.png";

const StyledContainer = styled.div`
  display: flex;
  padding: 0 2rem;
`;
const StyledHeader = styled.h1`
  font-size: 3rem;
  margin-bottom: 0;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2.5rem;
    margin-top: 5rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;
const StyledLeft = styled.div``;

const StyledTxt = styled.h4`
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;

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
`;

const StyledImg = styled.img`
  height: 38rem;
  position: relative;
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    height: 30rem;
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
      <div>
        <StyledImg src={HeroImg} alt="" />
        <img
          src={ChatImg}
          alt=""
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "5rem",
            height: "4rem",
          }}
        />
      </div>
    </StyledContainer>
  );
};

export default Hero;
