import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import logger from "redux-logger";

const middleware = [...getDefaultMiddleware(), logger];

const Store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
  },
  middleware: middleware,
});

export default Store;
