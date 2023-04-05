import { createSlice } from "@reduxjs/toolkit";
import users from "../fakeDB/users";

const initialState = {
  id: -1,
  phone: "",
  token: "",
  error: "",
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      matchedAccount = users.find(
        (user) =>
          user.phone === action.payload.phone &&
          user.password === action.payload.password
      );

      if (matchedAccount) {
        state.id = matchedAccount.id;
        state.phone = matchedAccount.phone;
        state.token = matchedAccount.token;
        state.error = "";
        state.isSignedIn = true;
      } else {
        state.error = "The username or password is incorrect";
        state.isSignedIn = false;
      }
    },
    logout: (state, action) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
