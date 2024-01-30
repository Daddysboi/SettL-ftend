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
`;
const StyledHeader = styled.h1`
  margin-top: 2rem;
  font-size: 3rem;
`;
const StyledCardContainer = styled.div``;

const StyledCardTop = styled.div`
  gap: 4rem;
  display: flex;
  padding-bottom: 4rem;
`;
const StyledCardBtm = styled.div`
  display: flex;
  gap: 4rem;
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
`;
const StyledImg = styled.img`
  width: 90px;
  height: 88.393px;
`;

const StyledTxt = styled.p`
  padding: 0 2rem;
  text-align: justify;
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
