import React, { useState } from "react";
import "./HelpAssistant.css";

// Fixed responses based on keywords
const responses = {
  "login issue": "If you're having trouble logging in, please check your credentials or reset your password.",
  "forgot password": "To reset your password, click on 'Forgot Password' at the login page.",
  "recipe not found": "Try searching for a different dish name. Some items may not be available.",
  "mood suggestion": "You can select a mood like 'Happy' or 'Sad' to get personalized food suggestions.",
  "contact support": "You can contact our support team at support@example.com.",
  "token expired": "If your session expires frequently, try logging in again or contact support.",
  "search food": "Enter your favorite dish name, and we'll fetch the recipe for you.",
};

// Default fallback response
const defaultResponse = "I'm here to help! Try asking about 'login issue', 'mood suggestion', or 'recipe not found'.";

const HelpAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle user input and find a matching response
  const handleQuery = () => {
    if (!query.trim()) {
      setResponse("Please enter a question or keyword.");
      return;
    }

    // Find a response based on keywords
    const matchedResponse = Object.entries(responses).find(([keyword]) =>
      query.toLowerCase().includes(keyword)
    );

    setResponse(matchedResponse ? matchedResponse[1] : defaultResponse);
    setQuery(""); // Clear input after search
  };

  // Toggle the chat box visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Floating Help Button */}
      <div className="help-button" onClick={toggleChat}>
        💬 Help
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Help Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-content">
            <div className="chat-messages">
              {response && <p>{response}</p>}
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleQuery}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpAssistant;
