import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";
import { baseURL } from '../../configs/index'
import ApiService, { api as apis, secureapi } from "../../services/api/api.config";

import apiClient from "../../services/ApiClient";

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  apiClient.doRequest(method, url, data)
    .then(resp => resp.json())
    .then(response => {
      // General
      dispatch(actions.apiCallSuccess(response));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response });
    }).catch((error) => {
      // General
      dispatch(actions.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });

    })
};

export default api;
