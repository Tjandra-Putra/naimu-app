// ACTIONS: It is a function exposed to users that takes in argument, and execute REDUCER to update the state.

// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({ type: "AddToCart", payload: data });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cart));

  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({ type: "RemoveFromCart", payload: data });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cart));
  return data;
};

// update cart
export const updateCart = (data) => async (dispatch, getState) => {
  dispatch({ type: "UpdateCart", payload: data });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cart));
  return data;
};
