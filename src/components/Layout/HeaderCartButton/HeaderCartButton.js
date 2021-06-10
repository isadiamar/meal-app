import React, { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  //Context
  const cartCtx = useContext(CartContext);
  //States
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsAnimated ? styles.bump : ""} `;
  //Effect
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsAnimated(true);

    const timer = setTimeout(()=>{
      setBtnIsAnimated(false);
    }, 300);
    
    return ()=>{clearTimeout(timer)}
  }, [cartCtx.items]);

  return (
    <div className={styles.bump}>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
