import axios from "axios";

import {
  LOGIN,
  REGISTER,
  SEND_OTP,
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD,UPDATE_PASSWORD
} from "../services/CONSTANTS";

export const Signin = async ({ email, password }) => {
  const loginData = { email, password };
  const resp = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${LOGIN}`,
    loginData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const data = resp.data;
  return data;
};

export const SendOtp = async ({ email }) => {
  const otpData = {
    email,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${SEND_OTP}`,
    otpData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const Register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  otp,
}) => {
  const registerData = {
    firstName,
    lastName,
    email,
    password,
    role,
    otp,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${REGISTER}`,
    registerData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const RequestResetPassword = async ({ email, redirectUrl }) => {
  const details = { email, redirectUrl };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${REQUEST_PASSWORD_RESET}`,
    details,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const ResetPassword = async ({ userId, resetString, newPassword }) => {
  const details = { userId, resetString, newPassword };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${RESET_PASSWORD}`,
    details,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdatePassword = async ({ userId, oldPssword, newPassword }) => {
  const details = { userId, oldPssword, newPassword };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_PASSWORD}`,
    details,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};
