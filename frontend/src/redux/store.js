import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

const persistor = persistStore(store);

export { persistor, store };
