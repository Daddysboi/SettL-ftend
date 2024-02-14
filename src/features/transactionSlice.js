import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateTransaction,
  VerifyTransaction,
  VerifyTransactionDetails,
} from "../services/transactions.services";

const initialState = {
  transactions: [],
};

export const createTransaction = createAsyncThunk(
  "createTransaction",
  async ({ reference, buyerId, formData, redirectUrl }) => {
    try {
      const resp = await CreateTransaction({
        reference,
        buyerId,
        formData,
        redirectUrl,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const verifyTransactionDetails = createAsyncThunk(
  "verifyTransactionDetails",
  async ({ formData }) => {
    try {
      const resp = await VerifyTransactionDetails({
        formData,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const verifyTransaction = createAsyncThunk(
  "verifyTransaction",
  async ({ transactionId, action }) => {
    try {
      const resp = await VerifyTransaction({
        transactionId,
        action,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      const { payload } = action;
      state.transactions = payload;
    },
  },
  extraReducers: (builder) => {
    // create transactions actions
    builder.addCase(createTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
    // verify transactions actions
    builder.addCase(verifyTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyTransaction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyTransaction.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
    // verify transactions details actions
    builder.addCase(verifyTransactionDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyTransactionDetails.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyTransactionDetails.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });
  },
});

const { actions, reducer } = transactionSlice;
export const { setTransactions } = actions;

export default reducer;
