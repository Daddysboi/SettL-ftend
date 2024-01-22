import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SignupButton = styled.button`
  color: red;
`;
const Header = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>

      <NavLink to="terms-and-conditions">Terms and Conditions</NavLink>
      <NavLink to="privacy-policy">Privacy Policy</NavLink>

      <NavLink to="signup">
        <SignupButton>Sign Up</SignupButton>
      </NavLink>
      <NavLink to="login">
        <SignupButton>Sign In</SignupButton>
      </NavLink>
    </div>
  );
};

export default Header;
