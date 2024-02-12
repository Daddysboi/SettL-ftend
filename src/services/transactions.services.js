import axios from "axios";

import {
  CREATE_TRANSACTION,
  VERIFY_TRANSACTION,
  VERIFY_TRANSACTION_DETAILS,
} from "../services/CONSTANTS";

export const CreateTransaction = async ({
  reference,
  buyerId,
  formData,
  redirectUrl,
}) => {
  const transactionData = {
    reference,
    buyerId,
    formData,
    redirectUrl,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${CREATE_TRANSACTION}`,
    transactionData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const VerifyTransactionDetails = async ({ formData }) => {
  const transactionData = {
    formData,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${VERIFY_TRANSACTION_DETAILS}`,
    transactionData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const VerifyTransaction = async ({ transactionId, action }) => {
  const transactionData = {
    transactionId,
    action,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${VERIFY_TRANSACTION}`,
    transactionData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};
