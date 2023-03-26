import { configureStore } from "@reduxjs/toolkit";
import filter from "./Filter/slice";
import cart from "./Cart/slice";
import pizza from "./Pizza/slice";
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
