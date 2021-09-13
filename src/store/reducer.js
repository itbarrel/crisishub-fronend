import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from "./entities";
import ui from "./entities/ui";

// sliceses and entities
import auth from "./slices/auth";
import notification from "./slices/notification";

// combine entities and sliceses
export default combineReducers({
  auth,
  notification,
  entities: entitiesReducer,
  ui
});
