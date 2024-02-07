import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
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
  width: 100%;
  margin-top: 3.5rem;
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
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  @media (min-width: 490px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCard = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  gap: 1rem;
  align-items: center;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem;

  @media (min-width: 720px) {
    padding: 2rem;
    max-width: 18rem;
    height: 8rem;
  }
  @media (min-width: 920px) {
    max-width: 24rem;
    height: 10rem;
  }
`;
const StyledNums = styled.h4`
  color: #f26600;
  font-family: Poppins;
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledTxt = styled.p``;

const StyledSignUpBtn = styled.button`
  /* margin-left: 1rem; */
  border: none;
  border: solid 1px #f26600;
  color: #f26600;
  border-left: none;
  border-radius: 0 0.3rem 0.3rem 0;
  padding: 0.5rem 1rem;
  background-color: #ffff;
  &:hover {
    background: #f26600;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border: solid 1px #ffff;
    color: #ffff;
  }
`;
const StyledSigninBtn = styled.button`
  border: none;
  background-color: #f26600;
  color: #ffffff;
  border: solid 1px #f26600;
  border-radius: 0.3rem 0 0 0.3rem;
  padding: 0.5rem 1rem;
  border-right: none;
  &:hover {
    background: #ffff;
    color: #f26600;
    box-shadow: -1px 2px 2px rgba(0, 0, 0, 0.5);
    border: solid 1px #f26600;
  }
`;

const cardDetails = [
  {
    id: 1,
    isButton: true,
    details: "Click that button! Sign up or log in to your existing account",
    animation: "fade-up",
  },
  {
    id: 2,
    isButton: false,
    details:
      "Create Transaction and set the conditions to be fulfilled for that transaction",
    animation: "fade-up",
  },
  {
    id: 3,
    isButton: false,
    details: "Invite counterpart agrees to set conditions",
    animation: "fade-up",
  },
  {
    id: 4,
    isButton: false,
    details:
      "Make payment/fulfill the conditions and complete your transaction",
    animation: "fade-up",
  },
];

const HowToGetStarted = () => {
  return (
    <StyledContainer id="services">
      <StyledWrapper>
        <StyledHeader>
          How to get started? <br />
          <span style={{ color: "#f26600" }}>Its Easy!</span>
        </StyledHeader>
        <StyledCardContainer>
          {cardDetails?.map(({ id, details, isButton, animation }) => (
            <StyledCard key={id} data-aos={animation}>
              <StyledNums>{id}</StyledNums>

              <StyledTxt>
                {isButton && (
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                    }}
                  >
                    <NavLink to="/login">
                      <StyledSigninBtn>Log in</StyledSigninBtn>
                    </NavLink>
                    <NavLink to="/signup">
                      <StyledSignUpBtn>Sign Up</StyledSignUpBtn>
                    </NavLink>
                  </span>
                )}
                {details}
              </StyledTxt>
            </StyledCard>
          ))}
        </StyledCardContainer>
      </StyledWrapper>
    </StyledContainer>
  );
};

export default HowToGetStarted;
