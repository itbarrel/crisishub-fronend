import { combineReducers } from "@reduxjs/toolkit";
import { Account, User, departments } from "../slices/resources";

export default combineReducers({
    Account, User, departments
});
