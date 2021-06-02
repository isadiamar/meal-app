import React from 'react';

import Header from './components/Layout/Header/Header';
import MealsSummary from './components/Meals/MealsSummary/MealsSummary';
const App =() => {
  return (
    <React.Fragment>
      <Header/>
      <MealsSummary/>
    </React.Fragment>
  );
}

export default App;
