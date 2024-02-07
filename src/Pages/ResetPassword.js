import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import AppInput from "../Components/ReUseableComponent/AppInput";
import AuthBackground from "../Components/LayoutComponents/AuthBackground";
import { resetPassword } from "../features/forgotPasswordSlice";

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

export const resetPasswordValidationSchema = Yup?.object()?.shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/([a-z])/, "Must contain at least one lowercase letter")
    .matches(/(\W)/, "Must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .nullable(),
});

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { userId, resetString } = useParams();

  const resetPasswordFormik = useFormik({
    validationSchema: resetPasswordValidationSchema,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let request = {
        userId,
        resetString,
        newPassword: values?.password,
      };
      dispatch(resetPassword(request))
        .then((resp) => {
          if (resp?.payload?.status !== 200) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(resp?.payload?.message || "Operation successful");
          navigate("/login");
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  return (
    <AuthBackground
      headText="Reset Password"
      subText="Enter and confirm your new password."
    >
      <AppInput
        inputType="password"
        label="Password"
        name="password"
        value={resetPasswordFormik.values.password}
        placeholder="Enter your password"
        onChange={resetPasswordFormik.handleChange}
        error={
          resetPasswordFormik.submitCount > 0 &&
          resetPasswordFormik.errors.password
        }
      />

      <AppInput
        inputType="password"
        label="Confirm Password"
        name="confirmPassword"
        value={resetPasswordFormik.values.confirmPassword}
        placeholder="Confirm your password"
        onChange={resetPasswordFormik.handleChange}
        error={
          resetPasswordFormik.submitCount > 0 &&
          resetPasswordFormik.errors.confirmPassword
        }
      />

      <StyledBtn
        type="button"
        onClick={resetPasswordFormik.handleSubmit}
        disabled={loading}
      >
        {" "}
        {loading ? "Resetting..." : "Reset Password"}
      </StyledBtn>
    </AuthBackground>
  );
};

export default ResetPassword;
