import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faShoppingCart,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PaystackButton } from "react-paystack";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin as Loader } from "react-loader-spinner";

import { createTransaction } from "../../../features/transactionSlice";
import FormList from "antd/es/form/FormList";
import { USER_ID } from "../../../services/CONSTANTS";
import { useAppDispatch } from "../../../redux/hooks";

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
  font-size: 1.5rem;
`;

const StyledBtnRole = styled.button`
  background-color: #f26600;
  border: 2px solid #f8701c;
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
  border: 2px solid #f8701c;
  color: #ffffff;
  padding: 7px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 0.5rem;
  right: 6rem;

  &:hover {
    background-color: transparent;
    border: 1px solid #f8701c;
    color: #f8701c;
    padding: 6px;
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
  padding: 6px 10px;
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

const StyledTextArea = styled.textarea`
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
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem(USER_ID);
  const isSecure = window.location.protocol === "https:";
  const text = `${isSecure ? "https" : "http"}://${
    window.location.host
  }/confirm-transaction`;
  const encodedLink = encodeURI(text);
  const dispatch = useAppDispatch();
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
      deliveryAddress: Yup.string().required("Please enter delivery address"),

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
      // onCreateTransaction(values);
    },
  });

  const parsedAmount = parseFloat(formik.values.amount.replace(/,/g, ""));

  const handleCreateTransaction = async (reference) => {
    setLoading(true);

    let request = {
      reference: reference,
      buyerId: userId,
      formData: {
        transactionType: formik.values.transactionType,
        amount: parsedAmount,
        deliveryAddress: formik.values.deliveryAddress,
        productName: formik.values.productName,
        counterpartyName: formik.values.counterpartyName,
        counterpartyEmail: formik.values.counterpartyEmail,
        counterpartyPhone: formik.values.counterpartyPhone,
        setConditions: formik.values.setConditions,
        termsAndConditions: formik.values.termsAndConditions,
      },
      redirectUrl: encodedLink,
    };
    dispatch(createTransaction(request))
      .then((resp) => {
        if (resp?.payload?.status !== 201) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        onRequestClose();
        toast.success(resp?.payload?.message || "Please check your inbox");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  const componentProps = {
    email: formik.values.counterpartyEmail,
    amount: parsedAmount * 100,
    metadata: {
      name: formik.values.counterpartyName,
      phone: formik.values.counterpartyPhone,
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    text: "Pay",
    onSuccess: ({ reference }) => {
      handleCreateTransaction(reference);
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
      // case 1:
      //   return (
      //     <StyledFormDiv>
      //       <StyledHeader>Create Transaction</StyledHeader>
      //       <Styledlabel htmlFor="role">Select your role:</Styledlabel>
      //       <div>
      //         <StyledBtnRole
      //           type="button"
      //           onClick={() => {
      //             formik.setFieldValue("role", "seller");
      //             handleNext();
      //           }}
      //         >
      //           <FontAwesomeIcon icon={faUser} /> Seller
      //         </StyledBtnRole>{" "}
      //         <StyledBtnRole
      //           type="button"
      //           onClick={() => {
      //             formik.setFieldValue("role", "buyer");
      //             handleNext();
      //           }}
      //         >
      //           <FontAwesomeIcon icon={faMoneyBillWave} /> Buyer
      //         </StyledBtnRole>
      //       </div>
      //       {formik.errors.role && formik.touched.role && (
      //         <StyledError>{formik.errors.role}</StyledError>
      //       )}
      //     </StyledFormDiv>
      //   );
      case 1:
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
                <div>{formik.errors.transactionType}</div>
              )}
          </StyledFormDiv>
        );
      case 2:
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
                  onChange={(e) => {
                    const formattedAmount = e.target.value
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    formik.setFieldValue("amount", formattedAmount);
                  }}
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
                <Styledlabel htmlFor="amount">Transaction amount:</Styledlabel>
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
                    <Styledlabel htmlFor="deliveryAddress">
                      Delivery address:
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
      case 3:
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

            <Styledlabel htmlFor="counterpartyEmail">
              Counterparty email:
            </Styledlabel>
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

            <Styledlabel htmlFor="counterpartyPhone">
              Counterparty phone number:
            </Styledlabel>
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
      case 4:
        return (
          <div>
            <StyledHeader>Set Conditions</StyledHeader>
            <Styledlabel htmlFor="counterpartyName">
              Enter terms for purchase:
            </Styledlabel>

            <StyledTextArea
              type="text"
              name="setConditions"
              id="setConditions"
              cols="30"
              rows="10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.setConditions}
              style={{ display: "block" }}
            ></StyledTextArea>

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
      <>
        {loading && (
          <Loader
            type="TailSpin"
            color="#ff4500"
            height={20}
            width={20}
            style={{ margin: "auto" }}
          />
        )}
        {loading ? (
          "Confirming transaction..."
        ) : (
          <>
            {renderStepContent()}
            <div>
              {currentModalStep !== 1 && (
                <StyledBackButton type="button" onClick={handleBack}>
                  Back
                </StyledBackButton>
              )}
              {currentModalStep !== 4 && currentModalStep !== 1 && (
                <StyledButton
                  type="button"
                  onClick={() => {
                    handleNext();
                  }}
                >
                  Save & Next
                </StyledButton>
              )}
              {currentModalStep === 4 && (
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
          </>
        )}
      </>
    </StyledModal>
  );
};

export default TransactionFormPopup;
