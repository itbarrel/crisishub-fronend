import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        list: [],
        update_item: [],
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
            const update = state.list.filter(user => user.id !== payload ? user : null)
            state.list = update

            state.loading = false;
        },
        update: (state, action) => {
            const haveID = state.list.findIndex((id) => id.id === action.payload.id) // return index of arr
            state.list[haveID] = action.payload
            state.loading = false;
            // const hasID = !!state.list.find((id) => id.id === payload.id) //recommended return true / false
            // const isID = state.list.includes("544d4ed1-cf26-4e4a-a662-92d69535de0f") // true / false
        },
        current_item: (state, action) => {
            state.update_item = action.payload;
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

export const { loading, all, add, remove, update, current_item, show, failed, } = slice.actions

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

export const updateUser = (id, data) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: `v1/users/${id}`,
            method: "put",
            data,
            onStart: loading.type,
            onSuccess: update.type,
            onError: failed.type
        })
    )
};

export default slice.reducer
