import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;

      if (!state.cartItems[id]) {
        state.cartItems[id] = 0;
      }
      state.cartItems[id] += 1;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      if (!state.cartItems[id]) {
        return;
      }
      state.cartItems[id] = Math.max(state.cartItems[id] - 1, 0);
    },

    updateCartItemCount: (state, action) => {
      const { itemId, newAmount } = action.payload;
      state.cartItems[itemId] = newAmount;
    },

    checkout: (state) => {
      state.cartItems = getDefaultCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemCount,
  checkout,
  
}  =  cartSlice.actions;

export default cartSlice.reducer;