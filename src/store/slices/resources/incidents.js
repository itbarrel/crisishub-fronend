import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
  name: "incident",
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
});

export const { loading, all, add, remove, update, current_item, failed } = slice.actions;

export const getIncidentList = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incidents",
      method: "get",
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addIncident = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incidents",
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const removeIncident = (id) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incidents/${id}`,
      method: "delete",
      onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true
    })
  );
};

export const updateIncident = (id, data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incidents/${id}`,
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
