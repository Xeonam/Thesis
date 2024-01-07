import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWords } from "../api/apiCalls";

function Words() {
  // fetch the words from the api
  const { data, isLoading, error } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  // Log the data to the console
  console.log(data);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  // Render the data
  return (
    <div>
      <h1>Words</h1>
      
      <div>
      { data ? data.map(wordItem => (
        <div key={wordItem.card_id}>
          <h3>English Word: {wordItem.word.english_word}</h3>
          <p>Hungarian Meaning: {wordItem.word.hungarian_meaning}</p>
        </div>
      )): null}
    </div>

    </div>
  );
}

export default Words;
