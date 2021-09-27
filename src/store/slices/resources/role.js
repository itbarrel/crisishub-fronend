import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
    name: "roles",
    initialState: {
        loading: false,
        records: [],
        index: -1,
        entities: [],
        operations: [],
        hasErrors: false
    },
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        all: (state, action) => {
            const { payload } = action
            state.records = payload
            state.loading = false;
        },
        add: (state, action) => {
            state.records.unshift(action.payload.role);
            state.loading = false;
        },
        remove: (state, action) => {
            const { payload } = action
            const update = state.records.filter(role => role.id !== payload ? role : null)
            state.records = update
            state.loading = false;
        },
        update: (state, action) => {
            const { payload } = action
            const haveID = state.records.findIndex((elem) => elem.id === payload.id) // return index of arr
            state.records[haveID] = action.payload
            state.loading = false;
        },
        current_item: (state, action) => {
            state.index = action.payload;
            state.loading = false;
        },
        setEntities: (state, action) => {
            const { payload } = action
            state.entities = payload.entities
            state.operations = payload.operations
            state.loading = false;
        },
        failed: (state, action) => {
            state.loading = false;
            state.hasErrors = true
        },
    },
});

export const { loading, all, add, remove, update, current_item, setEntities, failed, } = slice.actions

export const getRolesList = () => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/roles',
            method: "get",
            onStart: loading.type,
            onSuccess: all.type,
            onError: failed.type
        })
    )
};

export const addRole = (data) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: 'v1/roles',
            method: "post",
            data,
            onStart: loading.type,
            onSuccess: add.type,
            onError: failed.type
        })
    )
};

export const removeRole = (id) => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: `v1/roles/${id}`,
            method: "delete",
            onStart: loading.type,
            onSuccess: remove.type,
            onError: failed.type
        })
    )
};

export const updateRole = (id, data) => (dispatch, getState) => {
    dispatch
    return dispatch(
        apiCallBegan({
            url: `v1/roles/${id}`,
            method: "put",
            data,
            onStart: loading.type,
            onSuccess: update.type,
            onError: failed.type
        })
    )
};

export const getPermissionEntities = () => (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            url: `v1/roles/permissions`,
            method: "get",
            onStart: loading.type,
            onSuccess: setEntities.type,
            onError: failed.type
        })
    )
};

export default slice.reducer
