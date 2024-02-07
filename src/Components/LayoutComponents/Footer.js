import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../redux/hooks";
import { saveEmailToMailingList } from "../../features/utilitySlice";

import instagram from "../../assets/Icon/InstagramFilled.png";
import facebook from "../../assets/Icon/FacebookFilled.png";
import twitter from "../../assets/Icon/TwitterCircleFilled.png";
import Linkedin from "../../assets/Icon/LinkedinFilled.png";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
`;
const StyledContainerTop = styled.div`
  background: linear-gradient(to right, #ff4500, #ff8c00, #f26600);
  padding: 5rem 0;
  width: 100%;
`;

const StyledHeader = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: #ffff;
  @media (min-width: 420px) {
    font-size: 2rem;
  }
`;

const StyledInputWrapper = styled.div`
  margin: 0 auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media (min-width: 490px) {
    flex-direction: row;
    font-size: 2rem;
  }
`;

const StyledInput = styled.input`
  border: 2px solid #fff;
  border-radius: 1rem;
  background-color: transparent;
  outline: none;
  width: 50%;
  min-height: 3rem;
  font-size: 0.9rem;
  color: #ffffff;
  padding-left: 1rem;
  position: relative;
  &::placeholder {
    color: #ffffff;
  }
  @media (min-width: 520px) {
    font-size: 1.5rem;
    width: 60%;
  }
  @media (min-width: 920px) {
    min-height: 4rem;
    width: 100%;
  }
`;

const StyledBtn = styled.button`
  width: 12rem;
  height: 2.8rem;
  border-radius: 1rem;
  background: #d9d9d9;
  border: none;
  border: 2px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    color: #ffff;
    background-color: transparent;
    border: 2px solid #d9d9d9;
  }
  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 8rem;
  }

  // Desktops, large screens
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    width: 8rem;
  }
`;

const StyledContainerMid = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  @media (min-width: 920px) {
    flex-direction: row;
  }
`;
const StyledMidLeft = styled.div`
  // flex: 2;
`;

const StyledHeaderMid = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  padding: 0;
  margin: 0;
`;

const StyledTxtMid = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;
const StyledMidRight = styled.div`
  flex: 1;
`;

const StyledImg = styled.img`
  height: 3rem;
`;
const StyledContainerBtm = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0 1rem;
  color: inherit;
  &:hover {
    color: #f26600;
  }
`;

const mailListingValidationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email()?.required("Email is required"),
});

const Footer = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const mailListingFormik = useFormik({
    validationSchema: mailListingValidationSchema,
    initialValues: {
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        saveEmailToMailingList({
          email: values?.email?.toLowerCase(),
        })
      )
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

  useEffect(() => {
    if (mailListingFormik.submitCount > 0 && mailListingFormik.errors.email) {
      toast.error(mailListingFormik.errors.email || "Something went wrong");
    }
  }, [mailListingFormik.submitCount]);

  return (
    <StyledContainer>
      <StyledContainerTop>
        <div>
          <StyledHeader data-aos="zoom-out">
            Join our mailing list to get exclusive updates
          </StyledHeader>
        </div>
        <StyledInputWrapper>
          <StyledInput
            type="text"
            name="email"
            placeholder="Enter your email here (e.g tkz@settl.com)"
            value={mailListingFormik?.values?.email}
            onChange={mailListingFormik.handleChange}
          />

          <StyledBtn
            onClick={mailListingFormik.handleSubmit}
            type="button"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </StyledBtn>
        </StyledInputWrapper>
      </StyledContainerTop>
      <div
        style={{
          background: "white",
          padding: "1rem 0",
          width: "100%",
        }}
      >
        <StyledContainerMid>
          <StyledMidLeft>
            <StyledHeaderMid>CONTACT US</StyledHeaderMid>
            <StyledTxtMid>
              Address: 42, Wuse 2, Abuja, FCT, Nigeria
            </StyledTxtMid>
            <StyledTxtMid>
              Support: +2349080424841, +2348123904856 | support@settl.com
            </StyledTxtMid>
          </StyledMidLeft>
          <StyledMidRight>
            <StyledHeaderMid
              style={{ fontSize: "1.5rem", textAlign: "center" }}
            >
              Connect with us
            </StyledHeaderMid>
            <div style={{ textAlign: "center" }}>
              <StyledImg src={instagram} alt="" />
              <StyledImg src={twitter} alt="" />
              <StyledImg src={facebook} alt="" />
              <StyledImg src={Linkedin} alt="" />
            </div>
          </StyledMidRight>
        </StyledContainerMid>
        <StyledContainerBtm>
          <p style={{ display: "inline", paddingRight: "1rem" }}>
            2024. ALL RIGHTS RESERVED
          </p>
          |<StyledLink to="/privacy-policy">PRIVACY POLICY </StyledLink>|
          <StyledLink to="/terms-and-conditions">
            TERMS AND CONDITIONS
          </StyledLink>
        </StyledContainerBtm>
      </div>
    </StyledContainer>
  );
};

export default Footer;
