import { createContext, useState, FC, ReactNode } from "react";

interface CartItem {
  name: string;
  amount: number;
  price: number;
  itemIndex: string;
}
interface CartContextType {
  userItems: CartItem[];
  addItemToCart: (name: string, price: number, itemIndex: string) => void;
  resetCart: () => void;
  addAmount: (name: string) => void;
  removeAmount: (name: string) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userItems, setUserItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addItemToCart(name: string, price: number, itemIndex: string) {
    setUserItems((prevItems) => {
      const newItems = [...prevItems];
      const index = newItems.findIndex((item) => item.name === name);
      if (index < 0) {
        newItems.push({
          name,
          amount: 1,
          price: +price,
          itemIndex,
        });
      }
      if (index >= 0) {
        newItems[index].amount += 1;
      }

      return newItems;
    });
  }

  function resetCart() {
    setUserItems([]);
  }

  function addAmount(name: string) {
    setUserItems((prevItems) => {
      const newItems = [...prevItems];
      const index = newItems.findIndex((item) => item.name === name);
      newItems[index].amount += 1;
      return newItems;
    });
  }

  function removeAmount(name: string) {
    setUserItems((prevItems) => {
      const newItems = [...prevItems];
      const index = newItems.findIndex((item) => item.name === name);
      newItems[index].amount -= 1;
      if (newItems[index].amount < 1) {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider
      value={{
        userItems,
        addItemToCart,
        resetCart,
        addAmount,
        removeAmount,
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
