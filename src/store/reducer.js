import { combineReducers } from "@reduxjs/toolkit";
import { ui, resources } from "./entities";

// sliceses and entities
import auth from "./slices/auth";
import notification from "./slices/notification";

// combine entities and sliceses
export default combineReducers({
  auth,
  notification,
  resources,
  ui
});
