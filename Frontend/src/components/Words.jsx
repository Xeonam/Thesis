import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWords } from "../api/apiCalls";

function Words() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="p-5 bg-[#412A4C]">
      <h1 className="text-2xl font-bold mb-5">Words</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {data?.map((wordItem) => (
          <div
            key={wordItem.card_id}
            className="bg-[#A3D8F4] rounded-lg shadow overflow-hidden"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                English Word: {wordItem.word.english_word}
              </h3>
              <p className="text-gray-600">
                Hungarian Meaning: {wordItem.word.hungarian_meaning}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Words;
