import React from "react";

const categories = ["All", "Meat", "Vegans", "Grill", "Spicy", "Closed"];
const Categories = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            key={id}
            onClick={() => onClickCategory(id)}
            className={value === id ? `active` : null}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
