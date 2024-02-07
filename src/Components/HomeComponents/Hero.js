import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";
import ChatImg from "../../assets/images/message.png";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;

  @media (min-width: 710px) {
    justify-content: space-between;
    flex-direction: row;
    padding: 4rem;
  }

  @media (min-width: 920px) {
    padding: 7rem;
  }
`;
const StyledHeader = styled.h1`
  font-size: 12px;
  @media (min-width: 80px) {
    font-size: 2rem;
  }
  @media (min-width: 1200px) {
    font-size: 3.5rem;
    max-width: 700px;
  }
`;
const StyledLeft = styled.div`
  width: 100%;
`;

const StyledTxt = styled.h4`
  font-size: 10px;
  font-style: italic;
  font-weight: 600;
  @media (min-width: 800px) {
    font-size: 0.8rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
`;

const StyledBtn = styled.button`
  background-color: #f26600;
  color: #fff;
  border: none;
  padding: 0.6rem;
  font-size: 16px;
  font-weight: 700;
  border-radius: 0.6rem;
  &:hover {
    color: #f26600;
    background-color: #fff;
    border: 1px solid #f26600;
  }

  @media (min-width: 800px) {
    padding: 0.8rem;
    font-size: 20px;
    font-weight: 700;
    border-radius: 1rem;
  }
  @media (min-width: 1200px) {
    padding: 2rem;
    font-size: 28px;
    font-weight: 700;
    border-radius: 1.3rem;
  }
`;

const StyledImg = styled.img`
  max-width: 80%;
  object-fit: contain;
  @media (min-width: 480px) {
    justify-content: space-between;
    flex-direction: row;
    max-width: 420px;
  }

  @media (min-width: 900px) {
    max-width: 520px;
  }

  @media (min-width: 1200px) {
    max-width: 95%;
  }
`;

const StyledChatImg = styled.img`
  position: absolute;
  max-width: 3rem;
  object-fit: contain;
  bottom: 0rem;
  right: 1rem;
  max-width: 2rem;
  @media (min-width: 480px) {
    max-width: 4rem;
    bottom: 6rem;
    right: -1rem;
  }

  @media (min-width: 900px) {
    bottom: 5rem;
    right: -2rem;
  }

  @media (min-width: 1200px) {
    bottom: 10rem;
    right: 1rem;
  }
`;
const Hero = () => {
  return (
    <StyledContainer id="home">
      <StyledLeft data-aos="zoom-out">
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        data-aos="fade-left"
      >
        <StyledImg src={HeroImg} alt="" />
        <StyledChatImg src={ChatImg} alt="" />
      </div>
    </StyledContainer>
  );
};

export default Hero;
