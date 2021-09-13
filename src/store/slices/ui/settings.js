import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";
import { login as _login, logout as _logout } from "../../../services/Auth";

import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  THEME_COLOR_SELECTION,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK,
  NAV_STYLE_MINI_SIDEBAR
} from "../../../constants/ThemeSetting";

const slice = createSlice({
  name: "ui-settings",
  initialState: {
    navCollapsed: true,
    navStyle: NAV_STYLE_MINI_SIDEBAR,
    layoutType: LAYOUT_TYPE_FULL,
    themeType: THEME_TYPE_SEMI_DARK,
    colorSelection: THEME_COLOR_SELECTION_PRESET,

    pathname: '',
    // width: "WINDOW_WIDTH",
    width: 1367,
    isDirectionRTL: false,
    locale: {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'us'
    }
  },
  reducers: {
    loading: (state, action) => {
      state.loader = true;
    },
    toggleCollapsedNav: (state, action) => {
      const { payload } = action
      state.navCollapsed = payload
    },
    setPathName: (state, action) => {
      const { payload } = action
      state.pathname = payload
    },
    windowWidth: (state, action) => {
      const { payload } = action
      state.width = payload
    },
    themeType: (state, action) => {
      const { payload } = action
      state.themeType = payload
    },
    navStyle: (state, action) => {
      const { payload } = action
      state.navStyle = payload
    },
    layoutType: (state, action) => {
      const { payload } = action
      state.layoutType = payload
    },
    themeColorSelected: (state, action) => {
      const { payload } = action
      state.colorSelection = payload
    },
    switchLanguage: (state, action) => {
      const { payload } = action
      state.locale = payload;
    },
    failed: (state, action) => {
      state.loader = false;
      state.hasErrors = true
    },
  },
});

export const { loading, toggleCollapsedNav, setPathName, windowWidth, themeType, navStyle, layoutType, themeColorSelected, switchLanguage, failed, } = slice.actions;


export const toggleCollapsedSideNav = (navCollapsed) => (dispatch, getState) => {
  return dispatch(toggleCollapsedNav(navCollapsed))
};
export const updateWindowWidth = (width) => (dispatch, getState) => {
  return dispatch(windowWidth(width))
};
export const setThemeType = (data) => (dispatch, getState) => {
  return dispatch(themeType(data))
};
export const onNavStyleChange = (data) => (dispatch, getState) => {
  return dispatch(navStyle(data))
};
export const settingPathName = (data) => (dispatch, getState) => {
  return dispatch(setPathName(data))
};
export const onLayoutTypeChange = (data) => (dispatch, getState) => {
  return dispatch(layoutType(data))
};

export default slice.reducer;
