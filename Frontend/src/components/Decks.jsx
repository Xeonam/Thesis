import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchDecks } from "../api/apiCalls";

function Decks() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["decks"],
        queryFn: fetchDecks,
      });
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error! {error.message}</div>;
      }
    
  return (
    <div className="p-5">
      Decks
    </div>
  )
}

export default Decks