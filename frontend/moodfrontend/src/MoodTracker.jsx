import React, { useEffect, useState } from 'react';
import { submitMood, getMoodData } from './api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './MoodTracker.css';
import Navbar from './Navbar';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [bubbles, setBubbles] = useState([]);

  const moodOptions = ["happy", "sad", "angry", "excited", "relaxed"];

  const funnyResponses = {
    happy: ["You're shining brighter than the sun! ☀️", "Did someone say happiness overload? 🎉"],
    sad: ["Sending virtual hugs your way! 🤗", "It's okay to feel blue sometimes. 🌧️"],
    angry: ["Breathe in, breathe out... and maybe punch a pillow! 😤", "Rage detected. Deploying chill vibes! 🧘"],
    excited: ["Woohoo! What's the party plan? 🎊", "Excitement level: 1000! 🚀"],
    relaxed: ["Chillin' like a villain! 😌", "Zen mode: Activated! 🧘‍♂️"]
  };

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const response = await getMoodData();
      setMoods(response.data);
    } catch (err) {
      console.error('Error fetching moods:', err);
    }
  };

  const handleMoodClick = async (mood) => {
    try {
      await submitMood(mood);
      fetchMoodData();
      generateBubble(mood);
      alert(`mood ${mood} saved successfully`);
    } catch (err) {
      console.error('Error submitting mood:', err);
    }
  };

  const generateBubble = (mood) => {
    const randomResponse = funnyResponses[mood][Math.floor(Math.random() * funnyResponses[mood].length)];

    const newBubble = {
      id: Date.now(),
      text: randomResponse,
      x: Math.random() * 80 + 10, // Random horizontal position
    };

  // Bubbles will remain visible until refreshed or updated
setBubbles((prev) => [...prev, newBubble]);


    // Remove bubble after 4 seconds
    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
    }, 90000);
  };

  const moodCount = moodOptions.map((mood) => ({
    mood,
    count: moods.filter((m) => m.mood === mood).length,
  }));

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="mood-section">
          <h2>How are you feeling?</h2>
          <div className="mood-grid">
            {moodOptions.map((mood) => (
              <button key={mood} className={mood} onClick={() => handleMoodClick(mood)}>
                {mood === "happy" && "😊 Happy"}
                {mood === "angry" && "😡 Angry"}
                {mood === "sad" && "😢 Sad"}
                {mood === "excited" && "🥳 Excited"}
                {mood === "relaxed" && "😌 Relaxed"}
              </button>
            ))}
          </div>
        </div>

        <div className="bubble-container">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bubble"
              style={{ left: `${bubble.x}%` }}
            >
              {bubble.text}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Mood History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodCount}>
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MoodTracker;