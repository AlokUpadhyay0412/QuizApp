import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
// useLocation: to get the state passed from QuizPage
// useNavigate: to move to other pages

function ResultsPage() {
  const { state } = useLocation(); // Get quiz results passed from QuizPage
  const navigate = useNavigate(); // Function to navigate to other pages

  // useEffect to add scroll styling when this page loads
  useEffect(() => {
    document.body.classList.add("results-scroll"); // Enable scrolling for results
    return () => {
      document.body.classList.remove("results-scroll"); // Clean up on unmount
    };
  }, []);

  // If no state is passed (user accessed results directly), show message
  if (!state) {
    return (
      <div className="quiz-container">
        <h2>No results found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="container">
        {/* Display final score */}
        <h2>Quiz Results</h2>
        <p>
          You scored {state.score} out of {state.total}
        </p>

        {/* List all questions with user's answers */}
        <div className="results-list">
          {state.questions?.map((q, index) => {
            const userAnswer = state.userAnswers[index]; // Get user's answer for this question

            return (
              <div key={index} className="result-item">
                {/* Question text */}
                <h4>
                  Q{index + 1}: {q.question}
                </h4>

                {/* Options with correct/wrong highlighting */}
                <ul className="options-list">
                  {q.options.map((option, i) => {
                    let className = "";

                    if (option === q.correctAnswer) {
                      className = "correct"; // Highlight correct answer
                    }
                    if (option === userAnswer && userAnswer !== q.correctAnswer) {
                      className = "user-wrong"; // Highlight user's wrong answer
                    }

                    return (
                      <li key={i} className={className}>
                        {option}
                        {option === userAnswer ? " ← your answer" : ""}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Button to restart quiz */}
        <button className="restart-btn" onClick={() => navigate("/")}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

// Export the ResultsPage component
export default ResultsPage;
