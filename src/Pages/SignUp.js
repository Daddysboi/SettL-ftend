import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const StyledForm = styled.form`
  /* Add your form styles here */
`;

const StyledInput = styled.input`
  /* Add your input styles here */
`;

const ErrorMessage = styled.div`
  color: red;
  /* Add additional styles as needed */
`;

const Signup = () => {
  const [user, setUser] = useState(null); // Change to null to indicate no user logged in
  const [profile, setProfile] = useState(null); // Change to null to indicate no user profile

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post("/api/google/signup", {
          access_token: codeResponse.access_token,
        });

        const signedUpUser = response.data;
        setUser(signedUpUser);
        // Redirect to the home page or perform other post-signup actions
        window.location = "/";
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
    onError: (error) => console.log("Signup Failed:", error),
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [userAlert, setUserAlert] = useState("");
  const [errors, setErrors] = useState({});
  const [validate, setValidate] = useState(false); // This is for recaptcha validation
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // Logout function to log the user out of Google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors({ ...errors, [name]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Valid email is required",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSymbol;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail()) {
      if (formData.password === formData.confirmPassword) {
        console.log("form submitted");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setUserAlert("");
        // Additional logic for handling the signup process
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Password does not match",
        }));
      }
      window.location = "/otp";
    } else {
      setUserAlert(
        <div style={{ color: "red" }}>Please fill in all required fields.</div>
      );
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <StyledForm action="" onSubmit={handleSubmit}>
        {/* Your existing form inputs */}
        {/* ... */}

        <button type="submit">Submit</button>
      </StyledForm>

      <div>
        <p>
          Already have an account? <Link to="/login"> Sign in</Link>
        </p>
      </div>
      {/* recaptcha */}

      <div>
        <h2>React Google Signup</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Signed Up</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign up with Google 🚀 </button>
        )}
      </div>
    </div>
  );
};

export default Signup;
