import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (cartContext?.userItems.length === 0) {
    return <p>Nothing is selected yet.</p>;
  }

  return (
    <ul>
      {cartContext!.userItems.map((item) => {
        return (
          <li key={item.itemIndex} className="cart-item">
            <p>
              {item.name} - {item.amount} x {item.price}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => cartContext!.removeAmount(item.name)}>
                -
              </button>
              <p>{item.amount}</p>
              <button onClick={() => cartContext!.addAmount(item.name)}>
                +
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
