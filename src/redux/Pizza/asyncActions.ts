import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPropertyParam } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPropertyParam>(
  "users/fetchPizzas",
  async (param) => {
    const { categoryParam, sortBy, orderParam, search, currentPage } = param;
    const { data } = await axios.get(
      `https://62c01cdad40d6ec55ccb1588.mockapi.io/items?page=${currentPage}&limit=5&${categoryParam}&search=${search}&sortBy=${sortBy}&order=${orderParam}`
    );
    return data;
  }
);
