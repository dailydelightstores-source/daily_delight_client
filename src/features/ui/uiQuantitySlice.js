import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setCart: (state, action) => {
      state.items = action.payload;
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        item => item.productId === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        item => item.productId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find(
        item => item.productId === productId
      );

      if (item) {
        item.quantity = quantity;
      }
    }

  }
});

export const {
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;