import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "categoryMessage",
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
      const update = state.list.filter((categoryMessage) =>
        categoryMessage.id !== state.update_item?.id ? categoryMessage : null
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

export const {
  loading,
  all,
  add,
  update,
  remove,
  current_item,
  formType,
  failed,
} = slice.actions;

export const getCategoryMessageList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/categoryMessages",
      method: "get",
      data,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const getFilteredCategoryMessageList = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages?parentId=${id}`,
      method: "get",
      data: filter,
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addCategoryMessage = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/categoryMessages",
      method: "post",
      data,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeCategoryMessage = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages/${id}`,
      method: "delete",
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateCategoryMessage = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages/${id}`,
      method: "put",
      data,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateCategoryMessageIndex = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/categoryMessages/${id}/sortOrder`,
      method: "put",
      data,
      notify: true,
    })
  );
};

export default slice.reducer;
