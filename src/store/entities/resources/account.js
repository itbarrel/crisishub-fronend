import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "Accounts",
    initialState: {
        loader: false,
        account: {},
        accounts: []
    },
    reducers: {
        loading: (state, action) => {
            state.loader = true;
        },
        all: (state, action) => {
            const { payload } = action
            state.accounts = payload
        },
        show: (state, action) => {
            const { payload } = action
            state.accounts = payload
        },
        failed: (state, action) => {
            state.loader = false;
            state.hasErrors = true
        },
    },
});

export const { loading, all, show, failed, } = slice.actions;

export const getAccountsList = (token) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/accounts',
            method: "get",
            token: true,
            onStart: loading.type,
            onSuccess: all.type,
            onError: failed.type
        })
    )
};

export default slice.reducer;
