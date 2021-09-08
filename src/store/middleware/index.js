import logger from "./logger";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../middleware/api";

const middleware = () => {
  return [...getDefaultMiddleware(), api];
};

export default middleware;
