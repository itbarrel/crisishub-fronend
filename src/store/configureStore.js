import reducer from "./hydrate";
import middleware from "./middleware/index";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
  return configureStore({ reducer, middleware });
};

export default store;