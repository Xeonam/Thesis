import React from "react";
import { fetchDeckWords } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";

function DeckWordsPreviewComponent() {
  const deckId = window.location.pathname.split("/")[2];

  const { data, isLoading, error, refetch } = useCustomQuery(
    ["deckWords", deckId],
    () => fetchDeckWords(deckId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  console.log(data);

  return <div>DeckWordsPreviewComponent</div>;
}

export default DeckWordsPreviewComponent;
