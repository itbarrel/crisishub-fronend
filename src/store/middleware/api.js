import * as actions from "../apiActions";
import apiClient from "../../services/ApiClient";
import { log } from '../../utils/console-log'
import { notification } from 'antd';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  apiClient.doRequest(method, url, data)
    .then(response => {
      // General
      log("API Call == Response ", response)
      dispatch(actions.apiCallSuccess(response));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response });
    })
    .catch((err) => {
      // General
      err.response.json().then((error) => {
        dispatch(actions.apiCallFailed(error.message));
        notification['error']({
          message: 'Something went wrong',
          description: error.message
        });
        // Specific
        if (onError) dispatch({ type: onError, payload: error.message });
      })
    })
};

export default api;
