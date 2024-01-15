import React from "react";
import "./App.css";
import { Home, Register, LogIn, Dashboard, SubmitWord, DueCard, DeckPage } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
  
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/decks"
            element={
              <RequireAuth>
                <DeckPage />
              </RequireAuth>
            }
          />
          <Route
            path="/submit-word"
            element={
              <RequireAuth>
                <SubmitWord />
              </RequireAuth>
            }
          />
          <Route
            path="/due-cards"
            element={
              <RequireAuth>
                <DueCard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
