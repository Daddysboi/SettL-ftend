import axios from "axios";

import {
  MAILING_LIST,
  CONTACT_OUR_SUPPORT,
  DISPUTE_TRANSACTION,
  UPDATE_TRANSACTION_STATUS,
} from "../services/CONSTANTS";

export const SaveEmailToMailingList = async ({ email }) => {
  const data = { email };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${MAILING_LIST}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const ContactOurSupport = async ({ fullName, email, message }) => {
  const data = { fullName, email, message };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${CONTACT_OUR_SUPPORT}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const DisputeTransaction = async ({
  transactionId,
  reason,
  description,
  userId,
}) => {
  const data = { transactionId, reason, description, userId };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${DISPUTE_TRANSACTION}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdateTransactionStatus = async ({ transactionId, newStatus }) => {
  const data = { transactionId, newStatus };
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_TRANSACTION_STATUS}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};
