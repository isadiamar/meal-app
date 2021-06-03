import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`; // two decimals
  return (
    <li className={styles.meal}>
        {/*Meal Info*/}
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className = {styles.price}>{price}</div>
      </div>
      {/*User Form */}
      <div>
          <MealItemForm/>
      </div>
    </li>
  );
};

export default MealItem;
