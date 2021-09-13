import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { login as _login, logout as _logout } from "../../../services/Auth";
import {
  NAV_STYLE,
  NAV_STYLE_FIXED,
  SET_PATH_NAME,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK
} from "../../../constants/ThemeSetting";

const slice = createSlice({
  name: "ui-settings",
  initialState: {
    navCollapsed: true,
    navStyle: NAV_STYLE_FIXED,
    themeType: THEME_TYPE_SEMI_DARK,
    pathname: '',
    width: 1367,
    isDirectionRTL: false,
    locale: {
      languageId: 'russian',
      locale: 'ru',
      name: 'Русский',
      icon: 'ru'
    }
  },
  reducers: {
    loading: (state, action) => {
      state.loader = true;
    },
    toggleCollapsedNav: (state, action) => {
      const { navCollapsed } = action.payload.navCollapsed
      state.navCollapsed = navCollapsed
    },
    switchLanguage: (state, action) => {
      const { local } = action.payload
      state.locale = local;
    },
    failed: (state, action) => {
      state.loader = false;
      state.hasErrors = true
    },
  },
});

export const { loading, failed } = slice.actions;

export default slice.reducer;
