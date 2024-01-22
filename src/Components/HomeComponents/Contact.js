import React, { useReducer, useCallback } from "react";
import axios from "axios";

const initialState = {
  form: {
    fullname: "",
    email: "",
    message: "",
  },
  errors: {
    fullname: "",
    email: "",
    message: "",
  },
  verified: false,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM":
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_VERIFIED":
      return { ...state, verified: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "RESET_FORM":
      return {
        ...state,
        form: { fullname: "", email: "", message: "" },
        errors: { fullname: "", email: "", message: "" },
      };
    default:
      return state;
  }
};

const Contact = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, verified, loading } = state;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.fullname.trim()) {
      newErrors.fullname = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      newErrors.email = "A valid email address is required";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return isValid;
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch({ type: "SET_FORM", payload: { name, value } });
      dispatch({ type: "SET_ERRORS", payload: { ...errors, [name]: "" } });
    },
    [errors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        console.log(form);
        const apiUrl = "https://dummyjson.com/";
        const response = await axios.post(apiUrl, form);

        if (response.status === 201) {
          dispatch({ type: "SET_VERIFIED", payload: true });
          dispatch({ type: "RESET_FORM" });
          console.log("State after RESET_FORM:", state);
        } else {
          dispatch({ type: "SET_VERIFIED", payload: false });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch({ type: "SET_VERIFIED", payload: false });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      dispatch({ type: "SET_VERIFIED", payload: false });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />
        <div style={{ color: "red" }}>{errors.fullname}</div>

        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <div style={{ color: "red" }}>{errors.email}</div>

        <textarea
          cols="30"
          rows="10"
          type="text"
          name="message"
          value={form.message}
          placeholder="Message"
          onChange={handleChange}
        />
        <div style={{ color: "red" }}>{errors.message}</div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {/* include a recaptcha */}
        {verified && (
          <p style={{ color: "green" }}>Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Contact;
