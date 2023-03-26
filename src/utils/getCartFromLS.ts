import { CartItem } from "../redux/Cart/types";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : { items: [] as CartItem[] };
};
