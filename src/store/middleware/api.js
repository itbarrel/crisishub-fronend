import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";
import { baseURL } from '../../configs/index'
import ApiService, { api as apis, secureapi } from "../../services/api/api.config";


const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, token } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  try {
    if (token) {
      const response = await secureapi.get(`${url}`, data);
    }
    else {
      const response = await apis.post(`${url}`, data);
    }
    // const response = await axios.request({
    //   baseURL: "http://new.crisishub.co/",
    //   url,
    //   method,
    //   data
    // });
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
