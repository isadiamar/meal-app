import styles from './MealItem.module.css';

const MealItem = (props)=>{ 
    return <div className={styles.meal}>
    {/* <h3>{props.name}</h3>
        <span>{props.description}</span>
        <span>{props.price}</span> */}
        <h3>Sushi</h3>
        <span className = {styles.description}>Avocado with fishdelicious</span>
        <span className= {styles.price}>12$</span>
    </div>
}

export default MealItem;