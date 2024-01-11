import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDueCards, repeatCard } from "../api/apiCalls";
import ReactCardFlip from "react-card-flip";

function DueCardsComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dueCards"],
    queryFn: fetchDueCards,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = data[currentCardIndex];

  const handleNext = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
    setIsFlipped(false);
  };

  //Button
  const [buttonValue, setButtonValue] = useState(null);
  const handleButtonClick = (value) => {
    setButtonValue(value);
  };

  console.log(buttonValue);

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#a7e7c6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-center mb-4">
                {currentCardIndex + 1}/{data.length}
              </div>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div
                  onClick={handleClick}
                  className="p-4 border border-white shadow rounded bg-blue-200"
                >
                  {currentCard.word.english_word}
                </div>
                <div
                  onClick={handleClick}
                  className="p-4 border border-white shadow rounded bg-blue-100"
                >
                  {currentCard.word.hungarian_meaning}
                </div>
              </ReactCardFlip>
              {isFlipped && (
                <>
                  <div className="flex mt-4 gap-12 text-white ">
                    <button
                      className="p-2 bg-red-500 rounded mx-1"
                      onClick={() => handleButtonClick(1)}
                    >
                      Again
                    </button>
                    <button
                      className="p-2 bg-orange-500 rounded"
                      onClick={() => handleButtonClick(2)}
                    >
                      Hard
                    </button>
                    <button
                      className="p-2 bg-blue-500 rounded"
                      onClick={() => handleButtonClick(3)}
                    >
                      Good
                    </button>
                    <button
                      className="p-2 bg-green-500 rounded"
                      onClick={() => handleButtonClick(4)}
                    >
                      Easy
                    </button>
                  </div>
                </>
              )}
              {/* <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">Next</button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DueCardsComponent;
