import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/filterSlice";
import cart from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
