import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDecks, deleteDeck } from "../api/apiCalls";
import { useCustomQuery } from "../hooks/useApiData";

function Decks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-importantText">Decks</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={() => navigate(`/add-new-deck`)}
      >
        Add new Deck
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5 ml-4"
        onClick={() => navigate(`/view-public-decks`)} // Az útvonal a publikus deckekhez
      >
        View Public Decks
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
                onClick={() => navigate(`/preview/${item.deck_id}`, { state: { fromPrivate: true } })}
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
