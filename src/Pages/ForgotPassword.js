import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailValidator from "email-validator";
import styled from "styled-components";
import { toast, ToastContainer, Slide } from "react-toastify";
import logo from "../assets/logo/favicon.png";

// container;
const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: block;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }
`;

const StyledLeft = styled.div`
  flex: 0.6;
  background-color: #f26600;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px),
    linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
  background-size: 130px 130px;
  background-position: 0 0, 0 0;
  height: 100%;
  overflow: auto;
  padding: 2rem;
  box-sizing: border-box;
`;

const StyledInnerLeft = styled.div`
  border-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: none;
    flex: 0;
  }
`;

const StyledInnerText = styled.div`
  background-color: #f8701c;
  height: 20rem;
  width: 15rem;
  padding: 3rem 0 0 1.5rem;
  font-size: 1.7rem;
  letter-spacing: 0.01rem;
  line-height: 2.5rem;
`;

const StyledInnerText2 = styled.div`
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.3;
  font-weight: 100;
  padding: 2rem 1rem 0 0;
`;

// Middle;
const StyledMiddle = styled.div`
  flex: 0.5;
  margin-top: 3rem;
  margin-left: 8rem;
  font-weight: 700;

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin: 2rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin: 2rem;
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    margin: 3rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }
`;

const StyledLogo = styled(Link)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
`;

const StyledImg = styled.img`
  height: 2rem;
`;
const StyledHeader = styled.h1`
  padding: 1rem 0 0 0;
  /* font-size: 3rem; */
  margin: 0;

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 2rem;
  }
`;

const StyledSubHead = styled.p`
  letter-spacing: -0.05rem;
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0;
  margin-bottom: 3rem;
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    margin-bottom: 2rem;
  }
`;

// //Form
const StyledLabel = styled.label`
  font-size: 0.65rem;
  letter-spacing: -0.01rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);

  &:focus {
    border: 2px solid #ff4500;
  }
`;
const StyledPasswordField = styled.input`
  // Input Field
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  &:focus {
    margin-top: 0;
    outline: none;
    border: 2px solid #ff4500;
  }
`;

const StyledBtn = styled.button`
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.2rem;
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  color: #ffff;
  margin: 1rem 0 1rem 0;
  &:hover {
    background: #f26600;
  }
`;

//Right
const StyledRight = styled.div`
  flex: 0.8;
`;

const showToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim() || !emailValidator.validate(email)) {
      setEmailError("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://settl-core-dev.onrender.com/api/v1/request-password-reset",
        {
          email: email,
          redirectUrl: `http://localhost:3000/reset-password/${token}`,
        }
      );

      if (response.status === 200) {
        setResetStatus("success");
      } else {
        setResetStatus("error");
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      setResetStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <StyledContainer>
      {" "}
      <StyledLeft>
        <StyledInnerLeft>
          <StyledInnerText>
            Where
            <br />
            trust meets
            <br />
            seamless <br />
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #EAF7FF, #5BC2FF, #8E6CF9)",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Transactions
            </span>
            <StyledInnerText2>
              We won't have everyone but we guuarantee our clients will have the
              best e-commerce experience
            </StyledInnerText2>
          </StyledInnerText>
        </StyledInnerLeft>
      </StyledLeft>
      <StyledMiddle>
        {" "}
        <StyledLogo to="/">
          <StyledImg src={logo} alt="logo" />
          Sett<span style={{ color: "#4db6ac" }}>L</span>
        </StyledLogo>
        <StyledHeader>Forgot Password</StyledHeader>
        <StyledSubHead>Enter your email to reset your password.</StyledSubHead>
        <StyledLabel htmlFor="">Email</StyledLabel>
        <StyledInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <StyledBtn onClick={handleResetPassword} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </StyledBtn>
        {resetStatus === "success" && (
          <p>Password reset email sent successfully!</p>
        )}
        {resetStatus === "error" && (
          <p>Failed to send password reset email. Please try again.</p>
        )}{" "}
      </StyledMiddle>
      <StyledRight></StyledRight>{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </StyledContainer>
  );
};

export default ForgotPassword;
