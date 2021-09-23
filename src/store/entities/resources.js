import { combineReducers } from "@reduxjs/toolkit";
import { Account, User, Departments, Incidents, Task } from "../slices/resources";

export default combineReducers({
  Account,
  User,
  Departments,
  Incidents,
  Task,
});
