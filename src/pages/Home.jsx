import React from "react";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slices/filterSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortType,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true }
      );
      navigate(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    setIsLoading(true);
    const categoryParam = categoryId > 0 ? `category=${categoryId}` : "";
    const sortParam = sortType.replace("-", "");
    const orderParam = sortType.includes("-") ? "desc" : "asc";
    const search = searchValue ? `${searchValue}` : "";

    axios
      .get(
        `https://62c01cdad40d6ec55ccb1588.mockapi.io/items?page=${currentPage}&limit=5&${categoryParam}&search=${search}&sortBy=${sortParam}&order=${orderParam}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("error connecting to server");
      });
    window.scrollTo(0, 0);
    // }
    // isSearch.current = false;
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
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
