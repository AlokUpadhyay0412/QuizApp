import React, { useState } from "react";
import questions from "../utils/QuestionsLocal";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleNextQuestion = () => {
    const isCorrect =
      selectedOption === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      { question: questions[currentQuestion].question, selectedOption, correctAnswer: questions[currentQuestion].correctAnswer }
    ]);

    setSelectedOption(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSubmitQuiz = () => {
    const isCorrect =
      selectedOption === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const finalAnswers = [
      ...userAnswers,
      { question: questions[currentQuestion].question, selectedOption, correctAnswer: questions[currentQuestion].correctAnswer }
    ];

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
      <div className="quiz-question">
        <h2>{questions[currentQuestion].question}</h2>
      </div>
      <div className="quiz-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            style={{
              background: selectedOption === option ? "#cce7ff" : "#f0f0f0",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestion < questions.length - 1 ? (
        <button className="next-btn" onClick={handleNextQuestion} disabled={!selectedOption}>
          Next Question
        </button>
      ) : (
        <button className="submit-btn" onClick={handleSubmitQuiz} disabled={!selectedOption}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default QuizPage;
