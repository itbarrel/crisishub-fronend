import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import Accounts from "./Account";

export default combineReducers({
  Accounts,
  user,
});
