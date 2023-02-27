import React from "react";

const categories = ["All", "Meat", "Vegans", "Grill", "Spicy", "Closed"];

type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            key={id}
            onClick={() => onClickCategory(id)}
            className={value === id ? `active` : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
