import React, { useState, useEffect } from "react";
import axios from "axios";
import toastify from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import zxcvbn from "zxcvbn";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = ({ match }) => {
  const { params } = match || {};
  const { token } = params || {};
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `https://settl-core-dev.onrender.com/api/v1/get-user-id?token=${token}`
        );

        if (response.status === 200) {
          setUserId(response.data.userId);
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, [token]);

  const handleResetPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setResetStatus("error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://settl-core-dev.onrender.com/api/v1/password-reset",
        {
          userId: userId,
          resetString: token,
          newPassword: values.newPassword,
        }
      );

      if (response.status === 200) {
        setResetStatus("success");
      } else {
        setResetStatus("error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          const result = zxcvbn(values.newPassword);
          if (result.score < 3) {
            errors.newPassword = "Password is too weak";
          }
          return errors;
        }}
        onSubmit={(values) => {
          handleResetPassword(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="">Enter new password</label>
            <Field
              type={passwordVisible ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <ErrorMessage name="newPassword" component="div" />

          <div>
            <label htmlFor="">Confirm new password</label>
            <Field
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      </Formik>
      {resetStatus === "success" && <p>Password updated successfully!</p>}
      {resetStatus === "error" && (
        <p>Failed to update password. Please try again.</p>
      )}
    </div>
  );
};

export default ResetPassword;
