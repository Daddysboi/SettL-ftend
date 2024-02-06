import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import zxcvbn from "zxcvbn";
import styled from "styled-components";

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

const StyledHeader = styled.h1`
  padding: 1rem 0 0 0;
  margin-bottom: 2rem;
  font-size: 2.5rem; // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 2rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    font-size: 2rem;
  }
`;

// //Form
const StyledFormik = styled(Formik)`
  display: block;
  margin-top: 20px;
  &:focus {
    margin-top: 18px;
    padding-left: 2px;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.8rem;
  letter-spacing: -0.01rem;
  font-weight: 400;
`;

const StyledField = styled.input`
  // Input Field
  width: 95%;
  outline: none;
  border: none;
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

const EyeIcon = styled.span`
  cursor: pointer;
  color: gray;
`;
const PasswordContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 3px;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
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

const ResetPassword = ({ match }) => {
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { params } = match || {};
  const { token } = params || {};

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `https://settl-core-dev.onrender.com/api/v1/password-reset`,
          {
            userId: userId,
            resetString: "",
            newPassword: password,
          }
        );

        if (response.status === 200) {
          setUserId(response.data.userId);
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, [token]);

  const handleResetPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setResetStatus("error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://settl-core-dev.onrender.com/api/v1/password-reset",
        {
          userId: userId,
          resetString: token,
          newPassword: values.newPassword,
        }
      );

      if (response.status === 200) {
        setResetStatus("success");
      } else {
        setResetStatus("error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <StyledContainer>
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
                We won't have everyone but we guuarantee our clients will have
                the best e-commerce experience
              </StyledInnerText2>
            </StyledInnerText>
          </StyledInnerLeft>
        </StyledLeft>
        <StyledMiddle>
          <StyledHeader>Reset Password</StyledHeader>
          <StyledFormik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              const result = zxcvbn(values.newPassword);
              if (result.score < 3) {
                toast.error("Password is too weak");
              }
              return errors;
            }}
            onSubmit={(values) => {
              handleResetPassword(values);
            }}
          >
            <Form>
              <div>
                <StyledLabel htmlFor="">Enter new password</StyledLabel>
                <PasswordContainer>
                  <StyledField
                    type={passwordVisible ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                  />
                  <EyeIcon onClick={togglePasswordVisibility}>
                    {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                  </EyeIcon>
                </PasswordContainer>
              </div>
              <ErrorMessage name="newPassword" component="div" />

              <div>
                <StyledLabel htmlFor="">Confirm new password</StyledLabel>
                <StyledPasswordField
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
              </div>

              <StyledBtn type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </StyledBtn>
            </Form>
          </StyledFormik>
          {resetStatus === "success" && <p>Password updated successfully!</p>}
          {resetStatus === "error" && (
            <p>Failed to update password. Please try again.</p>
          )}
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledContainer>
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
    </>
  );
};

export default ResetPassword;
