import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
    name: "category",
    initialState: {
        list: [],
        update_item: [],
        // formType: [],
    },
    reducers: {
        all: (state, action) => {
            state.list = action.payload.data;
        },
        add: (state, action) => {
            state.list.unshift(action.payload);
        },
        update: (state, action) => {
            const haveID = state.list.findIndex(
                (category) => category.id === action.payload.id
            );
            state.list[haveID] = action.payload;
        },
        remove: (state, action) => {
            // eslint-disable-next-line no-negated-condition
            const update = state.list.filter((category) => (category.id !== state.update_item?.id ? category : null)
            );
            state.list = update;
        },
        formType: (state, action) => {
            const { payload } = action;
            state.formType = payload.data;
        },
        current_item: (state, action) => {
            state.update_item = action.payload;
        },
        failed: (state) => {
            state.hasErrors = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAll, (state) => {
            state.list = [];
            state.update_item = [];
            // state.formType = [];
        });
    },
});

export const { loading, all, add, update, remove, current_item, formType, failed } = slice.actions;

export const getCategoryList = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/categories",
            method: "get",
            data,
            onSuccess: all.type,
            onError: failed.type,
        })
    );
};

export const getFilteredCategoryList = (filter) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/categories",
            method: "get",
            data: filter,
            onStart: loading.type,
            onSuccess: all.type,
            onError: failed.type,
        })
    );
};

export const addCategory = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/categories",
            method: "post",
            data,
            // onStart: loading.type,
            onSuccess: add.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export const removeCategory = (id) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `v1/categories/${id}`,
            method: "delete",
            // onStart: loading.type,
            onSuccess: remove.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export const updateCategory = (id, data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `v1/categories/${id}`,
            method: "put",
            data,
            // onStart: loading.type,
            onSuccess: update.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export default slice.reducer;
