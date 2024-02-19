import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ContactOurSupport,
  SaveEmailToMailingList,
  DisputeTransaction,
  UpdateTransactionStatus,
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

export const updateTransactionStatus = createAsyncThunk(
  "updateTransactionStatus",
  async ({ transactionId, newStatus }) => {
    try {
      const resp = await UpdateTransactionStatus({
        transactionId,
        newStatus,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const disputeTransaction = createAsyncThunk(
  "disputeTransaction",
  async ({ transactionId, reason, description, userId }) => {
    try {
      const resp = await DisputeTransaction({
        transactionId,
        reason,
        description,
        userId,
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

    // updateTransactionStatus actions
    builder.addCase(updateTransactionStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTransactionStatus.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateTransactionStatus.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    // dispute Transaction actions
    builder.addCase(disputeTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(disputeTransaction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(disputeTransaction.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
  },
});

const { reducer } = utilitySlice;
export default reducer;
