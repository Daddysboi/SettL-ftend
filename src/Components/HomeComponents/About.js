import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.05);
  padding: 4rem;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    gap: 1.5rem;
    padding: 2rem;
  }
`;
const StyledHeader = styled.h1`
  margin: 0;
  font-size: 3rem;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 1.5rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 2.7rem;
  }
`;

const StyledTxt = styled.p`
  font-size: 1.6rem;
  text-align: justify;
  /* word-spacing: 0.09rem; */
  font-weight: 600;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 0.7rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 1rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 1.2rem;
  }
`;
const About = () => {
  return (
    <StyledContainer id="about">
      <div style={{ flex: "1.2" }}>
        <StyledHeader>
          What is <br />
          <span style={{ color: "#f26600" }}>
            Sett
            <span style={{ color: "#4db6ac" }}>L</span>
          </span>
          ?
        </StyledHeader>
      </div>
      <div style={{ flex: "4" }}>
        <StyledTxt>
          SettL is a payment platform and an escrow agent, which is a neutral
          third party responsible for holding and regulating the funds involved
          in a transaction between a buyer and a seller. It’s role is to ensure
          that both parties fulfill their obligations before releasing the
          funds.
        </StyledTxt>
      </div>
    </StyledContainer>
  );
};

export default About;
