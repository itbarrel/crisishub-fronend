import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../apiActions";
import { login as _login, logout as _logout } from "../../services/Auth";

const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    permissions: {},
    loader: false,
    user: null,
    token: null,
    hasErrors: false
  },
  reducers: {
    loading: (state) => {
      state.loader = true;
    },
    login: (state, action) => {
      const { token, user, permissions } = action.payload
      state.loader = false;
      state.token = token;
      state.isAuthenticated = !!token;
      state.permissions = permissions
      state.user = user
      state.hasErrors = false
      _login(token)
    },
    logout: (state) => {
      _logout()
      state.isAuthenticated = false;
      state.loader = false;
      state.user = null
      state.token = null
      state.permissions = {}
      state.hasErrors = false
    },
    update: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    changePassword: (state) => {
      state.loader = false;
    },
    failed: (state) => {
      state.loader = false;
      state.hasErrors = true
    },
  }
});

export const { loading, login, logout, update, changePassword, failed } = slice.actions;

export const onLogin = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: 'v1/auth/login',
      method: "post",
      data: data,
      onStart: loading.type,
      onSuccess: login.type,
      onError: failed.type,
      notify: true
    })
  )
};

export const updateProfile = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/users/${id}`,
      method: "put",
      data,
      onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const updatePassword = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/auth/changepassword`,
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: changePassword.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const onLogOut = () => (dispatch) => {
  dispatch(resetAll())
  return dispatch(logout())
};

export default slice.reducer;
