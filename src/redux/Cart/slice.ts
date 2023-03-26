import { getCartFromLS } from "../../utils/getCartFromLS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";

const { totalPrice, items, totalCount } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice ? totalPrice : 0,
  totalCount: totalCount ? totalCount : 0,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice += action.payload.price;
      state.totalCount += 1;
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalCount -= 1;
        state.totalPrice -= action.payload.price;
      }
    },
    plusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
        state.totalCount += 1;
        state.totalPrice += action.payload.price;
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= action.payload.sum;
      state.totalCount -= action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
