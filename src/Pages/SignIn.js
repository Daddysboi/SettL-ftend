import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [userAlert, setUserAlert] = useState("");

  const { signIn } = useGoogleLogin({
    clientId:
      "914264160299-mlonobqsj8ajkpthgldd7hel4qkbmm40.apps.googleusercontent.com",
    onSuccess: async (googleUser) => {
      try {
        const token = googleUser.getAuthResponse().id_token;
        console.log("Google Sign-In Token:", token);
        const url = "your_google_signin_api_endpoint";
        const { data: res } = await axios.post(url, { token });
        localStorage.setItem("token", res.formData);
        window.location = "/"; // Redirect to home or desired page upon successful login
      } catch (error) {
        console.error("Google Sign-In Error:", error);
        setErrors("Google Sign-In failed. Please try again."); // User-friendly error message
      }
    },
    onError: (error) => {
      console.error("Google Sign-In Error:", error);
      setErrors("Google Sign-In failed. Please try again."); // User-friendly error message
    },
  });

  useEffect(() => {
    // Log any updates to the Google Sign-In hook
    console.log("Google Sign-In Hook Updated:", signIn);
  }, [signIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "your_api_endpoint";
      const { data: res } = await axios.post(url, formData);
      localStorage.setItem("token", res.formData);
      window.location = "/"; // Redirect to home or desired page upon successful login
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setErrors(error.response.data.message);
      } else {
        setErrors("Login failed. Please check your credentials and try again."); // User-friendly error message
      }
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <div>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter your e-mail"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
        </form>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
      </div>
      <div>
        <NavLink to="/signup">
          <button type="submit">Sign Up</button>
        </NavLink>
      </div>
      <button type="button" onClick={signIn}>
        Sign In with Google
      </button>
      <div>
        <p>
          Haven't registered? <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
