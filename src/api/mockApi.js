// src/api/mockApi.js
import axios from "axios";

const baseURL = "http://localhost:3000"; // Update with your mock server URL

const instance = axios.create({
  baseURL,
});

export const mockGoogleSignInEndpoint = async (token) => {
  try {
    const response = await instance.post("/mock-google-signin", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};
