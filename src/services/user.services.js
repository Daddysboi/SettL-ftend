import axios from "axios";
import { GET_USER_BY_ID } from "./CONSTANTS";
import { USER_TOKEN } from "./CONSTANTS";

export const GetUserById = async (userId) => {
  const token = localStorage.getItem(USER_TOKEN);
  const id = JSON.parse(userId);
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/${GET_USER_BY_ID}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};
