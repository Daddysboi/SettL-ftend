import React from "react";
import styled from "styled-components";
import WithImg from "../../assets/images/with.png";
import ServiceImg from "../../assets/images/service.png";
import OurImg from "../../assets/images/our.png";
import WeImg from "../../assets/images/we're.png";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: #4db6ac;
  margin-top: 3rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    padding: 0 2rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 0 5rem 5rem 5rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;
const StyledHeader = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 1.5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 2rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;
const StyledCardContainer = styled.div`
  padding-bottom: 5rem;
`;

const StyledCardTop = styled.div`
  gap: 4rem;
  display: flex;
  padding-bottom: 4rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    gap: 2rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;
const StyledCardBtm = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    gap: 2rem;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;
const StyledCard = styled.div`
  background-color: #ffffff;
  width: 28rem;
  height: 18rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 0.7rem;
    height: 12rem;
    width: 40%;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 40%;
    height: 12rem;
    font-size: 0.8rem;
    padding: 1rem 0;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    width: 20rem;
    height: 17rem;
  }
`;
const StyledImg = styled.img`
  width: 90px;
  height: 88.393px;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
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

const StyledTxt = styled.p`
  padding: 0 2rem;
  text-align: justify;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    padding: 0 1rem;
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
const WhyChooseUs = () => {
  return (
    <StyledContainer id="why-choose-us">
      <StyledHeader>Why Choose US</StyledHeader>
      <StyledCardContainer>
        <StyledCardTop>
          <StyledCard>
            <StyledImg src={WithImg} alt="" />

            <StyledTxt>
              With SettL you’re assured of speedy transactions and no delays
              that may result in dailed transactions
            </StyledTxt>
          </StyledCard>

          <StyledCard>
            <StyledImg src={ServiceImg} alt="" />

            <StyledTxt>
              Our customers are our priority so your data and funds are secure.
              You can count on us
            </StyledTxt>
          </StyledCard>
        </StyledCardTop>
        <StyledCardBtm>
          <StyledCard>
            <StyledImg src={OurImg} alt="" />

            <StyledTxt>
              Our self service channel is unparalled but we’re still here to
              help. Our contact channels are open 24/7.
            </StyledTxt>
          </StyledCard>
          <StyledCard>
            <StyledImg src={WeImg} alt="" />

            <StyledTxt>
              We’re approved by CBN and insured by the National Deposit
              Insurance Commission. You can trust SettL!
            </StyledTxt>
          </StyledCard>
        </StyledCardBtm>
      </StyledCardContainer>
    </StyledContainer>
  );
};

export default WhyChooseUs;
