import React from "react";
import styled from "styled-components";
import WithImg from "../../assets/images/with.png";
import ServiceImg from "../../assets/images/service.png";
import OurImg from "../../assets/images/our.png";
import WeImg from "../../assets/images/we're.png";

const StyledContainer = styled.div`
  flex: 1;
  @media (min-width: 710px) {
    justify-content: flex-start;
    flex-direction: row;
    padding: 0 4rem 4rem;
  }

  @media (min-width: 920px) {
    gap: 3rem;
    padding: 0 7rem;
  }
`;

const StyledWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 3.5rem;
  background-color: #4db6ac;
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
  @media (min-width: 490px) {
    font-size: 3rem;
  }
`;
const StyledCardContainer = styled.div`
  padding-bottom: 5rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 4.5rem;
  @media (min-width: 490px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCard = styled.div`
  background-color: #ffffff;
  width: 100%;
  min-height: 18rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  font-size: 1rem;
  @media (min-width: 920px) {
    width: 28rem;
    height: 18rem;
  }
`;
const StyledImg = styled.img`
  max-width: 90px;
  object-fit: contain;
`;

const StyledTxt = styled.p`
  padding: 0 2rem;
  text-align: justify;
`;

const cardDetails = [
  {
    id: 1,
    logo: WithImg,
    article:
      "With SettL you’re assured of speedy transactions and no delays that may result in dailed transactions",
  },
  {
    id: 2,
    logo: ServiceImg,
    article:
      "Our customers are our priority so your data and funds are secure. You can count on us",
  },
  {
    id: 3,
    logo: OurImg,
    article:
      "Our self service channel is unparalleled but we’re still here to help. Our contact channels are open 24/7.",
  },
  {
    id: 4,
    logo: WeImg,
    article:
      "We’re approved by CBN and insured by the National Deposit Insurance Commission. You can trust SettL!",
  },
];
const WhyChooseUs = () => {
  return (
    <StyledContainer id="why-choose-us">
      <StyledWrapper>
        <StyledHeader data-aos="fade-down">Why Choose US</StyledHeader>
        <StyledCardContainer>
          {cardDetails?.map(({ id, logo, article }) => (
            <StyledCard key={id} data-aos="fade-up">
              <StyledImg src={logo} alt="" />

              <StyledTxt>{article}</StyledTxt>
            </StyledCard>
          ))}
        </StyledCardContainer>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default WhyChooseUs;
