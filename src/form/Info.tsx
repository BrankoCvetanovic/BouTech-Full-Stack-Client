import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";

interface InfoProps {
  totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {
  const cartContext = useContext(CartContext);

  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      {cartContext?.userItems.length === 0 && (
        <Typography variant="subtitle1" color="text.secondary">
          Your cart is empty, cannot place order with empty cart
        </Typography>
      )}
      <List disablePadding>
        {cartContext?.userItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={`${product.price} x ${product.amount}`}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
