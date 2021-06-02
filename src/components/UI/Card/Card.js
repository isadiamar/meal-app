import React from "react";

import styles from "./Card.module.css";

//Card Component
const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
