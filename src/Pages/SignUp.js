import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo/White-removebg-preview.png";
import googleImg from "../assets/images/flat-color-icons_google.svg";
import { useUser } from "../contexts/UserContext";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

//container
const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SharedSideStyles = css`
  height: 100%;
  overflow: auto;
  padding: 2rem;
  box-sizing: border-box;
`;

//Left
const StyledLeft = styled.div`
  ${SharedSideStyles}
  flex: 0.6;
  background-color: #f26600;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px),
    linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
  background-size: 130px 130px;
  background-position: 0 0, 0 0;
`;
const StyledInnerLeft = styled.div`
  border-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
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

//Middle
const StyledMiddle = styled.div`
  flex: 0.5;
  margin-top: 2rem;
  margin-left: 8rem;
  font-weight: 700;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const StyledLogo = styled(NavLink)`
  color: #f26600;
  font-size: 2rem;
  text-decoration: none;
`;
const StyledImg = styled.img`
  height: 2rem;
`;

const StyledHeader = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 2.5rem;
`;

const StyledSubHead = styled.p`
  letter-spacing: -0.05rem;
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0;
`;

//Form
const StyledForm = styled.form`
  display: block;
  margin-top: 1rem; /* Adjust the margin as needed */
  &:focus {
    margin-top: 18px;
    padding-left: 2px;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.65rem;
  letter-spacing: -0.01rem;
  position: relative;
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
    margin-top: 0;
    margin-left: 5px;
    border: 2px solid #ff4500;
  }
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  transform: translateY(-50%);
`;
const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: block;
  border-radius: 0.3rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  &:focus {
    margin-top: 0;
    margin-left: 5px;
    border: 1px solid #ff4500;
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
  margin: 1rem 0 0 0;
  &:hover {
    background: #f26600;
  }
`;

const StyledLineCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;
const StyledLine = styled.div`
  width: 5rem;
  height: 2px;
  background: #000000;
  opacity: 0.2;
`;

const StyledLineTxt = styled.p`
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 0 1rem;
  letter-spacing: -0.01rem;
`;

const StyledGoogleBtn = styled.button`
  padding: 0.5rem 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.2rem;
  margin: 1rem 0 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: gray;
  }
`;

const StyleTermsTxt = styled.p`
  color: #000000;
  font-weight: 100;
  letter-spacing: -0.005rem;
`;

const ErrorMessage = styled.div`
  color: red;
`;

//Right
const StyledRight = styled.div`
  flex: 0.8;
  ${SharedSideStyles}
`;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: Yup.string(),
});
const Signup = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [errors, setErrors] = useState({});
  const [userAlert, setUserAlert] = useState("");
  const inputRef = useRef();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { storeUserData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const login = useGoogleLogin({
    // onSuccess: async (codeResponse) => {
    //   try {
    //     const response = await axios.post("/api/google/signup", {
    //       access_token: codeResponse.access_token,
    //     });
    //     const signedUpUser = response.data;
    //     setUser(signedUpUser);
    //   } catch (error) {
    //     console.error("Signup failed:", error);
    //   }
    // },
    // onError: (error) => console.log("Signup Failed:", error),
  });
  console.log("working");
  console.log("otp1");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        console.log("Formik Errors:", formik.errors);
        console.log("otp5");
        console.log("Submitting form data:", values);
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            email: values.email,
          }
        );
        console.log("otp2");
        console.log("Response:", response);

        if (response.status === 200) {
          console.log("otp3");

          storeUserData({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role,
          });

          console.log("Response:", response);
          console.log("otp4");
          toast.success("Registration successful!");
          navigate("/otp");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        console.log("Server Response:", error.response);
        toast.error("Registration failed. Please try again.");
      }
    },
    touched: {},
  });
  const { handleSubmit, handleChange, handleBlur, values, touched } = formik;

  // const handleChange = useCallback(
  //   (e) => {
  //     handleChange(e);
  //   },
  //   [formik]
  // );

  // const handleBlur = useCallback(
  //   (e) => {
  //     handleBlur(e);
  //   },
  //   [formik]
  // );

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
          <StyledLogo to="/">
            <ToastContainer />
            <StyledImg src={logo} alt="logo" />
            Sett<span style={{ color: "#4db6ac" }}>L</span>
          </StyledLogo>
          <div>
            <StyledHeader>
              Welcome<span style={{ fontSize: "1.5rem" }}> &#128075;</span>
            </StyledHeader>
            <StyledSubHead>
              Enter information to create an account
            </StyledSubHead>
            <StyledForm onSubmit={handleSubmit} ref={inputRef}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StyledLabel>
                  Fistname
                  <StyledInput
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    placeholder="Enter Firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "8rem" }}
                  />
                </StyledLabel>

                <StyledLabel>
                  Last Name
                  <StyledInput
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    placeholder="Enter Lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "8rem" }}
                  />
                </StyledLabel>
              </div>

              <StyledLabel>
                Email
                <StyledInput
                  type="text"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  placeholder="Enter your e-mail"
                  onChange={handleChange}
                />
              </StyledLabel>

              <StyledLabel>
                Password
                <StyledInput
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={passwordVisibility ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                />{" "}
                <span onClick={togglePasswordVisibility}>
                  {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                </span>
              </StyledLabel>
              <StyledLabel>
                Confirm Password
                <StyledInput
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <EyeIcon
                  type="button"
                  onClick={togglePasswordVisibility}
                ></EyeIcon>
                <span> {passwordVisibility ? <FaEye /> : <FaEyeSlash />}</span>
              </StyledLabel>
              <StyledLabel>
                Role
                <StyledSelect
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value="select" disabled>
                    Select...
                  </option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </StyledSelect>
              </StyledLabel>
              {touched.password && formErrors.password && (
                <ErrorMessage>{formErrors.password}</ErrorMessage>
              )}

              <StyledBtn type="submit">Sign Up</StyledBtn>
            </StyledForm>
          </div>
          <StyledLineCont>
            <StyledLine></StyledLine>
            <StyledLineTxt>or</StyledLineTxt>
            <StyledLine></StyledLine>
          </StyledLineCont>
          <StyledGoogleBtn type="button" onClick={login}>
            <img
              src={googleImg}
              alt="googleImg"
              style={{ paddingRight: "0.5rem" }}
            />
            Sign in with Google
          </StyledGoogleBtn>
          <div>
            <StyledLineTxt style={{ marginLeft: "0" }}>
              Already have an account? <NavLink to="/login"> Sign In</NavLink>
            </StyledLineTxt>
            <StyleTermsTxt style={{ marginLeft: "0", fontSize: "0.55rem" }}>
              By creating an account you agree with our span{" "}
              <Link to="/terms-and-conditions">Terms of Service</Link>,
              <Link to="/privacy-policy">Privacy Policy </Link>, and our default
              Notification Settings.
            </StyleTermsTxt>

            <div>
              {/* {profile ? (
              <div>
                <img src={profile.picture} alt="user image" />
                <h3>User Signed Up</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br />
                <button onClick={logOut}>Log out</button>
              </div>
            ) : (
              <button onClick={() => login()}>Sign up with Google  </button>
            )} */}
            </div>
          </div>
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledContainer>
    </>
  );
};

export default React.memo(Signup);
