import { combineReducers } from "@reduxjs/toolkit";

// sliceses and entities
import config from "./slices/configuration";
import notification from "./slices/notification";
import ui from "./slices/ui";
import auth from "./slices/auth";
import user from "./slices/user";

// combine entities and sliceses
export default combineReducers({
  // config,
  // notification,
  // ui,
  auth,
  // user,
});
