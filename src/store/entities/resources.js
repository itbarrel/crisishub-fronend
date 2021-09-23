import { combineReducers } from "@reduxjs/toolkit";
import { Account, User, Role } from "../slices/resources";

export default combineReducers({
    Account, User, Role
});
