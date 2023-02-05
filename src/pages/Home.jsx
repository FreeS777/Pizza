import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/Slices/filterSlice";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const dispatch = useDispatch();
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const categoryParam = categoryId > 0 ? `category=${categoryId}` : "";
    const sortParam = sortType.replace("-", "");
    const orderParam = sortType.includes("-") ? "desc" : "asc";
    const search = searchValue ? `${searchValue}` : "";
    fetch(
      `https://62c01cdad40d6ec55ccb1588.mockapi.io/items?page=${currentPage}&limit=5&${categoryParam}&search=${search}&sortBy=${sortParam}&order=${orderParam}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("error connecting to server");
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </>
  );
};

export default Home;
