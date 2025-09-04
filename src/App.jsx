import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// HashRouter: to handle routing using URL hash (#)
// Routes & Route: to define different pages in the app

import Home from "./pages/Home"; // Home page component
import QuizPage from "./pages/quizPage"; // Quiz page component
import ResultsPage from "./pages/ResultsPage"; // Results page component

import "./index.css"; // Import global CSS

function App() {
  return (
    // Wrap the whole app inside Router for routing
    <Router>
      {/* Define all routes of the app */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Quiz page route */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Results page route */}
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

// Export App component so it can be used in index.jsx
export default App;
