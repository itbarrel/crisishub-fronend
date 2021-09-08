import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../apiActions";
import { USER_SIGNIN } from "../../constants/api-endpoints";

const slice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, loader: false, profile: { userToken: {}, userInfo: {} } },
  reducers: {
    authLoader: (state, action) => {
      console.log("load >>>>>>>>", state.loader);
      state.loader = true;
    },
    login: (state, action) => {
      console.log("slice:auth login", action);
      state.isAuthenticated = action.payload?.isAuthenticated;
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

export const login = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      data: data,
      // onStart: authLoader.type,
    })
  );
};

export const { Authlogin, logout } = slice.actions;
export default slice.reducer;
