import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import noodles from "./assets/hacker2.png";
import styles from "./home.module.css";

// Card Component
const Card = ({ title, description, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImg} />
      <div className={styles.cardInfo}>
        <p className={styles.textTitle}>{title}</p>
        <p className={styles.textBody}>{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const fetchedMeal = response.data.meals ? response.data.meals[0] : null;
      setMeal(fetchedMeal);
      setError(!fetchedMeal);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className={styles.firstLanding + " " + styles.animatedBg}>
        <div className={styles.header}>
          <div className={styles.headerFirst}>
            <div className={styles.img4Header}>
              <img src={noodles} alt="Barbeque Logo" />
            </div>
            <div className={styles.headerText}>
              <h3>
                Crave it. Find it. <br />
                <span className={styles.moodibles}>Moodibles it!</span>
              </h3>
              <div>
                <input
                  type="text"
                  className={styles.textHeader}
                  placeholder="Search food"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>

          <div className={styles.headerSecond}>
            <div className={styles.feastFinder}>
              {meal ? (
                <Card
                  title={meal.strMeal}
                  description={meal.strCategory}
                  image={meal.strMealThumb}
                />
              ) : error ? (
                <p>😔 Sorry, no matching food found. Try another search!</p>
              ) : (
                <p>🍽️ Search for a delicious dish!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;