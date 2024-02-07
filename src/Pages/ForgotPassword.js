import React, { useState } from "react";
import { styled } from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAppDispatch } from "../redux/hooks";
import { requestResetPassword } from "../features/forgotPasswordSlice";

import AppInput from "../Components/ReUseableComponent/AppInput";
import AuthBackground from "../Components/LayoutComponents/AuthBackground";

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

const forgotPasswordValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email()?.required("Email is required"),
});

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const text = `https://${window.location.host}/reset-password`;
  const encodedLink = encodeURI(text);

  const forgotPasswordFormik = useFormik({
    validationSchema: forgotPasswordValidationSchema,
    initialValues: {
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        requestResetPassword({
          email: values?.email,
          redirectUrl: encodedLink,
        })
      )
        .then((resp) => {
          if (resp?.payload?.status !== 200) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(resp?.payload?.message || "Operation Successful");
          resetForm();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  return (
    <AuthBackground
      headText="Forgot Password"
      subText="Enter your email to reset your password."
    >
      <AppInput
        label="Email"
        type="text"
        name="email"
        value={forgotPasswordFormik.values.email}
        placeholder="Enter your e-mail"
        onChange={forgotPasswordFormik.handleChange}
        error={
          forgotPasswordFormik.submitCount > 0 &&
          forgotPasswordFormik.errors.email
        }
      />
      <StyledBtn
        type="button"
        onClick={forgotPasswordFormik.handleSubmit}
        disabled={loading}
      >
        {" "}
        {loading ? "Resetting..." : "Reset Password"}
      </StyledBtn>
    </AuthBackground>
  );
};

export default ForgotPassword;
