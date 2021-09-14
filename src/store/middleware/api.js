import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";
import { baseURL } from '../../configs/index'
import ApiService, { api as apis } from "../../services/api/api.config";


const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, token } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  try {
    // if (token) {
    //   console.log("asdf  api call began token")
    //   await ApiService.setAuthorization;
    //   return response = await apis?.[method](`${url}`, data);
    // }
    // else {
    //   console.log("asdf  api cal began >!token")
    //   return response = await apis?.[method](`${url}`, data);
    // }
    const response = await apis.get(url, data);
    console.log('asdf ----body', data)
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
