import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";

import CartItem from "../Cart/CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  //Context
  const cartCtx = useContext(CartContext);

  //States
  const [formIsShow, setFormIsShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  //Variables
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Remove Handler
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Add Handler
  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
  };

  //Form Handler
  const orderHandler = () => {
    formIsShow === true ? setFormIsShow(false) : setFormIsShow(true);
  };

  //Submit Order Handler
  const submitOrderHandler = async (userData) => {
    //Update Submit States
    setIsSubmitting(true);
    setDidSubmit(false);

    //Fetch order
    await fetch(
      "https://meal-app-77a93-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    //Update Submit States
    setIsSubmitting(false);
    setDidSubmit(true);

    //Clear Cart
    cartCtx.clearCart();
  };

  //Items added to the cart
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  //Order Button Modal connected to formIsShow State
  const ModalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  // Form Modal connected to the submit states
  const CartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsShow && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onHideCart}
        ></Checkout>
      )}
      {!formIsShow && ModalActions}
    </React.Fragment>
  );

  // Is Loading state handler
  const isSubmittingModalContent = <p>Sending order data...</p>;

  // The order was submitted
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Succesfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal>
      {!isSubmitting && !didSubmit && CartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
