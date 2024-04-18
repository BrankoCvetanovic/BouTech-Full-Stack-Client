import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartContext } from "./CartContext";

const Item: FC<{
  img: string;
  name: string;
  price: number;
  category: string;
  id: string;
  discount: number;
}> = ({ img, price, name, category, id, discount }) => {
  const cartContext = useContext(CartContext);

  let realPrice = price + 0.99;

  if (discount > 0) {
    realPrice = Math.round(price - (price / 100) * discount) + 0.99;
  }

  let urlCategory = "/appliances";
  if (category === "samsung-tv" || category === "sony" || category === "lg")
    urlCategory = "/tvs";
  if (category === "laptop" || category === "desktop") urlCategory = "/it";
  if (category === "samsung" || category === "apple" || category === "xiaomi")
    urlCategory = "/phones";

  return (
    <Link to={`${urlCategory}/${id}`} className="item">
      <img
        src={`https://boutech-server-cfe11ab86bbd.herokuapp.com/static/${img}`}
        alt=""
      />
      <div className="info">
        <div className="name">{name}</div>
        {discount > 0 && (
          <>
            <div className="discount">
              -{discount}% Saved:{" "}
              <strong>{Math.round(price - realPrice)} USD</strong>
            </div>
            <div className="prev-price">{price + 0.99} USD</div>
          </>
        )}
        <div className="price">{realPrice} USD</div>
      </div>
      <div className="control">
        <Button
          onClick={(event) => {
            event.preventDefault();
            cartContext?.addItemToCart(name, realPrice, id);
          }}
          variant="contained"
          color="inherit"
          size="small"
        >
          <ShoppingCartOutlinedIcon />
        </Button>
      </div>
    </Link>
  );
};

export default Item;
