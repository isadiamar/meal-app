import { useCallback, useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";

import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";

const AvailableMeals = () => {
  //States
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch Meals
  const fetchMeals = useCallback(async () => {
    //Initialize states
    setHttpError(null);
    setIsLoading(true);

    //Fetch the meals
    const response = await fetch(
      "https://meal-app-77a93-default-rtdb.firebaseio.com/meals.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    //Transform in JSON
    const data = await response.json();
    console.log(data);

    //Modificate meals
    let loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      });
    }

    //Set Meals State
    setMeals(loadedMeals);
    //Set Loading State
    setIsLoading(false);
  }, []);

  //Load meals when refresh page
  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  //Manage error and isLoading State

  if (isLoading) {
    return (
      <section className={styles.mealLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.mealError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // Map meals
  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
