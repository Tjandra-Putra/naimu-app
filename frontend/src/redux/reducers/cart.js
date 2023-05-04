import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  //  if it exists and is a valid JSON string. If it doesn't exist or is not a valid JSON string, it initializes cart as an empty array:
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  totalPrice: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("AddToCart", (state, action) => {
      console.log("called AddToCart reducer");
      console.log("action.payload: ", action.payload);

      const item = action.payload; // taken from actions. Which ever component dispatches the action, the payload will be the item.
      const itemExist = state.cart.find((i) => i._id === item._id && i.product_size === item.product_size);

      // update quantity if item already exists in cart
      if (itemExist) {
        return {
          ...state,
          cart: state.cart.map((i) => {
            if (i._id === itemExist._id && i.product_size === itemExist.product_size) {
              return {
                ...i,
                product_quantity: i.product_quantity + 1,
              };
            } else {
              return i;
            }
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    })

    .addCase("RemoveFromCart", (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((i) => i._id !== action.payload._id || i.product_size !== action.payload.product_size),
      };
    });
});

console.log(" ======== CART STATE ======== ");
console.log(initialState.cart);
