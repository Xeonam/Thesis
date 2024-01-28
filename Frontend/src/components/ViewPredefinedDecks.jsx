import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchPredefinedDecks, cloneDeck } from "../api/apiCalls";
import { toast } from "react-toastify";
import { useCustomQuery } from "../hooks/useApiData";
import { useNavigate } from "react-router-dom";

function ViewPredefinedDecks() {
  const navigate = useNavigate();
  const cloneMutation = useMutation({
    mutationFn: cloneDeck,
    onSuccess: () => {
      toast.success("Deck has been successfully cloned!");
    },
    onError: () => {
      toast.error("An error occurred while cloning the deck.");
    },
  });

  const handleClone = (deck_id) => {
    cloneMutation.mutate(deck_id);
  };

  const { data, isLoading, error } = useCustomQuery(
    ["decks"],
    fetchPredefinedDecks
  );

  const handleBack = () => {
    navigate(-1);
  };

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return <div>ViewPredefinedDecks</div>;
}

export default ViewPredefinedDecks;
