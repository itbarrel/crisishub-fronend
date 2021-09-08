import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // if (action.type !== actions.apiCallBegan.type) return console.log("-----------", action.type);

    if (action.type !== actions.apiCallBegan.type) return next(action);
    // next(action);
    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    // next(action);

    const response = await AuthLoginAPI(data);

    // const response = {};
    console.log("asdf", response);
    next(action);
  };

export default api;
