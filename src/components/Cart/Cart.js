import React, { useContext } from "react";
import styles from "./Cart.module.css";

import CartItem from "../Cart/CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
        kry={item.id}
        id={item.id}
        name = {item.name}
        amount = {item.amount}
        price = {item.price}/>
      ))}
    </ul>
  );

  return (
    <Modal>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && <button className={styles.button}>Order</button>}
        </div>
    </Modal>
  );
};

export default Cart;
