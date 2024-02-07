import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styled from "styled-components";

import AppInput from "../ReUseableComponent/AppInput";
import { useAppDispatch } from "../../redux/hooks";

import contactImg from "../../assets/images/contact-banner.png";
import { contactOurSupport } from "../../features/utilitySlice";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${contactImg});
  background-size: cover;
  padding: 20px;
`;

const StyledForm = styled.form``;

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  @media (min-width: 480px) {
    max-width: 400px;
  }
`;

const StyledHeader = styled.h1`
  color: #183153;
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const StyledBtn = styled.button`
  background-color: #183153;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  color: #fff;
  margin-top: 0.8rem;
  border: 1px solid #183153;
  cursor: pointer;
  &:hover {
    color: #183153;
    border: 1px solid #183153;
    background: transparent;
  }
`;

const contactUsValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const contactUsFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    validationSchema: contactUsValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let request = {
        fullName: values.fullName,
        email: values.email?.toLowerCase(),
        message: values.message,
      };
      dispatch(contactOurSupport(request))
        .then((resp) => {
          if (resp?.payload?.status !== 201) {
            toast.error(resp?.payload?.message || "Something went wrong");
            setLoading(false);
            return;
          }
          toast.success(resp?.payload?.message || "Successfully subscribed");
          resetForm();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.message || "Something went wrong");
          setLoading(false);
        });
    },
  });

  return (
    <StyledContainer id="contact">
      <StyledHeader data-aos="fade-up">Contact Our Support</StyledHeader>
      <StyledForm onSubmit={contactUsFormik.handleSubmit}>
        <StyledWrapper>
          <AppInput
            label="Full Name"
            type="text"
            name="fullName"
            value={contactUsFormik.values.fullName}
            placeholder="Enter Full Name"
            onChange={contactUsFormik.handleChange}
            error={
              contactUsFormik.submitCount > 0 && contactUsFormik.errors.fullName
            }
          />
          <AppInput
            label="Email"
            type="text"
            name="email"
            value={contactUsFormik.values.email}
            placeholder="Enter your e-mail"
            onChange={contactUsFormik.handleChange}
            error={
              contactUsFormik.submitCount > 0 && contactUsFormik.errors.email
            }
          />
          <AppInput
            label="Message"
            type="textarea"
            name="message"
            value={contactUsFormik.values.message}
            placeholder="Message"
            onChange={contactUsFormik.handleChange}
            error={
              contactUsFormik.submitCount > 0 && contactUsFormik.errors.message
            }
          />
          <StyledBtn type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </StyledBtn>
        </StyledWrapper>
      </StyledForm>
    </StyledContainer>
  );
};

export default Contact;
