import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchDueCards, repeatCard, getTextAnalysis } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";
import ReactCardFlip from "react-card-flip";

function DueCardsComponent() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState([]);

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

  const { data, isLoading, error, refetch } = useCustomQuery(
    ["dueCards"],
    fetchDueCards
  );

  const AnalysisMutation = useMutation({
    mutationFn: getTextAnalysis,
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
  });

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

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = data[currentCardIndex];

  const handleNext = () => {
    let nextIndex = (currentCardIndex + 1) % data.length;
    setCurrentCardIndex(nextIndex);
    setIsFlipped(false);
    setAnalysisResult([]);
  };

  const repeatCardHandler = (rating) => {
    repeatCardMutation.mutate({
      cardId: currentCard.card_id,
      rating: rating,
    });
  };

  const analysisHandler = () => {
    AnalysisMutation.mutate({
      text: currentCard.word.english_word,
    });
  };

  if (data.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#e7b4a7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center font-bold">
              There are no due cards!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center overflow-y-auto mt-20">
      <div className="w-full bg-[#a7e7c6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center mb-4">
              {currentCardIndex + 1}/{data.length}
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
                <div className="flex mt-4 gap-12 text-white ">
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
                className="mt-4 px-6  bg-blue-500 text-white rounded"
              >
                Next
              </button>
              <button
                onClick={analysisHandler}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Analysis
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DueCardsComponent;
