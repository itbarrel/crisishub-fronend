import { combineReducers } from "@reduxjs/toolkit";
import { ui, resources } from "./entities";

// slices and entities
import auth from "./slices/auth";
import notification from "./slices/notification";

// combine entities and slices
export default combineReducers({
  auth,
  notification,
  resources,
  ui
});
