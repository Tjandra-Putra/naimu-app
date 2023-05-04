// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({ type: "AddToCart", payload: data });

  localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cart));

  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({ type: "RemoveFromCart", payload: data._id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart));
  return data;
};
