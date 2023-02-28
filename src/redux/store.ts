import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/filterSlice";
import cart from "./Slices/cartSlice";
import pizza from "./Slices/pizzaSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
