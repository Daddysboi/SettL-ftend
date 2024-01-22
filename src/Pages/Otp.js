import React, { useState } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const handleInputChange = (index, value) => {
    if (/[0-9]/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (/^[0-9]{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      setError("");
    } else {
      setError("Invalid OTP format. Please enter a four-digit OTP.");
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (/^[0-9]{4}$/.test(enteredOtp)) {
      // Valid OTP, you can perform further actions here
      setError("");
      alert("OTP is valid!"); // Replace with your logic
    } else {
      setError("Invalid OTP. Please enter a four-digit OTP.");
    }
  };

  return (
    <div>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OtpInput;
