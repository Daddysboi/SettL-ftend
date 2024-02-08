import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Register, SendOtp } from "../services/auth.services";

const initialState = {};

export const sendOtp = createAsyncThunk("sendOtp", async ({ email }) => {
  try {
    const resp = await SendOtp({
      email,
    });
    return resp;
  } catch (error) {
    throw error; // Throw the error to let Redux Toolkit handle the rejection
  }
});

export const register = createAsyncThunk(
  "signup",
  async ({ firstName, lastName, email, password, role, otp }) => {
    try {
      const resp = await Register({
        firstName,
        lastName,
        email,
        password,
        role,
        otp,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login actions
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
  },
});

const { actions, reducer } = registerSlice;
export const { setLoginPhone } = actions;
export default reducer;
