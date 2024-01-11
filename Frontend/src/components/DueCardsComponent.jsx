import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDueCards } from "../api/apiCalls";
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
      setCurrentCardIndex(-1); 
    }
    setIsFlipped(false);
  };


  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#a7e7c6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
              <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">Next</button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DueCardsComponent;
