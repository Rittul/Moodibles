import React, { useState } from "react";
import "./Suggest.css";
import Navbar from './Navbar';

const Suggest = () => {
  const [meals, setMeals] = useState([]);

  const moodToCategory = {
    Happy: "Dessert",
    Sad: "Seafood",
    Energetic: "Chicken",
    Relaxed: "Vegetarian",
    Adventurous: "Miscellaneous",
  };

  const handleMoodSelect = async (mood) => {
    const category = moodToCategory[mood];

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();

      if (data.meals) {
        const randomMeals = data.meals
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setMeals(randomMeals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  };

  return (
    <>
       <Navbar />
    <div className="suggest-container">
      <h1>What's Your Mood?</h1>

      <div className="mood-buttons">
        {Object.keys(moodToCategory).map((mood) => (
          <button
            key={mood}
            className="mood-button"
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {meals.length > 0 && (
        <div className="suggested-meals">
          <h2>Suggested Meals:</h2>
          <div className="meal-list">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
    </>
  );
};

export default Suggest;
