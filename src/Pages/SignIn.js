import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import styled from "styled-components";
import logo from "../assets/logo/White-removebg-preview.png";
import googleImg from "../assets/images/flat-color-icons_google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//container
const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: block;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }

  //   // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
  }

  //   // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
  }
`;

const StyledLeft = styled.div`
  flex: 0.6;
  background-color: #f26600;
  background-image: linear-gradient(#f8701c 0.6px, transparent 0.6px);
      linear-gradient(90deg, #f8701c 0.6px, transparent 0.6px);
    background-size: 130pSx 130px;
    background-position: 0 0, 0 0;
    top: 0;
    bottom: 0;
    left: 0;
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
    display: none;t
    flex: 0;
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

  // Extra large screens, TV
  @media only screen and (min-width: 1201px) {
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
  padding: 1rem 0 0 0;
  margin: 0;
  font-size: 2.5rem;
`;

const StyledSubHead = styled.p`
  letter-spacing: -0.05rem;
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 0;
  margin-bottom: 3rem;
`;

//Form
const StyledForm = styled.form`
  display: block;
  margin-top: 20px;
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
  margin-bottom: 10px;
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
  top: 37%;
  position: absolute;
  top: 55%;
  cursor: pointer;

  @media screen and (max-width: 1400px) {
    transform: translateX(2000%);
  }

  @media screen and (max-width: 1200px) {
    transform: translateX(2500%);
  }
  cursor: pointer;

  @media screen and (max-width: 1600px) {
    transform: translateX(2400%);
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

const StyledCheckboxCont = styled.div`
  display: flex;
  justify-content: space-between;

  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: -0.05rem;
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
  padding: 0.5rem 1rem;
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

//Right
const StyledRight = styled.div`
  flex: 0.8;
`;

const handleGoogleSignIn = async (googleUser, setErrors) => {
  // try {
  //   const token = googleUser?.tokenId;
  //   console.log("Google Sign-In Token:", token);
  //   // const url = process.env.REACT_APP_GOOGLE_SIGNIN_API_ENDPOINT;
  //   // const { data: res } = await axios.post(url, { token });
  //   const res = await mockGoogleSignInEndpoint(token);
  //   console.log("Mock API Response:", res);
  //   localStorage.setItem("token", res.formData);
  //   const userId = res.user._id || 1;
  //   window.location.href = `/dashboard/${userId}`;
  // } catch (error) {
  //   console.error("Google Sign-In Error:", error);
  //   setErrors("Google Sign-In failed. Please try again.");
  // }
};

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
const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const inputRef = useRef();

  const signIn = useGoogleLogin({
    // clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    // onSuccess: (googleUser) => handleGoogleSignIn(googleUser, setErrors),
    // onError: (error) => {
    //   console.error("Google Sign-In Error:", error);
    //   setErrors("Google Sign-In failed. Please try again.");
    // },
  });
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };
  const logOut = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    inputRef.current.focus();
    // if (signIn.googleUser) {
    //   const accessToken = signIn.googleUser.getAuthResponse().access_token;

    //   axios
    //     .get(
    //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    //     )
    //     .then((res) => {
    //       setProfile(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, [signIn.googleUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("testing");
      const url = "https://settl-core-dev.onrender.com/api/v1/signin";
      const { data: res } = await axios.post(url, formData);
      console.log("testing 2");
      // console.log(data);

      if (res.status === 200) {
        localStorage.setItem("token", res.token);
        // console.log(data);
        console.log(token);

        window.location.href = "/dashboard/1";
      }
    } catch (error) {
      handleSignInError(error, setErrors);
    }
  };

  const handleSignInError = (error, setErrors) => {
    if (error.response) {
      if (error.response.status === 401) {
        setErrors("Invalid email or password. Please try again.");
      } else if (error.response.status >= 400 && error.response.status < 500) {
        setErrors("Client-side error. Please check your inputs.");
      } else {
        setErrors("Sign-In failed. Please try again.");
      }
    } else {
      setErrors("Network error. Please try again.");
    }
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
          <StyledLogo to="/">
            <StyledImg src={logo} alt="logo" />
            Sett<span style={{ color: "#4db6ac" }}>L</span>
          </StyledLogo>
          <div>
            <StyledHeader>
              Hey, hello <span style={{ fontSize: "1.5rem" }}> &#128075;</span>
            </StyledHeader>
            <StyledSubHead>
              Enter the information you entered while registering
            </StyledSubHead>
            <StyledForm onSubmit={handleSubmit} ref={inputRef}>
              <StyledLabel htmlFor="">
                Email
                <StyledInput
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your e-mail"
                  onChange={handleChange}
                />
              </StyledLabel>
              <StyledLabel htmlFor="">
                Password
                <EyeIcon onClick={togglePasswordVisibility}>
                  {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                </EyeIcon>
                <StyledInput
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </StyledLabel>
              {errors && <p style={{ color: "red" }}>{errors}</p>}
              <StyledBtn type="submit">Login</StyledBtn>
              <StyledCheckboxCont>
                <div>
                  <StyledLabel>
                    <input type="checkbox" name="checkbox" />
                    Remember Me
                  </StyledLabel>
                </div>
                <span style={{ color: "#f26600", cursor: "pointer" }}>
                  <Link to="/forgot-password">Forgot Password</Link>
                </span>
              </StyledCheckboxCont>
            </StyledForm>
          </div>
          <StyledLineCont>
            <StyledLine></StyledLine>
            <StyledLineTxt>or</StyledLineTxt>
            <StyledLine></StyledLine>
          </StyledLineCont>
          <StyledGoogleBtn type="button" onClick={signIn}>
            <img
              src={googleImg}
              alt="googleImg"
              style={{ paddingRight: "0.5rem" }}
            />
            Sign in with Google
          </StyledGoogleBtn>
          <div>
            <StyledLineTxt style={{ marginLeft: "0" }}>
              Haven't registered? <NavLink to="/signup"> Sign up</NavLink>
            </StyledLineTxt>
            <div>
              {/* {profile ? (
                <div>
                  <img src={profile.picture} alt="user image" />
                  <h3>User Logged in</h3>
                  <p>Name: {profile.name}</p>
                  <p>Email Address: {profile.email}</p>
                  <br />
                  <br />
                  <button onClick={logOut}>Log out</button>
                </div>
              ) : (
                <button onClick={signIn}>Sign in with Google </button>
              )} */}
            </div>
          </div>
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledContainer>
      <ToastContainer />
    </>
  );
};

export default SignIn;
