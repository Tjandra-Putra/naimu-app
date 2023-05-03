import { createReducer } from "@reduxjs/toolkit";

// reduceers: specifies how to update the state of the user slice of the Redux store in response to different actions dispatched to the store.

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  // action creators
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
