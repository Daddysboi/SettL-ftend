import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import contactImg from "../../assets/images/contact-banner.png";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  padding: 5rem 0;
  margin: 0;
  flex-direction: column;
  color: #fff;
  background: url(${contactImg});
  background-size: cover;
`;

const StyledForm = styled.form`
  /* gap: 2rem; */
`;

const StyledHeader = styled.h1`
  color: #183153;
  font-size: 2rem;
  margin-bottom: 3rem;
`;
const StyledInput = styled.input`
  width: 20rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  &::placeholder {
    opacity: 0.5;
  }
`;

const StyledTextarea = styled.textarea`
  width: 20rem;
  padding: 0.5rem;
  border: none;
  outline: none;
  &::placeholder {
    opacity: 0.5;
  }
`;
const StyledBtn = styled.button`
  /* background: linear-gradient(to right, #ff4500, #ff8c00, #f26600); */
  background-color: #183153;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  color: #fff;
  &:hover {
    color: #183153;
    border: 1px solid #183153;
    background: transparent;
  }
`;

const Contact = () => {
  const initialValues = {
    fullname: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const [serverSuccess, setServerSuccess] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
        const response = await axios.post(apiUrl, values);

        if (response.status === 201) {
          toast.success("Form submitted successfully!");
          resetForm();
          setServerSuccess(true);
        } else {
          toast.error("Form submission failed");
          setServerSuccess(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle errors here
        setServerSuccess(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <StyledContainer id="contact">
      <StyledHeader>Contact Our Support</StyledHeader>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Full Name"
          name="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // style={{ marginBottom: "10rem" }}
        />
        <div style={{ color: "red" }}>
          {formik.touched.fullname && formik.errors.fullname}
        </div>

        <StyledInput
          type="text"
          placeholder="E-mail"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div style={{ color: "red" }}>
          {formik.touched.email && formik.errors.email}
        </div>

        <StyledTextarea
          cols="30"
          rows="10"
          type="text"
          name="message"
          value={formik.values.message}
          placeholder="Message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div style={{ color: "red" }}>
          {formik.touched.message && formik.errors.message}
        </div>

        <StyledBtn type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </StyledBtn>

        {/* include recaptcha */}
        <ToastContainer />

        {serverSuccess && (
          <p style={{ color: "green" }}>Form submitted successfully!</p>
        )}
      </StyledForm>
    </StyledContainer>
  );
};

export default Contact;
