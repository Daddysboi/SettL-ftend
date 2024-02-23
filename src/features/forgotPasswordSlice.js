import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestResetPassword, ResetPassword } from "../services/auth.services";

const initialState = {
  loginPhone: "",
  isLoggedIn: false,
  isLoading: false,
};

export const requestResetPassword = createAsyncThunk(
  "requestResetPassword",
  async ({ email, redirectUrl }) => {
    try {
      const resp = await RequestResetPassword({ email, redirectUrl });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ userId, resetString, newPassword }) => {
    try {
      const resp = await ResetPassword({ userId, resetString, newPassword });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login actions
    builder.addCase(requestResetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestResetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(requestResetPassword.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    // change password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
  },
});

const { reducer } = forgotPasswordSlice;
export default reducer;
