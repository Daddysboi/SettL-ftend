import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.05);
  flex: 1;
  @media (min-width: 710px) {
    justify-content: flex-start;
    flex-direction: row;
    padding: 0 4rem 4rem;
  }

  @media (min-width: 920px) {
    gap: 3rem;
    padding: 0 7rem 7rem;
  }
`;
const StyledHeader = styled.h1`
  font-size: 2rem;
  @media (min-width: 740px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1200px) {
    font-size: 3rem;
    max-width: 700px;
  }
`;

const StyledTxt = styled.p`
  font-size: 14px;
  font-weight: 600;
  @media (min-width: 740px) {
    font-size: 0.8rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.6rem;
  }
`;

const StyledLeft = styled.div`
  flex: 1;
  @media (min-width: 740px) {
    flex: 0.2;
  }
`;

const StyledRight = styled.div`
  flex: 1;
  @media (min-width: 740px) {
    flex: 0.8;
  }
`;
const About = () => {
  return (
    <StyledContainer id="about">
      <StyledLeft data-aos="fade-right">
        <StyledHeader>
          What is <br />
          <span style={{ color: "#f26600" }}>
            Sett
            <span style={{ color: "#4db6ac" }}>L</span>
          </span>
          ?
        </StyledHeader>
      </StyledLeft>
      <StyledRight data-aos="fade-left">
        <StyledTxt>
          SettL is a payment platform and an escrow agent, which is a neutral
          third party responsible for holding and regulating the funds involved
          in a transaction between a buyer and a seller. It’s role is to ensure
          that both parties fulfill their obligations before releasing the
          funds.
        </StyledTxt>
      </StyledRight>
    </StyledContainer>
  );
};

export default About;
