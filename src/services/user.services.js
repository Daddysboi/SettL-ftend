import axios from "axios";
import {
  GET_USER_BY_ID,
  UPDATE_USER_PROFILE,
  UPDATE_USER_BANK_DETAILS,
  UPDATE_USER_CONTACT_DETAILS,
  UPDATE_USER_KYC_DETAILS,
  CHANGE_PASSWORD,
} from "./CONSTANTS";
import { USER_TOKEN } from "./CONSTANTS";

export const GetUserById = async (userId) => {
  const token = localStorage.getItem(USER_TOKEN);
  const id = JSON.parse(userId);
  const parsedToken = JSON.parse(token);

  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/${GET_USER_BY_ID}/${id}`,
    {
      headers: {
        Authorization: parsedToken,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdateUserProfile = async ({
  userId,
  firstName,
  lastName,
  phoneNumber,
  profilePicture,
}) => {
  const data = { userId, firstName, lastName, phoneNumber, profilePicture };
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_USER_PROFILE}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdateUserBankDetails = async ({
  userId,
  accountName,
  bankName,
  accountNumber,
  password,
}) => {
  const data = { userId, accountName, bankName, accountNumber, password };
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_USER_BANK_DETAILS}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdateUserContactDetails = async ({
  userId,
  homeAddress,
  nearestLandmark,
  officeAddress,
  postalCode,
  proofOfAddress,
}) => {
  const data = {
    userId,
    homeAddress,
    nearestLandmark,
    officeAddress,
    postalCode,
    proofOfAddress,
  };
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_USER_CONTACT_DETAILS}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdateUserKycDetails = async ({
  headShot,
  idType,
  idNumber,
  idCard,
  nextOfKinFullName,
  nextOfKinRelationship,
  nextOfKinContactNumber,
  bvn,
  userId,
}) => {
  const data = {
    headShot,
    idType,
    idNumber,
    idCard,
    nextOfKinFullName,
    nextOfKinRelationship,
    nextOfKinContactNumber,
    bvn,
    userId,
  };
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${UPDATE_USER_KYC_DETAILS}`,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export const UpdatePassword = async ({ userId, oldPassword, newPassword }) => {
  const details = { userId, oldPassword, newPassword };
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${CHANGE_PASSWORD}`,
    details,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};
