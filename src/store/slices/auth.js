import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, at: null, rt: null, ei: null },
  reducers: {
    login: (state, action) => {
      console.log("slice:auth login", action);
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.at = action.payload?.access_token;
      state.rt = action.payload?.refresh_token;
      state.ei = action.payload?.expires_in;
    },
    logout: (state, action) => {
      console.log("slice:auth logout", action);
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.at = null;
      state.rt = null;
      state.ei = null;
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
