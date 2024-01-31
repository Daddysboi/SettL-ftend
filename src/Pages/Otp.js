import React, { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f26600;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 8rem;

  &:hover {
    background-color: transparent;
    border: 2px solid #f26600;
    color: #f26600;
  }
`;

const OtpVerification = () => {
  const [userData, setUserData] = useContext(userContext);

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
    console.log("user Data: " + JSON.stringify(userData));

    if (/^[0-9]{4}$/.test(otp)) {
      try {
        console.log(otp);
        const response = await axios.post(
          "https://settl-core-dev.onrender.com/api/v1/register",
          {
            email: userData.email,
            otp: otp,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
          }
        );
        console.log(response);
        if (response.status == 200) {
          showToast("Registration successful!", "success");
          navigate("/login");
          // setOtp("");
        } else {
          showToast("Invalid OTP. Please enter a valid OTP.", "error");
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        console.log("Response Data:", error.response.data);
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
      <h4>
        Please enter the OTP sent to{" "}
        {userData && userData.email ? `your ${userData.email}` : "your email"}
      </h4>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        separator={<span>-</span>}
        isInputNum={true}
        shouldAutoFocus={true}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
        inputStyle={{
          width: "4rem",
          height: "4rem",
          fontSize: "3rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        isInputSecure={true}
        renderSeparator={(props) => <span {...props}> </span>}
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
