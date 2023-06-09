import axios from "axios";
import { server } from "../../server";

export const getFavourite = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GetFavouriteRequest" });

    const { data } = await axios.get(`${server}/favourite/${user.user._id}`, { withCredentials: true });

    dispatch({ type: "GetFavouriteSuccess", payload: data.favourites[0] });
  } catch (error) {
    dispatch({ type: "GetFavouriteFail", payload: error.response.data.message });
  }
};

export const addToFavourites =
  (productId, shopName, price, discountPrice, title, imageUrl, unitSold, rating) => async (dispatch, getState) => {
    try {
      dispatch({ type: "AddToFavouriteRequest" });

      const { data } = await axios.post(
        `${server}/favourite/add-to-favourites`,
        { productId, shopName, price, discountPrice, title, imageUrl, unitSold, rating },
        { withCredentials: true }
      );

      dispatch({ type: "AddToFavouriteSuccess", payload: data.favourites });
    } catch (error) {
      dispatch({ type: "AddToFavouriteFail", payload: error.response.data.message });
    }
  };

export const removeFromFavourite = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "RemoveFromFavouriteRequest" });

    const { data } = await axios.put(`${server}/favourite/remove/${productId}`, {}, { withCredentials: true });

    dispatch({ type: "RemoveFromFavouriteSuccess", payload: data.favourites });
  } catch (error) {
    dispatch({ type: "RemoveFromFavouriteFail", payload: error.response.data.message });
  }
};
