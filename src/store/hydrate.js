import combineReducers from "./reducer";
import { HYDRATE } from "next-redux-wrapper";

const reducer = (state, action) => {
  console.log("Hydrate:action", action.type);
  if (action.type === HYDRATE) {
    // xPOINT:: Attention! This will overwrite client state! Real apps should use proper reconciliation.
    const appStore = { ...state, ...action.payload };
    // xPOINT:: need to re-conciliation - preserve count value on client side navigation
    // e.g:: if (state.count) nextState.count = state.count
    return appStore;
  } else {
    return combineReducers(state, action);
  }
};

export default reducer;
