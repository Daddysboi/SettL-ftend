import axios from "axios";

import { MAILING_LIST, CONTACT_OUR_SUPPORT } from "../services/CONSTANTS";

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
