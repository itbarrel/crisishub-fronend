import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "users",
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
            state.list.unshift(action.payload.user);
            state.loading = false;
        },
        remove: (state, action) => {
            const { payload } = action
            // Filtered or update table state here
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

export const { loading, all, add, remove, show, failed, } = slice.actions

export const getUserList = () => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/users',
            method: "get",
            onStart: loading.type,
            onSuccess: all.type,
            onError: failed.type
        })
    )
};

export const addUser = (data) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/users',
            method: "post",
            data,
            onStart: loading.type,
            onSuccess: add.type,
            onError: failed.type
        })
    )
};

export const removeUser = (id) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: `v1/users/${id}`,
            method: "delete",
            onStart: loading.type,
            onSuccess: remove.type,
            onError: failed.type
        })
    )
};

export default slice.reducer
