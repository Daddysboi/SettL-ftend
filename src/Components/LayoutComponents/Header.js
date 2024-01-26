import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/White-removebg-preview.png";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Switch from "react-switch";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const StyledLogo = styled(NavLink)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
`;

const StyledImg = styled.img`
  height: 2rem;
`;

const StyledSignUpBtn = styled.button`
  margin-left: 1rem;
`;
const StyledSigninBtn = styled.button``;

const Header = () => {
  return (
    <StyledContainer>
      <StyledLogo to="/">
        <StyledImg src={logo} alt="logo" />
        SettL
      </StyledLogo>
      <div>
        <NavLink to="/login">
          <StyledSigninBtn>Log in</StyledSigninBtn>
        </NavLink>
        <NavLink to="/signup">
          <StyledSignUpBtn>Sign Up</StyledSignUpBtn>
        </NavLink>
      </div>
    </StyledContainer>
  );
};

export default Header;
