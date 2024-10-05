import { createSlice } from "@reduxjs/toolkit";

// initial state before being fire of api calls

const initialState = {
  userName: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userName = "";
      state.token = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice;
