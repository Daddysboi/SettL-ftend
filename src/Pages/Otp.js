import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { toast } from "react-toastify";
import { register } from "../features/registerSlice";
import { useAppDispatch } from "../redux/hooks";
import AppOtpInput from "../Components/ReUseableComponent/AppOtpInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const StyledBtn = styled.button`
  padding: 0.6rem 1rem;
  box-sizing: border-box;
  display: block;
  max-width: 400px;
  border: none;
  border-radius: 0.2rem;
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  color: #ffff;
  margin: 1rem 0 0 0;
  &:hover {
    background: #f26600;
  }
`;

const OtpVerification = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegisterUser = async () => {
    setLoading(true);
    const request = {
      otp: otp,
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      password: state.password,
    };

    dispatch(register(request))
      .then((resp) => {
        if (resp?.payload?.status !== 201) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(resp?.payload?.message || "Successfully Registered");
        navigate("/login");
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <Container>
      <h4>
        Please enter the OTP sent to{" "}
        {state && state.email ? `your ${state.email}` : "your email"}
      </h4>
      <AppOtpInput value={otp} onChange={setOtp} />
      <StyledBtn
        type="button"
        disabled={otp.length < 4 || loading}
        onClick={handleRegisterUser}
      >
        {loading ? "Submitting..." : "Submit"}
      </StyledBtn>
    </Container>
  );
};

export default OtpVerification;
