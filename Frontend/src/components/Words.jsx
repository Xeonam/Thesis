import React from "react";
import { fetchWords } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";

function Words() {

  const { data, isLoading, error } = useCustomQuery(["words"], fetchWords);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-importantText">Words</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-center">
        {data?.map((wordItem) => (
          <div
            key={wordItem.card_id}
            className="bg-[#A3D8F4] rounded-lg shadow overflow-hidden break-words"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                English Word: {wordItem.word.english_word}
              </h3>
              <hr className="h-px  bg-black border-0"></hr>
              <p className="text-gray-600 pt-2">
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
