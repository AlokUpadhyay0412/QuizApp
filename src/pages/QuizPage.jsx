import React, { useState } from "react";
import questions from "../utils/QuestionsLocal"; // Import questions from a local file
import { useNavigate } from "react-router-dom"; // Used to go to results page after quiz

function QuizPage() {
  const navigate = useNavigate(); // Function to navigate to other pages

  // State to track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State to track the user's score
  const [score, setScore] = useState(0);

  // State to track the currently selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // State to store all answers given by the user
  const [userAnswers, setUserAnswers] = useState([]);

  // Function to go to the next question
  const handleNextQuestion = () => {
    // Check if selected option is correct
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1); // Increase score if correct
    }

    // Save user's answer for review later
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestion].question,
        selectedOption,
        correctAnswer: questions[currentQuestion].correctAnswer
      }
    ]);

    // Reset selected option and go to next question
    setSelectedOption(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  // Function to submit quiz at the end
  const handleSubmitQuiz = () => {
    // Check last question's answer
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Store final answers including last question
    const finalAnswers = [
      ...userAnswers,
      {
        question: questions[currentQuestion].question,
        selectedOption,
        correctAnswer: questions[currentQuestion].correctAnswer
      }
    ];

    // Navigate to results page and pass score, total questions, and answers
    navigate("/results", {
      state: {
        score: isCorrect ? score + 1 : score,
        total: questions.length,
        questions,
        userAnswers: finalAnswers
      }
    });
  };

  return (
    <div className="quiz-container">
      {/* Display current question */}
      <div className="quiz-question">
        <h2>{questions[currentQuestion].question}</h2>
      </div>

      {/* Display options as buttons */}
      <div className="quiz-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)} // Save selected option
            style={{
              background: selectedOption === option ? "#cce7ff" : "#f0f0f0", // Highlight selected option
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Show Next or Submit button depending on question */}
      {currentQuestion < questions.length - 1 ? (
        <button
          className="next-btn"
          onClick={handleNextQuestion}
          disabled={!selectedOption} // Disable if no option selected
        >
          Next Question
        </button>
      ) : (
        <button
          className="submit-btn"
          onClick={handleSubmitQuiz}
          disabled={!selectedOption} // Disable if no option selected
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

// Exporting component to use in App.jsx
export default QuizPage;
