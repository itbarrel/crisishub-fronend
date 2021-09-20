import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "Accounts",
    initialState: {
        loading: false,
        list: [],
        update_item: {},
    },
    reducers: {
        loading: (state, action) => {
            state.loading = true;
        },
        all: (state, action) => {
            const { payload } = action
            state.list = payload
            state.loading = false;
        },
        add: (state, action) => {
            state.list.unshift(action.payload);
            state.loading = false;
        },
        show: (state, action) => {
            const { payload } = action
            state.accounts = payload
        },
        failed: (state, action) => {
            state.loading = false;
            state.hasErrors = true
        },
    },
});

export const { loading, all, show, add, failed, } = slice.actions;

export const getAccountsList = () => (dispatch, getState) => {
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

export const addAccount = (data) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/accounts',
            method: "post",
            data,
            onStart: loading.type,
            onSuccess: add.type,
            onError: failed.type
        })
    )
};

export default slice.reducer;
