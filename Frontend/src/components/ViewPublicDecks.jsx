import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicDecks } from "../api/apiCalls";

function ViewPublicDecks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["decks"],
    queryFn: fetchPublicDecks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return <div>ViewPublicDecks</div>;
}

export default ViewPublicDecks;
