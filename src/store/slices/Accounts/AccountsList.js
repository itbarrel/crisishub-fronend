import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "Accounts",
    initialState: {
        loader: false,
        list: {}
    },
    reducers: {
        loading: (state, action) => {
            state.loader = true;
        },
        AccountsList: (state, action) => {
            const { payload } = action
            state.list = payload

        },
        failed: (state, action) => {
            state.loader = false;
            state.hasErrors = true
        },
    },
});

export const { loading, AccountsList, failed, } = slice.actions;

export const getAccountsList = (data) => (dispatch, getState) => {
    console.log("asdf  api dispatch")
    return dispatch(
        apiCallBegan({
            url: 'v1/auth/login',
            method: "get",
            data: { domain: 'public' },
            onStart: loading.type,
            onSuccess: AccountsList.type,
            onError: failed.type
            // url: 'v1/accounts',
            // method: "get",
            // data: data,
            // token: true,
            // onStart: loading.type,
            // onSuccess: AccountsList.type,
            // onError: failed.type
        })
    )
};

export default slice.reducer;
