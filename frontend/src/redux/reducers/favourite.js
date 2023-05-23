import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  favourites: [],
  error: null,
  success: null,
};

export const favouriteReducer = createReducer(initialState, (builder) => {
  // ============================= Get Favourite =============================
  builder.addCase("GetFavouriteRequest", (state, action) => {
    state.loading = true;
  });

  builder.addCase("GetFavouriteSuccess", (state, action) => {
    state.loading = false;
    state.favourites = action.payload;
  });

  builder.addCase("GetFavouriteFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // ============================= Remove From Favourite =============================
  builder.addCase("RemoveFromFavouriteRequest", (state, action) => {
    state.loading = true;
  });

  builder.addCase("RemoveFromFavouriteSuccess", (state, action) => {
    state.loading = false;
    state.favourites = action.payload;
    state.success = "Removed from favourites";
  });

  builder.addCase("RemoveFromFavouriteFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // ============================= Clear Errors =============================
  builder.addCase("ClearErrors", (state, action) => {
    state.error = null;
  });

  // ============================= Clear Success =============================
  builder.addCase("ClearSuccess", (state, action) => {
    state.success = null;
  });
});
