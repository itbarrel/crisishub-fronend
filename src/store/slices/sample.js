import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
    name: "ui-settings",
    initialState: {},
    reducers: {
        loading: (state, action) => {
            state.loader = true;
        },
        Sample1: (state, action) => {
            const { payload } = action
            state.navCollapsed = payload
        },
        failed: (state, action) => {
            state.loader = false;
            state.hasErrors = true
        },
    },
});

export const { loading, Sample1, failed, } = slice.actions;

export const func = (data) => (dispatch, getState) => {
    return dispatch(toggleCollapsedNav(data))
};

export default slice.reducer;
