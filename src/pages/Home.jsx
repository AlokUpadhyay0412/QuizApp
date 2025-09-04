import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the Quiz App</h1>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}
