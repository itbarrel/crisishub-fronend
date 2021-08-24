import { createSlice } from "@reduxjs/toolkit";

const configurations = createSlice({
  name: "configurations",
  initialState: { name: "NextGen360" },
  reducers: {
    configurationAdded: (configuration, action) => {
      configuration.name = action.payload;
    },
  },
});

export const { configurationAdded } = configurations.actions;
export default configurations.reducer;
