import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ContactOurSupport,
  SaveEmailToMailingList,
  DisputeTransaction,
} from "../services/utility.services";

const initialState = {};

export const saveEmailToMailingList = createAsyncThunk(
  "saveEmailToMailingList",
  async ({ email }) => {
    try {
      const resp = await SaveEmailToMailingList({
        email,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const contactOurSupport = createAsyncThunk(
  "contactOurSupport",
  async ({ fullName, email, message }) => {
    try {
      const resp = await ContactOurSupport({
        fullName,
        email,
        message,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const disputeTransaction = createAsyncThunk(
  "disputeTransaction",
  async ({ fullName, email, message }) => {
    try {
      const resp = await DisputeTransaction({
        fullName,
        email,
        message,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // saveEmailToMailingList actions
    builder.addCase(saveEmailToMailingList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveEmailToMailingList.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(saveEmailToMailingList.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });

    // contactOurSupport actions
    builder.addCase(contactOurSupport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(contactOurSupport.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(contactOurSupport.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
  },
});

const { reducer } = utilitySlice;
export default reducer;
