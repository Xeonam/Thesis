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

  const handleClick = () => {
    setIsFlipped(!isFlipped);
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
                  {data[0].word.english_word}
                </div>
                <div
                  onClick={handleClick}
                  className="p-4 border border-white shadow rounded bg-blue-100"
                >
                  {data[0].word.hungarian_meaning}
                </div>
              </ReactCardFlip>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DueCardsComponent;
