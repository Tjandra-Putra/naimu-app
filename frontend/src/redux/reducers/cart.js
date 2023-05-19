import { createReducer } from "@reduxjs/toolkit";

// REDUCER: It is a business logic function

const initialState = {
  //  if it exists and is a valid JSON string. If it doesn't exist or is not a valid JSON string, it initializes cart as an empty array:
  // cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cart: [],
  totalPrice: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("AddToCart", (state, action) => {
      const item = action.payload; // taken from actions. Which ever component dispatches the action, the payload will be the item.
      const itemExist = state.cart.find((i) => i._id === item._id && i.size === item.size);

      // update quantity if item already exists in cart
      if (itemExist) {
        return {
          ...state,
          cart: state.cart.map((i) => {
            if (i._id === itemExist._id && i.size === itemExist.size) {
              return {
                ...i,
                quantity: i.quantity + 1,
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
        cart: state.cart.filter((i) => i._id !== action.payload._id || i.size !== action.payload.size),
      };
    })

    .addCase("UpdateCart", (state, action) => {
      return {
        ...state,
        cart: state.cart.map((i) => {
          if (i._id === action.payload._id && i.size === action.payload.size) {
            return {
              ...i,
              size: action.payload.updatedProductSize ? action.payload.updatedProductSize : i.size,
              quantity: action.payload.quantity ? action.payload.quantity : i.quantity,
            };
          } else {
            return i;
          }
        }),
      };
    })

    // empty the cart
    .addCase("EmptyCart", (state, action) => {
      return {
        ...state,
        cart: [],
      };
    });
});
