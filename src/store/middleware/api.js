import * as actions from "../apiActions";
import apiClient from "../../services/ApiClient";
import { log } from '../../utils/console-log'

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  apiClient.doRequest(method, url, data)
    .then(resp => resp.json())
    .then(response => {
      // General
      log("API Call == Response ", response)
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
