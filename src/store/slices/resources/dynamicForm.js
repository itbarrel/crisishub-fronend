import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "dynamicForm",
  initialState: {
    list: [],
    update_item: [],
  },
  reducers: {
    add: (state, action) => {
      state.list.unshift(action.payload);
    },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((form) => (form.id !== action.payload ? form : null)
      );
      state.list = update;
    },
    failed: (state) => {
      state.hasErrors = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, (state) => {
      state.list = [];
      state.update_item = [];
    });
  },
});

export const { add, remove, failed } = slice.actions;

export default slice.reducer;
