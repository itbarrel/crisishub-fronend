import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "Tasks",
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
      state.list = action.payload;
      state.loading = false;
    },
    add: (state, action) => {
      state.list.unshift(action.payload);
      state.loading = false;
    },
    remove: (state, action) => {
      const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null));
      state.list = update;
      state.loading = false;
    },
    update: (state, action) => {
      const haveID = state.list.findIndex((department) => department.id === action.payload.id);
      state.list[haveID] = action.payload;
      state.loading = false;
    },
    current_item: (state, action) => {
      state.update_item = action.payload;
    },
    failed: (state, action) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAll, (state, action) => {
        // action is inferred correctly here if using TS
        state.loading = false
        state.list = []
        state.update_item = []
      })
  },
});

export const { loading, all, add, remove, update, current_item, failed } = slice.actions;

export const getTaskList = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "v1/tasks",
      method: "get",
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addTask = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "v1/tasks",
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const removeTask = (id) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `v1/tasks/${id}`,
      method: "delete",
      onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const updateTask = (id, data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `v1/tasks/${id}`,
      method: "put",
      data,
      onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true
    })
  );
};

export default slice.reducer;
