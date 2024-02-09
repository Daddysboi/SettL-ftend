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
import { PaystackButton } from "react-paystack";
import styled from "styled-components";
import axios from "axios";

const StyledModal = styled(Modal)`
  margin-top: 15rem;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    cursor: pointer;
  }
  .bm-burger-bars {
    background: #373a47;
  }
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-left: 10rem;
  }
`;

const StyledHeader = styled.h2`
  font-size: 1.2rem;
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
  bottom: 1rem;
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
`;

const Styledlabel = styled.label`
  margin-top: 1rem;
  font-size: 0.7rem;
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
  bottom: 1rem;
  padding: 8px;
  right: 2rem;
  &:hover {
    background-color: #f26600;
    color: #ffffff;
  }
`;

const StyledInput = styled.input`
  padding: 0.2rem;
  border: 1px solid rgba(223, 140, 82, 0.3);
  border-radius: 3px;
  display: block;
`;

const StyledError = styled.p`
  color: red;
  font-size: 0.5rem;
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

      const transactionData = {
        ...formik.values,
        reference: reference,
      };
      const url = "";
      axios
        .post(url, transactionData)
        .then((response) => {
          console.log(
            "Transaction details posted successfully:",
            response.data
          );
        })
        .catch((error) => {
          console.error("Error posting transaction details:", error);
        });
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
            <Styledlabel htmlFor="role">Select your role:</Styledlabel>
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
              <StyledError>{formik.errors.role}</StyledError>
            )}
          </StyledFormDiv>
        );
      case 2:
        return (
          <StyledFormDiv>
            <StyledHeader>Transaction Type</StyledHeader>
            <Styledlabel htmlFor="transactionType">
              Select transaction type:
            </Styledlabel>
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
                <StyledError>{formik.errors.transactionType}</StyledError>
              )}
          </StyledFormDiv>
        );
      case 3:
        return (
          <div>
            <StyledHeader>Transaction Details</StyledHeader>
            {formik.values.transactionType && (
              <div>
                <Styledlabel htmlFor="amount">Transaction amount:</Styledlabel>
                <StyledInput
                  type="text"
                  id="amount"
                  name="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                {formik.errors.amount && formik.touched.amount && (
                  <StyledError>{formik.errors.amount}</StyledError>
                )}
              </div>
            )}
            {formik.values.transactionType && (
              <div>
                <Styledlabel htmlFor="deliveryAddress">
                  Delivery address:
                </Styledlabel>
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
                    <StyledError>{formik.errors.deliveryAddress}</StyledError>
                  )}
                {formik.values.transactionType && (
                  <div>
                    <Styledlabel htmlFor="productName">
                      What product are you buying:
                    </Styledlabel>
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
                        <StyledError>{formik.errors.productName}</StyledError>
                      )}
                  </div>
                )}
              </div>
            )}

            {currentStep === "payment" && (
              <div>
                <Styledlabel>
                  <StyledInput
                    type="checkbox"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    checked={formik.values.termsAndConditions}
                    onChange={formik.handleChange}
                  />
                  Agree with terms and conditions{" "}
                  <Link to="/terms-and-conditions"></Link>
                </Styledlabel>
                {formik.errors.termsAndConditions &&
                  formik.touched.termsAndConditions && (
                    <StyledError>
                      {formik.errors.termsAndConditions}
                    </StyledError>
                  )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <StyledHeader>Invite Counterparty</StyledHeader>
            <Styledlabel htmlFor="counterpartyName">
              Counterparty name:
            </Styledlabel>
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
                <StyledError>{formik.errors.counterpartyName}</StyledError>
              )}

            <Styledlabel htmlFor="counterpartyEmail">Email:</Styledlabel>
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

            <Styledlabel htmlFor="counterpartyPhone">Phone Number:</Styledlabel>
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
                <StyledError>{formik.errors.counterpartyPhone}</StyledError>
              )}
          </div>
        );
      case 5:
        return (
          <div>
            <StyledHeader>Set Conditions</StyledHeader>
            <Styledlabel htmlFor="counterpartyName">
              Enter terms for purchase:
            </Styledlabel>

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
              <StyledError>{formik.errors.setConditions}</StyledError>
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
      contentStyledlabel="Transaction Form Modal"
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
