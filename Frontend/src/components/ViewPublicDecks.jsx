import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchPublicDecks, cloneDeck } from "../api/apiCalls";
import { toast } from "react-toastify";
import { useCustomQuery } from "../hooks/useApiData";

function ViewPublicDecks() {
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
    fetchPublicDecks
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="p-5">
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
                onClick={() => handleClone(item.deck_id)}
              >
                Add to my decks
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPublicDecks;
