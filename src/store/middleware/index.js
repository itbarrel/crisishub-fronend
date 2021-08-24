import logger from "./logger";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const middleware = () => {
  return [
    ...getDefaultMiddleware(),
    logger("CrisisHub-Fronted")
  ];
};

export default middleware;
