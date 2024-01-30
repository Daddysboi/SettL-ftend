import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const OtpVerification = () => {
  const { userData } = useUser();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    console.log("user Data: " + userData);
    if (/^[0-9]{4}$/.test(otp)) {
      try {
        const response = await axios.post(
          "https://settl-core-dev.onrender.com/api/v1/verify-otp",
          {
            email: userData.email,
            otp: otp,
            firstName: userData.firstName,
            lastName: userData.lastName,
          }
        );

        if (response.status === 200) {
          showToast("Registration successful!", "success");
          navigate("/login");
        } else {
          showToast("Invalid OTP. Please enter a valid OTP.", "error");
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        showToast("OTP verification failed. Please try again.", "error");
      }
    } else {
      showToast("Invalid OTP. Please enter a four-digit OTP.", "error");
    }
  };
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));
  };

  const handleInputFocus = (index) => {
    // Handle focus if needed
  };
  return (
    <Container>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        separator={<span>-</span>}
        isInputNum={true}
        shouldAutoFocus={true}
        containerStyle="otp-container"
        inputStyle="otp-input"
        isInputSecure={true}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      <SubmitButton onClick={handleSubmit} disabled={!otp}>
        Submit
      </SubmitButton>
      <ToastContainer />
    </Container>
  );
};

export default OtpVerification;
