import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetUserById,
  UpdateUserBankDetails,
  UpdateUserContactDetails,
  UpdateUserProfile,
  UpdateUserKycDetails,
  UpdatePassword,
} from "../services/user.services";

const initialState = {
  user: {},
  users: [],
};

export const getUserById = createAsyncThunk("getUserById", async (userId) => {
  try {
    const resp = await GetUserById(userId);
    return resp;
  } catch (error) {
    throw error;
  }
});

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({ userId, firstName, lastName, phoneNumber, profilePicture }) => {
    try {
      const resp = await UpdateUserProfile({
        userId,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const updateUserBankDetails = createAsyncThunk(
  "updateUserBankDetails",
  async ({ userId, accountName, bankName, accountNumber, password }) => {
    try {
      const resp = await UpdateUserBankDetails({
        userId,
        accountName,
        bankName,
        accountNumber,
        password,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const updateUserContactDetails = createAsyncThunk(
  "updateUserContactDetails",
  async ({
    userId,
    homeAddress,
    nearestLandmark,
    officeAddress,
    postalCode,
    proofOfAddress,
  }) => {
    try {
      const resp = await UpdateUserContactDetails({
        userId,
        homeAddress,
        nearestLandmark,
        officeAddress,
        postalCode,
        proofOfAddress,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const updateUserKycDetails = createAsyncThunk(
  "updateUserKycDetails",
  async ({
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
    try {
      const resp = await UpdateUserKycDetails({
        headShot,
        idType,
        idNumber,
        idCard,
        nextOfKinFullName,
        nextOfKinRelationship,
        nextOfKinContactNumber,
        bvn,
        userId,
      });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ userId, oldPassword, newPassword }) => {
    try {
      const resp = await UpdatePassword({ userId, oldPassword, newPassword });
      return resp;
    } catch (error) {
      throw error; // Throw the error to let Redux Toolkit handle the rejection
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.user = payload;
    },
    setUsers: (state, action) => {
      const { payload } = action;
      state.users = payload;
    },
  },
  extraReducers: (builder) => {
    // updateUserProfile actions
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });

    // updateUserBankDetails actions
    builder.addCase(updateUserBankDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserBankDetails.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserBankDetails.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });

    // updateUserContactDetails actions
    builder.addCase(updateUserContactDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserContactDetails.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserContactDetails.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });

    // updateUserKycDetails actions
    builder.addCase(updateUserKycDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserKycDetails.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserKycDetails.rejected, (state) => {
      state.isLoggedIn = false;
      // state.user = null;
      state.isLoading = false;
    });

    // update password
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
  },
});

const { actions, reducer } = userSlice;
export const { setCount, setUser, setUsers } = actions;

export default reducer;
