import logger from "./logger";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./api";
import toast from "./toast";

const middleware = () => {
  return [...getDefaultMiddleware(), toast, api];
};

export default middleware;
