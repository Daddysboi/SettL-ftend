import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { userData } = useUser();
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setOtp(value);
    setError("");
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
  const renderInput = (index, focus) => (
    <input
      key={index}
      value={otp[index]}
      onChange={(e) => handleChange(e.target.value)}
      onFocus={() => handleInputFocus(index)} // Add this line
      onBlur={() => {}} // You might want to handle onBlur as well
    />
  );
  const handleInputFocus = (index) => {
    setFocusedInput(index);
  };

  const handleSubmit = async () => {
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
          // Redirect to the desired page
          navigate.push("/login");
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
  return (
    <div>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={4}
        separator={<span>-</span>} // Customize separator if needed
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle="otp-input" // Add this line to specify the input style
        containerStyle="otp-container" // Add this line to specify the container style
        renderInput={renderInput} // Pass the renderInput function
      />
      <button onClick={handleSubmit}>Submit</button>
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
