import React from "react";
import { useNavigate } from "react-router-dom"; // This is used to go to another page when button is clicked

function Home() {
  const navigate = useNavigate(); // create a function to navigate to other pages

  return (
    // This is the main container for home page
    <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
      
      {/* This is the main heading */}
      <h1>Welcome to the Quiz App</h1>
      
      {/* This is a small description */}
      <p>Test your knowledge with our fun quiz!</p>
      
      {/* Button to start quiz */}
      {/* When user clicks, it will go to /quiz page */}
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

// Exporting the Home component to use in App.jsx
export default Home;
