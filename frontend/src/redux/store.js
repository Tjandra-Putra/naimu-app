import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

const Store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

export default Store;
