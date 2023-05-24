import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  favourites: [],
  errorFavourite: null,
  successFavourite: null,
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
    state.errorFavourite = action.payload;
  });

  // ============================= Add To Favourites =============================
  builder.addCase("AddToFavouriteRequest", (state, action) => {
    state.loading = true;
  });

  builder.addCase("AddToFavouriteSuccess", (state, action) => {
    state.loading = false;
    state.favourites = action.payload;
    state.successFavourite = "Added to favourites";
  });

  builder.addCase("AddToFavouriteFail", (state, action) => {
    state.loading = false;
    state.errorFavourite = action.payload;
  });

  // ============================= Remove From Favourite =============================
  builder.addCase("RemoveFromFavouriteRequest", (state, action) => {
    state.loading = true;
  });

  builder.addCase("RemoveFromFavouriteSuccess", (state, action) => {
    state.loading = false;
    state.favourites = action.payload;
    state.successFavourite = "Removed from favourites";
  });

  builder.addCase("RemoveFromFavouriteFail", (state, action) => {
    state.loading = false;
    state.errorFavourite = action.payload;
  });

  // ============================= Empty Favourite =============================
  builder.addCase("EmptyFavourite", (state, action) => {
    state.favourites = [];
  });

  // ============================= Clear Errors =============================
  builder.addCase("ClearErrors", (state, action) => {
    state.errorFavourite = null;
  });

  // ============================= Clear Success =============================
  builder.addCase("ClearSuccess", (state, action) => {
    state.successFavourite = null;
  });
});
