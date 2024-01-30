import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
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
  position: relative;
`;
const StyledCardBtm = styled.div`
  display: flex;
  gap: 4rem;
`;
const StyledCard = styled.div`
  background-color: #ffffff;
  width: 28rem;
  height: 12rem;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: -1px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;
const StyledNums = styled.h4`
  color: #f26600;
  font-family: Poppins;
  font-size: 96px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledTxt = styled.p`
  padding: 0 2rem;
  text-align: justify;
  width: 15rem;
`;

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

const HowToGetStarted = () => {
  return (
    <StyledContainer id="services">
      <StyledHeader>
        How to get started? <br />
        <span style={{ color: "#f26600" }}>Its Easy!</span>
      </StyledHeader>
      <StyledCardContainer>
        <StyledCardTop>
          <StyledCard>
            <StyledNums>1</StyledNums>

            <StyledTxt>
              <span style={{ position: "absolute", top: "1rem" }}>
                <NavLink to="/login">
                  <StyledSigninBtn>Log in</StyledSigninBtn>
                </NavLink>
                <NavLink to="/signup">
                  <StyledSignUpBtn>Sign Up</StyledSignUpBtn>
                </NavLink>
              </span>
              Click that button! Sign up or log in to your existing account
            </StyledTxt>
          </StyledCard>

          <StyledCard>
            <StyledNums>2</StyledNums>

            <StyledTxt>
              Create Transaction and set the conditions to be fulfilled for that
              transaction
            </StyledTxt>
          </StyledCard>
        </StyledCardTop>
        <StyledCardBtm>
          <StyledCard>
            <StyledNums>3</StyledNums>

            <StyledTxt>
              Invite counterparty, counterparty agrees to set conditions
            </StyledTxt>
          </StyledCard>
          <StyledCard>
            <StyledNums>4</StyledNums>

            <StyledTxt>
              Make payment/fullfill the conditions and complete your transaction
            </StyledTxt>
          </StyledCard>
        </StyledCardBtm>
      </StyledCardContainer>
    </StyledContainer>
  );
};

export default HowToGetStarted;
