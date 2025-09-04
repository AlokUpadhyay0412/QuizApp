import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Make sure this CSS file has the styles below

function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Enable scroll for results page
    document.body.classList.add("results-scroll");
    return () => {
      document.body.classList.remove("results-scroll");
    };
  }, []);

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
        <h2>Quiz Results</h2>
        <p>
          You scored {state.score} out of {state.total}
        </p>

        <div className="results-list">
          {state.questions?.map((q, index) => {
            const userAnswer = state.userAnswers[index];

            return (
              <div key={index} className="result-item">
                <h4>
                  Q{index + 1}: {q.question}
                </h4>

                <ul className="options-list">
                  {q.options.map((option, i) => {
                    let className = "";

                    if (option === q.correctAnswer) {
                      className = "correct"; // always green
                    }
                    if (option === userAnswer && userAnswer !== q.correctAnswer) {
                      className = "user-wrong"; // red if user selected wrong
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

        <button className="restart-btn" onClick={() => navigate("/")}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
