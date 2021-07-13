import { useReducer } from "react";

import CartContext from "./cart-context";

//Initial State
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//Reducer Function
const cartReducer = (state, action) => {
  // Add an item
  if (action.type === "ADD") {
    //Update the total Amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //Search if the index of the item is in our list
    const existingItemCartIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );
    //Find the element by index
    const existingCartItems = state.items[existingItemCartIndex];
    //If the element already exists, increase the amount but stay in one CardItem
    let updatedItems;
    if (existingCartItems) {
      const updatedItem = {
        ...existingCartItems,
        amount: existingCartItems.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemCartIndex] = updatedItem;
      //If the element not exists in the cart, just bring it to the cart
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //Remove an item
  if (action.type === "REMOVE") {
    //Search the index of that id in the list
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //Search the item by index
    const existingItem = state.items[existingCartItemIndex];
    //Update the total amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    //Update the items
    let updatedItems;
    //If there is only one, remove the item
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    //If there are more, decrease by one the amount
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

//CartProvider Component
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //Handler Functions
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  //State Contenxt
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
