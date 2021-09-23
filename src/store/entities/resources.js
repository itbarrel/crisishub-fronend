import { combineReducers } from "@reduxjs/toolkit";
import { Account, User, departments, incidents } from "../slices/resources";

export default combineReducers({
  Account,
  User,
  departments,
  incidents,
});
