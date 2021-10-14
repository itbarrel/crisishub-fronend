import { combineReducers } from "@reduxjs/toolkit";
import {
  Account,
  User,
  Role,
  Departments,
  Incidents,
  Task,
} from "../slices/resources";

export default combineReducers({
  Account,
  User,
  Role,
  Departments,
  Incidents,
  Task,
});
