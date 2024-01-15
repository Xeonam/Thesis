import React from "react";
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

  console.log(data);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-importantText">Decks</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Decks;
