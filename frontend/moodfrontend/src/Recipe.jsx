import React, { useState } from "react";
import "./Recipe.css";
import Navbar from "./Navbar";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  // Fetch recipe details by dish name
  const fetchRecipe = async () => {
    if (!query) {
      setError("Please enter a dish name!");
      return;
    }
    setError("");
    setRecipe(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.meals) {
        setRecipe(data.meals[0]); // Show the first matching recipe
      } else {
        setError("No recipe found. Try another dish!");
      }
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setError("Failed to fetch recipe. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <h1>Find Your Recipe 🍽️</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter dish name (e.g., Cake)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={fetchRecipe}>Get Recipe</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {recipe && (
          <div className="recipe-details">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />

            <h3>Category: {recipe.strCategory}</h3>
            <h4>Instructions:</h4>
            <div className="instructions">
              {recipe.strInstructions.split("\n").map((step, index) => (
                <p key={index}>{step.trim()}</p>
              ))}
            </div>

            <h4>Ingredients:</h4>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((index) => ({
                  ingredient: recipe[`strIngredient${index}`],
                  measure: recipe[`strMeasure${index}`],
                }))
                .filter((item) => item.ingredient)
                .map((item, index) => (
                  <li key={index}>
                    {item.ingredient} - {item.measure}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Recipe;
