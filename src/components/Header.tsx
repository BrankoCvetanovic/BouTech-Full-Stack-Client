import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";

export default function Header() {
  const cartContext = useContext(CartContext);

  function openCart() {
    cartContext?.openModal();
  }

  const itemCount = cartContext?.userItems.length;

  return (
    <div className="header-container">
      <div className="header">
        <div className="title">
          <Link to={"/"}>BouTech</Link>
        </div>
        <Button
          onClick={openCart}
          sx={{
            "&:hover": {
              backgroundColor: "rgb(24, 23, 23)",
            },
            padding: "8px 15px",
            borderRadius: "3px",
            bgcolor: "rgb(48, 46, 46)",
            color: "white",
          }}
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          <div>{itemCount}</div>
        </Button>
      </div>
      <div className="nav">
        <NavLink className="home" to="/">
          <HomeOutlinedIcon fontSize="small" sx={{ height: "1.1rem" }} />
        </NavLink>
        <NavLink to="/appliances">Appliances</NavLink>
        <NavLink to="/tvs">TV</NavLink>
        <NavLink to="/it">IT</NavLink>
        <NavLink to="/phones">Phones</NavLink>
      </div>
      {cartContext?.isOpen && <CartModal />}
    </div>
  );
}
