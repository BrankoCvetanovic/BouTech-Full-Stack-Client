import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { LoaderItem } from "../util/types";
import Item from "./Item";

const ItemsContainer: FC<{ navigation: string; items: LoaderItem[] }> = ({
  navigation,
  items,
}) => {
  return (
    <ul className="item-container">
      {navigation === "loading" && (
        <div className="pending">
          <CircularProgress size={50} />
        </div>
      )}
      {navigation !== "loading" &&
        items &&
        items.map((item) => (
          <li key={item._id}>
            <Item
              discount={item.discount}
              id={item._id}
              category={item.category}
              img={item.image}
              price={item.price}
              name={item.name}
            />
          </li>
        ))}
    </ul>
  );
};
export default ItemsContainer;
