import React from "react";
import ReactDom from "react-dom";

import Card from "../UI/Card/Card";
/*
import styles from "./Cart.module.css";
import MealItem from "../Meals/MealItem/MealItem";
*/
const Cart = (props) => {
  const cardItems = [
    {
      id: "b3",
      name: "Noodles",
      description: "A japanese specialty!",
      price: 12.5,
    },
    {
      id: "2f",
      name: "Vegetal Burger",
      description: "Healthy, vegan, saucy",
      price: 10.99,
    },
  ].map(mealItem => <CartItem {id=mealItem.id name = mealItem.name price = mealItem.price}/>;

  return (
    <div>
      cardItems
      <div></div>
      <div></div>
    </div>
  );
};

export default Cart;
