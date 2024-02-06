import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserById } from "../services/user.services";

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
});

const { actions, reducer } = userSlice;
export const { setCount, setUser, setUsers } = actions;

export default reducer;
