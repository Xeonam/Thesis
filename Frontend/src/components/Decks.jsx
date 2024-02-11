import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDecks, deleteDeck } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";

const PARTS_OF_SPEECH = [
  { value: "NOUN", label: "Noun" },
  { value: "VERB", label: "Verb" },
  { value: "PROPN", label: "Adjective" },
  { value: "PRON", label: "Pronoun" },
];

function Decks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedDeck, setSelectedDeck] = useState("");
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState("");

  const { data, isLoading, error } = useCustomQuery(["decks"], fetchDecks);

  const deleteMutation = useMutation({
    mutationFn: deleteDeck,
    onSuccess: () => {
      queryClient.invalidateQueries(["decks"]);
    },
  });

  const handleDelete = (deckId) => {
    deleteMutation.mutate(deckId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/practise/${selectedDeck}`, {
      state: { selectedPartOfSpeech: selectedPartOfSpeech },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6 p-6">
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="deck-select" className="font-bold">
                Choose a deck:
              </label>
            </div>
            <select
              id="deck-select"
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              className="mt-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navbarBgColor focus:border-navbarBgColor sm:text-sm"
            >
              <option value="">Select a deck</option>
              {data?.map((deck) => (
                <option key={deck.id} value={deck.deck_id}>
                  {deck.name}
                </option>
              ))}
            </select>
            <select
              id="part-of-speech-select"
              value={selectedPartOfSpeech}
              onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
              className="mt-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navbarBgColor focus:border-navbarBgColor sm:text-sm"
            >
              <option value="">Select a part of speech</option>
              {PARTS_OF_SPEECH.map((part) => (
                <option key={part.value} value={part.value}>
                  {part.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-5 text-importantText">Decks</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={() => navigate(`/add-new-deck`)}
      >
        Add new Deck
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5 ml-4"
        onClick={() => navigate(`/view-public-decks`)}
      >
        View Public Decks
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-5 ml-4"
        onClick={() => navigate(`/view-predefined-decks`)}
      >
        View Predefined Decks
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-center">
        {data?.map((item) => (
          <div
            key={item.deck_id}
            className="bg-[#A3D8F4] rounded-lg shadow overflow-hidden"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <hr className="h-px  bg-black border-0"></hr>
              <p className="text-gray-600 pt-2"></p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/practise/${item.deck_id}`)}
              >
                Practise
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={() => handleDelete(item.deck_id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() =>
                  navigate(`/preview/${item.deck_id}`, {
                    state: { fromPrivate: true },
                  })
                }
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Decks;
