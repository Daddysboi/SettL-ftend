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
  padding: 0.2rem;
  /* margin: 10px 0; */
  border: 1px solid #000000;
  border-radius: 3px;
  display: block;
`;

Modal.setAppElement("#root");
const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
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

  const handlePaymentSuccess = async ({ reference }) => {
    alert(
      `Your transaction was successful! Transaction reference: ${reference}`
    );

    const requestData = {
      reference,
      formData: formik.values,
    };

    try {
      url = "https://jsonplaceholder.typicode.com/posts/1";
      const response = await axios.post(url, requestData, {
        withCredentials: true,
      });

      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const componentProps = {
    email: formik.values.counterpartyEmail,
    amount: parseFloat(formik.values.amount) * 100,
    metadata: {
      name: formik.values.counterpartyName,
      phone: formik.values.counterpartyPhone,
    },
    publicKey,
    text: "Pay",
    onSuccess: handlePaymentSuccess,
    onClose: () => alert("Transaction Cancelled"),
  };
  const handleNext = () => {
    setCurrentModalStep(currentModalStep + 1);
  };

  const handleBack = () => {
    setCurrentModalStep(currentModalStep - 1);
  };

  return;
};

export default TransactionFormPopup;
