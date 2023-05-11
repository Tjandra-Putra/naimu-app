import { createReducer } from "@reduxjs/toolkit";

// reduceers: specifies how to update the state of the user slice of the Redux store in response to different actions dispatched to the store.

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  success: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // ============================= Load User =============================
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    // ============================= Update User Information =============================
    .addCase("UpdateProfileRequest", (state) => {
      state.loading = true;
    })

    .addCase("UpdateProfileSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.successMessage;
    })

    .addCase("UpdateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ============================= Update User Address =============================
    .addCase("UpdateAddressRequest", (state) => {
      state.loading = true;
    })

    .addCase("UpdateAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.successMessage;
    })

    .addCase("UpdateAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ============================= Update User Address =============================
    .addCase("DeleteAddressRequest", (state) => {
      state.loading = true;
    })

    .addCase("DeleteAddressSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.successMessage;
    })

    .addCase("DeleteAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ============================= Logout User =============================
    .addCase("LogoutRequest", (state) => {
      state.loading = true;
    })

    .addCase("LogoutSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })

    .addCase("LogoutFail", (state, action) => {
      state.error = action.payload;
    })

    // ============================= Clear Errors =============================
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })

    .addCase("ClearSuccess", (state) => {
      state.success = null;
    });
});
