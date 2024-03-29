import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  
  const price = `$${props.price.toFixed(2)}`; // two decimals

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    })
  };
  return (
    <li className={styles.meal}>
      {/*Meal Info*/}
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      {/*User Form */}
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
