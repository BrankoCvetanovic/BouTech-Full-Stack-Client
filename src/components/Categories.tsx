import { FC } from "react";
import { useSearchParams } from "react-router-dom";

interface Category_arr {
  name: string;
  img: string;
  id: string;
  category: string;
}

const Categories: FC<{ categories: Category_arr[] }> = ({ categories }) => {
  const setSearchParams = useSearchParams()[1];

  function sortByCategory(category: string) {
    setSearchParams(`?${new URLSearchParams({ category: category })}`);
  }

  return (
    <ul className="categories">
      {categories.map((category) => {
        return (
          <li
            onClick={() => sortByCategory(category.category)}
            key={category.id}
          >
            <img src={category.img} alt={category.name} />
            <div>{category.name}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
