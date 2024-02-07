import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import favicon from "../../assets/logo/favicon.png";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  position: relative;
`;

const StyledMenuContainer = styled.div`
  position: fixed;
  z-index: 5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  @media (min-width: 840px) {
    display: none;
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
  display: none;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 840px) {
    display: flex;
  }
`;

const MenuStyledLinks = styled.div`
  // flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 840px) {
    display: none;
  }
`;

const MenuStyledLink = styled(Link)`
  cursor: pointer;
  align-items: center;
  padding-top: 1rem;
  font-size: 24px;
  &:hover {
    color: #f26600;
  }

  &.active {
    color: #f26600;
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
`;

const HamburgerIcon = styled(FaBars)`
  font-size: 1.5rem;
  color: #333;
  transition: 0.3s;
  display: flex;
  cursor: pointer;
  @media (min-width: 840px) {
    display: none;
  }
`;

const CloseIcon = styled(FaTimes)`
  font-size: 2.5rem;
  color: #333;
  transition: 0.3s;
  padding: 20px;
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

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
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

const MobileAuthIcons = styled.div`
  margin-top: 2rem;
`;

const AuthIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 840px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <StyledContainer>
      {isMobileMenuOpen && (
        <StyledMenuContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              minHeight: "2rem",
              // padding: "20px",
            }}
          >
            <CloseIcon onClick={toggleMobileMenu} />
          </div>
          <MenuStyledLinks>
            <MenuStyledLink
              to="home"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              onClick={toggleMobileMenu}
            >
              Home
            </MenuStyledLink>
            <MenuStyledLink
              activeClass="active"
              to="services"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              onClick={toggleMobileMenu}
            >
              Services
            </MenuStyledLink>
            <MenuStyledLink
              activeClass="active"
              to="faq"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              onClick={toggleMobileMenu}
            >
              FAQ
            </MenuStyledLink>
            <MenuStyledLink
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={-500}
              duration={500}
              onClick={toggleMobileMenu}
            >
              Support
            </MenuStyledLink>
            <MobileAuthIcons>
              <NavLink to="/login" onClick={toggleMobileMenu}>
                <StyledSigninBtn>Log in</StyledSigninBtn>
              </NavLink>
              <NavLink to="/signup" onClick={toggleMobileMenu}>
                <StyledSignUpBtn>Sign Up</StyledSignUpBtn>
              </NavLink>
            </MobileAuthIcons>
          </MenuStyledLinks>
        </StyledMenuContainer>
      )}
      <StyledLogo to="/">
        <StyledImg src={favicon} alt="logo" />
        <span>
          Sett
          <span style={{ color: "#4db6ac" }}>L</span>
        </span>
      </StyledLogo>
      <HamburgerIcon onClick={toggleMobileMenu} />
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
