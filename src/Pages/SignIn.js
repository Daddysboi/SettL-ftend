import { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { TailSpin as Loader } from "react-loader-spinner";
import * as Yup from "yup";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../features/loginSlice";
import AuthBackground from "../Components/LayoutComponents/AuthBackground";
import AppInput from "../Components/ReUseableComponent/AppInput";

import googleImg from "../assets/images/flat-color-icons_google.svg";
import "react-toastify/dist/ReactToastify.css";

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
  cursor: pointer;
  transition: background 0.4s ease-in-out;
  &:hover {
    background: linear-gradient(to right, #ff4500, #ec7723e5, #f26600);
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
  cursor: pointer;
  transition: background 0.4s ease-in-out;
  &:hover {
    background: rgb(206, 206, 206);
  }
`;

const loginValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email()?.required("Email is required"),
  password: Yup.string().required("Required"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const { user, setUser, profile, setProfile, userData, setUserData } =
  //   useContext(userContext);
  const inputRef = useRef();
  const navigate = useNavigate();

  // const logOut = () => {
  //   googleLogout();
  //   setUser({}); // Clear user state
  //   setProfile({}); // Clear profile state
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     setUser(codeResponse);
  //     navigate(`/dashboard/${codeResponse.id}`);
  //   },
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // useEffect(() => {
  //   if (user && user.access_token) {
  //     axios
  //       .get("https://www.googleapis.com/oauth2/v1/userinfo", {
  //         params: { access_token: user.access_token },
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           Accept: "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => {
  //         console.error("Google API Error:", err);
  //         // Handle the error gracefully
  //       });
  //   }
  // }, [user]);

  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(
        login({
          email: values?.email?.toLowerCase(),
          password: values?.password,
        })
      )
        .then((resp) => {
          console.log(resp);
          if (resp?.payload?.status !== 200) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(resp?.payload?.message || "Successfully logged in");
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  return (
    <AuthBackground>
      <StyledForm onSubmit={loginFormik.handleSubmit} ref={inputRef}>
        <AppInput
          label="Email"
          type="text"
          name="email"
          value={loginFormik.values.email}
          placeholder="Enter your e-mail"
          onChange={loginFormik.handleChange}
          error={loginFormik.submitCount > 0 && loginFormik.errors.email}
        />

        <AppInput
          inputType="password"
          label="Password"
          name="password"
          value={loginFormik.values.password}
          placeholder="Enter your password"
          onChange={loginFormik.handleChange}
          error={loginFormik.submitCount > 0 && loginFormik.errors.password}
        />
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
      <StyledLineCont>
        <StyledLine></StyledLine>
        <StyledLineTxt>or</StyledLineTxt>
        <StyledLine></StyledLine>
      </StyledLineCont>
      <StyledGoogleBtn type="button" onClick={() => {}}>
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
    </AuthBackground>
  );
};

export default SignIn;
