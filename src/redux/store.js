import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter,
  },
});
