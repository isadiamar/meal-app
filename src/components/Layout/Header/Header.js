import React from "react";

import styles from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";

import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

// Header Component
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
