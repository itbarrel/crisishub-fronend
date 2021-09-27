import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import logger from "./logger";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./api";
import toast from "./toast";

const middleware = () => {
  return [
...getDefaultMiddleware({
    serializableCheck: {

      /* ignore persistance actions */
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }), toast, api
];
};

export default middleware;
