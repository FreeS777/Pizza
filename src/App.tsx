import Loadable from "react-loadable";
import "./scss/app.scss";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import HeaderLayout from "./layouts/HeaderLayout";

const PizzaItem = Loadable({
  loader: () => import(/* webpackChunkName: "PizzaItem" */ "./pages/PizzaItem"),
  loading: () => <div>Loading...</div>,
});

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Loading...</div>,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>Loading...</div>,
});
function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="" element={<Home />} />
        <Route path=":id" element={<PizzaItem />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
