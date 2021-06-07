import React from "react";

// Define what contain the context
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
});
  
export default CartContext;
