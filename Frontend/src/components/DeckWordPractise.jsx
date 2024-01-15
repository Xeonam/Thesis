import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchDeckWords, repeatCard } from "../api/apiCalls";
import ReactCardFlip from "react-card-flip";

function DeckWordPractise() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const deckId = window.location.pathname.split("/")[2];

  const repeatCardMutation = useMutation({
    mutationFn: repeatCard,
    onSuccess: () => {
      console.log("Card has been successfully repeated!");
      const isLastCard = currentCardIndex === data.length - 1;
      if (isLastCard) {
        refetch();
      }
      handleNext(isLastCard);
    },
    onError: (error) => {
      console.log("An error occurred while repeating the card.", error);
    },
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["deckWords", deckId],
    queryFn: () => fetchDeckWords(deckId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
  };

  const repeatCardHandler = (rating) => {
    repeatCardMutation.mutate({
      cardId: currentCard.card_id,
      rating: rating,
    });
  };

  if (data.length === 0) {
    return <div>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
          <div className="w-full bg-[#e7b4a7] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center font-bold">
                There are no cards in the deck!
            </div>
          </div>
        </div>
      </section>
      </div>;
  }
  return (
    <div>
      <section className="bg-navbarBgColor">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen-90 lg:py-0">
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
              <button
                onClick={handleNext}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DeckWordPractise;
