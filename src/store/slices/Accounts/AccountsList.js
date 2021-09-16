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

export const getAccountsList = (token) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/accounts',
            method: "get",
            token: token,
            onStart: loading.type,
            onSuccess: AccountsList.type,
            onError: failed.type
        })
    )
};

export default slice.reducer;
