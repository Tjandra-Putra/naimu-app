import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  success: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  // ============================= Get Orders =============================
  builder.addCase("GetOrdersRequest", (state, action) => {
    state.loading = true;
  });

  builder.addCase("GetOrdersSuccess", (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  });

  builder.addCase("GetOrdersFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
