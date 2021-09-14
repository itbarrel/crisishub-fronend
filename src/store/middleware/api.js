import axios from "axios";
import * as actions from "../apiActions";
import { AuthLoginAPI } from "../../lib/login";
import { baseURL } from '../../configs/index'
import ApiService, { api as apis, secureapi } from "../../services/api/api.config";


const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError, token } = action.payload;

  if (onStart) dispatch({ type: onStart });
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzZWQxZGQyLTA2NTMtNDJiZS05NDZmLTg3YzRiZGY1OWY4YiIsImVtYWlsIjoic3VwZXJhZG1pbkBjcmlzaXNodWIuY29tIiwidXNlck5hbWUiOiJTdXBlckFkbWluIiwiZG9tYWluIjoicHVibGljIiwiaWF0IjoxNjMxNjU1NDk1LCJleHAiOjE2MzE2NjI2OTV9.yncx8cq7ADRLLdq4ObXI8XObRGpjLSnJS_ozjb-38Ho
  next(action);
  try {
    if (token) {
      await ApiService.setAuthorization()
      const response = await secureapi.get(`${url}`, data);
      console.log("api calling !token", response)
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

    }
    else {
      const response = await apis.post(`${url}`, data);
      console.log("api calling !token", response)
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    }
    // const response = await axios.request({
    //   baseURL: "http://new.crisishub.co/",
    //   url,
    //   method,
    //   data
    // });
    console.log("asdf", response)
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
