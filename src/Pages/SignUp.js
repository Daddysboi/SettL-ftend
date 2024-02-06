import React, { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { sendOtp } from "../features/registerSlice";
import { useAppDispatch } from "../redux/hooks";
import { TailSpin as Loader } from "react-loader-spinner";
import AuthBackground from "../Components/LayoutComponents/AuthBackground";
import AppSelectInput from "../Components/ReUseableComponent/AppSelectInput";
import AppInput from "../Components/ReUseableComponent/AppInput";

import googleImg from "../assets/images/flat-color-icons_google.svg";
import "react-toastify/dist/ReactToastify.css";

//Form
const StyledForm = styled.form`
  display: block;
  margin-top: 1rem; /* Adjust the margin as needed */
  &:focus {
    margin-top: 18px;
    padding-left: 2px;
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

const RegisterSchema = Yup.object().shape({
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
    .required("Required")
    .min(8, "Must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/([a-z])/, "Must contain at least one lowercase letter")
    .matches(/(\W)/, "Must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  role: Yup.string(),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef();

  const navigate = useNavigate();

  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: RegisterSchema, //causin problems so i comment it out
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let request = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        password: values?.password,
      };
      dispatch(sendOtp({ email: values?.email }))
        .then((resp) => {
          if (resp?.payload?.status !== 200) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(resp?.payload?.message || "Please check your inbox");
          navigate("/otp", { state: request });
          resetForm();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  const roleOptions = [
    { label: "Buyer", value: "buyer" },
    { label: "Seller", value: "seller" },
    // Add more options as needed
  ];

  return (
    <AuthBackground>
      <StyledForm onSubmit={registerFormik.handleSubmit} ref={inputRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AppInput
            label="First Name"
            type="text"
            name="firstName"
            value={registerFormik.values.firstName}
            placeholder="Enter Firstname"
            onChange={registerFormik.handleChange}
            error={
              registerFormik.submitCount > 0 && registerFormik.errors.firstName
            }
          />

          <AppInput
            label="Last Name"
            type="text"
            name="lastName"
            value={registerFormik.values.lastName}
            placeholder="Enter Firstname"
            onChange={registerFormik.handleChange}
            error={
              registerFormik.submitCount > 0 && registerFormik.errors.lastName
            }
          />
        </div>

        <AppInput
          label="Email"
          type="text"
          name="email"
          value={registerFormik.values.email}
          placeholder="Enter your e-mail"
          onChange={registerFormik.handleChange}
          error={registerFormik.submitCount > 0 && registerFormik.errors.email}
        />

        <AppInput
          inputType="password"
          label="Password"
          name="password"
          value={registerFormik.values.password}
          placeholder="Enter your password"
          onChange={registerFormik.handleChange}
          error={
            registerFormik.submitCount > 0 && registerFormik.errors.password
          }
        />

        <AppInput
          inputType="password"
          label="Confirm Password"
          name="confirmPassword"
          value={registerFormik.values.confirmPassword}
          placeholder="Confirm your password"
          onChange={registerFormik.handleChange}
          error={
            registerFormik.submitCount > 0 &&
            registerFormik.errors.confirmPassword
          }
        />
        <AppSelectInput
          label="Role"
          name="role"
          value={registerFormik.values.role}
          onChange={registerFormik.handleChange}
          options={roleOptions}
          error={registerFormik.submitCount > 0 && registerFormik.errors.role}
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
        <StyledBtn type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </StyledBtn>
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
          Already have an account? <NavLink to="/login"> Sign In</NavLink>
        </StyledLineTxt>
        <StyleTermsTxt style={{ marginLeft: "0", fontSize: "0.55rem" }}>
          By creating an account you agree with our span{" "}
          <Link to="/terms-and-conditions">Terms of Service</Link>,
          <Link to="/privacy-policy">Privacy Policy </Link>, and our default
          Notification Settings.
        </StyleTermsTxt>
      </div>
    </AuthBackground>
  );
};

export default React.memo(Signup);
