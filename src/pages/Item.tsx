import { useLoaderData, LoaderFunctionArgs, json } from "react-router-dom";
import { LoaderItem } from "../util/types";
import axios, { AxiosError } from "axios";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { link } from "../util/serverLink";
export default function ItemPage() {
  const data = useLoaderData() as LoaderItem;

  const cartContext = useContext(CartContext);

  let realPrice = data.price + 0.99;

  if (data.discount > 0) {
    realPrice =
      Math.round(data.price - (data.price / 100) * data.discount) + 0.99;
  }

  return (
    <div className="item-page">
      <div className="img-container">
        <img id="img" src={`${link}/static/${data.image}`} alt="" />
      </div>
      <div className="info">
        <div className="name">{data.name}</div>
        {data.discount > 0 && (
          <>
            <div className="discount">
              -{data.discount}% Saved:
              <strong>{data.price + 0.99 - realPrice} USD</strong>
            </div>
            <div className="prev-price">{data.price + 0.99} USD</div>
          </>
        )}
        <div className="price">{realPrice} USD</div>
        <Button
          onClick={(event) => {
            event.preventDefault();
            cartContext?.addItemToCart(data.name, realPrice, data._id);
          }}
          variant="contained"
          color="inherit"
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          <span className="btn-text">Add To Cart</span>
        </Button>
      </div>
      <div className="description">{data.description}</div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  try {
    const response = await axios.get(`${link}${url.pathname}`);
    return response.data;
  } catch (err) {
    console.log(err);
    const errors = err as Error | AxiosError;
    throw json({ message: errors.message }, { status: 500 });
  }
};
