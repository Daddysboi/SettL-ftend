import React, { useState } from "react";
import axios from "axios";
import emailValidator from "email-validator";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim() || !emailValidator.validate(email)) {
      setEmailError("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://settl-core-dev.onrender.com/api/v1/request-password-reset",
        {
          email: email,
          redirectUrl: "http://localhost:3000/reset-password",
        }
      );

      if (response.status === 200) {
        setResetStatus("success");
      } else {
        setResetStatus("error");
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      setResetStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password.</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {resetStatus === "success" && (
        <p>Password reset email sent successfully!</p>
      )}
      {resetStatus === "error" && (
        <p>Failed to send password reset email. Please try again.</p>
      )}
    </div>
  );
};

export default PasswordReset;
