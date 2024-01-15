import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDeckWords } from "../api/apiCalls";

function DeckWordPractise() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const deckId = window.location.pathname.split("/")[2]; 

  const { data, isLoading, error } = useQuery({
    queryKey: ["deckWords", deckId],
    queryFn: () => fetchDeckWords(deckId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  console.log(data);

  return (
    <div>
    asd 
    </div>
  );
}

export default DeckWordPractise;
