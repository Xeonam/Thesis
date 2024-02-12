import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  fetchDeckWords,
  repeatCard,
  getTextAnalysis,
  fetchSpecifiedDeckWords,
  addPracticeSession,
} from "../api/apiCalls";
import ReactCardFlip from "react-card-flip";
import { useCustomQuery } from "../hooks/useApiData";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DeckWordPractise() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [clickCounts, setClickCounts] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const [isPracticeFinished, setIsPracticeFinished] = useState(false);

  const deckId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPartOfSpeech = location.state?.selectedPartOfSpeech;
  console.log(selectedPartOfSpeech);

  const repeatCardMutation = useMutation({
    mutationFn: repeatCard,
    onSuccess: () => {
      const isLastCard = currentCardIndex === data.length - 1;
      if (isLastCard) {
        refetch();
      }
      handleNext(isLastCard);
    },
  });

  const addPracticeSessionMutation = useMutation({
    mutationFn: addPracticeSession,
    onSuccess: () => {
      console.log("Practice session added");
    },
  });

  const { data, isLoading, error, refetch } = useCustomQuery(
    ["deckWords", deckId, selectedPartOfSpeech],
    () =>
      selectedPartOfSpeech
        ? fetchSpecifiedDeckWords(deckId, selectedPartOfSpeech)
        : fetchDeckWords(deckId)
  );

  const AnalysisMutation = useMutation({
    mutationFn: getTextAnalysis,
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = data ? data[currentCardIndex] : null;
  /* const currentCard = data[currentCardIndex] */

  const handleNext = () => {
    let nextIndex = (currentCardIndex + 1) % data.length;
    setCurrentCardIndex(nextIndex);
    setIsFlipped(false);
    setAnalysisResult([]);
    const isLastCard = nextIndex === 0;
    if (isLastCard) {
      setIsTimerActive(false);
      setIsPracticeFinished(true);
      handleAddPracticeSession();
    }
  };

  const repeatCardHandler = (rating) => {
    repeatCardMutation.mutate({
      cardId: currentCard.card_id,
      rating: rating,
    });
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [rating === 1
        ? "again"
        : rating === 2
        ? "hard"
        : rating === 3
        ? "good"
        : "easy"]:
        prevCounts[
          rating === 1
            ? "again"
            : rating === 2
            ? "hard"
            : rating === 3
            ? "good"
            : "easy"
        ] + 1,
    }));
  };

  const handleAddPracticeSession = () => {
    addPracticeSessionMutation.mutate({
      deck_id: deckId,
      practice_duration: timer,
      practice_date: new Date().toISOString(),
    });
  };

  const analysisHandler = () => {
    AnalysisMutation.mutate({
      text: currentCard.word.english_word,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAgain = () => {
    setCurrentCardIndex(0);
    setIsPracticeFinished(false);
    setTimer(0);
    setIsTimerActive(true);
    setClickCounts({
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
    });
  };

  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isTimerActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (data.length === 0 || data === undefined) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#e7b4a7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center font-bold">
              There are no cards in the deck!
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto mt-20">
      <div className="w-full bg-[#a7e7c6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {isPracticeFinished ? (
            <>
              <div className="text-center mt-4">
                <p className="text-lg font-bold">You're done!</p>
                <p className="font-semibold">
                  Time: {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")}
                </p>
                <p>Again: {clickCounts.again}</p>
                <p>Hard: {clickCounts.hard}</p>
                <p>Good: {clickCounts.good}</p>
                <p>Easy: {clickCounts.easy}</p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleAgain}
                  className="mt-4 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Start Over
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4 text-black">
                Time: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}{" "}
              </div>
              {currentCard && (
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                  <div
                    onClick={handleClick}
                    className="p-4 border border-white shadow rounded bg-blue-200 hover:cursor-pointer"
                  >
                    {currentCard.word.english_word}
                  </div>
                  <div
                    onClick={handleClick}
                    className="p-4 border border-white shadow rounded bg-blue-100 hover:cursor-pointer"
                  >
                    {currentCard.word.hungarian_meaning}
                  </div>
                </ReactCardFlip>
              )}

              {isFlipped && (
                <>
                  <div className="flex justify-center gap-4 mt-4 text-white">
                    <button
                      className="p-2 bg-red-500 rounded mx-1 hover:text-importantText"
                      onClick={() => repeatCardHandler(1)}
                    >
                      Again
                    </button>
                    <button
                      className="p-2 bg-orange-500 rounded hover:text-importantText"
                      onClick={() => repeatCardHandler(2)}
                    >
                      Hard
                    </button>
                    <button
                      className="p-2 bg-blue-500 rounded hover:text-importantText"
                      onClick={() => repeatCardHandler(3)}
                    >
                      Good
                    </button>
                    <button
                      className="p-2 bg-green-500 rounded hover:text-importantText"
                      onClick={() => repeatCardHandler(4)}
                    >
                      Easy
                    </button>
                  </div>
                </>
              )}
              <div className="flex justify-center gap-4  text-white ">
                <button
                  onClick={handleNext}
                  className="mt-4 px-6  bg-blue-500 text-white rounded hover:text-importantText"
                >
                  Next
                </button>
                <button
                  onClick={analysisHandler}
                  className="mt-4 p-2 bg-blue-500 text-white rounded hover:text-importantText"
                >
                  Analysis
                </button>
                <button
                  onClick={handleBack}
                  className="mt-4 p-2 bg-blue-500 text-white rounded hover:text-importantText"
                >
                  Return
                </button>
              </div>
              <div>
                {analysisResult &&
                  analysisResult.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 mb-3 bg-blue-100 rounded shadow"
                    >
                      <p className="text-lg font-semibold text-gray-800">
                        Word: {item.word}
                      </p>
                      {item.lemma !== "" && (
                        <p className="text-md text-gray-700">
                          Lemma: {item.lemma}
                        </p>
                      )}
                      <p className="text-md text-gray-700">
                        Part of Speech: {item.part_of_speech}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeckWordPractise;
