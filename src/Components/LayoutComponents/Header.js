import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import favicon from "../../assets/logo/favicon.png";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;

  @media (max-width: 769px) {
    flex-direction: column;
    padding: 1rem;
    align-items: flex-start;
    position: relative;
  }
`;

const StyledLogo = styled(NavLink)`
  color: #f26600;
  text-decoration: none;
  flex: 1;
  font-size: 2.5rem;
  font-weight: 600;

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    flex-direction: column;
    flex: 0.8;

    align-items: flex-start;
  }
`;

const StyledImg = styled.img`
  height: 2.5rem;
  padding-right: 0.5rem;
`;

const StyledLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    flex: 1.5;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  margin-right: 1rem;
  align-items: center;
  padding-top: 1rem;
  &:hover {
    color: #f26600;
  }

  &.active {
    color: #f26600;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const StyledHamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  /* background-color: #fffbf7; */
  padding: 0.5rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    display: block;
    z-index: 2;
    position: absolute;
    top: 1.5rem;
    right: 1rem;
  }
`;

const HamburgerIcon = styled(FaBars)`
  font-size: 1.5rem;
  color: #333;
  transition: 0.3s;

  @media (max-width: 768px) {
    display: block;
    z-index: 2;
  }
`;

const CloseIcon = styled(FaTimes)`
  font-size: 1.5rem;
  color: #333;
  transition: 0.3s;
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    /* display: ${({ isMobileMenuOpen }) =>
      isMobileMenuOpen ? "flex" : "none"}; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #4db6ac;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
`;

const StyledSignUpBtn = styled.button`
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

  @media (max-width: 768px) {
    display: none;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setMobileMenuOpen(!isMobileMenuOpen);
  // };

  return (
    <StyledContainer>
      <StyledLogo to="/">
        <StyledImg src={favicon} alt="logo" />
        <span>
          Sett
          <span style={{ color: "#4db6ac" }}>L</span>
        </span>
      </StyledLogo>
      <StyledLinks>
        <StyledLink
          to="home"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          Home
        </StyledLink>
        <StyledLink
          activeClass="active"
          to="services"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          Services
        </StyledLink>
        <StyledLink
          activeClass="active"
          to="faq"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          FAQ
        </StyledLink>
        <StyledLink
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-500}
          duration={500}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          Support
        </StyledLink>
        <AuthIcons>
          <NavLink
            to="/login"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <StyledSigninBtn>Log in</StyledSigninBtn>
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <StyledSignUpBtn>Sign Up</StyledSignUpBtn>
          </NavLink>
        </AuthIcons>
      </StyledLinks>
    </StyledContainer>
  );
};

export default Header;
