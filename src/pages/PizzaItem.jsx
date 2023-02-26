import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PizzaItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://62c01cdad40d6ec55ccb1588.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("error getting pizza");
        navigate("/");
      }
    };
    getPizza();
  }, [id, navigate]);

  if (!pizza) {
    return "loading...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <ul>
        <li>{pizza.size}</li>
        <li>{pizza.rating}</li>
        <li>{pizza.price}</li>
      </ul>
    </div>
  );
};

export default PizzaItem;
