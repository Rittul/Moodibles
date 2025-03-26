import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Kitchen.css";

// Category Component
const Category = ({ title, items, onSelect }) => {
  return (
    <div className="category">
      <h2>{title}</h2>
      <div className="items">
        {items.map((item, index) => (
          <button
            key={index}
            className="item"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Kitchen Component
const Kitchen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);

  const categories = [
    {
      title: "Vegetables",
      items: [
        "Tomato",
        "Onion",
        "Carrot",
        "Broccoli",
        "Spinach",
        "Potato",
        "Capsicum",
        "Cucumber",
      ],
    },
    {
      title: "Fruits",
      items: [
        "Apple",
        "Banana",
        "Mango",
        "Orange",
        "Strawberry",
        "Blueberry",
        "Pineapple",
        "Grapes",
      ],
    },
    {
      title: "Proteins",
      items: [
        "Chicken",
        "Egg",
        "Tofu",
        "Lentils",
        "Paneer",
        "Fish",
        "Beef",
        "Beans",
      ],
    },
    {
      title: "Spices",
      items: [
        "Salt",
        "Pepper",
        "Cumin",
        "Turmeric",
        "Cinnamon",
        "Paprika",
        "Ginger",
        "Garlic Powder",
      ],
    },
    {
      title: "Grains",
      items: [
        "Rice",
        "Pasta",
        "Quinoa",
        "Bread",
        "Oats",
        "Barley",
        "Couscous",
        "Cornmeal",
      ],
    },
    {
      title: "Dairy",
      items: [
        "Milk",
        "Cheese",
        "Butter",
        "Yogurt",
        "Cream",
        "Ghee",
        "Condensed Milk",
        "Buttermilk",
      ],
    },
  ];

  const handleSelectIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
    setRecipes([]);
    setRecipeDetails(null);
  };

  const fetchRecipesByIngredients = async () => {
    try {
      if (selectedIngredients.length === 0) return;

      const promises = selectedIngredients.map((ingredient) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
          .then((response) => response.json())
      );

      const results = await Promise.all(promises);

      const combinedRecipes = results
        .flatMap((result) => result.meals || [])
        .reduce((acc, meal) => {
          acc[meal.idMeal] = meal;
          return acc;
        }, {});

      setRecipes(Object.values(combinedRecipes).slice(0, 5));
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals) {
        setRecipeDetails(data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  useEffect(() => {
    fetchRecipesByIngredients();
  }, [selectedIngredients]);

  return (
    <div>
      <Navbar />
      <h1>What's in My Kitchen?</h1>

      <div className="container">
        {categories.map((category, index) => (
          <Category
            key={index}
            title={category.title}
            items={category.items}
            onSelect={handleSelectIngredient}
          />
        ))}
      </div>

      <div className="selected-ingredients">
        <h2>Selected Ingredients:</h2>
        {selectedIngredients.map((ingredient, index) => (
          <span key={index} className="selected-item">{ingredient}</span>
        ))}
        <button className="clear-button" onClick={clearIngredients}>Clear Ingredients</button>
      </div>

      <div className="recipe-results">
        <h2>Recipes:</h2>
        {recipes.length === 0 ? (
          <p>No recipes found. Try selecting more ingredients!</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card" onClick={() => fetchRecipeDetails(recipe.idMeal)}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </div>
          ))
        )}
      </div>

      {recipeDetails && (
        <div className="recipe-details">
          <h2>{recipeDetails.strMeal}</h2>
          <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
          <p><strong>Category:</strong> {recipeDetails.strCategory}</p>
          <p><strong>Instructions:</strong> {recipeDetails.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default Kitchen;
