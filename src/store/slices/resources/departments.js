import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "../../apiActions";

const slice = createSlice({
  name: "departments",
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    loading: (state, action) => {
      state.loading = true;
    },
    all: (state, action) => {
      state.list = action.payload
      state.loading = false;
    },
    add: (state, action) => {
      state.list.unshift(action.payload);
      state.loading = false;
    },
    update: (state, action) => {
      const haveID = state.list.findIndex((department) => department.id === action.payload.id)
      state.list[haveID] = action.payload
      state.loading = false;
    },
    failed: (state, action) => {
      state.loading = false;
      state.hasErrors = true
    },
  },
});

export const { loading, all, add, update, failed, } = slice.actions

export const getDepartmentsList = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: 'v1/departments',
      method: "get",
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type
    })
  )
};

export const addDepartment = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: 'v1/departments',
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type
    })
  )
};

export const updateDepartment = (id, data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `v1/departments/${id}`,
      method: "put",
      data,
      onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type
    })
  )
};

export default slice.reducer
