import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";
import { baseURL } from '../../configs/index'
import ApiService, { api as apis, secureapi } from "../../services/api/api.config";
import { HTTP_METHOD } from '../../constants/constants'
import { CookieService } from "../../services/storage.service";



const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, token } = action.payload;

  if (onStart) dispatch({ type: onStart });
  const cashtoken = CookieService.getToken()
  console.log("tt", cashtoken)
  next(action);
  try {
    let response = '';
    switch (method) {
      case "get":
        if (token) {
          await ApiService.setAuthorization(token)
          console.log("Api call >> get token",);
          response = await apis.get(url);
        } else {
          response = await apis.get(url);
          console.log("Api call >> get !token",);
        }
        break;
      case "post":
        if (token) {
          await ApiService.setAuthorization(token)
          console.log("Api call >> post token",);
          response = await apis.post(url, data);
        } else {
          console.log("Api call >> post !token",);
          response = await apis.post(url, data);
        }
        break;
      default:
    }

    console.log("response in restApiCallerMiddleware");
    console.log(response);
    console.log(response.status);
    console.log(response.data.payload);

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
