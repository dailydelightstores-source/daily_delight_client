import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import cartSlice from "../features/ui/uiQuantitySlice"

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    ui: uiReducer
  }
});
