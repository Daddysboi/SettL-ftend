import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTimes,
  faShoppingCart,
  faTools,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaystackButton } from "react-paystack";
import styled from "styled-components";
import axios from "axios";

const StyledModal = styled(Modal)`
  margin-top: 15rem;

  background-color: #ffffff;

  align-items: center;
  justify-content: center;
  /* margin: 5rem; */
  width: 100%;

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    cursor: pointer;
  }
  .bm-burger-bars {
    background: #373a47;
  }
`;
const StyledHeader = styled.h2`
  font-size: 1.5rem;
`;

const StyledBtnRole = styled.button`
  background-color: #f26600;
  color: #ffffff;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: transparent;
    border: 2px solid #f8701c;
    color: #f8701c;
  }
`;
const StyledButton = styled.button`
  background-color: #f26600;
  color: #ffffff;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 0.5rem;
  right: 6rem;

  &:hover {
    background-color: transparent;
    border: 2px solid #f8701c;
    color: #f8701c;
  }
`;

const StyledFormDiv = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  /* position: relative; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
`;

const StyledBackButton = styled.button`
  background-color: #ffffff;
  color: #f26600;
  padding: 0.3rem 0.5rem;
  border: 1px solid #f26600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  position: absolute;
  bottom: 0.5rem;
  right: 2rem;
  &:hover {
    background-color: #f26600;
    color: #ffffff;
  }
`;

const StyledInput = styled.input`
  /* width: 100%; */
  /* margin: 10px 0; */
  padding: 0.2rem;
  border: 1px solid #000000;
  border-radius: 3px;
  display: block;
`;

Modal.setAppElement("#root");
const TransactionFormPopup = ({
  isOpen,
  onRequestClose,
  onCreateTransaction,
  currentStep,
}) => {
  const [currentModalStep, setCurrentModalStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      role: "",
      transactionType: "",
      amount: "",
      deliveryAddress: "",
      productName: "",
      counterpartyName: "",
      counterpartyEmail: "",
      counterpartyPhone: "",
      setConditions: "",
      termsAndConditions: false,
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Please select your role"),
      transactionType: Yup.string().required("Please select transaction type"),
      amount: Yup.number()
        .required("Please enter transaction amount")
        .positive("Amount must be positive"),
      deliveryAddress: Yup.string().required("Please enter delivery address"),
      productName: Yup.string().required("Please enter the product name"),
      counterpartyName: Yup.string().when("role", {
        is: "buyer",
        then: () => Yup.string().required("Please enter counterparty name"),
      }),
      counterpartyEmail: Yup.string().when("role", {
        is: "buyer",
        then: () =>
          Yup.string()
            .email("Invalid email format")
            .required("Please enter counterparty email"),
      }),
      counterpartyPhone: Yup.string().when("role", {
        is: "buyer",
        then: () =>
          Yup.string().required("Please enter counterparty phone number"),
      }),
      setConditions: Yup.string().when("currentStep", {
        is: "setConditions",
        then: () =>
          Yup.string().required("Please enter terms for seller to review"),
      }),
      termsAndConditions: Yup.boolean().when("currentStep", {
        is: "payment",
        then: () =>
          Yup.boolean().oneOf([true], "Please accept terms and conditions"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      onCreateTransaction(values);
    },
  });

  const componentProps = {
    email: formik.values.counterpartyEmail,
    amount: parseFloat(formik.values.amount) * 100,
    metadata: {
      name: formik.values.counterpartyName,
      phone: formik.values.counterpartyPhone,
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    text: "Pay",
    onSuccess: ({ reference }) => {
      alert(
        `Your transaction was successful! Transaction reference: ${reference}`
      );
    },
    onClose: () => alert("Transaction Cancelled"),
  };

  const handleNext = () => {
    setCurrentModalStep(currentModalStep + 1);
  };

  const handleBack = () => {
    setCurrentModalStep(currentModalStep - 1);
  };

  const renderStepContent = () => {
    switch (currentModalStep) {
      case 1:
        return (
          <StyledFormDiv>
            <StyledHeader>Create Transaction</StyledHeader>
            <label htmlFor="role">Select your role:</label>
            <div>
              <StyledBtnRole
                type="button"
                onClick={() => {
                  formik.setFieldValue("role", "seller");
                  handleNext();
                }}
              >
                <FontAwesomeIcon icon={faUser} /> Seller
              </StyledBtnRole>{" "}
              <StyledBtnRole
                type="button"
                onClick={() => {
                  formik.setFieldValue("role", "buyer");
                  handleNext();
                }}
              >
                <FontAwesomeIcon icon={faMoneyBillWave} /> Buyer
              </StyledBtnRole>
            </div>
            {formik.errors.role && formik.touched.role && (
              <div>{formik.errors.role}</div>
            )}
          </StyledFormDiv>
        );
      case 2:
        return (
          <StyledFormDiv>
            <StyledHeader>Transaction Type</StyledHeader>
            <label htmlFor="transactionType">Select transaction type:</label>
            <div>
              <StyledBtnRole
                type="button"
                onClick={() => {
                  formik.setFieldValue("transactionType", "product");
                  handleNext();
                }}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Product
              </StyledBtnRole>{" "}
              <StyledBtnRole
                type="button"
                onClick={() => {
                  formik.setFieldValue("transactionType", "service");
                  handleNext();
                }}
              >
                <FontAwesomeIcon icon={faTools} /> Service
              </StyledBtnRole>
            </div>
            {formik.errors.transactionType &&
              formik.touched.transactionType && (
                <div>{formik.errors.transactionType}</div>
              )}
          </StyledFormDiv>
        );
      case 3:
        return (
          <div>
            <StyledHeader>Transaction Details</StyledHeader>
            {formik.values.transactionType && (
              <div>
                <label htmlFor="amount">Transaction amount:</label>
                <StyledInput
                  type="text"
                  id="amount"
                  name="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                {formik.errors.amount && formik.touched.amount && (
                  <div>{formik.errors.amount}</div>
                )}
              </div>
            )}
            {formik.values.transactionType && (
              <div>
                <label htmlFor="deliveryAddress">Delivery address:</label>
                <StyledInput
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryAddress}
                />
                {formik.errors.deliveryAddress &&
                  formik.touched.deliveryAddress && (
                    <div>{formik.errors.deliveryAddress}</div>
                  )}
                {formik.values.transactionType && (
                  <div>
                    <label htmlFor="productName">
                      What product are you buying:
                    </label>
                    <StyledInput
                      type="text"
                      id="productName"
                      name="productName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.productName}
                    />
                    {formik.errors.productName &&
                      formik.touched.productName && (
                        <div>{formik.errors.productName}</div>
                      )}
                  </div>
                )}
              </div>
            )}

            {currentStep === "payment" && (
              <div>
                <label>
                  <StyledInput
                    type="checkbox"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    checked={formik.values.termsAndConditions}
                    onChange={formik.handleChange}
                  />
                  Agree with terms and conditions
                </label>
                {formik.errors.termsAndConditions &&
                  formik.touched.termsAndConditions && (
                    <div>{formik.errors.termsAndConditions}</div>
                  )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <StyledHeader>Invite Counterparty</StyledHeader>
            <label htmlFor="counterpartyName">Counterparty name:</label>
            <StyledInput
              type="text"
              id="counterpartyName"
              name="counterpartyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.counterpartyName}
            />
            {formik.errors.counterpartyName &&
              formik.touched.counterpartyName && (
                <div>{formik.errors.counterpartyName}</div>
              )}

            <label htmlFor="counterpartyEmail">Email:</label>
            <StyledInput
              type="text"
              id="counterpartyEmail"
              name="counterpartyEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.counterpartyEmail}
            />
            {formik.errors.counterpartyEmail &&
              formik.touched.counterpartyEmail && (
                <div>{formik.errors.counterpartyEmail}</div>
              )}

            <label htmlFor="counterpartyPhone">Phone Number:</label>
            <StyledInput
              type="text"
              id="counterpartyPhone"
              name="counterpartyPhone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.counterpartyPhone}
            />
            {formik.errors.counterpartyPhone &&
              formik.touched.counterpartyPhone && (
                <div>{formik.errors.counterpartyPhone}</div>
              )}
          </div>
        );
      case 5:
        return (
          <div>
            <StyledHeader>Set Conditions</StyledHeader>
            <label htmlFor="counterpartyName">Enter terms for purchase:</label>

            <textarea
              type="text"
              name="setConditions"
              id="setConditions"
              cols="30"
              rows="10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.setConditions}
              style={{ display: "block" }}
            ></textarea>

            {formik.errors.setConditions && formik.touched.setConditions && (
              <div>{formik.errors.setConditions}</div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      // onRequestClose={onRequestClose}
      contentLabel="Transaction Form Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "20rem",
          padding: "20px",
          height: "20rem",
          borderRadius: "1rem",
        },
      }}
    >
      {renderStepContent()}
      <div>
        {currentModalStep !== 1 && (
          <StyledBackButton type="button" onClick={handleBack}>
            Back
          </StyledBackButton>
        )}
        {currentModalStep !== 5 &&
          currentModalStep !== 1 &&
          currentModalStep !== 2 && (
            <StyledButton
              type="button"
              onClick={() => {
                handleNext();
              }}
            >
              Save & Next
            </StyledButton>
          )}
        {currentModalStep === 5 && (
          <PaystackButton
            type="button"
            onClick={() => {
              // formik.handleSubmit();
              handlePayment();
            }}
            className="paystack-button"
            {...componentProps}
          />
        )}
      </div>
      <div className="close-button" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </StyledModal>
  );
};

export default TransactionFormPopup;
