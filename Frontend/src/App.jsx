import React from "react";
import "./App.css";
import {
  Home,
  Register,
  LogIn,
  Dashboard,
  SubmitWord,
  DueCard,
  DeckPage,
  DeckWordsPractisePage,
  AddNewDeck,
  ViewPublicDecksPage,
  DeckWordsPreview,
  ViewPredefinedDecksPage,
  StatisticPage
} from "./pages";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("accessToken");
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
            path="/practise/:deckId"
            element={
              <RequireAuth>
                <DeckWordsPractisePage />
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
            path="/add-new-deck"
            element={
              <RequireAuth>
                <AddNewDeck />
              </RequireAuth>
            }
          />
          <Route
            path="/view-public-decks"
            element={
              <RequireAuth>
                <ViewPublicDecksPage />
              </RequireAuth>
            }
          />
          <Route
            path="/view-predefined-decks"
            element={
              <RequireAuth>
                <ViewPredefinedDecksPage />
              </RequireAuth>
            }
          />
          <Route
            path="/preview/:deckId"
            element={
              <RequireAuth>
                <DeckWordsPreview />
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
          <Route
            path="/statistics"
            element={
              <RequireAuth>
                <StatisticPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
