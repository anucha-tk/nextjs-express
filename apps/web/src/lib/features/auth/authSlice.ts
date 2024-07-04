import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user.interface";

type AuthState = {
  isAuthenticated: boolean;
  user: Partial<User> | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutReducer: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    authReducer: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        firstName: action.payload.firstName,
      };
    },
  },
});

export const { loginReducer, logoutReducer, authReducer } = authSlice.actions;
export default authSlice.reducer;
