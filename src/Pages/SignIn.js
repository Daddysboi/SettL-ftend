import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo/White-removebg-preview.png";
import googleImg from "../assets/images/flat-color-icons_google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin as Loader } from "react-loader-spinner";

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
  font-size: 2.5rem; // Small screens, laptops
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

const StyledPasswordInput = styled.input`
  width: 95%;
  border: none;
  outline: none;
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const signIn = () => {};
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("testing");
      setLoading(true);

      const url = "https://settl-core-dev.onrender.com/api/v1/signin";
      const { data: res } = await axios.post(url, formData);

      console.log("testing 2");

      toast.success(res.data.message);
      console.log("API Response:", res);

      if (res.status === 200) {
        console.log("User ID:", res.data[0]._id);

        localStorage.setItem("token", res.token);
        console.log(res.token);
        setLoading(false);
        toast.success(res.data.message);
        setUserData({
          id: res.data[0]._id,
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
        });
        console.log("User Data:", userData[0]);
        // navigate(`/dashboard/${res.data[0]._id}`);
      }
    } catch (error) {
      setLoading(false);
      handleSignInError(error, setErrors);
    }
  };
  useEffect(() => {
    // This will be triggered after userData is updated
    console.log("User Data:", userData);
    if (userData.id) {
      navigate(`/dashboard/${userData.id}`);
    }
  }, [userData, navigate]);
  const handleSignInError = (error, setErrors) => {
    console.error(error);
    if (error.response) {
      if (error.responsestatus === 401) {
        setErrors(error.respons.edata.message);
      } else if (error.respons.estatus >= 400 && error.responsestatus < 500) {
        setErrors(error.response.data.message);
      } else {
        setErrors(error.response.data.message);
      }
    } else {
      setErrors("An unexpected error occurred.");
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
                <PasswordContainer>
                  <StyledPasswordInput
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  <EyeIcon onClick={togglePasswordVisibility}>
                    {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                  </EyeIcon>
                </PasswordContainer>
              </StyledLabel>
              {errors && <p style={{ color: "red" }}>{errors}</p>}{" "}
              {loading && (
                <Loader
                  type="TailSpin"
                  color="#ff4500"
                  height={20}
                  width={20}
                  style={{ margin: "auto" }}
                />
              )}
              <StyledBtn type="submit">
                {" "}
                {loading ? "Signing in..." : "Sign in"}
              </StyledBtn>
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
          </div>
        </StyledMiddle>
        <StyledRight></StyledRight>
      </StyledContainer>
      <ToastContainer />
    </>
  );
};

export default SignIn;
