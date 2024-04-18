import { homeCategories } from "../util/categories";
import { Link } from "react-router-dom";
export default function HomeCategories() {
  return (
    <ul className="categories">
      {homeCategories.map((category) => (
        <Link to={category.url} key={category.id}>
          <div className="container">
            <img src={category.img} alt={category.name} />
          </div>
          <div className="name">{category.name}</div>
        </Link>
      ))}
    </ul>
  );
}
